import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AdminDashboardPage from '@/app/admin/page'
import HQDashboardPage from '@/app/hq/page'
import HQFacilityDetailPage from '@/app/hq/facilities/[id]/page'
import { StaffClient } from '@/app/admin/staff-client'
import type { FacilityAssignment, StaffWithEnrollments } from '@/types'

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  signOut: vi.fn(),
  facility: { findUnique: vi.fn() },
  corporation: { findUnique: vi.fn() },
  user: { findMany: vi.fn() },
  course: { findMany: vi.fn() },
  courseAssignment: { findMany: vi.fn() },
}))

vi.mock('@/auth', () => ({ auth: mocks.auth, signOut: mocks.signOut }))
vi.mock('@/lib/prisma', () => ({ default: mocks }))
vi.mock('@/components/system-notification', () => ({ SystemNotification: () => null }))
vi.mock('@/lib/actions/user', () => ({ getPurgeableStaff: vi.fn(async () => []) }))

const createdAt = new Date('2026-01-01')
const course = { id: 'course1', title: '研修1', createdAt, updatedAt: createdAt }
const assignments = ['first', 'second'].map(id => ({
  id,
  courseId: course.id,
  course,
  startDate: createdAt,
  endDate: new Date('2099-12-31'),
  createdAt,
  updatedAt: createdAt,
}))
const corporation = {
  id: 'corp1', name: 'テスト法人', fiscalYearStartMonth: 4,
  maxFacilities: 10, maxStaff: 100, isActive: true,
}

function makeStaff(completedAssignmentId = 'first') {
  return {
    id: 'staff1', name: 'スタッフA', loginId: 'staff_a', role: 'STAFF',
    createdAt, updatedAt: createdAt,
    // 過去・割当解除済みの修了記録が先に返っても、現在の割当と取り違えない。
    enrollments: [null, 'old', 'first', 'second'].map((assignmentId, index) => ({
      id: `enrollment${index}`, userId: 'staff1', courseId: course.id,
      assignmentId, course,
      status: assignmentId === 'first' || assignmentId === 'second'
        ? (assignmentId === completedAssignmentId ? 'COMPLETED' : 'IN_PROGRESS')
        : 'COMPLETED',
      actionPlan: `行動宣言 ${assignmentId}`,
      completedAt: createdAt, createdAt, updatedAt: createdAt,
    })),
  }
}

function makeFacility() {
  return {
    id: 'facility1', name: 'テスト施設', type: null, isActive: true,
    maxStaff: 20, corporationId: corporation.id, corporation,
    users: [makeStaff()], assignments, _count: { users: 1 },
  }
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.auth.mockResolvedValue({
    user: { id: 'manager1', name: '管理者', role: 'HQ', corporationId: 'corp1', facilityId: 'facility1' },
  })
  mocks.facility.findUnique.mockResolvedValue(makeFacility())
  mocks.corporation.findUnique.mockResolvedValue({
    ...corporation, facilities: [makeFacility()], _count: { facilities: 1 },
  })
  mocks.user.findMany.mockResolvedValue([makeStaff()])
  mocks.course.findMany.mockResolvedValue([course])
  mocks.courseAssignment.findMany.mockResolvedValue(assignments)
})

describe('管理者のモバイルメニュー', () => {
  it.each([
    { role: 'ADMIN', page: AdminDashboardPage, expected: '年間計画', href: '#annual-plan', support: '/admin/inquiry', absent: '施設別モニタリング' },
    { role: 'HQ', page: HQDashboardPage, expected: '施設別モニタリング', href: '#facility-monitoring', support: '/hq/inquiry', absent: '監査レポート管理' },
  ])('$role の導線とログアウトが機能する', async ({ role, page, expected, href, support, absent }) => {
    mocks.auth.mockResolvedValue({
      user: { id: 'manager1', name: '管理者', role, corporationId: 'corp1', facilityId: 'facility1' },
    })
    const user = userEvent.setup()
    render(await page())
    await user.click(screen.getByRole('button', { name: 'メニューを開く' }))

    const menu = screen.getByRole('navigation', { name: 'モバイルメニュー' })
    expect(within(menu).getByRole('link', { name: expected })).toHaveAttribute('href', href)
    expect(within(menu).getByRole('link', { name: 'サポートセンター' })).toHaveAttribute('href', support)
    expect(within(menu).queryByRole('link', { name: absent })).not.toBeInTheDocument()

    await user.click(within(menu).getByRole('link', { name: expected }))
    expect(screen.queryByRole('navigation', { name: 'モバイルメニュー' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
    const overlay = screen.getByRole('navigation', { name: 'モバイルメニュー' }).parentElement!
    await user.click(within(overlay).getByRole('button', { name: 'ログアウト' }))
    expect(mocks.signOut).toHaveBeenCalledWith({ redirectTo: '/login' })
  })
})

describe('同じ研修を複数回割り当てた場合の進捗', () => {
  it.each(['first', 'second'])('スタッフ一覧は %s の修了だけを表示する', completedId => {
    const rawStaff = makeStaff(completedId)
    const staff: StaffWithEnrollments = {
      ...rawStaff,
      enrollments: rawStaff.enrollments.map(e => ({
        ...e,
        status: e.status as 'COMPLETED' | 'IN_PROGRESS',
        completedAt: e.completedAt.toISOString(),
      })),
    }
    const serializedAssignments: FacilityAssignment[] = assignments.map(a => ({
      ...a, startDate: a.startDate.toISOString(), endDate: a.endDate.toISOString(),
    }))
    render(<StaffClient staffMembers={[staff]} currentAssignments={serializedAssignments} />)

    const row = screen.getByRole('row', { name: /スタッフA/ })
    expect(within(row).getByText('50%')).toBeInTheDocument()
    expect(within(row).getAllByText('受講済')).toHaveLength(1)
    const cells = within(row).getAllByRole('cell')
    expect(within(cells[completedId === 'first' ? 2 : 3]).getByText('受講済')).toBeInTheDocument()
  })

  it('法人の施設詳細も割当回ごとに集計し、修了済みの回だけを表示する', async () => {
    render(await HQFacilityDetailPage({ params: Promise.resolve({ id: 'facility1' }) }))
    expect(screen.getByText('50%')).toBeInTheDocument()
    const row = screen.getByRole('row', { name: /スタッフA/ })
    expect(within(row).getAllByText('受講済')).toHaveLength(1)
    expect(within(within(row).getAllByRole('cell')[1]).getByText('受講済')).toBeInTheDocument()
  })

  it('法人トップは過去・割当解除済みの修了記録を進捗に含めない', async () => {
    render(await HQDashboardPage())
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
