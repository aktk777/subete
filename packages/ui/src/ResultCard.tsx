import type { ReactNode } from "react";
/** 結果表示カード。高さがぶれないよう余白を確保（CLS対策）。見た目は globals.css の `.result`。 */
export function ResultCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="result">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
