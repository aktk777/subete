# ミニアプリ量産工場（Longtail Tool Factory）

決定論的な単機能Webツールを量産し、SEOで露出を取り、広告/アフィリで現金化する「工場」。
このリポジトリは **工場そのもの（Claude Code のサブエージェント群＋スキル群＋フック＋運用ループ）** と、
工場が生み出す **集約サイト（apps/hub）** と **各ツール（tools/<slug>）** を1つのモノレポに収めたもの。

## まず読む順番
1. **`BUILD-PLAN.md`** … 次に作業する Claude Code 向け。今どこまで出来ていて、次に何をするか。
2. **`HUMAN-SETUP.md`** … 人間（オーナー）が一度だけやる最小セットアップ（アカウント作成・ドメイン・ID渡し）。
3. **`DEPLOY.md`** … 公開までの最小手順（人間がやること／エージェントに渡すID）。
   - **`SETUP-ANALYTICS.md`** … GA4 / Search Console の取得手順（読んでそのままやるだけ）。
4. **`CLAUDE.md`** … 毎セッション自動ロードされる運用憲法（不変ルール）。
5. **`spec/`** … 元になった構築仕様書 v1.2（詳細の根拠）。

## ディレクトリ
- `.claude/agents/` … オーケストレーター＋6サブエージェント（役割・モデル・権限）。
- `.claude/skills/` … 7スキル（仕様化・雛形・SEO・マネタイズ・品質・規制・公開）。
- `.claude/settings.json` … フック（品質ゲート強制／破壊的コマンド遮断）と既定エージェント。
- `apps/hub/` … 集約サイト本体（Next.js・静的書き出し）。
- `packages/` … 再利用部品（ui / seo / monetization / analytics）。
- `tools/<slug>/` … 1ツール＝1フォルダ（例: `yutai-cross-cost`）。
- `registry.json` … 全ツールの台帳（真実の源）。
- `backlog/` … issue（1枚＝ツール1本 or 1改善）。
- `metrics/` … 計測スナップショット。 `decisions.log` … 撤退/強化の記録。

## ひとことで
**最初は無料サブドメイン＋アフィリで完全無料公開 → 当たったツールにだけドメインを足して AdSense を乗せる。**
ホスティングは静的書き出し＋Cloudflare Pages（商用可・帯域無制限・無料）が既定。
