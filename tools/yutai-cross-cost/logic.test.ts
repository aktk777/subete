import { describe, it, expect } from "vitest";
import { compute } from "./logic";

describe("yutai-cross-cost", () => {
  it("貸株料のみ（手数料・逆日歩なし）の既知ケース", () => {
    const r = compute({
      price: 2000, shares: 100, annualStockLoanRatePct: 1.5, holdingDays: 20,
      buyFee: 0, shortSellFee: 0, deliveryFee: 0, reverseChargePerShare: 0,
    });
    expect(r.notional).toBe(200000);
    // 200000 * 0.015 * (20/365) = 164.3835616...
    expect(r.stockLoanCost).toBeCloseTo(164.3835616, 4);
    expect(r.totalCost).toBeCloseTo(164.3835616, 4);
    expect(r.costPerShare).toBeCloseTo(1.6438356, 4);
  });

  it("手数料と逆日歩を含むケース", () => {
    const r = compute({
      price: 1000, shares: 100, annualStockLoanRatePct: 3.9, holdingDays: 5,
      buyFee: 99, shortSellFee: 99, deliveryFee: 0, reverseChargePerShare: 0.5,
    });
    expect(r.notional).toBe(100000);
    expect(r.stockLoanCost).toBeCloseTo(100000 * 0.039 * (5 / 365), 6); // ≈53.42
    expect(r.reverseCharge).toBe(50);   // 0.5 * 100
    expect(r.totalFees).toBe(198);      // 99 + 99 + 0
    expect(r.totalCost).toBeCloseTo(198 + 50 + 100000 * 0.039 * (5 / 365), 6);
  });

  it("株数0でも costPerShare は 0（ゼロ除算しない）", () => {
    const r = compute({
      price: 1000, shares: 0, annualStockLoanRatePct: 1, holdingDays: 1,
      buyFee: 0, shortSellFee: 0, deliveryFee: 0, reverseChargePerShare: 0,
    });
    expect(r.costPerShare).toBe(0);
  });
});
