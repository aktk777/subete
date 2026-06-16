# デプロイ手順（Cloudflare Pages・静的）

前提（HUMAN-SETUP.md 済み）：GitHub リポジトリ、Cloudflare Pages 接続、（AdSense使うなら）独自ドメイン。

## CI（推奨）
- GitHub に push → Cloudflare Pages が自動ビルド（Build command: `pnpm install && pnpm --filter hub build`、Output dir: `apps/hub/out`）。
- PR ごとに Preview デプロイ（固有URL）。main へマージで本番。

## 手動（任意）
- `npx wrangler pages deploy apps/hub/out --project-name <project>`

## 公開後
- Search Console で URL 検査 → インデックス登録をリクエスト（API: Indexing/Sitemaps、なければ手動）。
- `sitemap.xml`（registry 起点で自動生成）が新 slug を含むか確認。

## 注意
- 本番デプロイ・独自ドメイン適用・課金変更は**人間承認**。破壊的コマンドはフックで遮断される。
