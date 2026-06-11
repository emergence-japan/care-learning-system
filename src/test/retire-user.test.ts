import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock @/auth BEFORE any other imports
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import { retireUser } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    // 退職処理は論理削除なので、これらは「呼ばれないこと」を検証する
    enrollment: {
      deleteMany: vi.fn(),
    },
    inquiry: {
      deleteMany: vi.fn(),
    },
    inquiryReply: {
      deleteMany: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('retireUser (論理削除/退職処理)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(prisma.user.update as any).mockResolvedValue({ id: 'staff1', deletedAt: new Date() })
  })

  it('ADMINが同一施設のスタッフを退職処理できること（deletedAtをセット）', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.user.findUnique as any).mockResolvedValue({ facilityId: 'f1', role: 'STAFF' })

    const result = await retireUser('staff1')

    expect(result).toEqual({ success: true })
    expect(prisma.user.update).toHaveBeenCalledTimes(1)
    const updateArgs = (prisma.user.update as any).mock.calls[0][0]
    expect(updateArgs.where).toEqual({ id: 'staff1' })
    expect(updateArgs.data.deletedAt).toBeInstanceOf(Date)
  })

  it('退職処理では受講記録(Enrollment)を物理削除しないこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.user.findUnique as any).mockResolvedValue({ facilityId: 'f1', role: 'STAFF' })

    await retireUser('staff1')

    expect(prisma.enrollment.deleteMany).not.toHaveBeenCalled()
    expect(prisma.inquiry.deleteMany).not.toHaveBeenCalled()
    expect(prisma.inquiryReply.deleteMany).not.toHaveBeenCalled()
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('HQが同一法人のユーザーを退職処理できること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', role: 'HQ', corporationId: 'corp1' },
    })
    ;(prisma.user.findUnique as any).mockResolvedValue({ corporationId: 'corp1' })

    const result = await retireUser('staff1')

    expect(result).toEqual({ success: true })
    expect(prisma.user.update).toHaveBeenCalledTimes(1)
  })

  it('SUPER_ADMINは誰でも退職処理できること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'super1', role: 'SUPER_ADMIN' },
    })

    const result = await retireUser('staff1')

    expect(result).toEqual({ success: true })
    expect(prisma.user.update).toHaveBeenCalledTimes(1)
  })

  it('ADMINが別施設のスタッフを退職処理しようとするとForbiddenErrorを投げること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.user.findUnique as any).mockResolvedValue({ facilityId: 'other-facility', role: 'STAFF' })

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })

  it('ADMINが同一施設の別の管理者(ADMIN)を退職処理しようとするとForbiddenErrorを投げること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    // 同一施設だがロールが ADMIN（STAFF ではない）
    ;(prisma.user.findUnique as any).mockResolvedValue({ facilityId: 'f1', role: 'ADMIN' })

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })

  it('利用停止中(isSuspended)のADMIN/HQは退職処理できないこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1', isSuspended: true },
    })

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })

  it('HQが別法人のユーザーを退職処理しようとするとForbiddenErrorを投げること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', role: 'HQ', corporationId: 'corp1' },
    })
    ;(prisma.user.findUnique as any).mockResolvedValue({ corporationId: 'other-corp' })

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })

  it('未認証の場合はUnauthorizedErrorを投げること', async () => {
    ;(auth as any).mockResolvedValue(null)

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })

  it('STAFFロールは退職処理できないこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'staff2', role: 'STAFF', facilityId: 'f1' },
    })

    await expect(retireUser('staff1')).rejects.toThrow()
    expect(prisma.user.update).not.toHaveBeenCalled()
  })
})
