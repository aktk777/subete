---
name: tool-scaffold
description: >
  確定した仕様から tools/<slug>/ の一式（logic.ts / logic.test.ts / ui.tsx / meta.json / content.mdx / schema.json）を
  所定の構成で生成する手順。tool-builder が使う。決定論コア＋テスト必須。
---

# ユニット雛形の生成

1つのツール = `tools/<slug>/` の6ファイル。アナトミーの詳細は `references/unit-anatomy.md`。

## 生成物
- `logic.ts` … 純関数 `compute(input): Output`。副作用・外部依存・乱数なし。公式の式のみ。
- `logic.test.ts` … vitest。**境界値＋既知の正解ケース**を必ず含む。
- `ui.tsx` … 入力フォーム＋結果。`@factory/ui` を使い、結果/広告領域の寸法を予約して CLS を出さない。
- `meta.json` … title/description/keywords/category/rail/affiliate_targets/formula_sources。
- `content.mdx` … 問題提起→計算式→手順→（必要なら）免責（"計算/記録ツールであり助言ではない"）。
- `schema.json` … WebApplication + FAQPage（3問以上）[+ HowTo]。

## 手順
1. `tools/yutai-cross-cost/` を参照実装として倣う（同じファイル構成・命名）。
2. `logic.ts` を実装 → `logic.test.ts` を書く → `pnpm test` 緑。
3. `meta.json`/`content.mdx`/`schema.json` を埋める（公式出典を必ず入れる）。
4. `registry.json` に追記（status=building, quality_gate_passed=false）。
5. `apps/hub/lib/tools.tsx` の3つの対応表に slug を1行ずつ登録する：
   - `toolComponents`（`ui` の dynamic import）
   - `toolContent`（`content.mdx` の dynamic import）
   - `toolSchemas`（`schema.json` の import。FAQPage をページに JSON-LD 注入）
6. hub が当該ツールを描画できることを確認（`pnpm --filter hub build` で `out/tools/<slug>/` が生成される）。

注：`content.mdx` の本文は **h2 始まり**（ツール名の `<h1>` はページが描画）。

補助スクリプト：`scripts/scaffold.mjs <slug>` で空ファイル雛形を作れる（中身は手で埋める）。
