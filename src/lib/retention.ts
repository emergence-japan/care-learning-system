// 退職者の受講記録を保持する年数。これを過ぎるまで物理削除は許可しない。
// 介護施設の研修記録の保存期間（自治体条例で2〜5年が一般的）の上限に合わせる。
export const RETENTION_YEARS = 5;

// 「これより前に退職した人は保持期間経過」となる基準日時。
export function retentionCutoff(now: Date = new Date()): Date {
  const cutoff = new Date(now);
  cutoff.setFullYear(cutoff.getFullYear() - RETENTION_YEARS);
  return cutoff;
}

// 退職日が「保持期間を経過した」かどうかを判定する。
// deletedAt が null（在職中）の場合は false。
export function isPastRetention(deletedAt: Date | null, now: Date = new Date()): boolean {
  if (!deletedAt) return false;
  return deletedAt < retentionCutoff(now);
}
