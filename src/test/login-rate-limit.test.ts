import { describe, it, expect, beforeEach } from 'vitest'
import {
  isLockedOut,
  recordLoginFailure,
  clearLoginFailures,
} from '@/lib/login-rate-limit'

const KEY = 'test-user'
const BASE = 1_000_000

describe('Login Rate Limit', () => {
  beforeEach(() => {
    clearLoginFailures(KEY)
  })

  it('失敗が5回未満ではロックされないこと', () => {
    for (let i = 0; i < 4; i++) {
      recordLoginFailure(KEY, BASE)
    }
    expect(isLockedOut(KEY, BASE)).toBe(false)
  })

  it('5回連続で失敗するとロックされること', () => {
    for (let i = 0; i < 5; i++) {
      recordLoginFailure(KEY, BASE)
    }
    expect(isLockedOut(KEY, BASE)).toBe(true)
  })

  it('15分経過するとロックが解除されること', () => {
    for (let i = 0; i < 5; i++) {
      recordLoginFailure(KEY, BASE)
    }
    const after15min = BASE + 15 * 60 * 1000
    expect(isLockedOut(KEY, after15min)).toBe(false)
  })

  it('成功時にカウントがリセットされること', () => {
    for (let i = 0; i < 5; i++) {
      recordLoginFailure(KEY, BASE)
    }
    clearLoginFailures(KEY)
    expect(isLockedOut(KEY, BASE)).toBe(false)
  })

  it('ウィンドウ期限切れ後の失敗は新しいウィンドウとして数えること', () => {
    for (let i = 0; i < 5; i++) {
      recordLoginFailure(KEY, BASE)
    }
    const after15min = BASE + 15 * 60 * 1000
    recordLoginFailure(KEY, after15min)
    expect(isLockedOut(KEY, after15min)).toBe(false)
  })
})
