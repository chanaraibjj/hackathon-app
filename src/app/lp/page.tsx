import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { MY_NAME } from "@/lib/judge";

export const metadata: Metadata = {
  title: "その返信、損しているかも | そっけなさプレビュー",
  description:
    "そっけない返信は、相手の対応を静かに悪くし、仕事の質やスピード、もしかしたら売り上げにも響いているかもしれません。送信前30秒のチェックで、同じ内容のまま伝わる返信に。",
};

// LinkをButtonと同じ見た目にする(Buttonはbutton要素専用のため)
const btnBase =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition";
const btnPrimary = `${btnBase} bg-accent text-accent-foreground hover:opacity-90`;
const btnSecondary = `${btnBase} border border-border bg-transparent hover:bg-card`;

const LOSSES = [
  {
    title: "相手の対応が、少しずつ悪くなる",
    detail:
      "冷たく見える返信を受け取った相手は、萎縮して質問を控えます。確認不足のまま作業が進み、手戻りが増える。あなたは何も変えていないのに、返ってくる仕事の質が下がっていきます。",
  },
  {
    title: "あなたの案件が、後回しになる",
    detail:
      "相手はあなたへの返信を30分推敲し、あなた宛ての連絡を後回しにしがちになります。反応が遅くなっているのは、相手の怠慢ではなく、あなたの一文が原因かもしれません。",
  },
  {
    title: "悪い知らせが、届かなくなる",
    detail:
      "「言いにくいことを言うと空気が凍る」と思われた瞬間、リスクの早期報告は止まります。問題を最初に知る権利を、あなたは一通の短文で手放しているかもしれません。",
  },
  {
    title: "提案が、守りに入る",
    detail:
      "反応が読めない相手に、人は挑戦的な提案をしません。無難な案だけが並ぶようになったら、それはあなたの返信が挑戦のコストを上げているサインです。",
  },
  {
    title: "売り上げに、響いているかもしれない",
    detail:
      "仕事の質が下がり、スピードが落ち、情報が届かず、提案が痩せる——その先にあるのは成果の目減りです。いい取引先やいい人材は、何も言わずに静かに離れていきます。",
  },
];

const RULES = [
  {
    label: "句点で終わる単文",
    detail: "「わかりました。」の「。」は、読み手に打ち切られた印象を残します",
  },
  {
    label: "感情の手がかりゼロ",
    detail: "感情語・!・絵文字が1つもないと、相手は温度を読み取れません",
  },
  {
    label: "短すぎる返信",
    detail: "10文字以下の返信は、行間の空白がそのまま相手に渡ります",
  },
  {
    label: "否定・命令の言葉",
    detail: "「違います」「至急」は、短文だと数倍強く響きます",
  },
];

const FEATURES = [
  {
    href: "/",
    title: "送信前チェック",
    detail: "返信を貼ると、相手の画面と内心をプレビュー。改善案つき",
  },
  {
    href: "/analyze",
    title: "やり取り分析",
    detail: "過去のやり取りを貼ると、あなたの癖と温度差をレポート",
  },
  {
    href: "/library",
    title: "言いかえライブラリ",
    detail: "定番フレーズの温めた言いかえを、コピーしてすぐ使える",
  },
  {
    href: "/guide",
    title: "わたしの取説",
    detail: "受け取る側の感じ方プロフィール。相手の顔を知る5項目",
  },
];

const FAQS = [
  {
    q: "入力した文章はどこかに送信されますか?",
    a: "いいえ。判定はすべてブラウザ内で完結し、どこにも送信・保存されません。",
  },
  {
    q: "登録や料金は必要ですか?",
    a: "不要です。開いて、貼って、30秒。それだけです。",
  },
  {
    q: "長い文章を書けと言われますか?",
    a: "いいえ。内容はそのまま、一言足すだけの改善案を提示します。かかるのは5秒です。",
  },
];

