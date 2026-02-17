import { PrismaClient } from '@prisma/client'
import { describe, it, expect } from 'vitest'

const prisma = new PrismaClient()

describe('Dementia Course Standardization (Master Format)', () => {
  it('should have at least 25 slides', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'dementia' },
      include: { slides: true }
    })
    expect(course?.slides.length).toBeGreaterThanOrEqual(25)
  })

  it('should have exactly 10 questions', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'dementia' },
      include: { questions: true }
    })
    expect(course?.questions.length).toBe(10)
  })

  it('should not contain English text in visible slide content', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'dementia' },
      include: { slides: { orderBy: { order: 'asc' } } }
    })
    course?.slides.forEach(slide => {
      const textOnly = slide.content.replace(/<[^>]*>/g, '')
      expect(textOnly).not.toMatch(/[a-zA-Z]{5,}/)
    })
  })
})
