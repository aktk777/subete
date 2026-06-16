# 構造化データ スニペット（schema.json に入れる）

## WebApplication
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "<ツール名>",
  "url": "<canonical>",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" }
}

## FAQPage
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "<Q>", "acceptedAnswer": { "@type": "Answer", "text": "<A>" } }
  ]
}

## HowTo（手順があるツール）
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "<やり方>",
  "step": [ { "@type": "HowToStep", "text": "<手順1>" } ]
}

---

## アプリが自動で出すスキーマ（schema.json に書かない）
以下は `@factory/seo` が hub の共通テンプレ経由で全ページに注入する。ツール作者は触らない：
- **WebSite** / **Organization**（layout、全ページ）… `websiteSchema()` / `organizationSchema()`
- **WebApplication**（[slug]、各ツール）… `webApplicationSchema()`（canonical URL 付き）
- **BreadcrumbList**（[slug]、Home → ツール名）… `breadcrumbSchema()`

ツール側の `schema.json` は **FAQPage（3問以上）** を持てばよい（[+ HowTo]）。
