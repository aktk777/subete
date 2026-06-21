/**
 * 扶養の壁「あといくら働ける」— 残り年収枠と毎月/週の上限を計算する決定論的な純関数。
 * 税・社会保険の扶養判定は勤務先・制度・年により異なる。本ツールは概算で個別助言ではない。
 * 「壁」の金額はユーザー入力（プリセットは目安）。同じ入力なら同じ出力。
 */
export interface WallInput {
  wallYen: number;         // 目標の壁(円)
  earnedYen: number;       // 既に稼いだ額(円・年初からの累計)
  remainingMonths: number; // 残り月数(その年の12月まで等)
  hourlyWage: number;      // 時給(円)
}

export interface WallResult {
  remainingYen: number;  // 残り稼げる額(壁 − 既稼ぎ。負なら超過)
  over: boolean;         // すでに壁を超えているか
  perMonthYen: number;   // 今月から毎月いくらまで
  monthlyHours: number;  // 毎月の上限労働時間
  weeklyHours: number;   // 週あたりの上限労働時間
}

const WEEKS_PER_MONTH = 52 / 12; // ≈4.3333

export function calcWall(i: WallInput): WallResult {
  const remainingYen = i.wallYen - i.earnedYen;
  const over = remainingYen < 0;
  const left = Math.max(0, remainingYen);
  const perMonthYen = i.remainingMonths > 0 ? left / i.remainingMonths : 0;
  const monthlyHours = i.hourlyWage > 0 ? perMonthYen / i.hourlyWage : 0;
  const weeklyHours = monthlyHours / WEEKS_PER_MONTH;
  return { remainingYen, over, perMonthYen, monthlyHours, weeklyHours };
}

export function yen(n: number): string { return Math.round(n).toLocaleString("ja-JP"); }
export function dec1(n: number): string { return (Math.round(n * 10) / 10).toLocaleString("ja-JP"); }
