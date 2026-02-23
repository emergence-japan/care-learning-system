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

function validateSeed(fileName: string, expectedSlides: number, isScrollless: boolean = false) {
  const seedPath = path.resolve(__dirname, `../../prisma/seeds/${fileName}`)
  const content = fs.readFileSync(seedPath, 'utf-8')

  describe(`Standardization Check: ${fileName}`, () => {
    it('should contain basic design components', () => {
      MASTER_COMPONENTS.forEach(component => {
        expect(content).toContain(component)
      })
    })

    it('should contain specific font size based on scrollless requirement', () => {
      if (isScrollless) {
        expect(content).toContain('lg:text-5xl') // スクロールレスは最大5xl
      } else {
        expect(content).toContain('lg:text-6xl') // 通常マスターは6xl
      }
    })

    it('should contain all instructional design (ID) elements', () => {
      MASTER_ID_ELEMENTS.forEach(element => {
        expect(content).toContain(element)
      })
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

describe('Master Standardization Verification', () => {
  validateSeed('01_abuse.ts', 25, false) // 虐待はオリジナルの6xl
  validateSeed('14_prevention.ts', 26, true) // 介護予防はスクロールレスの5xl (0-26で27枚)
})
