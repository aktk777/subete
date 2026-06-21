"use client";
import { useState } from "react";
import { NumberField, ResultCard, AdSlot, Disclosure } from "@factory/ui";
import { calcLabor, yen, hours, type LaborInput } from "./logic";

const initial: LaborInput = { monthlySales: 3_000_000, avgWage: 1200, targetRatePct: 28, currentMonthlyHours: 800 };

export default function ShiftCostTool() {
  const [v, setV] = useState<LaborInput>(initial);
  const set = (k: keyof LaborInput) => (n: number | "") => setV((s) => ({ ...s, [k]: n === "" ? 0 : n }));
  const r = calcLabor(v);
  const over = r.currentRatePct > v.targetRatePct;

  return (
    <div>
      <p className="tool-intro">
        いまの<strong>売上・平均時給・総労働時間</strong>と<strong>目標の人件費率</strong>から、
        <strong>時給はそのままで「労働時間をあと何時間 増減すればいいか」</strong>を計算します（シフトの時間で調整する前提）。
      </p>

      <div className="card">
        <div className="field-grid">
          <NumberField label="月間売上" unit="円" value={v.monthlySales} onChange={set("monthlySales")} min={0} step="10000" />
          <NumberField label="平均時給" unit="円" value={v.avgWage} onChange={set("avgWage")} min={0} step="10" />
          <NumberField label="現状の月間総労働時間（全員合計）" unit="時間" value={v.currentMonthlyHours} onChange={set("currentMonthlyHours")} min={0} step="1" />
          <NumberField label="目標の人件費率" unit="%" value={v.targetRatePct} onChange={set("targetRatePct")} min={0} />
        </div>
      </div>

      <div className="section-gap" />
      <ResultCard title="計算結果（概算）">
        <h4>① いまの状態（入力した前提）</h4>
        <ul>
          <li><span>現状の人件費</span><span className="v">{yen(r.currentLaborCost)} 円</span></li>
          <li><span>現状の人件費率</span><span className="v">{r.currentRatePct.toFixed(1)}％（目標 {v.targetRatePct}％）</span></li>
        </ul>
        <h4>② 目標の人件費率で使える上限</h4>
        <ul>
          <li><span>使える人件費</span><span className="v">{yen(r.budgetLaborCost)} 円</span></li>
          <li><span>使える総労働時間</span><span className="v">{hours(r.usableHours)} 時間</span></li>
          <li><span>人時売上高（売上÷総労働時間）</span><span className="v">{yen(r.salesPerLaborHour)} 円</span></li>
        </ul>
        <div className="conclusion">
          {over ? (
            <>③ 結論：目標 {v.targetRatePct}％ に収めるには、月の総労働時間を <strong>約 {hours(Math.abs(r.hoursGap))} 時間 減らす</strong>（人件費 約 {yen(Math.abs(r.costGap))} 円の削減）。時給は変えずシフト時間で調整する前提です。</>
          ) : (
            <>③ 結論：現状は目標内です。<strong>あと約 {hours(Math.abs(r.hoursGap))} 時間</strong>（人件費 約 {yen(Math.abs(r.costGap))} 円）増やす余裕があります。</>
          )}
        </div>
      </ResultCard>

      <div className="section-gap" />
      <Disclosure />
      <p className="aff-note" style={{ marginTop: 10 }}>
        ※人件費率の目安は飲食で売上の25〜30%（FL比率55%）。業態・立地で異なります。時給を上げ下げする方法もありますが、本ツールは時給を固定して労働時間で調整する前提の概算です。
      </p>

      <div className="section-gap" />
      <AdSlot minHeight={280} />
    </div>
  );
}
