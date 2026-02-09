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
    course: {
      findMany: vi.fn(),
    },
    enrollment: {
      createMany: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Staff Registration Action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('新しいスタッフを登録し、全ての研修を割り当てることができること', async () => {
    // 管理者としてログイン
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' }
    })
    
    // メール重複なし
    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    
    // 作成されるユーザー
    ;(prisma.user.create as any).mockResolvedValue({ id: 'new-staff-id' })
    
    // 既存の研修
    ;(prisma.course.findMany as any).mockResolvedValue([
      { id: 'c1' }, { id: 'c2' }
    ])
    
    const formData = new FormData()
    formData.append('name', '新スタッフ')
    formData.append('loginId', 'new_staff')
    formData.append('email', 'new@example.com')
    formData.append('password', 'password123')
    
    const result = await registerStaff(formData)
    
    expect(result).toBeUndefined() // 成功時はエラーメッセージなし
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: '新スタッフ',
        loginId: 'new_staff',
        email: 'new@example.com',
        facilityId: 'f1',
        role: 'STAFF',
      })
    })
    expect(prisma.enrollment.createMany).toHaveBeenCalledWith({
      data: [
        { userId: 'new-staff-id', courseId: 'c1', status: 'NOT_STARTED' },
        { userId: 'new-staff-id', courseId: 'c2', status: 'NOT_STARTED' },
      ]
    })
  })

  it('ログインIDが重複している場合はエラーを返すこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', role: 'ADMIN', facilityId: 'f1' }
    })
    
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
})
