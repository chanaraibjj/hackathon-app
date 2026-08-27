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

最優先はCORE EXPERIENCE。
説明より実装を優先。
UIの細部は後。
Input → Process → Result を最初に通す。

AIは必要な場合のみ。
External APIも必要な場合のみ。
DBも必要な場合のみ。
どれも不要なら最小構成(UI → LOCAL LOGIC → RESULT)とし、Dummy/Mockも作らない。

AIが必要ならReal AIより先にDummy AIで
Input → Process → Result を完成。
(templates/ai/ のパターン。RealとDummyは同じResultTypeを返す。UIはai.tsだけを呼ぶ)
Real AI/Real APIへの差し替えは改善タイム(15:15–15:35)のみ。壊れたらDummy/Mockへ戻す。

External APIが必要なら、必要に応じてMockで体験を先に完成
(Realと同じ戻り値型。templates/external-api/ 参照)。

CORE EXPERIENCEに不要な機能を追加しない。
3分発表のDemoに登場しない機能は作らない。

不要dependency禁止。
過剰抽象化禁止。
大規模リファクタ禁止。

何かを削る判断をしたら、THEME_DECISION_SHEET.md の CUT LOG に
「時刻 / 削ったもの / 理由」を1行追記すること。
既存UI部品(src/components/)を流用してから新規作成を検討すること。
API Routeが必要なら templates/api/route.ts を参考に src/app/api/.../route.ts を作る。

スケジュール:
- 14:50までにCORE EXPERIENCEの1本道がローカルで動くこと(MVP締切)
- 15:10までに ./deploy.sh が通るデプロイ可能な状態にすること(ONLINE締切)
間に合わなそうなら、機能を削る提案を即座にすること。

以下がMVP仕様です:

{{01-Dの出力(MVP確定内容+タスクリスト)を貼る}}
```

## 14:50 MVP CHECK(実装後すぐ確認)

通常操作 / 空入力 / 再実行 / Result表示 / Error表示 / CORE EXPERIENCE成立 / WOWまで到達可能
— NOがあれば**機能を削って**解決する(新しいものを追加して解決しない)。

## 14:50–15:00 UX改善の観点

First View / Title / Description / Input / CTA / Loading / Result / Error / **Sample Input**。
「おしゃれ」より「**見た瞬間に使い方が分かる**」を優先。
