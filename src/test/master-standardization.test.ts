import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// マスター基準の定義
const MASTER_COMPONENTS = [
  'flex flex-col items-center justify-center text-center', // 基本レイアウト
  'font-black', // 太字（視覚的階層）
  'lg:text-6xl', // PC版特大タイトル
  'animate-pulse', // タイトル背景演出
  'animate-ping', // MUST CHECK演出
  'Learning Objectives', // 目標バッジ
  'CASE STUDY', // 事例バッジ
  'rotate-3', // まとめ演出
  'rounded-[2rem]', // 大きな角丸
]

const MASTER_ID_ELEMENTS = [
  '？', // 問いかけ（フック）
  '義務化', // 義務化の背景（Relevance）
  '今日から', // アクションプラン（移転の促進） - 「明日から」を「今日から」に修正
]

describe('Master Standardization (01_abuse.ts)', () => {
  const seedPath = path.resolve(__dirname, '../../prisma/seeds/01_abuse.ts')
  const content = fs.readFileSync(seedPath, 'utf-8')

  it('should contain all design components from the master template', () => {
    MASTER_COMPONENTS.forEach(component => {
      expect(content).toContain(component)
    })
  })

  it('should contain all instructional design (ID) elements', () => {
    MASTER_ID_ELEMENTS.forEach(element => {
      // 文字化け対策として、部分一致または正規表現を検討するが、まずは修正後の日本語で試行
      expect(content).toContain(element)
    })
  })

  it('should have around 25 slides', () => {
    const slideMatches = content.match(/order: \d+/g)
    expect(slideMatches?.length).toBeGreaterThanOrEqual(23)
  })

  it('should have 10 test questions', () => {
    const questionMatches = content.match(/text: '.*?', explanation:/g)
    expect(questionMatches?.length).toBe(10)
  })
})
