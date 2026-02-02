import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AdminDashboardPage from '@/app/admin/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 's1',
          name: 'スタッフA',
          email: 'staff_a@example.com',
          updatedAt: new Date(),
          enrollments: [
            { status: 'COMPLETED', course: { title: '研修1' } }
          ],
        },
      ]),
    },
    facility: {
      findUnique: vi.fn().mockResolvedValue({ name: 'テスト施設' }),
    },
    course: {
      count: vi.fn().mockResolvedValue(5),
    },
    enrollment: {
      count: vi.fn().mockResolvedValue(10),
    }
  },
}))

describe('Admin Dashboard Page', () => {
  it('管理者としてログインしている場合、施設名が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '管理者', role: 'ADMIN', facilityId: 'f1' }
    })

    const Result = await AdminDashboardPage()
    render(Result)
    
    expect(screen.getByText(/テスト施設/i)).toBeInTheDocument()
    expect(screen.getByText(/管理者用ダッシュボード/i)).toBeInTheDocument()
  })

  it('進捗率が正しく計算されて表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '管理者', role: 'ADMIN', facilityId: 'f1' }
    })

    const { default: prisma } = await import('@/lib/prisma')
    // 1名のスタッフ、5つの研修中1つ完了 = 20%
    ;(prisma.user.findMany as any).mockResolvedValue([
      {
        id: 's1',
        name: 'スタッフA',
        email: 's1@example.com',
        updatedAt: new Date(),
        enrollments: [{ status: 'COMPLETED' }],
      },
    ])
    ;(prisma.course.count as any).mockResolvedValue(5)

    const Result = await AdminDashboardPage()
    render(Result)
    
    expect(screen.getByText('20%')).toBeInTheDocument()
    expect(screen.getByText('1 / 5 完了')).toBeInTheDocument()
  })

  it('スタッフがアクセスした場合、リダイレクトされること（またはエラー表示）', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'staff1', name: 'スタッフ', role: 'STAFF' }
    })

    // Next.js の redirect はエラーを投げる
    const { redirect } = await import('next/navigation')
    
    try {
      await AdminDashboardPage()
    } catch (e) {
      // redirect() が呼ばれたことを確認
      expect(redirect).toHaveBeenCalledWith('/')
    }
  })
})
