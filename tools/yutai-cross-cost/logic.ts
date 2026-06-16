/**
 * 優待クロス（つなぎ売り）コスト計算 — 決定論的な純関数。
 * これは「費用を計算・記録する」ツールであり、投資助言ではない（銘柄推奨・発注はしない）。
 * 率や手数料は証券会社ごとに異なり、逆日歩は事後変動するため、すべてユーザー入力で受ける。
 */
export interface YutaiCrossInput {
  price: number;                  // 株価(円)
  shares: number;                 // 株数
  annualStockLoanRatePct: number; // 一般信用 売建の貸株料(年率, %)
  holdingDays: number;            // 保有日数
  buyFee: number;                 // 現物買付手数料(円)
  shortSellFee: number;           // 信用売建手数料(円)
  deliveryFee: number;            // 現渡し手数料(円)
  reverseChargePerShare: number;  // 逆日歩(1株あたり総額, 円) ※発生しない/不明なら0
}

export interface YutaiCrossOutput {
  notional: number;       // 約定代金(株価×株数)
  stockLoanCost: number;  // 貸株料
  reverseCharge: number;  // 逆日歩合計
  totalFees: number;      // 売買・現渡し手数料合計
  totalCost: number;      // 合計コスト
  costPerShare: number;   // 1株あたりコスト
}

export function compute(i: YutaiCrossInput): YutaiCrossOutput {
  const notional = i.price * i.shares;
  const stockLoanCost = notional * (i.annualStockLoanRatePct / 100) * (i.holdingDays / 365);
  const reverseCharge = i.reverseChargePerShare * i.shares;
  const totalFees = i.buyFee + i.shortSellFee + i.deliveryFee;
  const totalCost = totalFees + stockLoanCost + reverseCharge;
  const costPerShare = i.shares > 0 ? totalCost / i.shares : 0;
  return { notional, stockLoanCost, reverseCharge, totalFees, totalCost, costPerShare };
}

/** 表示用フォーマット（円・小数2桁）。ロジックは生値、丸めは表示側で。 */
export function yen(n: number): string {
  return n.toLocaleString("ja-JP", { maximumFractionDigits: 0 });
}
