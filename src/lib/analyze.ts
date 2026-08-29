// やり取り分析: 貼り付けた会話を話者ごとに分け、相手の発言を judge() に通して
// 「わたしに最適化された送り方」レポートへ集計する(全処理ブラウザ内・送信なし)

import { judge, type JudgeResult } from "@/lib/judge";

export type Habit = { label: string; count: number; advice: string };

export type AnalyzeReport = {
  total: number;
  avgScore: number;
  counts: { warm: number; cool: number; freeze: number };
  habits: Habit[];
  coldest: { text: string; result: JudgeResult } | null;
  // わたし側の発言が検出できたときだけ入る「温度差」情報
  myCount: number;
  myAvgScore: number | null;
  gap: number | null;
};

// 「私: ○○」「相手: ○○」形式の会話を話者ごとに分ける。
// ラベルなしの行は直前の話者の続き。ラベルが1つもなければ全行を相手の発言とみなす
const MY_SPEAKERS = ["私", "わたし", "自分", "me", "僕", "俺"];
const TIME_RE = /^\d{1,2}[::]\d{2}\s*/;
const SPEAKER_RE = /^([^::]{1,12})[::]\s*(.*)$/;

export function parseConversation(rawLog: string): {
  mine: string[];
  theirs: string[];
} {
  const mine: string[] = [];
  const theirs: string[] = [];
  let labeled = false;
  let lastWasMine = false;
  const pending: string[] = []; // ラベルが出る前の行(ラベルなしログ用)

  for (const raw of rawLog.split(/\n+/)) {
    const line = raw.trim().replace(TIME_RE, "");
    if (!line) continue;
    const m = line.match(SPEAKER_RE);
    if (m) {
      const speaker = m[1].trim().toLowerCase();
      const text = m[2].trim();
      labeled = true;
      lastWasMine = MY_SPEAKERS.some(
        (s) => speaker === s || speaker.startsWith(s)
      );
      if (text) (lastWasMine ? mine : theirs).push(text);
    } else if (labeled) {
      (lastWasMine ? mine : theirs).push(line);
    } else {
      pending.push(line);
    }
  }
  // ラベルなしで貼られた行は相手の発言として扱う(片側だけの貼り付けに対応)
  theirs.unshift(...pending);
  return { mine, theirs };
}

// 癖ごとの「わたしに効く」アドバイス(/guide の取説と対応)
const ADVICE: Record<string, string> = {
  "句点で終わる単文":
    "受領+一言(例:「ありがとうございます!」)があると、わたしは行間を埋めずに作業へ戻れます",
  "感情の手がかりゼロ":
    "「!」か絵文字がひとつあるだけで、温度が伝わります",
  短すぎる返信:
    "お忙しいときは「後で詳しく返します!」だけでも十分うれしいです",
  強い言葉:
    "「どこを・なぜ」を一言足していただくと、最短で直してお返しできます",
};

function normalizeLabel(label: string): string {
  if (label.startsWith("短すぎる返信")) return "短すぎる返信";
  if (label.startsWith("強い言葉")) return "強い言葉";
  return label;
}

export function analyze(rawLog: string): AnalyzeReport | null {
  const { mine, theirs } = parseConversation(rawLog);
  // 「私:」だけ貼られた場合も一応動くように、相手ゼロならわたし側を対象にする
  const lines = theirs.length > 0 ? theirs : mine;
  if (lines.length === 0) return null;

  const results = lines.map((text) => ({ text, result: judge(text) }));
  const total = results.length;
  const avgScore = Math.round(
    results.reduce((sum, r) => sum + r.result.score, 0) / total
  );

  const counts = { warm: 0, cool: 0, freeze: 0 };
  const habitCount = new Map<string, number>();
  let coldest = results[0];

  for (const r of results) {
    if (r.result.level === 0) counts.warm += 1;
    else if (r.result.level === 1) counts.cool += 1;
    else counts.freeze += 1;
    for (const reason of r.result.reasons) {
      const key = normalizeLabel(reason.label);
      habitCount.set(key, (habitCount.get(key) ?? 0) + 1);
    }
    if (r.result.score > coldest.result.score) coldest = r;
  }

  const habits = [...habitCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label, count]) => ({ label, count, advice: ADVICE[label] ?? "" }));

  const myScores =
    theirs.length > 0 ? mine.map((text) => judge(text).score) : [];
  const myAvgScore =
    myScores.length > 0
      ? Math.round(myScores.reduce((a, b) => a + b, 0) / myScores.length)
      : null;

  return {
    total,
    avgScore,
    counts,
    habits,
    coldest: coldest.result.score > 0 ? coldest : null,
    myCount: myScores.length,
    myAvgScore,
    gap: myAvgScore !== null ? avgScore - myAvgScore : null,
  };
}
