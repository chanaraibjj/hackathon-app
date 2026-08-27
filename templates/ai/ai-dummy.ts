// ============================================================
// Dummy AI テンプレート
// Real AI接続より先に、これでCORE EXPERIENCEを完成させる。
// 条件分岐でResultを変え、デモが成立するレベルにする。
// ============================================================
import type { AIResult } from "./types";

export function generateDummyResult(input: string): AIResult {
  if (input.includes("札幌")) {
    return {
      title: "札幌向けの結果",
      description: "デモ用の結果です",
    };
  }

  return {
    title: "おすすめ結果",
    description: "デモ用の結果です",
  };
}

// 非同期版(本物っぽい待ち時間つき。UIのLoading確認にも使える)
export async function generateDummyResultAsync(
  input: string,
): Promise<AIResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return generateDummyResult(input);
}
