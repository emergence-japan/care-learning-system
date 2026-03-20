import { describe, it, expect } from 'vitest'
import jaMessages from '../../messages/ja.json'
import enMessages from '../../messages/en.json'

type MessageValue = string | { [key: string]: MessageValue }
type MessageObject = Record<string, MessageValue>

function getAllKeys(obj: MessageObject, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null) {
      return getAllKeys(value as Record<string, MessageValue>, fullKey)
    }
    return [fullKey]
  })
}

describe('Translation keys completeness', () => {
  const jaKeys = getAllKeys(jaMessages as MessageObject)
  const enKeys = getAllKeys(enMessages as MessageObject)

  it('en.json should have all keys that ja.json has', () => {
    const missingInEn = jaKeys.filter((k) => !enKeys.includes(k))
    expect(missingInEn).toEqual([])
  })

  it('ja.json should have all keys that en.json has', () => {
    const missingInJa = enKeys.filter((k) => !jaKeys.includes(k))
    expect(missingInJa).toEqual([])
  })

  it('should have required namespaces', () => {
    const requiredNamespaces = [
      'common',
      'dashboard',
      'course',
      'comprehensionTest',
      'certificate',
      'error',
    ]
    for (const ns of requiredNamespaces) {
      expect(jaMessages).toHaveProperty(ns)
      expect(enMessages).toHaveProperty(ns)
    }
  })
})
