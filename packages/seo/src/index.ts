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
