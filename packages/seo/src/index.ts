export const SITE_NAME = "便利ツール集";

export interface ToolMeta {
  slug: string; title: string; description: string; keywords?: string[];
  category?: string; canonicalBase?: string;
}

export function buildMetadata(meta: ToolMeta, siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "") {
  const url = `${siteUrl}/tools/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: { title: meta.title, description: meta.description, url, type: "website" as const },
  };
}

/** registry の同カテゴリから内部リンク候補を返す。 */
export function relatedLinks(
  all: { slug: string; title: string; category?: string; status?: string }[],
  current: { slug: string; category?: string },
  limit = 4,
) {
  return all
    .filter((t) => t.slug !== current.slug && t.status === "live" && t.category && t.category === current.category)
    .slice(0, limit)
    .map((t) => ({ href: `/tools/${t.slug}`, title: t.title }));
}

export function webApplicationSchema(meta: ToolMeta, siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "") {
  return {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: meta.title, url: `${siteUrl}/tools/${meta.slug}`,
    applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/* ──────────────────────────────────────────────────────────────
 * サイト全体の構造化データ（E-E-A-T / AEO 向け）。
 * 個々のツールではなく hub の共通テンプレ（layout / [slug]）が注入する。
 * ツール作者が schema.json に書く必要はない。
 * ────────────────────────────────────────────────────────────── */

/** 運営者（信頼シグナル）。全ページに注入。 */
export function organizationSchema(siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "") {
  return {
    "@context": "https://schema.org", "@type": "Organization",
    name: SITE_NAME, ...(siteUrl ? { url: siteUrl } : {}),
  };
}

/** サイト本体。全ページに注入。 */
export function websiteSchema(siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "") {
  return {
    "@context": "https://schema.org", "@type": "WebSite",
    name: SITE_NAME, ...(siteUrl ? { url: siteUrl } : {}),
    inLanguage: "ja-JP",
  };
}

/** パンくず。各ツールページが注入（Home → ツール名）。 */
export function breadcrumbSchema(
  items: { name: string; path?: string }[],
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "",
) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name,
      ...(it.path ? { item: `${siteUrl}${it.path}` } : {}),
    })),
  };
}
