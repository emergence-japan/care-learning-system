import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPage from '@/app/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// CourseList / DashboardHeader / ProgressHero は async サーバーコンポーネントのため
// JSDOM では直接レンダリングできない。受け取った props を表示する同期スタブに差し替える。
vi.mock('@/components/dashboard/dashboard-header', () => ({
  DashboardHeader: ({ facilityName, userName }: { facilityName?: string; userName?: string }) => (
    <header>
      <span>{facilityName}</span>
      <span>{userName}</span>
    </header>
  ),
}))

vi.mock('@/components/dashboard/progress-hero', () => ({
  ProgressHero: ({ progressPercentage }: { progressPercentage: number }) => (
    <div data-testid="progress-hero">{progressPercentage}%</div>
  ),
}))

vi.mock('@/components/dashboard/course-list', () => ({
  CourseList: ({ learningPlan }: { learningPlan: Array<{ assignmentId: string; title: string; status: string }> }) => (
    <div data-testid="course-list">
      {learningPlan.map((item) => (
        <div key={item.assignmentId}>
          <span>{item.title}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  ),
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
    courseAssignment: {
      findMany: vi.fn(),
    },
    enrollment: {
      findMany: vi.fn(),
    },
  },
}))

const mockUser = {
  id: 'user1',
  facilityId: 'f1',
  role: 'STAFF',
  name: 'テスト スタッフ',
  facility: { name: 'テスト施設' },
  corporation: { name: 'テスト法人', fiscalYearStartMonth: 4 },
}

const mockAssignments = [
  {
    id: 'a1',
    courseId: 'c1',
    facilityId: 'f1',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2099-12-31'),
    course: {
      id: 'c1',
      title: '基本的な介護技術',
      titleEn: null,
      description: '介護技術の基本を学びます',
      descriptionEn: null,
      badgeLabel: null,
      badgeIcon: null,
    },
  },
]

describe('Dashboard Page', () => {
  it('割り当てられた研修のタイトルが表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'テスト スタッフ' },
    })
    const { default: prisma } = await import('@/lib/prisma')
    ;(prisma.user.findUnique as any).mockResolvedValue(mockUser)
    ;(prisma.courseAssignment.findMany as any).mockResolvedValue(mockAssignments)
    ;(prisma.enrollment.findMany as any).mockResolvedValue([])

    const Result = await DashboardPage()
    render(Result)

    expect(screen.getAllByText(/基本的な介護技術/).length).toBeGreaterThanOrEqual(1)
  })

  it('未受講の研修は NOT_STARTED ステータスで学習プランに含まれること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'テスト スタッフ' },
    })
    const { default: prisma } = await import('@/lib/prisma')
    ;(prisma.user.findUnique as any).mockResolvedValue(mockUser)
    ;(prisma.courseAssignment.findMany as any).mockResolvedValue(mockAssignments)
    ;(prisma.enrollment.findMany as any).mockResolvedValue([])

    const Result = await DashboardPage()
    render(Result)

    const courseList = screen.getByTestId('course-list')
    expect(courseList).toHaveTextContent('基本的な介護技術')
    expect(courseList).toHaveTextContent('NOT_STARTED')
  })
})
