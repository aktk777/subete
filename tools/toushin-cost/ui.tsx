"use client";
import { useState } from "react";
import { NumberField, ResultCard, AdSlot, Disclosure } from "@factory/ui";
import { simulate, costGap, yen, type FundInput } from "./logic";

interface State { monthly: number; years: number; annualReturnPct: number; feeA: number; feeB: number; }
const initial: State = { monthly: 30000, years: 20, annualReturnPct: 5, feeA: 0.1, feeB: 0.5 };

export default function ToushinCostTool() {
  const [v, setV] = useState<State>(initial);
  const set = (k: keyof State) => (n: number | "") => setV((s) => ({ ...s, [k]: n === "" ? 0 : n }));

  const common: Omit<FundInput, "expenseRatioPct"> = { monthly: v.monthly, years: v.years, annualReturnPct: v.annualReturnPct };
  const a = simulate({ ...common, expenseRatioPct: v.feeA });
  const b = simulate({ ...common, expenseRatioPct: v.feeB });
  const gap = costGap(a, b);
  const cheaper = a.futureValue >= b.futureValue ? "A" : "B";

  return (
    <div>
      <div className="card">
        <div className="field-grid">
          <NumberField label="毎月の積立額" unit="円" value={v.monthly} onChange={set("monthly")} min={0} step="1000" />
          <NumberField label="積立年数" unit="年" value={v.years} onChange={set("years")} min={0} step="1" />
          <NumberField label="想定年率リターン" unit="%" value={v.annualReturnPct} onChange={set("annualReturnPct")} />
          <div />
          <NumberField label="信託報酬A（低コスト例）" unit="%" value={v.feeA} onChange={set("feeA")} min={0} />
          <NumberField label="信託報酬B（高コスト例）" unit="%" value={v.feeB} onChange={set("feeB")} min={0} />
        </div>
      </div>

      <div className="section-gap" />
      <ResultCard title="シミュレーション結果（概算）">
        <ul>
          <li><span>元本（積立総額）</span><span className="v">{yen(a.principal)} 円</span></li>
          <li><span>ファンドA（信託報酬{v.feeA}%）将来資産</span><span className="v">{yen(a.futureValue)} 円</span></li>
          <li><span>ファンドB（信託報酬{v.feeB}%）将来資産</span><span className="v">{yen(b.futureValue)} 円</span></li>
          <li className="total"><span>コスト差で生まれる差額</span><span className="v">{yen(gap)} 円</span></li>
        </ul>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: "#5b6470" }}>
          信託報酬の低い「ファンド{cheaper}」が約 {yen(gap)} 円多く残る概算です（信託報酬A で失う額の目安：{yen(a.feeDrag)} 円）。
        </p>
      </ResultCard>

      <div className="section-gap" />
      <Disclosure />
      <p className="aff-note" style={{ marginTop: 10 }}>
        ※想定リターンは仮定値で将来を保証しません。投資信託は元本割れの可能性があります。本ツールは概算で、特定商品の推奨ではありません。
      </p>

      <div className="section-gap" />
      <AdSlot minHeight={280} />
    </div>
  );
}
