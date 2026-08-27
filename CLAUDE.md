# ハッカソン開発規約(120分・Hanamii ZIP Deploy前提)

このリポジトリは「札幌すごいAIハッカソン 2026夏」用のStarter。当日はCORE EXPERIENCEを最初から最後まで動かすことが最優先。

## 構成ルール
- Next.js App Router / TypeScript / Tailwind CSS
- ソースコードは `src/` 配下。root直下に `app/` を作らない
- importは原則 `@/`(= `src/`)を使う
- UI部品は `src/components/` の既存部品(Button/Card/Input/Textarea/Select/Badge/Alert/Loading/Container)を流用してから新規作成を検討

## 追加ルール
- AI / External API / DB は「必須」と判断した場合のみ追加する
- AIが必要なら、Real API接続より先に Dummy AI で完成させる(`templates/ai/` のパターン。RealとDummyは同じResultType)
- External APIがデモの必須要素なら Mock を用意(`templates/external-api/` のパターン。同じ戻り値型)
- API Route は `templates/api/route.ts` を参考に `src/app/api/.../route.ts` を作る
- 環境変数はサーバー側のみ。秘密情報に `NEXT_PUBLIC_` を付けない

## 作らないもの(CORE EXPERIENCEに必須でない限り)
Login / Sign Up / 認証 / 管理画面 / 課金 / 複雑なDB / 権限管理 / 大量ページ / Redux等 / Docker / 完璧なSEO / 完璧なテスト / 過剰なアニメーション / 将来用の抽象化 / 不要なdependency / 過剰な抽象化 / 大規模リファクタ

## デプロイ
- `./deploy.sh` = ローカルで `npm run build` 検証 → `app.zip` 生成
- app.zip を Hanamii の「再デプロイ」へ。環境変数は保存後「AppRunに設定を反映」を押す
- デプロイエラーは Hanamii の「全エラーをAI用にコピー」を貼ってもらって修正する

## 当日の締切(意識して提案すること)
14:25 IDEA FREEZE / 14:50 MVP(ローカルで1本道が動く) / 15:10 ONLINE(公開URL) / 15:35 STOP FEATURES / 16:00 CODE FREEZE
間に合わない場合は機能を削る提案を即座にする。
