import { PrismaClient } from '@prisma/client'
import { describe, it, expect } from 'vitest'
const prisma = new PrismaClient()
describe('Terminal Care Course Standardization', () => {
  it('should have at least 25 slides', async () => {
    const course = await prisma.course.findUnique({ where: { slug: 'terminal' }, include: { slides: true } })
    expect(course?.slides.length).toBeGreaterThanOrEqual(25)
  }, 10000)
  it('should have exactly 10 questions', async () => {
    const course = await prisma.course.findUnique({ where: { slug: 'terminal' }, include: { questions: true } })
    expect(course?.questions.length).toBe(10)
  }, 10000)
  it('should not contain English text', async () => {
    const course = await prisma.course.findUnique({ where: { slug: 'terminal' }, include: { slides: true } })
    course?.slides.forEach(slide => {
      const textOnly = slide.content.replace(/<[^>]*>/g, '')
      expect(textOnly).not.toMatch(/[a-zA-Z]{5,}/)
    })
  }, 10000)
})
