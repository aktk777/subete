"use client";
import { useState } from "react";
import { NumberField, ResultCard, AdSlot, Disclosure } from "@factory/ui";
import { compute, yen, type YutaiCrossInput } from "./logic";

const initial: YutaiCrossInput = {
  price: 2000, shares: 100, annualStockLoanRatePct: 1.5, holdingDays: 20,
  buyFee: 0, shortSellFee: 0, deliveryFee: 0, reverseChargePerShare: 0,
};

export default function YutaiCrossCostTool() {
  const [v, setV] = useState<YutaiCrossInput>(initial);
  const set = (k: keyof YutaiCrossInput) => (n: number | "") => setV((s) => ({ ...s, [k]: n === "" ? 0 : n }));
  const r = compute(v);

  return (
    <div>
      <div className="card">
        <div className="field-grid">
          <NumberField label="株価" unit="円" value={v.price} onChange={set("price")} min={0} />
          <NumberField label="株数" value={v.shares} onChange={set("shares")} min={0} step="1" />
          <NumberField label="貸株料(年率)" unit="%" value={v.annualStockLoanRatePct} onChange={set("annualStockLoanRatePct")} min={0} />
          <NumberField label="保有日数" unit="日" value={v.holdingDays} onChange={set("holdingDays")} min={0} step="1" />
          <NumberField label="現物買付手数料" unit="円" value={v.buyFee} onChange={set("buyFee")} min={0} />
          <NumberField label="信用売建手数料" unit="円" value={v.shortSellFee} onChange={set("shortSellFee")} min={0} />
          <NumberField label="現渡し手数料" unit="円" value={v.deliveryFee} onChange={set("deliveryFee")} min={0} />
          <NumberField label="逆日歩(1株あたり)" unit="円" value={v.reverseChargePerShare} onChange={set("reverseChargePerShare")} min={0} />
        </div>
      </div>

      <div className="section-gap" />
      <ResultCard title="コスト計算結果（概算）">
        <ul>
          <li><span>約定代金</span><span className="v">{yen(r.notional)} 円</span></li>
          <li><span>貸株料</span><span className="v">{yen(r.stockLoanCost)} 円</span></li>
          <li><span>逆日歩</span><span className="v">{yen(r.reverseCharge)} 円</span></li>
          <li><span>手数料合計</span><span className="v">{yen(r.totalFees)} 円</span></li>
          <li className="total"><span>合計コスト</span><span className="v">{yen(r.totalCost)} 円</span></li>
        </ul>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: "#5b6470" }}>
          1株あたり {r.costPerShare.toFixed(2)} 円
        </p>
      </ResultCard>

      <div className="section-gap" />
      <Disclosure />
      <p className="aff-note" style={{ marginTop: 10 }}>
        ※ネット証券の手数料・貸株料は各社で異なります。利用する証券会社の公式手数料ページの値を入力してください。
      </p>

      <div className="section-gap" />
      <AdSlot minHeight={280} />
    </div>
  );
}
