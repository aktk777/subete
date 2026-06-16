---
name: monetization
description: >
  広告枠/アフィリ枠の配置とPR表記の手順。最初は枠だけ予約→アフィリ先行→審査後にAdSense注入、という段階投入。
  CLS を出さない配置、ステマ規制のPR表記必須、レール別の現金化先。tool-builder/seo-optimizer が使う。
---

# マネタイズ（段階投入・CLSを出さない・PR表記必須）

詳細は references/ を参照：`ad-slots.md`（枠配置）/`jp-asp-list.md`（ASP）/`disclosure.md`（PR表記）。

## 段階（spec §4.A.5）
1. **Day 1**：レイアウトに広告枠・アフィリ枠を**予約**（`@factory/ui` の `AdSlot`/`AffiliateLink`）。実広告コードはまだ無し（`NEXT_PUBLIC_ADSENSE_CLIENT` 未設定なら placeholder を描画）。
2. **早期**：アフィリリンクを設置（ASPは審査が軽め）。
3. **審査後**：人間から発行者ID `ca-pub-…` を受領 → env に設定すると `AdSlot` が実広告を注入。

## 必須ルール
- **PR表記**（ステマ規制 2023〜）：アフィリ/広告を含むページに「広告」「PR」を明示（`Disclosure` 部品）。
- 優良誤認・有利誤認の表現をしない（景表法）。
- 広告は本文の可読性を壊さない位置・数に抑える（AdSense ポリシー / 体験重視）。CLS を出さない（寸法予約）。
- 人工的なクリック誘導・自演トラフィックをしない。
