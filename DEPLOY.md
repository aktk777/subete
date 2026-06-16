# DEPLOY — 公開までの最小手順（人間がやること / エージェントに渡すもの）

> 方針：コードでできることは全部エージェント側で済ませてある。ここに残るのは
> **「あなた本人にしかできないこと（アカウント・支払い・規約同意・審査・承認）」だけ**。
> 各IDを取得したらエージェント（Claude Code）に伝えるだけで反映される。

---

## 0. エージェント側で完了済み（あなたは何もしなくてよい）
- モノレポのビルド：`pnpm --filter hub build` → `apps/hub/out/`（静的書き出し）が通る。
- 必須ページ（運営者情報 / お問い合わせ / プライバシー / 利用規約）、sitemap.xml / robots.txt。
- 広告枠・アフィリ枠の予約（実コードは審査後に注入。今は枠だけ）。
- Cloudflare Pages 用設定：[wrangler.toml](wrangler.toml) / [.node-version](.node-version) / [apps/hub/public/_headers](apps/hub/public/_headers)。
- CI（push/PRで install→test→build を自動検証）：[.github/workflows/ci.yml](.github/workflows/ci.yml)。
- 手動デプロイ用ワークフロー（人間がボタンを押した時だけ走る）：[.github/workflows/deploy.yml](.github/workflows/deploy.yml)。

---

## 1. まず「完全無料」で公開する最短ルート（ドメイン不要・アフィリのみ）
AdSense は後回し。`*.pages.dev` の無料サブドメインで公開する。**あなたの作業はこれだけ：**

1. **GitHub アカウント**を作り、**空のリポジトリ**を1つ作る（無料）。
   → この `factory-scaffold/` の中身を push する（push 操作だけは「やって」とエージェントに頼めば実行する。GitHubアカウント作成は本人）。
2. **Cloudflare アカウント**を作る（無料・クレカ不要）。
3. Cloudflare ダッシュボード → **Workers & Pages → Create → Pages → Connect to Git** で 1 のリポジトリを選ぶ。
4. ビルド設定を次のように入力（コピペでOK）：
   - **Framework preset**: `None`
   - **Build command**: `pnpm install && pnpm --filter hub build`
   - **Build output directory**: `apps/hub/out`
   - **Root directory**: （リポジトリ直下に `factory-scaffold` を置いたなら）`factory-scaffold`／直下に展開したなら空欄
   - **Environment variables**: `NEXT_PUBLIC_SITE_URL = https://<プロジェクト名>.pages.dev`（後で確定したURLに更新可）
5. **Save and Deploy** を押す → 数分で `https://<プロジェクト名>.pages.dev` が公開される。

> これで公開完了。以降 push するたび Cloudflare が自動で再ビルド・再デプロイする。
> **アフィリだけ**で現金化を開始できる（ASP登録は §3）。

---

## 2. AdSense まで行くルート（トラフィックが付いてから）
無料サブドメインでは AdSense 審査を通せない。**当たってから**ドメインを足す。

6. **独自ドメインを1つ取得**（年¥1,000〜2,000）。Cloudflare にネームサーバを向け、Pages の **Custom domains** に追加。
7. `NEXT_PUBLIC_SITE_URL` をそのドメインに更新（Cloudflareの環境変数 → 再デプロイ）。
8. **GA4 と Search Console** を作成 → ドメイン所有権を確認（クリック）→ GA4↔AdSense / GSC↔GA4 を連携。
9. **Google AdSense 登録** → 本人/住所/税/支払い情報を入力 → サイト追加 → 審査。
   - 審査前提（実在する中身＋本物のアクセス＋必須ページ）はエージェントが用意済み。
10. **承認後**、AdSense 発行者ID（`ca-pub-…`）を受け取る。

---

## 3. アフィリ/ASP（使う分だけ・本人確認が要る）
A8.net / もしもアフィリエイト / バリューコマース / Amazonアソシエイト / 楽天 など。
本人確認・口座・規約同意は本人のみ。承認された広告リンクURLをエージェントに渡せば、
`packages/monetization/src/index.ts` の `affiliateCatalog` に反映する。

---

## 4. エージェント（Claude Code）に伝えるもの ＝ これだけ
IDは秘密情報ではないので会話で伝えてOK。取得できたものから順に伝えれば、その都度反映する。

| 渡すもの | 例 | 反映先（エージェントがやる） |
|---|---|---|
| 公開URL | `https://xxx.pages.dev` or 独自ドメイン | `NEXT_PUBLIC_SITE_URL`（CF環境変数 / sitemap・canonical） |
| GA4 測定ID | `G-XXXXXXX` | `NEXT_PUBLIC_GA4_ID`（計測タグ） |
| AdSense 発行者ID | `ca-pub-XXXXXXXXXXXXXXXX` | `NEXT_PUBLIC_ADSENSE_CLIENT` ＋ `ads.txt` 生成 ＋ 広告枠に注入 |
| アフィリ承認リンク | ASPで発行されたURL | `affiliateCatalog` に登録 |
| Search Console プロパティ | ドメイン | サイトマップ送信・index申請の手順 |

**秘密情報（API資格情報）だけは別扱い**：あなたが発行し、**GitHub の Secrets**
（Settings → Secrets and variables → Actions）に保存する。エージェントには「Secretsに入れた」とだけ伝える。コードには直書きしない。
- 手動デプロイ用ワークフローを使う場合：`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`
- 非環境変数（公開可）：`NEXT_PUBLIC_SITE_URL` などは Settings → Variables に入れてもよい。

---

## 5. 人間にしかできない（＝エージェントが絶対やらない）操作
フックで遮断済み。これらは必ずあなたが実行・承認する：
- **本番デプロイ／独自ドメイン公開**（プレビュー確認 → あなたが承認/実行）
- **アカウント作成・規約同意・本人/税/支払い情報の入力**
- **課金の有効化・価格変更**（このプロジェクトは原則 無料ホスティングのみ）
- **AdSense審査の申請**（中身とアクセスが揃ってから）

---

## 6. ローカルで見た目を確認する（デプロイ前のプレビュー）
本番に出す前に手元で確認できる。`factory-scaffold/` で：
- ライブ編集プレビュー：`pnpm dev` → http://localhost:3000
- 本番と同じ静的出力を確認：`pnpm preview:static` → http://localhost:5050
- （pnpm が無い環境）`corepack pnpm dev` でOK（corepack は Node 同梱）。

> Claude Code に「プレビュー出して」と言えば、`.claude/launch.json` の `hub` 設定で
> ローカルサーバを立てて画面を見せられる（本番には影響しない）。
