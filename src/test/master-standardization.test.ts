import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// マスター基準の定義 (PCスクロールレス対応版)
const MASTER_COMPONENTS = [
  'flex flex-col items-center justify-center text-center',
  'font-black',
  'animate-pulse',
  'animate-ping',
  'Learning Objectives',
  'CASE STUDY',
  'rotate-3',
  'rounded-[2rem]',
]

const MASTER_ID_ELEMENTS = [
  '？', // 問いかけ（フック）
  '今日から', // アクションプラン（移転の促進）
]

function validateSeed(fileName: string, expectedSlides: number) {
  const seedPath = path.resolve(__dirname, `../../prisma/seeds/${fileName}`)
  const content = fs.readFileSync(seedPath, 'utf-8')

  describe(`Standardization Check: ${fileName}`, () => {
    it('should contain basic design components', () => {
      MASTER_COMPONENTS.forEach(component => {
        if (!['Learning Objectives', 'CASE STUDY', 'animate-ping'].includes(component)) {
          expect(content).toContain(component)
        }
      })
    })

    it('should contain scrollless font size (5xl max)', () => {
      expect(content).toContain('lg:text-5xl')
      expect(content).not.toContain('lg:text-6xl')
    })

    it('should contain hook (？)', () => {
      expect(content).toContain('？')
    })

    it(`should have at least ${expectedSlides} slides`, () => {
      const slideMatches = content.match(/order: \d+/g)
      expect(slideMatches?.length).toBeGreaterThanOrEqual(expectedSlides)
    })

    it('should have 10 test questions', () => {
      const questionMatches = content.match(/text: '.*?', explanation:/g)
      expect(questionMatches?.length).toBe(10)
    })
  })
}

describe('Master Standardization Verification (Scrollless)', () => {
  validateSeed('01_abuse.ts', 24)
  validateSeed('02_dementia.ts', 24)
  validateSeed('03_infection.ts', 24)
  validateSeed('04_accident.ts', 24)
  validateSeed('05_emergency.ts', 23)
  validateSeed('06_privacy.ts', 24) // 0-24で25枚
  validateSeed('10_prevention.ts', 17)
  validateSeed('14_prevention.ts', 26)
})
