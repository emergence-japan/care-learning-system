import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPage from '@/app/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    enrollment: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 'e1',
          status: 'NOT_STARTED',
          course: {
            id: 'c1',
            title: '基本的な介護技術',
          },
        },
      ]),
    },
  },
}))

describe('Dashboard Page', () => {
  it('研修一覧という見出しが表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' }
    })

    const Result = await DashboardPage()
    render(Result)
    
    expect(screen.getByText(/研修一覧/i)).toBeInTheDocument()
  })

  it('研修カードに研修タイトルとステータスが表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' }
    })

    const Result = await DashboardPage()
    render(Result)
    
    expect(screen.getByText('基本的な介護技術')).toBeInTheDocument()
    expect(screen.getByText(/未受講/i)).toBeInTheDocument()
  })
})
