// ============================================================
// AI 共通入口テンプレート
// UIはこの generateResult() だけを呼ぶ。Real/Dummyの切替はここで行う。
// 当日の順番: Dummyで CORE EXPERIENCE 完成 → 余裕があれば USE_REAL_AI を true に
// Realが失敗してもDummyにフォールバックするのでUIは壊れない。
// ============================================================
import type { AIResult } from "./types";
import { generateDummyResultAsync } from "./ai-dummy";
import { generateRealResult } from "./ai-real";

const USE_REAL_AI = false;

export async function generateResult(input: string): Promise<AIResult> {
  if (!USE_REAL_AI) {
    return generateDummyResultAsync(input);
  }
  try {
    return await generateRealResult(input);
  } catch (error) {
    console.warn("Real AI failed, falling back to dummy:", error);
    return generateDummyResultAsync(input);
  }
}
