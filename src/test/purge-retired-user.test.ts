import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock @/auth BEFORE any other imports
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import { deleteUser, getPurgeableStaff } from '@/lib/actions/user'
import { RETENTION_YEARS } from '@/lib/retention'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
    enrollment: { deleteMany: vi.fn() },
    inquiry: { deleteMany: vi.fn() },
    inquiryReply: { deleteMany: vi.fn() },
    $transaction: vi.fn(),
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// 退職日が N 年前の Date を作るヘルパー
function yearsAgo(years: number): Date {
  const d = new Date()
  d.setFullYear(d.getFullYear() - years)
  // 境界の揺らぎを避けるため 1 日余分に引く
  d.setDate(d.getDate() - 1)
  return d
}

describe('deleteUser (物理削除/保持期間ガード)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(prisma.$transaction as any).mockResolvedValue([])
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
  })

  it('保持期間を超えた退職者は物理削除できること', async () => {
    // 権限チェック用 findUnique（ADMIN→同一施設STAFF）と deletedAt 取得を両方賄う
    ;(prisma.user.findUnique as any).mockResolvedValue({
      facilityId: 'f1',
      role: 'STAFF',
      deletedAt: yearsAgo(RETENTION_YEARS + 1),
    })

    const result = await deleteUser('staff1')

    expect(result).toEqual({ success: true })
    expect(prisma.$transaction).toHaveBeenCalledTimes(1)
  })

  it('在職中(deletedAt=null)のユーザーは物理削除できないこと', async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue({
      facilityId: 'f1',
      role: 'STAFF',
      deletedAt: null,
    })

    await expect(deleteUser('staff1')).rejects.toThrow()
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('退職して間もない(保持期間未満)のユーザーは物理削除できないこと', async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue({
      facilityId: 'f1',
      role: 'STAFF',
      deletedAt: yearsAgo(1),
    })

    await expect(deleteUser('staff1')).rejects.toThrow()
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('権限がない場合は保持期間に関わらず削除できないこと', async () => {
    // 別施設のスタッフ
    ;(prisma.user.findUnique as any).mockResolvedValue({
      facilityId: 'other-facility',
      role: 'STAFF',
      deletedAt: yearsAgo(RETENTION_YEARS + 1),
    })

    await expect(deleteUser('staff1')).rejects.toThrow()
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })
})

describe('getPurgeableStaff (保持期間経過者の一覧取得)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ADMINが自施設の保持期間経過スタッフ一覧を取得できること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.user.findMany as any).mockResolvedValue([
      { id: 'staff1', name: '退職 太郎', loginId: 'taro', deletedAt: yearsAgo(6) },
    ])

    const result = await getPurgeableStaff()

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('staff1')
    // 自施設に限定して取得していること
    const findArgs = (prisma.user.findMany as any).mock.calls[0][0]
    expect(findArgs.where.facilityId).toBe('f1')
    // deletedAt が保持期間より前であること（lt 条件）
    expect(findArgs.where.deletedAt.lt).toBeInstanceOf(Date)
  })

  it('STAFFロールは一覧を取得できないこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'staff2', role: 'STAFF', facilityId: 'f1' },
    })

    await expect(getPurgeableStaff()).rejects.toThrow()
    expect(prisma.user.findMany).not.toHaveBeenCalled()
  })

  it('未認証の場合は取得できないこと', async () => {
    ;(auth as any).mockResolvedValue(null)

    await expect(getPurgeableStaff()).rejects.toThrow()
    expect(prisma.user.findMany).not.toHaveBeenCalled()
  })
})
