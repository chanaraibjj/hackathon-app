// ============================================================
// External API テンプレート
// 使い方: これを参考に src/lib/<name>.ts を作る(サーバー側から呼ぶ)
// ============================================================

export type ExternalData = {
  id: string;
  name: string;
  value: number;
};

const TIMEOUT_MS = 10_000;

// GET + Query Parameter + Header + API Key + JSON Parse + Error Handling + Timeout
export async function fetchExternalData(query: string): Promise<ExternalData[]> {
  const url = new URL("https://api.example.com/items");
  url.searchParams.set("q", query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // APIキーが必要な場合(環境変数はサーバー側でのみ参照):
      // Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`External API request failed: ${response.status}`);
  }

  return (await response.json()) as ExternalData[];
}

// POST 版
export async function postExternalData(payload: {
  name: string;
}): Promise<ExternalData> {
  const response = await fetch("https://api.example.com/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`External API request failed: ${response.status}`);
  }

  return (await response.json()) as ExternalData;
}
