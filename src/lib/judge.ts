// そっけなさプレビュー(わたし宛て専用版): ローカル判定ロジック(AI不使用)
// 受信者は世界で1人だけ=作り手のわたし。クライアントが送信前に返信を貼ると、
// わたしのスマホ画面と内心が再現される。冷たさルール4本 → スコア → 内心辞書 → 温めた代替案

export const MY_NAME = "わたし"; // 発表前に本名へ変えるならここだけ

export type ColdLevel = 0 | 1 | 2; // 0=あたたかい 1=ひんやり 2=凍える

export type JudgeReason = {
  label: string;
  detail: string;
};

export type JudgeResult = {
  level: ColdLevel;
  score: number; // 0-100 冷たさ
  levelLabel: string;
  reasons: JudgeReason[];
  innerVoice: string;
  rewrite: string; // level 0 のときは空文字(温める必要なし)
};

const WARM_WORDS = [
  "ありがとう",
  "ありがとうございます",
  "感謝",
  "助かり",
  "助かる",
  "嬉しい",
  "うれしい",
  "楽しみ",
  "お疲れ",
  "おつかれ",
  "すみません",
  "ごめん",
  "よろしく",
  "安心",
  "素晴らしい",
  "すばらしい",
  "さすが",
  "いいね",
  "OK",
  "オッケー",
];

const HARSH_WORDS = [
  "ダメ",
  "だめ",
  "駄目",
  "やり直し",
  "違う",
  "違います",
  "なぜ",
  "なんで",
  "どうして",
  "早く",
  "すぐに",
  "至急",
  "直して",
  "してください",
];

const EMOJI_RE = /\p{Extended_Pictographic}/u;
const EXCLAIM_RE = /[!!??〜~♪]/;
const KAOMOJI_RE = /[()^;・´`ω∀][^ぁ-んァ-ン一-龥]*[))]/;

function countSentences(text: string): number {
  const parts = text
    .split(/[。!!??\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return Math.max(parts.length, 1);
}

// 冷たさルール4本。検出したものだけ reasons に積む
export function judge(rawText: string): JudgeResult {
  const text = rawText.trim();
  const reasons: JudgeReason[] = [];
  let score = 0;

  const sentences = countSentences(text);
  const hasWarmWord = WARM_WORDS.some((w) =>
    text.toLowerCase().includes(w.toLowerCase())
  );
  const hasEmotionMark =
    EMOJI_RE.test(text) || EXCLAIM_RE.test(text) || KAOMOJI_RE.test(text);

  // ルール1: 句点で終わる単文(「わかりました。」型)
  if (sentences === 1 && text.endsWith("。")) {
    score += 30;
    reasons.push({
      label: "句点で終わる単文",
      detail: "一文+「。」は、読み手に「打ち切られた」印象を残します",
    });
  }

  // ルール2: 感情の手がかりゼロ(感情語・感嘆符・絵文字なし)
  if (!hasWarmWord && !hasEmotionMark) {
    score += 25;
    reasons.push({
      label: "感情の手がかりゼロ",
      detail: "感情語・!・絵文字が1つもなく、温度を読み取れません",
    });
  }

  // ルール3: 文字数が少なすぎる
  if (text.length > 0 && text.length <= 10) {
    score += 25;
    reasons.push({
      label: `短すぎる返信(${text.length}文字)`,
      detail: "10文字以下の返信は、行間の空白がそのまま相手に渡ります",
    });
  }

  // ルール4: 否定・命令の言葉
  const harsh = HARSH_WORDS.filter((w) => text.includes(w));
  if (harsh.length > 0) {
    score += 20;
    reasons.push({
      label: `強い言葉(${harsh.slice(0, 3).join(" / ")})`,
      detail: "否定・命令の言葉は、短文だと数倍強く響きます",
    });
  }

  score = Math.min(score, 100);
  const endsWithPeriod = reasons.some((r) => r.label === "句点で終わる単文");
  const hasHarsh = harsh.length > 0;

  let level: ColdLevel = score >= 60 ? 2 : score >= 30 ? 1 : 0;
  // 強い言葉があるのに「あたたかい」は誤判定なので、最低でも「ひんやり」に底上げ
  if (hasHarsh && level === 0) level = 1;

  return {
    level,
    score,
    levelLabel: LEVEL_LABEL[level],
    reasons,
    innerVoice: pickVoice(level, text, endsWithPeriod, hasHarsh),
    rewrite: level === 0 ? "" : hasHarsh ? HARSH_REWRITE : buildRewrite(text),
  };
}

const LEVEL_LABEL: Record<ColdLevel, string> = {
  0: "あたたかい",
  1: "ひんやり",
  2: "凍える",
};

// 決定的ハッシュ: 同じ入力なら常に同じ内心(デモ安定)、違う入力なら文面が散る
function hashText(text: string): number {
  let h = 0;
  for (const c of text) {
    h = (h * 31 + (c.codePointAt(0) ?? 0)) >>> 0;
  }
  return h;
}

// 内心の選択: 強い言葉 > 句点単文(凍える時) > レベル別バリエーション
function pickVoice(
  level: ColdLevel,
  text: string,
  endsWithPeriod: boolean,
  hasHarsh: boolean
): string {
  if (hasHarsh && level > 0) return VOICE.harsh;
  const pool =
    level === 2 && endsWithPeriod
      ? VOICE.period
      : level === 2
        ? VOICE.freeze
        : level === 1
          ? VOICE.cool
          : VOICE.warm;
  return pool[hashText(text) % pool.length];
}

// わたしの内心辞書: クライアントからの返信を受け取る受託側の実感で書く
type VoiceSet = {
  warm: string[];
  cool: string[];
  freeze: string[];
  period: string[]; // 「。」で終わる単文への専用内心
  harsh: string; // 否定・命令語への専用内心
};

const VOICE: VoiceSet = {
  warm: [
    "(あたたかいご返信……!この案件、ますます頑張ろう)",
    "(よかった、ちゃんと伝わってる。今夜はぐっすり眠れる)",
  ],
  cool: [
    "(ん、そっけない……?お忙しいだけかな。でも少し引っかかる……)",
    "(短いな……。提案、響かなかったかな。次の定例までこのモヤモヤが続くのか……)",
  ],
  freeze: [
    "(……ご不満なのかな。どこか外したかも。今夜、提案書をもう一度見直そう……)",
    "(冷たい……。予算?品質?スピード?全部の可能性を今夜考え続けるやつだ……)",
  ],
  period: [
    "(この「。」……圧を感じる。ご立腹なのかも。返信を30分は推敲することになりそう……)",
    "(句点で終わってる……。続きを聞けない。この行間、今夜ずっとわたしが埋めるのか……)",
  ],
  harsh:
    "(どこが違ったのか書いてない……。直す場所を探すところから徹夜だ……)",
};

// 強い言葉(否定・命令)入りは、元の文に足すのではなく用件ごと言い換える
const HARSH_REWRITE =
  "ご対応ありがとうございます。いただいた内容と当初のイメージに少し差分があったので、具体的に共有させてください。お手数ですが修正をお願いできますか。急ぎめだと助かります!";

// 温めた代替案: 元の文を活かして、行間をわたしに押しつけない一言を足す
function buildRewrite(text: string): string {
  const base = text.replace(/[。.!!\s]+$/, "");
  return `${base}、ご提案ありがとうございます!前向きに進めたいと思います。引き続きよろしくお願いします!`;
}
