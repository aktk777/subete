---
name: seo-checklist
description: >
  1ページのオンページSEOを仕上げるチェックリストと schema スニペット。title/meta/見出し/イントロ/手順/FAQ/
  構造化データ/内部リンク/canonical/sitemap。seo-optimizer が使う。誘導ページ化はしない。
---

# オンページSEO チェックリスト

詳細は `references/onpage-checklist.md`、schema 例は `references/schema-snippets.md`。

必須：
- title（主キーワード前寄せ・誇張なし）/ meta description（要約・行動喚起）
- H1=ツール名、H2/H3=問題提起/計算式/使い方/FAQ
- 本文は**固有の実質的価値**（薄い流用・語句差し替え量産は不可）
- 構造化データ：WebApplication + FAQPage（+ 手順があれば HowTo）
- 同カテゴリへの内部リンク（回遊性）
- canonical 設定、`sitemap.ts`（registry 起点）に slug が含まれる
- モバイル/Core Web Vitals 配慮（画像最小化、寸法予約で CLS 回避）
