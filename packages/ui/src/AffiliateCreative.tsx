import type { CSSProperties } from "react";

/**
 * ASP（A8等）が発行した広告HTML（広告主のクリエイティブ＋計測画素）をそのまま描画する。
 * width/height があれば寸法予約して CLS を抑える。文章は広告主のコードに含まれる。
 * 表示するページには別途 PR 表記（Disclosure / PRバッジ）を必ず置くこと（ステマ規制）。
 */
export function AffiliateCreative({ html, width, height }: { html: string; width?: number; height?: number }) {
  const style: CSSProperties | undefined =
    width && height ? { display: "inline-block", minWidth: width, minHeight: height } : undefined;
  return <span className="aff-creative" style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}
