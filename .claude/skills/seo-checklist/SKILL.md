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

## hub が自動で入れる（＝ツール作者は触らなくてよい）
共有テンプレ（`apps/hub` の `layout` / `app/tools/[slug]`）と `@factory/seo` が全ツールへ自動付与する。AEO（AI/回答エンジン）対策もここに含む：
- サイト全体：**WebSite + Organization**（JSON-LD）、**OGP**（og:title/description/url/site_name）、`lang=ja`、theme-color
- 各ツール：**WebApplication + FAQPage**（schema.json由来）＋ **BreadcrumbList**、canonical、関連ツール内部リンク
- サイト全体：`sitemap.xml` / `robots.txt` / **`llms.txt`**（すべて registry から自動。新ツール追加で自動反映、手作業不要）

## ツール作者がやること（これだけ）
1. `meta.json`：title/description/keywords（検索意図・誇張なし）
2. `content.mdx`：問題提起→計算式→手順→固有FAQ（**h2始まり**・薄い流用不可）
3. `schema.json`：**FAQPage（3問以上）** [+ HowTo]（WebApplication/Breadcrumb は自動なので最小でOK）
4. `apps/hub/lib/tools.tsx` の3マップに登録（`tool-scaffold` 参照）
