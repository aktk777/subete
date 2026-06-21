import { describe, it, expect } from "vitest";
import { calcWall } from "./logic";

describe("fuyou-nokori", () => {
  it("既知ケース（130万の壁・既60万・残6ヶ月・時給1100）", () => {
    const r = calcWall({ wallYen: 1_300_000, earnedYen: 600_000, remainingMonths: 6, hourlyWage: 1100 });
    expect(r.remainingYen).toBe(700_000);
    expect(r.over).toBe(false);
    expect(r.perMonthYen).toBeCloseTo(116_666.67, 1);
    expect(r.monthlyHours).toBeCloseTo(106.06, 1);
    expect(r.weeklyHours).toBeCloseTo(106.06 / (52 / 12), 2); // ≈24.5
  });

  it("すでに超過していたら over=true・毎月上限は0", () => {
    const r = calcWall({ wallYen: 1_300_000, earnedYen: 1_400_000, remainingMonths: 6, hourlyWage: 1100 });
    expect(r.over).toBe(true);
    expect(r.remainingYen).toBe(-100_000);
    expect(r.perMonthYen).toBe(0);
    expect(r.weeklyHours).toBe(0);
  });

  it("残り月数0・時給0でもゼロ除算しない", () => {
    const r = calcWall({ wallYen: 1_300_000, earnedYen: 600_000, remainingMonths: 0, hourlyWage: 0 });
    expect(r.perMonthYen).toBe(0);
    expect(r.monthlyHours).toBe(0);
  });
});
