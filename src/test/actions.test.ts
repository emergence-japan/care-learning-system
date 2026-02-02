import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock @/auth BEFORE any other imports to prevent next-auth from loading next/server
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import { completeEnrollment, submitTestResults } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/lib/prisma', () => ({
  default: {
    enrollment: {
      update: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
    },
  },
}))

describe('Enrollment Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('テストに全問正解した場合、合格（isPassed: true）を返し、ステータスを更新すること', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1' }
    })
    
    ;(prisma.course.findUnique as any).mockResolvedValue({
      id: 'course1',
      questions: [
        { id: 'q1', choices: [{ id: 'c1', isCorrect: true }] }
      ]
    })
    
    const result = await submitTestResults('course1', { 'q1': 'c1' })
    
    expect(result.isPassed).toBe(true)
    expect(prisma.enrollment.update).toHaveBeenCalled()
  })

  it('テストに不正解がある場合、不合格（isPassed: false）を返し、ステータスを更新しないこと', async () => {
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1' }
    })
    
    ;(prisma.course.findUnique as any).mockResolvedValue({
      id: 'course1',
      questions: [
        { id: 'q1', choices: [{ id: 'c1', isCorrect: true }] }
      ]
    })
    
    const result = await submitTestResults('course1', { 'q1': 'wrong' })
    
    expect(result.isPassed).toBe(false)
    expect(prisma.enrollment.update).not.toHaveBeenCalled()
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
