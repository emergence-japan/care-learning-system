import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CourseDetailPage from '@/app/courses/[id]/page'

// Mock auth()
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    enrollment: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'e1',
        status: 'NOT_STARTED',
        course: {
          id: 'c1',
          title: '虐待防止研修（令和6年度）',
          description: '高齢者虐待防止の基本と対応について学習します。',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      }),
    },
  },
}))

describe('Course Detail Page', () => {
  it('研修のタイトルと説明が表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' }
    })

    // Next.js 15+ の params は Promise
    const props = {
      params: Promise.resolve({ id: 'c1' })
    }

    const Result = await CourseDetailPage(props)
    render(Result)
    
    expect(screen.getByText('虐待防止研修（令和6年度）')).toBeInTheDocument()
    expect(screen.getByText(/高齢者虐待防止の基本/i)).toBeInTheDocument()
  })

  it('YouTube動画プレイヤーが表示されていること', async () => {
    const { auth } = await import('@/auth')
    ;(auth as any).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' }
    })

    const props = {
      params: Promise.resolve({ id: 'c1' })
    }

    const Result = await CourseDetailPage(props)
    render(Result)
    
    const iframe = screen.getByTitle(/YouTube video player/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'))
  })
})
