import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { MY_NAME } from "@/lib/judge";

const GUIDE = [
  {
    title: "「。」で終わる単文は、圧として届きます",
    detail:
      "「わかりました。」だけだと、ご立腹の可能性を30分考えてしまいます。一言添えていただけると、そのまま作業に戻れます。",
  },
  {
    title: "「!」がひとつあると、夜まで安心が続きます",
    detail: "温度は1文字で伝わります。絵文字でも大丈夫です。",
  },
  {
    title: "修正のご依頼は「どこを・なぜ」があると最短で直せます",
    detail:
      "「違います」だけだと、直す場所を探すところから始まります。場所と理由があれば、その日のうちにお返しできます。",
  },
  {
    title: "10文字以下の返信は、行間を最悪の想像で埋めてしまいます",
    detail: "お忙しいときは「後で詳しく返します!」だけでも十分うれしいです。",
  },
  {
    title: "感想がひとことあると、次のご提案の質が上がります",
    detail: "どこが良かった/惜しかったかがわかると、狙いを外さなくなります。",
  },
];

export default function GuidePage() {
  return (
    <main className="flex-1">
      <Container>
        <div className="flex flex-col gap-6">
          <Hero
            eyebrow="顔を知る — このアプリの宛先は、世界にたった1人"
            title={`${MY_NAME}の取扱説明書`}
            description="このアプリの宛先である「わたし」が、返信をどう受け取るかの説明書です。ここを知っていただくと、やりとりがずっとなめらかになります。"
          />

          <div className="flex flex-col gap-4">
            {GUIDE.map((g, i) => (
              <Card key={g.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">{i + 1}</Badge>
                  <p className="text-sm font-semibold">{g.title}</p>
                </div>
                <p className="text-sm text-muted">{g.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
