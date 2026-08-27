import { sleep } from "@/utils/sleep";
import type { DemoResult } from "@/types";

// Starter用のローカル処理。当日はここ(またはこれを呼ぶUI)を本物の処理に差し替える。
// 入力に「エラー」/「error」を含めるとError表示の動作確認ができる。
export async function runLocalDemo(input: string): Promise<DemoResult> {
  await sleep(800);
  const text = input.trim();
  if (text.includes("エラー") || text.toLowerCase().includes("error")) {
    throw new Error("デモ用のエラーです(入力に「エラー」が含まれています)");
  }
  return {
    title: `「${text}」の結果`,
    description:
      "これはStarterのローカル処理によるデモ結果です。当日はここを本物の処理に差し替えます。",
    items: [
      `入力文字数: ${text.length}`,
      `単語数(スペース区切り): ${text.split(/\s+/).filter(Boolean).length}`,
      `逆順: ${[...text].reverse().join("")}`,
    ],
  };
}
