/**
 * 計測の取得・集計（骨組み）。実APIは analytics-analyst が CI Secrets の資格情報で叩く。
 * ページ別の閲覧数・収益は GA4↔AdSense / GSC↔GA4 連携から取得する（spec §8.2）。
 */
export interface ToolMetricSnapshot {
  slug: string;
  impressions?: number; clicks?: number; avgPosition?: number; indexed?: boolean; // GSC
  users?: number;                                                                  // GA4
  adRevenue?: number; rpm?: number;                                                // AdSense via GA4
  affiliateRevenue?: number;                                                        // ASP
}

// TODO: 実装。GSC API / GA4 Data API / AdSense Management API / ASP レポートを取得して返す。
export async function fetchSnapshot(_period: string): Promise<ToolMetricSnapshot[]> {
  return []; // stub
}

/** 勝ち筋/負け筋の単純判定（しきい値は運用で調整）。 */
export function classify(m: ToolMetricSnapshot): "winner" | "loser" | "watch" {
  const rev = (m.adRevenue || 0) + (m.affiliateRevenue || 0);
  if ((m.clicks || 0) >= 50 || rev > 0) return "winner";
  if ((m.impressions || 0) < 10 && (m.users || 0) < 5) return "loser";
  return "watch";
}
