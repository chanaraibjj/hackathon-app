# Product Name

<!-- 当日: prompts/05 の素材が揃ったらAIにこのREADMEを書かせる -->

## Overview

## 1 USER
誰のため?

## 1 PROBLEM
何に困っている?

## 1 CORE EXPERIENCE
どんな体験を届ける?

## 1 WOW MOMENT
どこで「おお!」となる?

## Architecture

```
User → Next.js (Hanamii) → API Route → (必要なものだけ)
```

## Technologies

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Hanamii (ZIP Deploy)

## External APIs
使用した場合のみ記載

## AI
使用した場合のみ記載

## Setup

```bash
npm install
npm run dev
```

APIキー不要で動きます。AI / External API を使う場合のみ `.env.example` を参考に `.env.local` を作成してください。

## Deploy

```bash
./deploy.sh   # ローカルでbuild検証 → app.zip 生成
```

生成された `app.zip` を Hanamii の「再デプロイ」にアップロードします。
環境変数を追加した場合は、環境変数タブで保存後に「AppRunに設定を反映」を押すこと(保存だけでは反映されない)。

## Public URL

(デプロイ後にここへ記載)

---

## Starter付属物(当日用)

- `prompts/` … 当日AIに貼るプロンプト5本(01 PM / 02 Dev / 03 BugFix / 04 Reviewer / 05 Presentation)
- `templates/` … 必要になったらAIに渡すサンプル(API Route / External API / Mock / AI Real+Dummy)
- AI後付け手順: `templates/ai/` を `src/lib/` にコピー → UIから `generateResult()` を呼ぶ →
  Dummyでデモ完成 → 余裕があれば `AI_API_KEY` 設定+`USE_REAL_AI = true`
