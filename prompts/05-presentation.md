# 05: Presentation(16:10 スライド解禁後)

進行: 16:10–16:20 構成 / 16:20–16:30 スライド完成 / 16:30–16:35 3分台本 / 16:35–16:40 最低2回通し練習。
ゼロから考えない。**THEME_DECISION_SHEETを編集して3枚に配置するだけ。**

```
発表資料を作ってください。素材は以下:

THEME_DECISION_SHEET.md:
{{ファイルの中身をすべて貼る(解釈〜MVP〜Demo固定〜CUT LOG)}}

Public URL: {{URL}}
GitHub URL: {{URL}}
Screenshots: {{First View / Result}}
Architecture / Technology: {{構成と使用技術}}

スライドは次の3枚で固定:

Slide 1「テーマ解釈 / 課題」
掲載: 当日テーマ / 自分たちの解釈 / なぜその解釈を選んだか / 捨てた選択 / 解決したい課題
ストーリー: THEME → INTERPRETATION → WHY THIS? → OTHER OPTIONS → 1 USER → 1 PROBLEM
(「そういう捉え方をしたのか」を作る)

Slide 2「アイデア / 価値」
掲載: 何を作ったか / コンセプト / CORE EXPERIENCE / ユーザー価値 / 他との違い / なぜ成立するか / WOW
ストーリー: PRODUCT → CORE EXPERIENCE → VALUE → DIFFERENCE → WHY IT WORKS → WOW

Slide 3「体験 / デモ」
掲載: USER STORY / 実際の使い方 / Demo Flow / WOW / 現在の完成度 / あえて削ったもの / 削った理由
ストーリー: USER STORY → ACTION → PROCESS → RESULT → WOW + CURRENT STATUS / CUT / WHY CUT
(このスライドからそのままライブデモへ入る)

生成するもの:
- 3枚それぞれの文章(文字は少なく、1枚あたり主張1つ。口頭補足前提)
- 3分発表台本(話し言葉・1文短く)。時間割:
  0:00–0:20 テーマ
  0:20–0:45 解釈 / WHY / PROBLEM
  0:45–1:05 Product / Value
  1:05–1:55 Live Demo(固定したDemo Aの操作と話す内容を併記)
  1:55–2:25 CORE EXPERIENCE / WOW
  2:25–2:45 完成度 / CUT / 技術
  2:45–3:00 締め(込めた思いを一言 → Public URLとGitHubを口頭で明示)
  読み上げで2:40〜2:50に収まる分量にすること。
- 最大2分の技術説明(構成と「必要な技術だけ選んだ理由」)。
  AI非搭載の場合:「AIは企画・実装・デバッグ・レビューなど開発プロセスで活用した。
  サービス自体はCORE EXPERIENCEにAIが不要と判断し、無理に組み込まなかった」の趣旨で。
  Dummyのままの場合:「現在AI部分はDummy実装。CORE EXPERIENCEを最後まで完成させることを
  優先した。Real AIへ差し替えられる構成」の趣旨で、正確に説明する。
- 想定質問と回答案(3つ)

3分に収まることを最優先としてください。
```
