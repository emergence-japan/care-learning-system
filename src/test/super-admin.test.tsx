import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SuperAdminDashboardPage from '@/app/super-admin/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

describe('Super Admin Dashboard Page', () => {
  it('システム管理者としてログインしている場合、タイトルが表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'sa1', name: 'システム管理者', role: 'SUPER_ADMIN' }
    })

    const Result = await SuperAdminDashboardPage()
    render(Result)
    
    expect(screen.getByText(/システム全体管理/i)).toBeInTheDocument()
  })

  it('法人本部ユーザーがアクセスした場合、リダイレクトされること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', name: '本部', role: 'HQ' }
    })

    const { redirect } = await import('next/navigation')
    
    try {
      await SuperAdminDashboardPage()
    } catch (e) {
      expect(redirect).toHaveBeenCalledWith('/')
    }
  })
})
