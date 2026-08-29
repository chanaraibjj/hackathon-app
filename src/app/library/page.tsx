"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { PHRASES } from "@/lib/library";
import { judge } from "@/lib/judge";

export default function LibraryPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function copy(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-6">
          <Hero
            eyebrow="同じ用件のまま、伝わり方だけ変える"
            title="言いかえライブラリ"
            description="定番の返信と、同じ内容のまま温めた言いかえを並べました。冷たさスコアは送信前チェックと同じ判定エンジンで算出しています。そのままコピーして使えます。"
          />

          <div className="flex flex-col gap-4">
            {PHRASES.map((p, i) => {
              const before = judge(p.before);
              const after = judge(p.after);
              return (
                <Card key={p.before} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-md bg-background px-3 py-2 text-sm">
                      {p.before}
                    </p>
                    <Badge variant={before.level === 2 ? "danger" : "neutral"}>
                      冷たさ {before.score}
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-md bg-background px-3 py-2 text-sm">
                      {p.after}
                    </p>
                    <Badge variant="success">冷たさ {after.score}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted">{p.note}</p>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => copy(p.after, i)}
                    >
                      {copiedIndex === i ? "コピーしました!" : "コピー"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}
