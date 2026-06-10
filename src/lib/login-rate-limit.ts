/**
 * ログイン試行のレート制限（インメモリ）。
 * 同一ログインIDで MAX_ATTEMPTS 回連続で失敗すると、WINDOW_MS の間ロックする。
 *
 * 注意: サーバーレス環境ではインスタンスごとに独立したカウントになるため、
 * 完全な防御ではなく総当たり攻撃の抑止が目的。厳密な制御が必要になったら
 * Upstash Redis 等の外部ストアに置き換えること。
 */

const WINDOW_MS = 15 * 60 * 1000; // 15分
const MAX_ATTEMPTS = 5;

interface AttemptEntry {
  count: number;
  firstAttemptAt: number;
}

const attempts = new Map<string, AttemptEntry>();

function isExpired(entry: AttemptEntry, now: number): boolean {
  return now - entry.firstAttemptAt >= WINDOW_MS;
}

export function isLockedOut(key: string, now: number = Date.now()): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (isExpired(entry, now)) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(key: string, now: number = Date.now()): void {
  const entry = attempts.get(key);
  if (!entry || isExpired(entry, now)) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    return;
  }
  attempts.set(key, { ...entry, count: entry.count + 1 });
}

export function clearLoginFailures(key: string): void {
  attempts.delete(key);
}

export const LOGIN_LOCKOUT_MESSAGE =
  "ログイン試行回数が上限に達しました。15分ほど待ってから再試行してください。";
