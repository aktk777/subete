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

/* ──────────────────────────────────────────────────────────────
 * 広告クリエイティブ（ASPが発行したHTMLをそのまま保持）。
 * - A8 等のHTMLは原則改変しない（トラッキング画素を含む）。
 * - 例外：HTTPS サイトでの混在コンテンツ遮断を避けるため、画像 src の http:// は https:// に上げている。
 * - 配置はページ側が creatives[id] を選んで <AffiliateCreative html=…/> で描画する。
 * ────────────────────────────────────────────────────────────── */
export interface AffiliateCreative {
  id: string;
  advertiser: string;        // 表示・管理用（楽天市場 等）
  kind: "banner" | "text";
  html: string;              // ASP発行のHTML（クリック計測・成果計測を含む）
  width?: number;            // banner の寸法予約（CLS対策）
  height?: number;
  note?: string;
}

export const creatives: Record<string, AffiliateCreative> = {
  // 広告主 BZ1UR6（※広告主名は要確認。証券系等が判明したら関連ツールへ文脈付きで移設する）
  "bz1ur6-468": {
    id: "bz1ur6-468", advertiser: "お名前.com（GMOインターネット）", kind: "banner", width: 468, height: 60,
    html: `<a href="https://px.a8.net/svt/ejp?a8mat=4B5Y09+BZ1UR6+50+2HQGAP" rel="sponsored nofollow"><img border="0" width="468" height="60" alt="" src="https://www25.a8.net/svt/bgt?aid=260617833724&wid=001&eno=01&mid=s00000000018015072000&mc=1"></a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B5Y09+BZ1UR6+50+2HQGAP" alt="">`,
  },
  "bz1ur6-234": {
    id: "bz1ur6-234", advertiser: "お名前.com（GMOインターネット）", kind: "banner", width: 234, height: 60,
    note: "予備（未配置）",
    html: `<a href="https://px.a8.net/svt/ejp?a8mat=4B5Y09+BZ1UR6+50+2HU3GX" rel="sponsored nofollow"><img border="0" width="234" height="60" alt="" src="https://www23.a8.net/svt/bgt?aid=260617833724&wid=001&eno=01&mid=s00000000018015089000&mc=1"></a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B5Y09+BZ1UR6+50+2HU3GX" alt="">`,
  },
  "bz1ur6-text": {
    id: "bz1ur6-text", advertiser: "お名前.com（GMOインターネット）", kind: "text",
    note: "広告主名・訴求文が確定したらアンカー文言を入れて配置",
    html: `<a href="https://px.a8.net/svt/ejp?a8mat=4B5Y09+BZ1UR6+50+2HFY7M" rel="sponsored nofollow">詳しく見る</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B5Y09+BZ1UR6+50+2HFY7M" alt="">`,
  },
  "rakuten-ichiba": {
    id: "rakuten-ichiba", advertiser: "楽天市場", kind: "text",
    note: "バナー画像(hsb)が1x1ビーコンのため、確実に表示されるテキストリンクで掲載",
    html: `<a href="https://rpx.a8.net/svt/ejp?a8mat=4B5Y09+BYGF5E+2HOM+686ZL&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26061726164_4B5Y09_BYGF5E_2HOM_686ZL%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F" rel="sponsored nofollow">楽天市場でさがす</a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4B5Y09+BYGF5E+2HOM+686ZL" alt="">`,
  },
  "rakuten-travel": {
    id: "rakuten-travel", advertiser: "楽天トラベル", kind: "banner", note: "予備（未配置）",
    html: `<a href="https://rpx.a8.net/svt/ejp?a8mat=4B5Y09+BYGF5E+2HOM+6I9N5&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0eb4779e.5d30c5ba.0eb4779f.b871e4e3%2Fa26061726164_4B5Y09_BYGF5E_2HOM_6I9N5%3Fpc%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F" rel="sponsored nofollow"><img src="https://hbb.afl.rakuten.co.jp/hsb/0ea7f9a4.79280dcb.0ea7f99d.1ac92fca/153145/" border="0"></a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4B5Y09+BYGF5E+2HOM+6I9N5" alt="">`,
  },
  "rakuten-books": {
    id: "rakuten-books", advertiser: "楽天ブックス", kind: "text",
    html: `<a href="https://rpx.a8.net/svt/ejp?a8mat=4B5Y09+BYGF5E+2HOM+6VK1F&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0eac8dc2.9a477d4e.0eac8dc3.0aa56a48%2Fa26061726164_4B5Y09_BYGF5E_2HOM_6VK1F%3Fpc%3Dhttp%253A%252F%252Fbooks.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fbooks.rakuten.co.jp%252F" rel="sponsored nofollow">楽天ブックスは品揃え200万点以上！</a>`,
  },
};

export function creativesFor(ids: string[]): AffiliateCreative[] {
  return ids.map((id) => creatives[id]).filter(Boolean) as AffiliateCreative[];
}
