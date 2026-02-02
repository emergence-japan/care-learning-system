import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HQDashboardPage from '@/app/hq/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    corporation: {
      findUnique: vi.fn().mockResolvedValue({ 
        name: 'テスト法人',
        facilities: [
          { id: 'f1', name: '施設A', users: [] },
          { id: 'f2', name: '施設B', users: [] },
        ]
      }),
    },
    course: {
      count: vi.fn().mockResolvedValue(2),
    }
  },
}))

describe('HQ Dashboard Page', () => {
  it('法人本部としてログインしている場合、法人名と施設一覧が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', name: '本部ユーザー', role: 'HQ', corporationId: 'corp1' }
    })

    const Result = await HQDashboardPage()
    render(Result)
    
    expect(screen.getByText(/テスト法人/i)).toBeInTheDocument()
    expect(screen.getByText(/施設A/i)).toBeInTheDocument()
    expect(screen.getByText(/施設B/i)).toBeInTheDocument()
  })

  it('施設管理者がアクセスした場合、リダイレクトされること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '施設長', role: 'ADMIN' }
    })

    const { redirect } = await import('next/navigation')
    
    try {
      await HQDashboardPage()
    } catch (e) {
      expect(redirect).toHaveBeenCalledWith('/')
    }
  })
})