export default function LandingPage() {
  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-12 py-4">
          {/* First View */}
          <section className="flex flex-col gap-4">
            <div>
              <Badge>送信前30秒のコミュニケーション改善サポート</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-snug sm:text-4xl">
              その「わかりました。」で、
              <br />
              あなたが損しているかもしれません。
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              あなたは忙しいだけ。悪気なんて1ミリもない。それでも、そっけなく見える返信は、
              相手の対応を静かに悪くし、仕事の質とスピードを下げ、
              もしかしたら売り上げにも響いているかもしれません。
              送信前に30秒だけ、相手の画面でどう見えるかをたしかめませんか。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className={btnPrimary}>
                30秒でチェックしてみる
              </Link>
              <a href="#losses" className={btnSecondary}>
                何を損しているのか見る
              </a>
            </div>
            <p className="text-xs text-muted">
              登録不要・無料・入力はどこにも送信されません
            </p>
          </section>

          {/* 相手の画面ではこう見えている */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              あなたの返信は、相手の画面でこう見えています
            </h2>
            <div className="grid items-start gap-6 md:grid-cols-2">
              <div className="mx-auto w-full max-w-xs">
                <div className="overflow-hidden rounded-[2rem] border border-border bg-background shadow-lg">
                  <div className="border-b border-border bg-card px-4 py-3 text-center">
                    <p className="text-xs text-muted">{MY_NAME}のスマホ</p>
                    <p className="text-sm font-semibold">あなたとのトーク</p>
                  </div>
                  <div className="flex min-h-56 flex-col gap-2 px-4 py-5">
                    <div className="flex flex-col items-end gap-1">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-accent-foreground">
                        わかりました。
                      </div>
                      <span className="text-[10px] text-muted">既読</span>
                    </div>
                    <div className="mt-6 self-start">
                      <div className="max-w-[95%] rounded-2xl border border-dashed border-border bg-card px-4 py-3 text-sm italic text-muted">
                        (この「。」……圧を感じる。ご立腹なのかも。返信を30分は推敲することになりそう……)
                      </div>
                      <p className="mt-1 pl-2 text-[10px] text-muted">
                        {MY_NAME}の内心
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm leading-relaxed">
                <p>
                  あなたにとっては「了解した」というだけの7文字。
                  でも受け取った側は、書かれなかった行間を想像で埋めます。
                  しかも、悪い方の想像で。
                </p>
                <p>
                  怒っているのかも。提案が外れたのかも。予算か、品質か、スピードか——
                  相手はその夜、全部の可能性を考え続けます。
                </p>
                <p className="font-semibold">
                  そして翌日から、あなたへの対応が変わりはじめます。
                  あなたの知らないところで。
                </p>
              </div>
            </div>
          </section>

          {/* 損セクション */}
          <section id="losses" className="flex flex-col gap-4 scroll-mt-4">
            <h2 className="text-xl font-bold">
              そっけない返信が、あなたから静かに奪っている5つのもの
            </h2>
            <div className="flex flex-col gap-3">
              {LOSSES.map((loss, i) => (
                <Card key={loss.title} className="flex gap-4">
                  <span className="text-2xl font-bold text-danger">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{loss.title}</h3>
                    <p className="text-sm text-muted">{loss.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted">
              怖いのは、どれも「相手が黙って調整する」形で起きること。
              クレームは来ません。数字が落ちるまで、誰も教えてくれません。
            </p>
          </section>

          {/* 原因はたった4つ */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              原因は、たった4つのパターンに集約されます
            </h2>
            <p className="text-sm text-muted">
              冷たく見える返信の正体は、性格ではなく癖です。このアプリは次の4ルールで判定し、
              根拠を明示します。癖なら、直せます。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {RULES.map((rule) => (
                <Card key={rule.label} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-danger">
                    {rule.label}
                  </h3>
                  <p className="text-xs text-muted">{rule.detail}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Before / After */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              直すのに必要なのは、長文ではなく一言です
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="danger">Before</Badge>
                  <span className="text-xs text-muted">冷たさスコア 80</span>
                </div>
                <p className="rounded-md bg-background px-3 py-2 text-sm">
                  わかりました。
                </p>
                <p className="text-xs text-muted">
                  相手が行間を埋める時間: その夜ずっと
                </p>
              </Card>
              <Card className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="success">After</Badge>
                  <span className="text-xs text-muted">
                    冷たさスコア <span className="font-semibold">0</span>
                  </span>
                </div>
                <p className="rounded-md bg-background px-3 py-2 text-sm">
                  わかりました、ご提案ありがとうございます!前向きに進めたいと思います。引き続きよろしくお願いします!
                </p>
                <p className="text-xs text-muted">あなたが足した時間: 5秒</p>
              </Card>
            </div>
            <p className="text-sm text-muted">
              内容は1文字も変わっていません。変わったのは、相手の夜と、明日のあなたへの対応です。
            </p>
          </section>

          {/* 機能一覧 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">できること</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <Link key={f.href} href={f.href} className="group">
                  <Card className="flex h-full flex-col gap-1 transition group-hover:border-accent">
                    <h3 className="text-sm font-semibold group-hover:text-accent">
                      {f.title} →
                    </h3>
                    <p className="text-xs text-muted">{f.detail}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">よくある質問</h2>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq) => (
                <Card key={faq.q} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">Q. {faq.q}</h3>
                  <p className="text-sm text-muted">A. {faq.a}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-10 text-center">
            <h2 className="text-2xl font-bold">
              次の返信から、変えられます。
            </h2>
            <p className="max-w-md text-sm text-muted">
              あなたの返信を批判する言葉は、このアプリに一言も入っていません。
              あるのは、相手の画面と内心、そして同じ内容のまま伝わる代替案だけ。
              送信ボタンの手前で、30秒だけ立ち止まってみてください。
            </p>
            <Link href="/" className={btnPrimary}>
              いま書いた返信をチェックする
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
}
