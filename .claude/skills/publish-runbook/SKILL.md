---
name: publish-runbook
description: >
  ビルド→プレビュー→人間承認→本番デプロイ→index申請→registry更新 の手順。publisher が使う。
  本番デプロイ・独自ドメイン公開・課金は人間承認必須。
---

# 公開ランブック

詳細：`references/deploy-steps.md`。

1. `pnpm --filter hub build` → `apps/hub/out/`（静的）。ローカルプレビューで動作確認。
2. **オーナーの公開承認を待つ**（このプロジェクトではオーナー確認＝最終品質ゲート。本番は承認なしに出さない）。
3. 承認後＝**`main` に push** → Cloudflare Pages が自動で本番デプロイ（手動なら `wrangler pages deploy apps/hub/out`）。
4. `registry.json` を `status: live`, `quality_gate_passed: true`, `publishedAt` 更新（→ sitemap 掲載・同カテゴリ相互内部リンクが有効化）。
5. 公開後：**Search Console に `sitemap.xml` を送信**（※人間の操作。GSC API 資格情報があれば自動化可。手順は `SETUP-ANALYTICS.md`）。GA4 で計測確認。
