# 02: Developer(14:25〜 実装開始時)

```
これは120分ハッカソンです。

Next.js App Router
TypeScript
Tailwind CSS

ソースコードはsrc/配下。
root直下にapp/を作らない。
importは@/を優先。

Hanamii ZIP Deploy前提。

最優先:
CORE EXPERIENCEを最初から最後まで動かす。

AIは必要な場合のみ。
External APIは必要な場合のみ。
DBは必要な場合のみ。

AIが必要ならReal API接続より先に
Dummy AIでCORE EXPERIENCEを完成させる。
(templates/ai/ の ai.ts / ai-real.ts / ai-dummy.ts のパターンを使い、RealとDummyは同じResultTypeを返すこと)

External APIがデモの必須要素なら、
必要に応じてMockを用意する(Realと同じ戻り値型。templates/external-api/ 参照)。

認証・管理画面など、
CORE EXPERIENCEに不要な機能は作らない。

不要なdependencyを追加しない。
過剰な抽象化をしない。
大規模リファクタをしない。

API Routeが必要なら templates/api/route.ts を参考に src/app/api/.../route.ts を作る。

スケジュール:
- 14:50までにCORE EXPERIENCEの1本道がローカルで動くこと(MVP締切)
- 15:10までに ./deploy.sh が通るデプロイ可能な状態にすること(ONLINE締切)
間に合わなそうなら、機能を削る提案を即座にすること。

以下がMVP仕様です:

{{01-Bの出力(構成+タスクリスト)を貼る}}
```
