/** PR表記（ステマ規制）。アフィリ/広告を含むページに必ず置く。見た目は globals.css の `.disclosure`。 */
export function Disclosure() {
  return (
    <p className="disclosure">
      本ページは広告（アフィリエイトリンク）を含みます。計算結果は概算であり正確性を保証しません。最終的な判断はご自身または専門家にご確認ください。
    </p>
  );
}
