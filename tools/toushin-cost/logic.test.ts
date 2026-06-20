import { describe, it, expect } from "vitest";
import { simulate, annuityFutureValue, costGap } from "./logic";

describe("toushin-cost", () => {
  it("手数料0・リターン0なら将来資産＝元本", () => {
    const r = simulate({ monthly: 10000, years: 1, annualReturnPct: 0, expenseRatioPct: 0 });
    expect(r.months).toBe(12);
    expect(r.principal).toBe(120000);
    expect(r.futureValue).toBe(120000);
    expect(r.gain).toBe(0);
    expect(r.feeDrag).toBe(0);
  });

  it("既知の複利ケース（月利1%・24ヶ月の積立将来価値）", () => {
    // FV = 10000 * ((1.01^24 - 1)/0.01) ≈ 269,734.6
    const fv = annuityFutureValue(10000, 0.12, 24);
    expect(fv).toBeCloseTo(269734.6, 0);
  });

  it("信託報酬が高いほど将来資産は小さく、feeDrag は大きい", () => {
    const low = simulate({ monthly: 30000, years: 20, annualReturnPct: 5, expenseRatioPct: 0.1 });
    const high = simulate({ monthly: 30000, years: 20, annualReturnPct: 5, expenseRatioPct: 0.5 });
    expect(high.futureValue).toBeLessThan(low.futureValue);
    expect(low.feeDrag).toBeGreaterThan(0);
    expect(high.feeDrag).toBeGreaterThan(low.feeDrag);
    expect(costGap(low, high)).toBeCloseTo(low.futureValue - high.futureValue, 6);
  });

  it("純リターン0（リターン＝信託報酬）なら将来資産＝元本", () => {
    const r = simulate({ monthly: 50000, years: 10, annualReturnPct: 1, expenseRatioPct: 1 });
    expect(r.futureValue).toBeCloseTo(r.principal, 6);
    expect(r.gain).toBeCloseTo(0, 6);
  });
});
