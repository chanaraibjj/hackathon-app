# ハッカソン開発規約(120分・Hanamii ZIP Deploy前提)

このリポジトリは「札幌すごいAIハッカソン 2026夏」用のStarter。
**AIは生成する。人間は選択する。** 最終決定は常にユーザーが行う。

## 合言葉
**解釈は広く。決定は速く。MVPは小さく。デモから逆算する。完成して公開する。**
企画は「このテーマから何を作れる?」ではなく「**このテーマは現実世界のどんな現象として現れている?**」から始める。
70〜80点の方向を素早く選び、完成度を100点に近づける。

## 4原則(すべての判断をここに戻す)
**1 USER**(誰のため?)/ **1 PROBLEM**(何に困っている?)/ **1 CORE EXPERIENCE**(どんな体験?)/ **1 WOW MOMENT**(どこで「おお!」?)
技術は必ずこの後に選ぶ: `1 USER → 1 PROBLEM → 1 CORE EXPERIENCE → 1 WOW MOMENT → 必要な技術`。
迷ったら: THEME → 解釈 → 現実の現象 → 誰の・どんな瞬間の・何の問題 → 4原則 → 30〜50秒でDemoできる? → Slide1/2/3で伝わる? → 必要な技術だけ → 最小実装 → 公開。

## 構成ルール
- Next.js App Router / TypeScript / Tailwind CSS
- ソースコードは `src/` 配下。root直下に `app/` を作らない
- importは原則 `@/`(= `src/`)
- UI部品は `src/components/`(Header/Hero/Container/Button/Card/Input/Textarea/Select/Badge/Alert/Loading/EmptyState)を流用してから新規作成を検討

## 技術追加ルール
- AI / External API / DB は**「必須」判定の場合のみ**(「あると良い」は外す)
- どれも不要なら最小構成 `UI → LOCAL LOGIC → RESULT`。Dummy/Mock/Demo Modeも作らない
- AIが必須なら **Real AIより先にDummy AIで Input→Process→Result を完成**(`templates/ai/`。同一ResultType、UIは`ai.ts`だけを呼ぶ)。Real差し替えは改善タイム(15:15–15:35)のみ、壊れたら即Dummy/Mockへ戻す
- External APIのMockは「障害でデモが止まりうる場合」だけ(`templates/external-api/`、同一戻り値型)
- API Routeは `templates/api/route.ts` を参考に `src/app/api/.../route.ts`
- 環境変数はサーバー側のみ。秘密情報に `NEXT_PUBLIC_` を付けない

## 作らないもの(CORE EXPERIENCEに必須でない限り)
Login / Sign Up / Authentication / Admin / Profile / Settings / History / 課金 / 複雑なDB / 権限 / Redux / Docker / 大量ページ / 完璧なSEO / 完璧なテスト / 過剰なアニメーション / 将来用抽象化 / 不要dependency / 過剰抽象化 / 大規模リファクタ
**3分発表のDemoに登場しない機能は作らない。**

## 記録義務(THEME_DECISION_SHEET.md)
- 企画確定時(14:20–14:25)にシートをTECH CHECKまで埋める
- 何かを削ったら CUT LOG に「時刻 / 削ったもの / 理由」を1行追記
- 15:45–15:50にDemo A/Bを固定して記入
- 発表準備はこのシートを`prompts/05`に渡して「編集するだけ」

## 発表スライド
- `slides/slides.html` = みらいスタジオ・スライドキット規約準拠の4枚固定テンプレ(基本発表3枚+任意の技術解説1枚、1280×720、ロゴ埋め込み済み)
- 16:10以降に `__XXX__` プレースホルダを置換するだけ。**構造・CSS・ロゴは変えない**
- 見出しは主張文。「〜ではなく〜」対比は全スライドで最大1回。形容詞で盛らない。CURRENT STATUSは正直に。社名は「みらいスタジオ」

## デプロイ
- `./deploy.sh` = ローカル `npm run build` 検証 → `app.zip` 生成 → Hanamii「再デプロイ」へ
- 環境変数は保存後「**AppRunに設定を反映**」を押す(保存だけでは反映されない)
- デプロイエラーは「全エラーをAI用にコピー」の出力をもらって修正(prompts/03)
- 診断: `/api/health`(Route Handler・環境変数)/ `?external=1`(外部疎通)/ `?ai=1`(Gemini疎通)

## 当日の締切(常に意識して提案する)
14:25 IDEA FREEZE / 14:50 MVP(Input→Process→Resultがローカルで動く) / 15:10 ONLINE(公開URL) /
15:35 STOP FEATURES / 16:00 CODE FREEZE(以降は致命傷のみ) / 16:00–16:10 Demo Test 3回+スクショ保存。
間に合わない場合は機能を削る提案を即座にする(追加で解決しない)。
