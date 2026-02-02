import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock @/auth BEFORE any other imports to prevent next-auth from loading next/server
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import { completeEnrollment } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/lib/prisma', () => ({
  default: {
    enrollment: {
      update: vi.fn(),
    },
  },
}))

describe('Enrollment Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('受講を完了状態に更新できること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1' }
    })
    
    await completeEnrollment('course1')
    
    expect(prisma.enrollment.update).toHaveBeenCalledWith({
      where: {
        userId_courseId: {
          userId: 'user1',
          courseId: 'course1',
        },
      },
      data: {
        status: 'COMPLETED',
        completedAt: expect.any(Date),
      },
    })
  })

  it('未認証の場合はエラーを投げること', async () => {
    ;(auth as any).mockResolvedValue(null)
    
    await expect(completeEnrollment('course1')).rejects.toThrow(/Unauthorized/i)
  })
})