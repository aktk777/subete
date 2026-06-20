/**
 * 投資信託の信託報酬コスト・将来資産シミュレーション — 決定論的な純関数。
 * これは「費用と将来資産を計算・記録」するツールであり投資助言ではない（銘柄推奨・発注はしない）。
 * 想定リターンはユーザー入力の仮定値であり将来の成果を保証しない（元本割れの可能性）。
 */
export interface FundInput {
  monthly: number;          // 毎月の積立額(円)
  years: number;            // 積立年数(年)
  annualReturnPct: number;  // 想定年率リターン(信託報酬控除前, %)
  expenseRatioPct: number;  // 信託報酬(年率, %)
}

export interface FundResult {
  months: number;
  principal: number;     // 元本(積立総額)
  futureValue: number;   // 将来資産(信託報酬控除後)
  gain: number;          // 運用益 = futureValue - principal
  feeDrag: number;       // 信託報酬で失った額 = (手数料0%の将来資産) - futureValue
}

/** 毎月積立(期末払い)の将来価値。annualRate は小数(0.05 = 5%)。 */
export function annuityFutureValue(monthly: number, annualRate: number, months: number): number {
  if (months <= 0) return 0;
  const i = annualRate / 12;
  if (i === 0) return monthly * months;
  return monthly * ((Math.pow(1 + i, months) - 1) / i);
}

export function simulate(input: FundInput): FundResult {
  const months = Math.round(input.years * 12);
  const principal = input.monthly * months;
  const net = (input.annualReturnPct - input.expenseRatioPct) / 100;   // 信託報酬控除後の年率
  const gross = input.annualReturnPct / 100;                            // 信託報酬0%の年率
  const futureValue = annuityFutureValue(input.monthly, net, months);
  const fvNoFee = annuityFutureValue(input.monthly, gross, months);
  return {
    months,
    principal,
    futureValue,
    gain: futureValue - principal,
    feeDrag: fvNoFee - futureValue,
  };
}

/** 2本のファンドの将来資産の差（コスト差で生まれる差額）。 */
export function costGap(a: FundResult, b: FundResult): number {
  return Math.abs(a.futureValue - b.futureValue);
}

/** 表示用フォーマット（円・整数）。丸めは表示側で。 */
export function yen(n: number): string {
  return Math.round(n).toLocaleString("ja-JP", { maximumFractionDigits: 0 });
}
