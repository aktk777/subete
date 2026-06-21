import { describe, it, expect } from "vitest";
import { calcLabor } from "./logic";

describe("shift-cost", () => {
  it("既知ケース（売上300万・時給1200・目標28%・現状800h）", () => {
    const r = calcLabor({ monthlySales: 3_000_000, avgWage: 1200, targetRatePct: 28, currentMonthlyHours: 800 });
    expect(r.budgetLaborCost).toBeCloseTo(840_000, 4);
    expect(r.usableHours).toBeCloseTo(700, 6);
    expect(r.salesPerLaborHour).toBeCloseTo(3_000_000 / 700, 4); // ≈4285.7
    expect(r.currentLaborCost).toBe(960_000);
    expect(r.currentRatePct).toBeCloseTo(32, 6);
    expect(r.hoursGap).toBeCloseTo(-100, 6); // 100時間の削減が必要
    expect(r.costGap).toBeCloseTo(-120_000, 4); // 12万円の超過
  });

  it("現状が目標内なら hoursGap/costGap は + になる", () => {
    const r = calcLabor({ monthlySales: 3_000_000, avgWage: 1200, targetRatePct: 28, currentMonthlyHours: 600 });
    expect(r.hoursGap).toBeGreaterThan(0);
    expect(r.costGap).toBeGreaterThan(0);
  });

  it("時給0・売上0でもゼロ除算しない", () => {
    const r = calcLabor({ monthlySales: 0, avgWage: 0, targetRatePct: 28, currentMonthlyHours: 0 });
    expect(r.usableHours).toBe(0);
    expect(r.salesPerLaborHour).toBe(0);
    expect(r.currentRatePct).toBe(0);
  });
});
