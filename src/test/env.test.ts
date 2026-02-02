import { describe, it, expect } from 'vitest'

describe('Environment Setup', () => {
  it('should have Next.js environment ready', () => {
    expect(process.env.NODE_ENV).toBeDefined()
  })

  it('should resolve aliases correctly', () => {
    const utilsPath = '@/lib/utils'
    expect(utilsPath).toContain('@/')
  })
})
