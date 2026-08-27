"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import Badge from "@/components/Badge";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { runLocalDemo } from "@/lib/demo";
import type { DemoResult } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<DemoResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const canRun = input.trim().length > 0 && status !== "loading";

  async function run() {
    if (!canRun) return;
    setStatus("loading");
    setResult(null);
    setErrorMessage("");
    try {
      const res = await runLocalDemo(input);
      setResult(res);
      setStatus("success");
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "不明なエラーが発生しました");
      setStatus("error");
    }
  }

  function reset() {
    setInput("");
    setResult(null);
    setErrorMessage("");
    setStatus("idle");
  }

  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-6">
          {/* First View */}
          <Hero
            eyebrow="STARTER"
            title="Hackathon Starter"
            description="汎用の1画面フロー: 入力 → 実行 → Loading → Result。当日はテーマに合わせてこの画面を作り替えます。"
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
                入力
                <Textarea
                  rows={3}
                  placeholder="ここに何か入力してください(「エラー」と入れるとError表示を確認できます)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={status === "loading"}
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={!canRun}>
                  実行する
                </Button>
                {(status === "success" || status === "error") && (
                  <Button type="button" variant="secondary" onClick={reset}>
                    リセットして再実行
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Loading */}
          {status === "loading" && (
            <Card>
              <Loading label="実行しています..." />
            </Card>
          )}

          {/* Error */}
          {status === "error" && <Alert variant="error">{errorMessage}</Alert>}

          {/* Result */}
          {status === "success" && result && (
            <Card className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="success">RESULT</Badge>
                <h2 className="text-lg font-semibold">{result.title}</h2>
              </div>
              <p className="text-sm text-muted">{result.description}</p>
              <ul className="flex flex-col gap-1.5 text-sm">
                {result.items.map((item) => (
                  <li key={item} className="rounded-md bg-background px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </Container>
    </main>
  );
}
