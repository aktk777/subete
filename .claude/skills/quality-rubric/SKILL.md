---
name: quality-rubric
description: >
  公開してよいか判定する品質ルーブリック。Googleのスケール化コンテンツ不正利用/誘導ページの自己診断、E-E-A-T、
  必須ページ、低価値判定、類似度しきい値。quality-gate がリリース前チェックに使う。
---

# 公開前 品質ルーブリック（1つでも fail なら公開不可）

詳細：`references/spam-self-audit.md`（スパム自己診断）/`references/eeat.md`（E-E-A-T）。

1. 機能性：当該テスト緑。計算が公式出典と整合し、境界値で破綻しない。
2. 独自性：content/FAQ が既存と過度に類似しない（語句差し替え量産でない）。
3. 出典：meta.json に公式の計算式出典がある。
4. 必須ページ：About/Contact/Privacy/Terms が存在。
5. 性能：Core Web Vitals 基準内・モバイル対応。
6. 規制：jp-compliance を pass。
7. 表記：アフィリ/広告に PR表記。優良誤認なし。

出力は PASS / FAIL（FAIL は項目別の理由＋修正指示）。
