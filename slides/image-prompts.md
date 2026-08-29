# スライド用AI画像の生成プロンプト集(任意・時間が余ったときだけ)

使い方:
1. `{{ }}` を当日の内容で埋めて、画像生成AI(ChatGPT / Gemini など)に貼る
2. 生成画像を `slides/assets/theme.png` / `slides/assets/product.png` として保存
3. `slides.html` 内のコメント `<!-- AI画像(任意): ... -->` を外す(Slide 1とSlide 2に1箇所ずつ)

ルール:
- **スライドは画像なしで完成している。16:20を過ぎたら画像はあきらめる**(発表準備を優先)
- **画像内に文字を入れない**(AI画像の文字は崩れて安っぽくなる。文字はスライド側で出す)
- スタイル指定は変えない(スライドのデザインと色を合わせてある)

---

## 共通スタイル指定(全プロンプトの末尾に付いている)

> flat modern illustration, dark navy background (#0c1030), neon gradient accents
> (purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9

---

## Slide 1用: テーマの抽象イメージ(assets/theme.png)

テーマの解釈を1枚の抽象イメージにする。

```
「{{テーマ}}」というテーマを「{{解釈の一言(例: 書かれなかった言葉=行間)}}」と解釈した
コンセプトを表す抽象的なイラストを描いてください。
モチーフ: {{解釈を象徴する物・情景(例: チャット吹き出しの間に広がる空白)}}
スタイル: flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9
```

英語版(英語指定の方が安定するツール用):

```
An abstract conceptual illustration of "{{theme in English}}" interpreted as
"{{interpretation in English}}". Motif: {{symbolic object or scene}}.
Flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9.
```

## Slide 2用: プロダクトの体験イメージ(assets/product.png)

ユーザーがWOWを体験している瞬間を1枚にする。

```
「{{プロダクト名}}」を使う人のイラストを描いてください。
場面: {{WOW MOMENTの情景(例: スマホ画面に相手の内心が浮かび上がり、驚いている人)}}
人物は1人、表情は{{驚き/安心/発見 など}}。
スタイル: flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9
```

英語版:

```
An illustration of one person experiencing "{{product concept in English}}".
Scene: {{the WOW moment}}. Single person, expression of {{surprise/relief/discovery}}.
Flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9.
```

---

## 記入例(2026-08-28リハーサル「余白」→そっけなさプレビューの場合)

```
「余白」というテーマを「書かれなかった言葉=行間」と解釈したコンセプトを表す
抽象的なイラストを描いてください。
モチーフ: 短いチャット吹き出しの下に、受信者の不安が霧のように広がっていく空白
スタイル: flat modern illustration, dark navy background (#0c1030), neon gradient accents
(purple #7c5cff to cyan #2dd6c1), soft glow, minimal, no text, no letters, no logos, 16:9
```
