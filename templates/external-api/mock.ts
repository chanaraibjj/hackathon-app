// ============================================================
// External API Mock テンプレート
// External APIがCORE EXPERIENCEに重要な場合の保険。
// ポイント: RealとMockは「同じ戻り値型」を返すこと。
// External APIを使わない企画なら一切使用しない。
// ============================================================
import { fetchExternalData, type ExternalData } from "./external";

// Realと同じ ExternalData[] を返すMock
export function mockExternalData(query: string): ExternalData[] {
  return [
    { id: "1", name: `${query} のサンプルA`, value: 42 },
    { id: "2", name: `${query} のサンプルB`, value: 7 },
  ];
}

// Real失敗時にMockへ自動フォールバック
export async function fetchExternalDataWithFallback(
  query: string,
): Promise<ExternalData[]> {
  try {
    return await fetchExternalData(query);
  } catch (error) {
    console.warn("External API failed, falling back to mock:", error);
    return mockExternalData(query);
  }
}
