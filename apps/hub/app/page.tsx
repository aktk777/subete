import { tools, byCategory } from "../lib/registry";
import { creatives } from "@factory/monetization";
import { AffiliateCreative, Disclosure } from "@factory/ui";

export default function Home() {
  const groups = byCategory(tools); // live に絞るのは公開後。スキャフォールドでは全件表示。
  return (
    <main>
      <section className="hero">
        <h1>便利ツール集</h1>
        <p>面倒な計算・換算・見積を、入力するだけで一瞬で。広告だけの無料ツール集です。</p>
      </section>
      {Object.entries(groups).map(([cat, list]) => (
        <section key={cat} className="cat">
          <h2>{cat}</h2>
          <div className="tool-grid">
            {list.map((t) => (
              <a key={t.slug} className="tool-card" href={`/tools/${t.slug}/`}>
                <span className="t">{t.title}</span>
                {t.description ? <span className="d">{t.description}</span> : null}
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className="aff-partners">
        <h2>提携先のおすすめ <span className="badge-pr">PR</span></h2>
        <div className="aff-row">
          <AffiliateCreative html={creatives["bz1ur6-468"]!.html} width={468} height={60} />
        </div>
        <p className="aff-text">
          <AffiliateCreative html={creatives["rakuten-ichiba"]!.html} />
          <span aria-hidden> ／ </span>
          <AffiliateCreative html={creatives["rakuten-books"]!.html} />
        </p>
        <div className="section-gap" />
        <Disclosure />
      </section>
    </main>
  );
}
