// ============================================================
// Real AI テンプレート(無料AI API)
// 第一候補: Gemini API 無料枠(クレカ不要)
// ⚠️ エンドポイント/モデル名は事前接続テスト時に最新を確認して確定させる
// 環境変数 AI_API_KEY を使用(サーバー側のみ。Route Handler経由で呼ぶ)
// ============================================================
import type { AIResult } from "./types";

const TIMEOUT_MS = 20_000;
const MODEL = "gemini-2.5-flash"; // 接続テストで確認したモデル名に置き換える

export async function generateRealResult(input: string): Promise<AIResult> {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error("AI_API_KEY is not set");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
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
                text: `次の入力に対する結果を、{"title": string, "description": string} のJSONだけで返してください。日本語で。入力: ${input}`,
              },
            ],
          },
        ],
        generationConfig: { responseMimeType: "application/json" },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    throw new Error(`AI API request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const parsed = JSON.parse(text) as Partial<AIResult>;

  return {
    title: parsed.title ?? "結果",
    description: parsed.description ?? text,
  };
}
