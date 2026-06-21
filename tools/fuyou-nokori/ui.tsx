"use client";
import { useState } from "react";
import { NumberField, ResultCard, AdSlot, Disclosure } from "@factory/ui";
import { calcWall, yen, dec1, type WallInput } from "./logic";

// 「壁」の目安額（2026年時点）。制度改正で変動するため、最新は勤務先・公的機関で確認。手動入力も可。
// 各壁のかんたん解説は下の本文（content.mdx）にも掲載。
const WALL_PRESETS: { label: string; yen: number | null }[] = [
  { label: "手動入力", yen: null },
  { label: "106万円：自分が社会保険に加入する場合あり", yen: 1_060_000 },
  { label: "123万円：自分に所得税がかかり始める", yen: 1_230_000 },
  { label: "130万円：家族の社会保険の扶養から外れる", yen: 1_300_000 },
  { label: "160万円：配偶者特別控除が満額の上限(目安)", yen: 1_600_000 },
];
const wallLabel = (y: number): string => WALL_PRESETS.find((p) => p.yen === y)?.label ?? "手動入力";

interface State { wallYen: number; earnedYen: number; remainingMonths: number; hourlyWage: number; }
const initial: State = { wallYen: 1_300_000, earnedYen: 600_000, remainingMonths: 6, hourlyWage: 1100 };

export default function FuyouNokoriTool() {
  const [v, setV] = useState<State>(initial);
  const set = (k: keyof State) => (n: number | "") => setV((s) => ({ ...s, [k]: n === "" ? 0 : n }));
  const pickWall = (label: string) => {
    const p = WALL_PRESETS.find((x) => x.label === label);
    if (p && p.yen != null) setV((s) => ({ ...s, wallYen: p.yen as number }));
  };
  const r = calcWall(v as WallInput);
  const man = Math.round(v.wallYen / 10000);

  return (
    <div>
      <p className="tool-intro">
        「<strong>すでに稼いだ額</strong>」と「<strong>残り月数</strong>」から、選んだ壁まで
        <strong>あといくら・毎月いくら・週何時間まで働けるか</strong>を計算します（年収は1〜12月の合計が基準）。
        各壁の意味は下の「かんたん解説」を参照。
      </p>
      <div className="card">
        <div className="field-grid">
          <label className="field">
            <span className="label">目標の壁を選ぶ</span>
            <select value={wallLabel(v.wallYen)} onChange={(e) => pickWall(e.target.value)}>
              {WALL_PRESETS.map((p) => (
                <option key={p.label} value={p.label}>{p.label}</option>
              ))}
            </select>
          </label>
          <NumberField label="目標の壁（円・手入力可）" unit="円" value={v.wallYen} onChange={set("wallYen")} min={0} step="10000" />
          <NumberField label="すでに稼いだ額（年初から）" unit="円" value={v.earnedYen} onChange={set("earnedYen")} min={0} step="10000" />
          <NumberField label="残り月数（その年の12月まで等）" unit="ヶ月" value={v.remainingMonths} onChange={set("remainingMonths")} min={0} step="1" />
          <NumberField label="時給" unit="円" value={v.hourlyWage} onChange={set("hourlyWage")} min={0} step="10" />
        </div>
      </div>

      <div className="section-gap" />
      <ResultCard title={r.over ? "結果：すでに壁を超えています" : "あといくら・何時間まで働ける？（概算）"}>
        {r.over ? (
          <p style={{ margin: 0 }}>
            設定した壁を <strong>{yen(Math.abs(r.remainingYen))} 円</strong> 超えています。壁の種類や対策は勤務先・専門家にご確認ください。
          </p>
        ) : (
          <ul>
            <li><span>残り稼げる額（今年）</span><span className="v">{yen(r.remainingYen)} 円</span></li>
            <li><span>今月から毎月の上限</span><span className="v">{yen(r.perMonthYen)} 円</span></li>
            <li><span>毎月の上限労働時間</span><span className="v">{dec1(r.monthlyHours)} 時間</span></li>
            <li className="total"><span>週あたりの上限時間</span><span className="v">{dec1(r.weeklyHours)} 時間</span></li>
          </ul>
        )}
        {!r.over && (
          <p style={{ margin: "10px 0 0", fontSize: 13, color: "#5b6470" }}>
            残り{v.remainingMonths}ヶ月で {man}万円 に収めるなら、毎月 約{yen(r.perMonthYen)}円（週 約{dec1(r.weeklyHours)}時間）が上限の目安です。
          </p>
        )}
      </ResultCard>

      <div className="section-gap" />
      <Disclosure />
      <p className="aff-note" style={{ marginTop: 10 }}>
        ※年収は1〜12月の合計が基準（交通費等の扱いは制度により異なる）。「壁」の金額・条件は制度改正で変わり、社会保険は勤務先の規模等にもよります。本ツールは概算で、最終判断は勤務先や専門家にご確認ください。
      </p>

      <div className="section-gap" />
      <AdSlot minHeight={280} />
    </div>
  );
}
