import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getTool } from "../../../lib/registry";
import { toolComponents, toolContent, toolSchemas } from "../../../lib/tools";
import { webApplicationSchema, relatedLinks } from "@factory/seo";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTool(params.slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/tools/${t.slug}/` },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  const Tool = toolComponents[params.slug];
  if (!t || !Tool) notFound();

  const Content = toolContent[params.slug];
  const schema = toolSchemas[params.slug];
  const related = relatedLinks(tools, { slug: t.slug, category: t.category });
  const ld = webApplicationSchema({ slug: t.slug, title: t.title, description: t.description || "" });

  return (
    <main>
      <div className="tool-head">
        <h1>{t.title}</h1>
        {t.description ? <p className="lead">{t.description}</p> : null}
      </div>

      {/* インタラクティブ本体 */}
      <Tool />

      {/* 本文（content.mdx）: 問題提起→計算式→手順→FAQ。固有の実質的価値（薄い量産との差）。 */}
      {Content && (
        <article className="tool-article">
          <Content />
        </article>
      )}

      {related.length > 0 && (
        <nav className="related">
          <h2>関連ツール</h2>
          <ul>
            {related.map((r) => (
              <li key={r.href}><a href={`${r.href}/`}>{r.title}</a></li>
            ))}
          </ul>
        </nav>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {schema?.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faqPage) }} />
      )}
    </main>
  );
}
