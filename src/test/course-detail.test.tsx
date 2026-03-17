import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CourseDetailPage from '@/app/courses/[id]/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// Mock enrollment repository
vi.mock('@/lib/repositories', () => ({
  enrollmentRepository: {
    upsertForAssignment: vi.fn().mockResolvedValue({
      id: 'e1',
      status: 'NOT_STARTED',
      actionPlan: null,
    }),
  },
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    courseAssignment: {
      findFirst: vi.fn().mockResolvedValue({
        id: 'a1',
        courseId: 'c1',
        facilityId: 'f1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2099-12-31'),
      }),
    },
    course: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'c1',
        title: '虐待防止研修（令和6年度）',
        description: '高齢者高齢者虐待防止の基本と対応について学習します。',
        introduction: null,
        learningObjectives: null,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        slides: [],
        questions: [],
      }),
    },
  },
}))

const makeProps = (courseId = 'c1', assignmentId = 'a1') => ({
  params: Promise.resolve({ id: courseId }),
  searchParams: Promise.resolve({ assignment: assignmentId }),
})

describe('Course Detail Page', () => {
  it('研修のタイトルと説明が表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', facilityId: 'f1' }
    })

    const Result = await CourseDetailPage(makeProps())
    render(Result)

    expect(screen.getByText('虐待防止研修（令和6年度）')).toBeInTheDocument()
    expect(screen.getByText(/高齢者虐待防止の基本/i)).toBeInTheDocument()
  })

  it('YouTube動画プレイヤーが表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', facilityId: 'f1' }
    })

    const Result = await CourseDetailPage(makeProps())
    render(Result)

    const iframe = screen.getByTitle(/YouTube video player/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'))
  })

  it('受講完了済みの場合は「受講を完了しています」と表示されること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', facilityId: 'f1' }
    })

    const { enrollmentRepository } = await import('@/lib/repositories')
    ;(enrollmentRepository.upsertForAssignment as any).mockResolvedValue({
      id: 'e1',
      status: 'COMPLETED',
      actionPlan: null,
    })

    const { default: prisma } = await import('@/lib/prisma')
    ;(prisma.course.findUnique as any).mockResolvedValue({
      id: 'c1',
      title: '虐待防止研修（令和6年度）',
      description: null,
      introduction: null,
      learningObjectives: null,
      videoUrl: 'https://youtube.com/v=123',
      slides: [],
      questions: [],
    })

    const Result = await CourseDetailPage(makeProps())
    render(Result)

    expect(screen.getByText(/受講を完了しています/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /受講を完了する/i })).not.toBeInTheDocument()
  })
})
