import type { ReactNode } from "react";
/** アフィリリンク。rel に sponsored nofollow を付与（PR表記は Disclosure を別途設置）。 */
export function AffiliateLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="sponsored nofollow noopener" target="_blank">
      {children}
    </a>
  );
}
