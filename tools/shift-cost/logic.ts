/**
 * シフト人件費・必要労働時間（人件費率・人時売上高）— 決定論的な純関数。
 * 店舗運営の「経営計算」ツールであり、労務・税務の個別助言ではない。指標の目安は業態で異なる。
 */
export interface LaborInput {
  monthlySales: number;         // 月間売上(円)
  avgWage: number;              // 平均時給(円)
  targetRatePct: number;        // 目標人件費率(%)
  currentMonthlyHours: number;  // 現状の月間総労働時間(時間)
}

export interface LaborResult {
  budgetLaborCost: number;    // 目標人件費率で使える人件費(円)
  usableHours: number;        // 使える総労働時間(時間)
  salesPerLaborHour: number;  // 人時売上高 = 売上 ÷ 総労働時間(円)
  currentLaborCost: number;   // 現状の人件費(円)
  currentRatePct: number;     // 現状の人件費率(%)
  hoursGap: number;           // 使える時間 − 現状時間（+:増やせる / −:削減が必要）
  costGap: number;            // 使える人件費 − 現状人件費（+:余裕 / −:超過）
}

export function calcLabor(i: LaborInput): LaborResult {
  const budgetLaborCost = i.monthlySales * (i.targetRatePct / 100);
  const usableHours = i.avgWage > 0 ? budgetLaborCost / i.avgWage : 0;
  const salesPerLaborHour = usableHours > 0 ? i.monthlySales / usableHours : 0;
  const currentLaborCost = i.avgWage * i.currentMonthlyHours;
  const currentRatePct = i.monthlySales > 0 ? (currentLaborCost / i.monthlySales) * 100 : 0;
  return {
    budgetLaborCost,
    usableHours,
    salesPerLaborHour,
    currentLaborCost,
    currentRatePct,
    hoursGap: usableHours - i.currentMonthlyHours,
    costGap: budgetLaborCost - currentLaborCost,
  };
}

export function yen(n: number): string { return Math.round(n).toLocaleString("ja-JP"); }
export function hours(n: number): string { return (Math.round(n * 10) / 10).toLocaleString("ja-JP"); }
