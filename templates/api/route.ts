// ============================================================
// API Route テンプレート
// 使い方: これを参考に src/app/api/<name>/route.ts を作る
// (このファイル自体はビルド対象外。templates/ はサンプル置き場)
// ============================================================
import { NextResponse } from "next/server";

const TIMEOUT_MS = 10_000;

// GET /api/<name>?q=...
export async function GET(request: Request) {
  try {
    // Query Parameter の取得と Validation
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    if (!q || q.trim() === "") {
      return NextResponse.json({ error: "q is required" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, q });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/<name>  body: { "input": "..." }
export async function POST(request: Request) {
  try {
    // Request JSON の取得と Validation
    const body = (await request.json().catch(() => null)) as {
      input?: string;
    } | null;
    if (!body || typeof body.input !== "string" || body.input.trim() === "") {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }

    // 環境変数はサーバー側(ここ)でのみ参照する。Client Componentでは使わない
    const apiKey = process.env.AI_API_KEY;

    // 外部APIを呼ぶ場合は必ず Timeout を付ける
    // const upstream = await fetch("https://api.example.com", {
    //   signal: AbortSignal.timeout(TIMEOUT_MS),
    // });
    void apiKey;
    void TIMEOUT_MS;

    // Response JSON
    return NextResponse.json({ ok: true, result: `received: ${body.input}` });
  } catch (error) {
    // Timeout は 504 で返す
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json({ error: "Upstream timeout" }, { status: 504 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
