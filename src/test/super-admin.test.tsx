import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SuperAdminDashboardPage from '@/app/super-admin/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signOut: vi.fn(),
}))

// SystemNotification は async サーバーコンポーネントのため JSDOM では描画できない
vi.mock('@/components/system-notification', () => ({
  SystemNotification: () => null,
}))

// Mock prisma（統計カウント）
vi.mock('@/lib/prisma', () => ({
  default: {
    corporation: { count: vi.fn().mockResolvedValue(3) },
    facility: { count: vi.fn().mockResolvedValue(5) },
    user: { count: vi.fn().mockResolvedValue(42) },
    course: { count: vi.fn().mockResolvedValue(13) },
    inquiry: { count: vi.fn().mockResolvedValue(2) },
  },
}))

describe('Super Admin Dashboard Page', () => {
  it('システム管理者としてログインしている場合、タイトルと統計が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'sa1', name: 'システム管理者', role: 'SUPER_ADMIN' },
    })

    const Result = await SuperAdminDashboardPage()
    render(Result)

    expect(screen.getAllByText(/システム管理画面/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/総法人数/i)).toBeInTheDocument()
  })

  it('法人本部ユーザーがアクセスした場合、リダイレクトされること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', name: '本部', role: 'HQ' },
    })

    const { redirect } = await import('next/navigation')
    await SuperAdminDashboardPage()

    expect(redirect).toHaveBeenCalledWith('/')
  })
})
