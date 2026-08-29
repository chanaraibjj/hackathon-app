# スライド用AI画像の生成プロンプト集

優先度: **①ペイン写真(Slide 1)> ②プロダクト体験(Slide 2)**。時間がなければ①だけでよい。
**16:20を過ぎたら画像はあきらめる**(スライドは画像なしで完成する設計。発表準備を優先)。

---

## ① ペイン写真(Slide 1・最優先)→ `slides/assets/pain.png`

ユーザーの痛みが一目で伝わる写真。**保存するだけで自動表示される**(解釈本文の右横。無ければ勝手に消えるので設定不要)。

`{{ }}` を当日の内容で埋めて画像生成AI(ChatGPT / Gemini など)に貼る:

```
次の場面のリアルな写真を生成してください。
場面: {{ペインの瞬間(例: 深夜、スマホの短い返信を見つめて不安そうな若手社員)}}
人物: 1人。表情に{{不安/焦り/孤独 など}}がにじんでいる。
構図: 寄り気味、被写体に焦点、背景は暗くボケている。
トーン: 映画のワンシーンのような青暗い照明(画面の光が顔を照らす等)。
禁止: 文字・ロゴ・ウォーターマークを入れない。
アスペクト比: 3:2
```

英語版(英語指定の方が安定するツール用):

```
A realistic cinematic photo. Scene: {{the pain moment}}.
One person, expression of {{anxiety/frustration/loneliness}}.
Close-up composition, subject in focus, dark blurred background.
Moody blue-dark lighting, as if lit by a screen glow.
No text, no logos, no watermark. Aspect ratio 3:2.
```

記入例(リハーサル「余白」の場合):

```
次の場面のリアルな写真を生成してください。
場面: 深夜のリビング、スマホに届いた「わかりました。」だけの返信を見つめて固まっている若手社員
人物: 1人。表情に不安がにじんでいる。
構図: 寄り気味、被写体に焦点、背景は暗くボケている。
トーン: 映画のワンシーンのような青暗い照明(スマホの光が顔を照らしている)。
禁止: 文字・ロゴ・ウォーターマークを入れない。
アスペクト比: 3:2
```

## ② プロダクト体験イメージ(Slide 2・任意)→ `slides/assets/product.png`

保存後、`slides.html` の Slide 2 内コメント `<!-- AI画像(任意): ... -->` を外す。

```
「{{プロダクト名}}」を使う人のイラストを描いてください。
場面: {{WOW MOMENTの情景}}
人物は1人、表情は{{驚き/安心/発見 など}}。
スタイル: flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9
```

---

## 共通ルール

- **画像内に文字を入れない**(AI画像の文字は崩れる。文字はスライド側で出す)
- ペイン写真は「写真調」、プロダクト画像は「イラスト調」— 役割で描き分けている(痛み=現実感、未来=世界観)
- 保存先はどちらも `slides/assets/`。ファイル名は上記の通り固定
