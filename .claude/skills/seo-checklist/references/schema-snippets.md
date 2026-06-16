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
