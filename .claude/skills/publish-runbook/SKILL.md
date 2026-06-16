---
name: publish-runbook
description: >
  ビルド→プレビュー→人間承認→本番デプロイ→index申請→registry更新 の手順。publisher が使う。
  本番デプロイ・独自ドメイン公開・課金は人間承認必須。
---

# 公開ランブック

詳細：`references/deploy-steps.md`。

1. `registry.json.quality_gate_passed === true` を確認（false は中止）。
2. `pnpm --filter hub build` → `apps/hub/out/`（静的）。
3. プレビュー用意 → **人間承認を待つ**（本番は承認なしに出さない）。
4. 承認後：Cloudflare Pages へデプロイ（CI または手動）。
5. `sitemap.xml` 更新を確認 → Search Console に index 申請（資格情報があれば自動）。
6. `registry.json` を `status: live`、`url`/`publishedAt` 更新。
