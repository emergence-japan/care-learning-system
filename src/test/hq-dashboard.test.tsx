import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HQDashboardPage from '@/app/hq/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signOut: vi.fn(),
}))

// SystemNotification は async サーバーコンポーネントのため JSDOM では描画できない
vi.mock('@/components/system-notification', () => ({
  SystemNotification: () => null,
}))

const makeFacility = (id: string, name: string) => ({
  id,
  name,
  type: null,
  isActive: true,
  maxStaff: 20,
  corporationId: 'corp1',
  users: [],
  assignments: [],
  _count: { users: 0 },
})

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    corporation: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'corp1',
        name: 'テスト法人',
        fiscalYearStartMonth: 4,
        maxFacilities: 10,
        maxStaff: 100,
        isActive: true,
        _count: { facilities: 2 },
        facilities: [],
      }),
    },
  },
}))

describe('HQ Dashboard Page', () => {
  it('法人本部としてログインしている場合、法人名と施設一覧が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'hq1', name: '本部ユーザー', role: 'HQ', corporationId: 'corp1' },
    })

    const { default: prisma } = await import('@/lib/prisma')
    ;(prisma.corporation.findUnique as any).mockResolvedValue({
      id: 'corp1',
      name: 'テスト法人',
      fiscalYearStartMonth: 4,
      maxFacilities: 10,
      maxStaff: 100,
      isActive: true,
      _count: { facilities: 2 },
      facilities: [makeFacility('f1', '施設A'), makeFacility('f2', '施設B')],
    })

    const Result = await HQDashboardPage()
    render(Result)

    expect(screen.getAllByText(/テスト法人/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/施設A/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/施設B/i).length).toBeGreaterThanOrEqual(1)
  })

  it('施設管理者がアクセスした場合、リダイレクトされること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '施設長', role: 'ADMIN' },
    })

    const { redirect } = await import('next/navigation')
    await HQDashboardPage()

    expect(redirect).toHaveBeenCalledWith('/')
  })
})
