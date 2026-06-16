/** マネタイズ設定の中央管理（spec §4.A.5 段階投入）。 */
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const adsenseEnabled = adsenseClient.length > 0;

export interface Affiliate { label: string; href: string; }

/** ツールごとのアフィリ先（meta.json.affiliate_targets を実リンクに対応づける場所）。 */
export const affiliateCatalog: Record<string, Affiliate[]> = {
  // 例: "ネット証券口座": [{ label: "○○証券で口座開設", href: "https://example.com/aff/..." }],
};

export function affiliatesFor(targets: string[] = []): Affiliate[] {
  return targets.flatMap((t) => affiliateCatalog[t] || []);
}

export const DISCLOSURE_TEXT =
  "本ページは広告（アフィリエイトリンク）を含みます。計算結果は概算であり、最終判断はご自身または専門家にご確認ください。";
