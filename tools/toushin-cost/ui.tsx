"use client";
import { useState } from "react";
import { NumberField, ResultCard, AdSlot, Disclosure } from "@factory/ui";
import { simulate, costGap, yen, type FundInput } from "./logic";

// 代表的なファンドの信託報酬（年率・税込、2026年時点の参考値）。最新は各社の交付目論見書で確認。
// 出典まとめ例：ダイヤモンドZai 信託報酬比較（https://diamond.jp/zai/articles/-/131949）。
const FUND_PRESETS: { label: string; fee: number | null }[] = [
  { label: "手動入力", fee: null },
  { label: "eMAXIS Slim オルカン", fee: 0.05775 },
  { label: "eMAXIS Slim S&P500", fee: 0.0814 },
  { label: "SBI・V・S&P500", fee: 0.0938 },
  { label: "ひふみプラス", fee: 1.078 },
  { label: "高コスト投信(例)", fee: 1.65 },
];
const fundName = (fee: number): string => FUND_PRESETS.find((p) => p.fee === fee)?.label ?? "手動入力";

interface State { monthly: number; years: number; annualReturnPct: number; feeA: number; feeB: number; }
const initial: State = { monthly: 30000, years: 20, annualReturnPct: 5, feeA: 0.05775, feeB: 1.65 };

export default function ToushinCostTool() {
  const [v, setV] = useState<State>(initial);
  const set = (k: keyof State) => (n: number | "") => setV((s) => ({ ...s, [k]: n === "" ? 0 : n }));
  const pickPreset = (k: "feeA" | "feeB") => (label: string) => {
    const p = FUND_PRESETS.find((x) => x.label === label);
    if (p && p.fee != null) setV((s) => ({ ...s, [k]: p.fee as number }));
  };

  const common: Omit<FundInput, "expenseRatioPct"> = { monthly: v.monthly, years: v.years, annualReturnPct: v.annualReturnPct };
  const a = simulate({ ...common, expenseRatioPct: v.feeA });
  const b = simulate({ ...common, expenseRatioPct: v.feeB });
  const gap = costGap(a, b);
  const cheaperName = a.futureValue >= b.futureValue ? fundName(v.feeA) : fundName(v.feeB);

  return (
    <div>
      <div className="card">
        <div className="field-grid">
          <NumberField label="毎月の積立額" unit="円" value={v.monthly} onChange={set("monthly")} min={0} step="1000" />
          <NumberField label="積立年数" unit="年" value={v.years} onChange={set("years")} min={0} step="1" />
          <NumberField label="想定年率リターン" unit="%" value={v.annualReturnPct} onChange={set("annualReturnPct")} />
          <div />
          <label className="field">
            <span className="label">ファンドA を選ぶ</span>
            <select value={fundName(v.feeA)} onChange={(e) => pickPreset("feeA")(e.target.value)}>
              {FUND_PRESETS.map((p) => (
                <option key={p.label} value={p.label}>{p.fee == null ? p.label : `${p.label}（${p.fee}%）`}</option>
              ))}
            </select>
          </label>
          <NumberField label="信託報酬A（%・手入力可）" unit="%" value={v.feeA} onChange={set("feeA")} min={0} />
          <label className="field">
            <span className="label">ファンドB を選ぶ</span>
            <select value={fundName(v.feeB)} onChange={(e) => pickPreset("feeB")(e.target.value)}>
              {FUND_PRESETS.map((p) => (
                <option key={p.label} value={p.label}>{p.fee == null ? p.label : `${p.label}（${p.fee}%）`}</option>
              ))}
            </select>
          </label>
          <NumberField label="信託報酬B（%・手入力可）" unit="%" value={v.feeB} onChange={set("feeB")} min={0} />
        </div>
        <p className="aff-note" style={{ marginTop: 10 }}>
          プリセットの信託報酬は2026年時点の参考値（年率・税込）。最新・正確な値は各社の交付目論見書でご確認ください。
          比較まとめの例：<a href="https://diamond.jp/zai/articles/-/131949" target="_blank" rel="nofollow noopener">信託報酬比較（ダイヤモンドZai）</a>
        </p>
      </div>

      <div className="section-gap" />
      <ResultCard title="シミュレーション結果（概算）">
        <ul>
          <li><span>元本（積立総額）</span><span className="v">{yen(a.principal)} 円</span></li>
          <li><span>{fundName(v.feeA)}（{v.feeA}%）</span><span className="v">{yen(a.futureValue)} 円</span></li>
          <li><span>{fundName(v.feeB)}（{v.feeB}%）</span><span className="v">{yen(b.futureValue)} 円</span></li>
          <li className="total"><span>コスト差で生まれる差額</span><span className="v">{yen(gap)} 円</span></li>
        </ul>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: "#5b6470" }}>
          信託報酬の低い「{cheaperName}」が約 {yen(gap)} 円多く残る概算です（{fundName(v.feeA)} が手数料で失う額の目安：{yen(a.feeDrag)} 円）。
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
