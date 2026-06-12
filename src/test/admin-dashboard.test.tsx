import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AdminDashboardPage from '@/app/admin/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signOut: vi.fn(),
}))

// SystemNotification は async サーバーコンポーネントのため JSDOM では描画できない
vi.mock('@/components/system-notification', () => ({
  SystemNotification: () => null,
}))

// 保持期間経過スタッフの取得はこのページテストの関心事ではないので空で返す
vi.mock('@/lib/actions/user', () => ({
  getPurgeableStaff: vi.fn().mockResolvedValue([]),
}))

const now = new Date('2026-01-01')

const mockFacility = {
  id: 'f1',
  name: 'テスト施設',
  type: null,
  maxStaff: 20,
  isActive: true,
  corporation: {
    id: 'corp1',
    name: 'テスト法人',
    fiscalYearStartMonth: 4,
    isActive: true,
  },
}

const mockCourse = {
  id: 'c1',
  title: '研修1',
  createdAt: now,
  updatedAt: now,
}

const mockStaff = [
  {
    id: 's1',
    name: 'スタッフA',
    loginId: 'staff_a',
    createdAt: now,
    updatedAt: now,
    enrollments: [
      {
        id: 'e1',
        userId: 's1',
        courseId: 'c1',
        assignmentId: 'a1',
        status: 'COMPLETED',
        completedAt: now,
        createdAt: now,
        updatedAt: now,
        course: mockCourse,
      },
    ],
  },
]

const mockAssignments = [
  {
    id: 'a1',
    facilityId: 'f1',
    courseId: 'c1',
    startDate: now,
    endDate: new Date('2099-12-31'),
    createdAt: now,
    updatedAt: now,
    course: mockCourse,
  },
]

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    facility: {
      findUnique: vi.fn(),
    },
    user: {
      findMany: vi.fn(),
    },
    course: {
      findMany: vi.fn(),
    },
    courseAssignment: {
      findMany: vi.fn(),
    },
  },
}))

async function setupMocks() {
  const { default: prisma } = await import('@/lib/prisma')
  ;(prisma.facility.findUnique as any).mockResolvedValue(mockFacility)
  ;(prisma.user.findMany as any).mockResolvedValue(mockStaff)
  ;(prisma.course.findMany as any).mockResolvedValue([mockCourse])
  ;(prisma.courseAssignment.findMany as any).mockResolvedValue(mockAssignments)
}

describe('Admin Dashboard Page', () => {
  it('管理者としてログインしている場合、施設名が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '管理者', role: 'ADMIN', facilityId: 'f1' },
    })
    await setupMocks()

    const Result = await AdminDashboardPage()
    render(Result)

    expect(screen.getByText(/テスト施設/i)).toBeInTheDocument()
  })

  it('割り当てられた研修と完了率が表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'admin1', name: '管理者', role: 'ADMIN', facilityId: 'f1' },
    })
    await setupMocks()

    const Result = await AdminDashboardPage()
    render(Result)

    // 研修管理セクションに研修タイトルが表示される
    expect(screen.getAllByText(/研修1/).length).toBeGreaterThanOrEqual(1)
    // スタッフ1名中1名完了 → 100% 完了
    expect(screen.getByText(/100% 完了/)).toBeInTheDocument()
  })

  it('スタッフがアクセスした場合、リダイレクトされること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'staff1', name: 'スタッフ', role: 'STAFF' },
    })
    await setupMocks()

    const { redirect } = await import('next/navigation')
    await AdminDashboardPage()

    expect(redirect).toHaveBeenCalledWith('/')
  })
})
