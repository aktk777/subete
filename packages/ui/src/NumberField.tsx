"use client";
/** 数値入力。最小実装（バリデーションは各ツールで補う）。見た目は globals.css の `.field` が担当。 */
export function NumberField({
  label, value, onChange, unit, step = "any", min,
}: { label: string; value: number | ""; onChange: (v: number | "") => void; unit?: string; step?: string; min?: number }) {
  return (
    <label className="field">
      <span className="label">{label}{unit ? `（${unit}）` : ""}</span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      />
    </label>
  );
}
