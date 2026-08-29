"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Textarea from "@/components/Textarea";
import { analyze, type AnalyzeReport } from "@/lib/analyze";
import { MY_NAME } from "@/lib/judge";

const SAMPLE_LOG = `私: 先日のご提案の件、いかがでしょうか?気になる点があれば何でもおっしゃってください!
相手: わかりました。
私: ありがとうございます!それでは今週中にたたき台をお送りしますね。
相手: 検討します。
私: 修正版をお送りしました。ご確認よろしくお願いします!
相手: 違います。至急直してください。
相手: なんでこうなったんですか?
私: 大変失礼しました!本日中に修正します。詳しく教えていただけると助かります。
相手: 承知しました。`;

export default function AnalyzePage() {
  const [log, setLog] = useState("");
  const [report, setReport] = useState<AnalyzeReport | null>(null);

  function run() {
    const r = analyze(log);
    if (r) setReport(r);
  }

  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-6">
          <Hero
            eyebrow="これまでのやり取りを、まるごと最適化"
            title="やり取り分析"
            description="わたしとの会話をそのまま貼ると、話者を自動で分けて、わたし宛てのメッセージを判定エンジンで分析。ふたりの「温度差」と「わたしにいちばん伝わる送り方」をレポートします。分析はブラウザ内で完結し、内容はどこにも送信されません。"
          />

          <Card>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium">
                これまでのやり取り(「私: ○○」「相手: ○○」の形で貼り付け。相手の発言だけでもOK)
                <Textarea
                  rows={9}
                  placeholder={
                    "私: ご確認いかがでしょうか?\n相手: わかりました。\n..."
                  }
                  value={log}
                  onChange={(e) => setLog(e.target.value)}
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" onClick={run} disabled={!log.trim()}>
                  わたしに最適化する
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setLog(SAMPLE_LOG)}
                >
                  サンプルのやり取りを貼る
                </Button>
              </div>
            </div>
          </Card>

          {report && (
            <div className="flex flex-col gap-4">
              {report.gap !== null && report.myAvgScore !== null && (
                <Card className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={report.gap >= 30 ? "danger" : "neutral"}>
                      ふたりの温度差 {Math.abs(report.gap)}
                    </Badge>
                    <span className="text-xs text-muted">
                      わたしの送信 平均冷たさ {report.myAvgScore}(
                      {report.myCount}件) / わたし宛て 平均冷たさ{" "}
                      {report.avgScore}({report.total}件)
                    </span>
                  </div>
                  {report.gap >= 30 && (
                    <p className="text-sm text-muted">
                      わたしが送る温度と、返ってくる温度に大きな差があります。この差のぶんだけ、行間を想像で埋めています。
                    </p>
                  )}
                </Card>
              )}

              <Card className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      report.avgScore >= 60
                        ? "danger"
                        : report.avgScore >= 30
                          ? "neutral"
                          : "success"
                    }
                  >
                    わたし宛ての平均冷たさ {report.avgScore} / 100
                  </Badge>
                  <span className="text-xs text-muted">
                    {report.total}件を分析 — 凍える{report.counts.freeze} / ひんやり
                    {report.counts.cool} / あたたかい{report.counts.warm}
                  </span>
                </div>
              </Card>

              {report.habits.length > 0 && (
                <Card className="flex flex-col gap-3">
                  <div>
                    <Badge variant="neutral">よく出ている癖</Badge>
                  </div>
                  <ul className="flex flex-col gap-2 text-sm">
                    {report.habits.map((h) => (
                      <li
                        key={h.label}
                        className="rounded-md bg-background px-3 py-2"
                      >
                        <span className="font-semibold">
                          {h.label}({h.count}回)
                        </span>
                        {h.advice && (
                          <span className="block text-xs text-muted">
                            → {h.advice}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {report.coldest && (
                <Card className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="danger">いちばん冷たかった一言</Badge>
                    <span className="text-xs text-muted">
                      冷たさ {report.coldest.result.score} / 100
                    </span>
                  </div>
                  <p className="rounded-md bg-background px-3 py-2 text-sm">
                    {report.coldest.text}
                  </p>
                  <p className="text-sm italic text-muted">
                    {report.coldest.result.innerVoice}
                    <span className="block text-[10px] not-italic">
                      {MY_NAME}の内心
                    </span>
                  </p>
                  {report.coldest.result.rewrite && (
                    <p className="rounded-md bg-background px-3 py-2 text-sm">
                      温めるなら: {report.coldest.result.rewrite}
                    </p>
                  )}
                </Card>
              )}

              <Card>
                <p className="text-xs text-muted">
                  癖に合わせた言いかえは
                  <Link href="/library" className="underline">
                    言いかえライブラリ
                  </Link>
                  、受け取り方の詳細は
                  <Link href="/guide" className="underline">
                    {MY_NAME}の取説
                  </Link>
                  へ。分析はすべてブラウザ内で行われ、やり取りの内容は保存も送信もされません。
                </p>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
