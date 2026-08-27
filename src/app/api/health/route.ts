import { NextResponse } from "next/server";

// hanamii検証用の診断Route。
// GET /api/health            → Route Handler動作 + 環境変数の有無
// GET /api/health?external=1 → 上記 + 外部API疎通(キー不要のOpen-Meteoで札幌の気温を取得)
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

  return NextResponse.json(checks);
}
