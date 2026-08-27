import { NextResponse } from "next/server";

// hanamii検証用の診断Route。
// GET /api/health            → Route Handler動作 + 環境変数の有無
// GET /api/health?external=1 → 上記 + 外部API疎通(キー不要のOpen-Meteoで札幌の気温を取得)
// GET /api/health?ai=1       → 上記 + Gemini無料枠の疎通(AI_API_KEY必須。小さなプロンプト1回)
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const checks: Record<string, unknown> = {
    ok: true,
    time: new Date().toISOString(),
    routeHandler: "working",
    env: {
      AI_API_KEY: process.env.AI_API_KEY ? "set" : "not set",
      EXTERNAL_API_KEY: process.env.EXTERNAL_API_KEY ? "set" : "not set",
    },
  };

  if (searchParams.get("external") === "1") {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=43.06&longitude=141.35&current=temperature_2m",
        { signal: AbortSignal.timeout(10_000), cache: "no-store" },
      );
      const data = (await res.json()) as {
        current?: { temperature_2m?: number };
      };
      checks.external = {
        status: res.status,
        sapporoTemperatureC: data.current?.temperature_2m ?? null,
      };
    } catch (error) {
      checks.external = {
        error: error instanceof Error ? error.message : "failed",
      };
    }
  }

  if (searchParams.get("ai") === "1") {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      checks.ai = { error: "AI_API_KEY is not set" };
    } else {
      try {
        const res = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: '{"title": string} のJSONだけで、日本語の挨拶をtitleに入れて返して',
                    },
                  ],
                },
              ],
              generationConfig: { responseMimeType: "application/json" },
            }),
            signal: AbortSignal.timeout(20_000),
          },
        );
        const data = (await res.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        checks.ai = {
          status: res.status,
          sample: data.candidates?.[0]?.content?.parts?.[0]?.text ?? null,
        };
      } catch (error) {
        checks.ai = {
          error: error instanceof Error ? error.message : "failed",
        };
      }
    }
  }

  return NextResponse.json(checks);
}
