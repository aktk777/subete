# BUILD-PLAN — 次に作業する Claude Code へ

> このファイルが作業の起点。**まず `CLAUDE.md` と `spec/` の仕様書を読み**、その上で下記を順に進めること。
> 原則：**一気に全自動工場を作らない。まず1本（例ツール）を貫通させて"型"を固め、それを部品化・自動化する。**

## 0. 現在の状態（このスキャフォールドで出来ていること）
- [x] モノレポのディレクトリ構造一式。
- [x] `.claude/agents/` … 7体すべて定義済み（プロンプト・モデル・tools 制限入り）。
- [x] `.claude/skills/` … 7スキルすべて SKILL.md ＋ references 雛形を配置済み。
- [x] `.claude/settings.json` … フック（破壊的コマンド遮断／デプロイ前の品質ゲート強制／編集後チェック）配線済み。
- [x] `scripts/` … フック用スクリプト（実体。まずは緩めの実装。後述TODOで強化）。
- [x] `CLAUDE.md` / `HUMAN-SETUP.md` / `README.md` / `registry.json` / `backlog/` サンプル。
- [x] `packages/` … ui/seo/monetization/analytics の **骨組み（API署名と最小実装＋TODO）**。
- [x] `tools/yutai-cross-cost/` … **例ツール1本**（決定論ロジック＋テスト＋meta/schema/content/ui）。
- [x] `apps/hub/` … Next.js（静的書き出し）の**骨組み**（home=ツール一覧 / [slug] / 必須ページ / sitemap / robots）。

## 0.1 まだ出来ていないこと（＝あなたの仕事）
- [x] **依存インストール**：`pnpm install` を通した（2026-06-15）。
- [x] hub の各ページ・packages 実装：**ビルドが通る**（`pnpm --filter hub build` → `apps/hub/out/` に全11ページ静的書き出し）。
- [x] 例ツール本文：`content.mdx` を `@next/mdx` で本文描画＋`schema.json` の FAQPage を JSON-LD 注入（`[slug]/page.tsx` の Phase 0 TODO 消化）。
- [x] 例ツールの **UI/コンテンツの見た目仕上げ**：`globals.css` にデザインシステムを導入し hub/`@factory/ui`/例ツールを刷新（2026-06-15）。ローカルプレビューで確認可（`pnpm dev` / `.claude/launch.json`）。
- [x] **デプロイ準備**：Cloudflare Pages 設定（`wrangler.toml`/`.node-version`/`apps/hub/public/_headers`）、CI（`.github/workflows/ci.yml`）、手動デプロイ（`.github/workflows/deploy.yml`）、`DEPLOY.md`（人間の最小手順）を整備。**本番デプロイ・公開・課金は人間承認**（未実施）。
- [ ] 実広告コードは入れない（段階投入＝枠だけ予約済み。AdSense は人間の審査後にIDを受領して注入）。

### Phase 0 完了メモ（2026-06-15・再現用）
このスキャフォールドを動く状態にするための、環境固有の確定事項。次セッションはこの前提で動く。
- **pnpm は corepack 経由**：このマシンは pnpm 未導入。`package.json` の `packageManager: pnpm@9.0.0` に従い `corepack pnpm <cmd>`（または `corepack enable`）で使う。Node 20 / npm 10。
- **`.npmrc` を追加**：`tools/<slug>/` は package.json を持たない設計のため、pnpm の隔離 node_modules だと `tools/*/ui.tsx` から `react` 型が解決できない。`public-hoist-pattern[]` で react 系を root に hoist。hoist 設定変更時の再作成プロンプト回避に `confirm-modules-purge=false` も記載（非対話運用向け。効かない環境では `rm -rf node_modules` してから install）。
- **hub の `tsconfig.json` に `baseUrl: "."` を追加**：これが無いと `paths`（`@factory/*`）が base 設定の baseUrl を継承してリポジトリ外を指し、`tools/*.tsx` から `@factory/ui` 等が解決できなかった。
- **`next.config.mjs`**：`outputFileTracingRoot` は Next14 では `experimental` 配下。`@next/mdx`（`createMDX`）で `.mdx` を import 可能に（`pageExtensions` に md/mdx 追加、必須の `mdx-components.tsx` と `mdx.d.ts` を配置）。
- **ツール登録は3マップ**：1本追加するたび `apps/hub/lib/tools.tsx` の `toolComponents`/`toolContent`/`toolSchemas` に1行ずつ（tool-scaffold スキルに反映済み）。
- **本番デプロイ・AdSense 注入は未実施**（人間承認ゲート＝settings.json のフックで遮断）。ローカル確認は `corepack pnpm --filter hub build` 後 `npx serve apps/hub/out` 等。

## 1. 進め方（Phase 0 → 3。仕様書 §10 準拠）

### Phase 0 — モノレポ＋1本目を貫通（最優先・型作り）
1. `pnpm install`（ルートで）。ワークスペースが解決することを確認。
2. `tools/yutai-cross-cost/logic.test.ts` を緑にする（`pnpm test`）。計算が正しいことを保証。
3. `apps/hub` が `pnpm --filter hub build`（静的書き出し `out/`）で通るまで、ページ/lib/packages を埋める。
4. 必須ページ（About/Contact/Privacy/Terms）を実体化（AdSense審査・E-E-A-T、§9）。
5. ローカル確認 → デプロイ（Cloudflare Pages。`HUMAN-SETUP.md` の接続後）。
   - **本番デプロイ・公開は人間承認**（settings.json のフックと publisher の権限で保護）。
**Phase 0 のゴール＝再利用可能な"工場テンプレート"。これが最初の成果物。**

### Phase 1 — サブエージェント＆スキルを実運用に乗せる
- `.claude/agents/` の各サブエージェントを実際に呼び、Stage1→6 が流れることを確認。
- `quality-gate`（Opus）が §5.2/§9 を実際にブロックできるよう、`scripts/` のチェックを強化。

### Phase 2 — パイプライン自動化（型を固める）
- 2〜3本目を半自動で出し、registry 更新・夜レビュー要約・プレビュー承認を安定化。
- 任意：`claude -p` を GitHub Actions で定期起動し、PR を作らせて人間がマージ。

### Phase 3 — 横展開（量産の本番）
- 当事者でない業界（物販/飲食/ハンドメイド/建設…）へ複製。`opportunity-scout` で機会を量産 issue 化。
- 勝ち筋には同業界の有料ツール（レールA）を被せる（B→A）。

## 2. 不変の約束（必ず守る）
- **モデル配分**：`factory-orchestrator` と `quality-gate` は **Opus**。`tool-builder`/`seo-optimizer`/`publisher` は **Sonnet**。`opportunity-scout` は **Haiku**。
- **ユニットは"動く"決定論ツール**：アプリ実行時に AI/外部API/スクレイピングを入れない。計算式は公式の出典を持つ。
- **品質下限を割ったら公開しない**（薄い量産＝Googleのスパム判定。§1.3/§5.2）。
- **規制**：投資=計算/記録/通知に留め発注・個別助言しない／税務・行政の独占業務に踏み込まない（§9・`jp-compliance`）。
- **人間承認が要る操作**：本番デプロイ・独自ドメイン公開・課金有効化・権限変更・アカウント作成/規約同意（§7.3）。

## 3. すぐ使うコマンド（例）
- 新ツールの機会を1枚 issue 化： `/new-tool <業界> <業務>`（`.claude/commands/new-tool.md`）
- 夜のレビュー要約： `/night-review`（`.claude/commands/night-review.md`）
