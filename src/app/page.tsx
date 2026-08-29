"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import Badge from "@/components/Badge";
import { judge, MY_NAME, type JudgeResult } from "@/lib/judge";

const SAMPLES = ["わかりました。", "検討します。", "承知しました。"];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JudgeResult | null>(null);
  // 実行時のスナップショット。以降の入力変更はプレビューに反映しない
  const [sent, setSent] = useState<{ text: string } | null>(null);
  const [runId, setRunId] = useState(0);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // 代替案も同じ判定エンジンに通し、改善の効果を数字で見せる
  const rewriteScore = result?.rewrite ? judge(result.rewrite).score : null;

  async function copyRewrite() {
    if (!result?.rewrite) return;
    await navigator.clipboard.writeText(result.rewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const canRun = input.trim().length > 0;

  useEffect(() => {
    if (runId > 0) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [runId]);

  function run() {
    const text = input.trim();
    if (!text) return;
    setResult(judge(text));
    setSent({ text });
    setRunId((n) => n + 1); // key更新でフェード演出を毎回リプレイ
  }

  function reset() {
    setInput("");
    setResult(null);
    setSent(null);
  }

  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-6">
          {/* First View */}
          <Hero
            eyebrow="顔を知る — 送信前30秒のコミュニケーション改善サポート"
            title="そっけなさプレビュー"
            description="わたしに送る前のその返信、受け取るわたしの画面でどう見えるかをプレビューします。伝わり方をたしかめて、同じ内容のまま、もっと伝わる返信に磨いてから送れます。送信前に30秒だけ、わたしの顔を見てみてください。"
          />

          {/* Input / Action */}
          <Card>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                run();
              }}
            >
              <label className="flex flex-col gap-2 text-sm font-medium">
                わたしに送る前の返信
                <Textarea
                  rows={3}
                  placeholder="例: わかりました。"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted">サンプル:</span>
                {SAMPLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput(s)}
                    className="rounded-full border border-border px-3 py-1 text-xs transition hover:bg-card"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium">宛先</span>
                <Badge variant="neutral">{MY_NAME}(固定)</Badge>
                <span className="text-xs text-muted">
                  このアプリの宛先は、世界にたった1人だけです
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={!canRun}>
                  わたしの画面で見る
                </Button>
                {result && (
                  <Button type="button" variant="secondary" onClick={reset}>
                    リセット
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Result */}
          {result && sent && (
            <div
              key={runId}
              ref={resultRef}
              className="grid scroll-mt-4 gap-6 md:grid-cols-2"
            >
              {/* わたしのスマホ画面(WOWの本体) */}
              <div
                className="mx-auto w-full max-w-xs"
                style={{ animation: "fade-up 0.4s ease-out both" }}
              >
                <div className="overflow-hidden rounded-[2rem] border border-border bg-background shadow-lg">
                  {/* スマホのヘッダー */}
                  <div className="border-b border-border bg-card px-4 py-3 text-center">
                    <p className="text-xs text-muted">{MY_NAME}のスマホ</p>
                    <p className="text-sm font-semibold">あなたとのトーク</p>
                  </div>
                  {/* トーク画面 */}
                  <div className="flex min-h-64 flex-col gap-2 px-4 py-5">
                    <div className="flex flex-col items-end gap-1">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-accent-foreground">
                        {sent.text}
                      </div>
                      <span
                        className="text-[10px] text-muted"
                        style={{ animation: "fade-up 0.3s ease-out 0.6s both" }}
                      >
                        既読
                      </span>
                    </div>
                    {/* わたしの内心バブル */}
                    <div
                      className="mt-6 self-start"
                      style={{ animation: "fade-up 0.7s ease-out 1.4s both" }}
                    >
                      <div className="max-w-[95%] rounded-2xl border border-dashed border-border bg-card px-4 py-3 text-sm italic text-muted">
                        {result.innerVoice}
                      </div>
                      <p className="mt-1 pl-2 text-[10px] text-muted">
                        {MY_NAME}の内心
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 冷たさ根拠+温めた代替案 */}
              <div
                className="flex flex-col gap-4"
                style={{ animation: "fade-up 0.5s ease-out 2.2s both" }}
              >
                <Card className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        result.level === 2
                          ? "danger"
                          : result.level === 1
                            ? "neutral"
                            : "success"
                      }
                    >
                      冷たさ判定: {result.levelLabel}
                    </Badge>
                    <span className="text-xs text-muted">
                      冷たさスコア {result.score} / 100
                    </span>
                  </div>
                  {result.reasons.length > 0 ? (
                    <ul className="flex flex-col gap-1.5 text-sm">
                      {result.reasons.map((r) => (
                        <li
                          key={r.label}
                          className="rounded-md bg-background px-3 py-2"
                        >
                          <span className="font-semibold text-danger">
                            {r.label}
                          </span>
                          <span className="block text-xs text-muted">
                            {r.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">
                      冷たさの要素は見つかりませんでした。
                    </p>
                  )}
                </Card>

                {result.rewrite ? (
                  <Card className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="success">温めた代替案</Badge>
                      {rewriteScore !== null && (
                        <span className="text-xs text-muted">
                          冷たさスコア {result.score} →{" "}
                          <span className="font-semibold text-success">
                            {rewriteScore}
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="rounded-md bg-background px-3 py-2 text-sm">
                      {result.rewrite}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-muted">
                        同じ内容のまま、気持ちが伝わる一言を足しました。
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={copyRewrite}
                      >
                        {copied ? "コピーしました!" : "コピーして送る"}
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card>
                    <p className="text-sm">
                      このままで十分あたたかい返信です。安心して送ってください。
                      わたしも安心して受け取れます。
                    </p>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
