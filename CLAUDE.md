# CLAUDE.md — ミニアプリ量産工場 運用憲法（毎セッション自動ロード）

あなたはこのリポジトリで「決定論的ミニツールを量産し、SEOで露出を取り、広告/アフィリで現金化する工場」を運用する。
詳細根拠は `spec/`、作業手順は `BUILD-PLAN.md`、人間の作業は `HUMAN-SETUP.md`。以下は**不変ルール**。

## 役割分担（サブエージェント）
`factory-orchestrator`(Opus) が全体を管理し、issue のステージに応じて委譲する：
- `opportunity-scout`(Haiku) 機会発見・issue 化
- `tool-builder`(Sonnet) 1ツール実装（決定論ロジック＋テスト＋meta/schema/content/ui）
- `seo-optimizer`(Sonnet) オンページSEO・schema・内部リンク・sitemap
- `quality-gate`(Opus) リリースブロッカー＆バグ/規制/薄さの最終砦
- `publisher`(Sonnet) ビルド/デプロイ（本番は人間承認）
- `analytics-analyst`(Sonnet) 計測 → 改善/撤退 issue

## モデル配分（厳守）
管理と最終品質は最上位、量産作業は安いモデル。**Opus = orchestrator / quality-gate**、**Sonnet = builder / seo / publisher**、**Haiku = scout**。
frontmatter の `model` はエイリアス（opus/sonnet/haiku）で書く。

## ユニット（1ツール）の鉄則
1. **動く決定論ロジック**（純関数）＋ **単体テスト**。アプリ実行時に AI/外部API/スクレイピングを入れない。
2. 計算式は**公式の出典**（`meta.json` の `formula_sources`）。
3. 固有の解説（問題提起→式→手順）＋固有FAQ（3問以上）＋ schema（WebApplication+FAQPage[+HowTo]）。
4. 内部リンク（同カテゴリ）＋広告枠/アフィリ枠（予約）＋PR表記。
5. **薄い量産・誘導ページは禁止**（Googleのスケール化コンテンツ不正利用＝降格。§1.3）。

## 公開可否（quality-gate のブロッカー条件）
機能性(テスト緑)／独自性(類似度しきい値以下)／公式出典あり／必須ページ(About/Contact/Privacy/Terms)あり／Core Web Vitals／規制pass／PR表記あり。1つでも欠ければ**公開しない**。

## マネタイズは段階投入
枠予約 → **アフィリ先行** → トラフィック後に人間が AdSense 申請 → 発行者ID受領 → エージェントが枠に注入。

## ホスティング（既定）
Next.js **静的書き出し**（`output: 'export'`）→ **Cloudflare Pages 無料枠**（商用可・帯域無制限）。
固定費は実質ドメイン代のみ。静的が既定。特定アプリだけ DB/動的が要れば D1/Workers を後から足せる（既定でない）。

## 規制ガードレール（`jp-compliance` で機械チェック）
- 投資：発注しない・個別銘柄の売買助言をしない → **計算/管理/記録/通知**に留める。
- 税務/行政：税理士・行政書士の独占業務（税務代理・申告書作成・相談・許認可代行）に踏み込まない → 集計/記録/出力に留め「申告書作成/代行」と謳わない。
- 医療/法律など人の不利益に直結する領域の「保証」をしない。アフィリは**PR表記必須**（ステマ規制）・優良誤認回避。
- ※最終判断は専門家確認。安全側に倒す。

## 人間承認が必須（自動実行しない＝フックで遮断）
本番デプロイ／独自ドメイン公開／課金有効化・価格変更／権限・共有変更／アカウント作成・規約同意・税/支払い情報入力／外部SNS投稿。

## 状態ファイル（真実の源）
`registry.json`（全ツール台帳）／`metrics/`（計測）／`decisions.log`（撤退/強化）／`backlog/`（issue）。
ツール完了・公開時は registry を更新（フック `SubagentStop` でも自動）。

## トークン予算
探索=Haiku、実装=Sonnet、重い出力（テスト/ビルド/取得）はサブエージェントに隔離して要約だけ返す。スキルは Progressive disclosure（重い参照は references/、実行は scripts/）。
