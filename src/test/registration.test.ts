import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock @/auth BEFORE any other imports
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import { registerStaff } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    facility: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

const mockFacility = {
  id: 'f1',
  name: 'テスト施設',
  corporationId: 'corp1',
  maxStaff: 20,
  _count: { users: 3 },
}

describe('Staff Registration Action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('新しいスタッフをハッシュ化パスワードで登録できること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.facility.findUnique as any).mockResolvedValue(mockFacility)
    // ログインID重複なし
    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    ;(prisma.user.create as any).mockResolvedValue({ id: 'new-staff-id' })

    const formData = new FormData()
    formData.append('name', '新スタッフ')
    formData.append('loginId', 'new_staff')
    formData.append('password', 'password123')

    const result = await registerStaff(formData)

    expect(result).toBeUndefined() // 成功時はエラーメッセージなし
    expect(prisma.user.create).toHaveBeenCalledTimes(1)

    const createArgs = (prisma.user.create as any).mock.calls[0][0]
    expect(createArgs.data).toMatchObject({
      name: '新スタッフ',
      loginId: 'new_staff',
      role: 'STAFF',
      facilityId: 'f1',
      corporationId: 'corp1',
    })
    // パスワードは平文で保存されないこと
    expect(createArgs.data.password).not.toBe('password123')
    expect(createArgs.data.password).toMatch(/^\$2[aby]\$/)
  })

  it('パスワードが8文字未満の場合はエラーを返すこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.facility.findUnique as any).mockResolvedValue(mockFacility)

    const formData = new FormData()
    formData.append('name', 'テスト')
    formData.append('loginId', 'short_pw')
    formData.append('password', 'pass123') // 7文字

    const result = await registerStaff(formData)

    expect(result).toBe('パスワードは8文字以上で入力してください。')
    expect(prisma.user.create).not.toHaveBeenCalled()
  })

  it('ログインIDが重複している場合はエラーを返すこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.facility.findUnique as any).mockResolvedValue(mockFacility)
    // 既に存在するユーザー
    ;(prisma.user.findUnique as any).mockResolvedValue({ id: 'existing' })

    const formData = new FormData()
    formData.append('name', 'テスト')
    formData.append('loginId', 'existing_id')
    formData.append('password', 'password')

    const result = await registerStaff(formData)

    expect(result).toBe('このログインIDは既に登録されています。別のIDを指定してください。')
    expect(prisma.user.create).not.toHaveBeenCalled()
  })

  it('スタッフ登録枠の上限に達している場合はエラーを返すこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' },
    })
    ;(prisma.facility.findUnique as any).mockResolvedValue({
      ...mockFacility,
      _count: { users: 20 }, // maxStaff と同数
    })

    const formData = new FormData()
    formData.append('name', 'テスト')
    formData.append('loginId', 'over_limit')
    formData.append('password', 'password')

    const result = await registerStaff(formData)

    expect(result).toBe('施設のスタッフ登録枠の上限（20名）に達しています。')
    expect(prisma.user.create).not.toHaveBeenCalled()
  })
})
