# デプロイ手順（Cloudflare Pages・静的）

前提（HUMAN-SETUP.md 済み）：GitHub リポジトリ、Cloudflare Pages 接続、（AdSense使うなら）独自ドメイン。

## CI（推奨）
- GitHub に push → Cloudflare Pages が自動ビルド（Build command: `pnpm install && pnpm --filter hub build`、Output dir: `apps/hub/out`）。
- PR ごとに Preview デプロイ（固有URL）。main へマージで本番。

## 手動（任意）
- `npx wrangler pages deploy apps/hub/out --project-name <project>`

## 公開後
- **Search Console にサイトマップ送信**：プロパティ登録・所有権確認・送信は**人間の操作**（手順は `SETUP-ANALYTICS.md` のB）。GSC API 資格情報を Secrets に入れれば将来は自動送信に切替可。
- `sitemap.xml`（registry 起点で自動生成）が新 slug を含むか確認（`status: live` のものだけ載る）。
- GA4 リアルタイムで計測確認。アフィリ承認リンクがあれば該当ツールに設置（`monetization`）。

## 注意
- 本番デプロイ・独自ドメイン適用・課金変更は**人間承認**。破壊的コマンドはフックで遮断される。
