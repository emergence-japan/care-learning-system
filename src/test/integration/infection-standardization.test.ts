import { PrismaClient } from '@prisma/client'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

const prisma = new PrismaClient()

describe('Infection Course Standardization (Master Format)', () => {
  it('should have at least 25 slides', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'infection' },
      include: { slides: true }
    })
    expect(course?.slides.length).toBeGreaterThanOrEqual(25)
  })

  it('should have exactly 10 questions', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'infection' },
      include: { questions: true }
    })
    expect(course?.questions.length).toBe(10)
  })

  it('should not contain English subtitles in slides 5-10', async () => {
    const course = await prisma.course.findUnique({
      where: { slug: 'infection' },
      include: { slides: { orderBy: { order: 'asc' } } }
    })
    const targetSlides = course?.slides.slice(4, 10)
    targetSlides?.forEach(slide => {
      // HTMLタグとその中身の属性（class等）を削除してから、残ったテキストに英語の単語がないかチェック
      const textOnly = slide.content.replace(/<[^>]*>/g, '')
      expect(textOnly).not.toMatch(/[a-zA-Z]{5,}/) 
    })
  })
})
