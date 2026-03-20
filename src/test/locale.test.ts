import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      update: vi.fn(),
    },
  },
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
  })),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { setLocale } from '@/lib/actions/locale'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { cookies } from 'next/headers'

const mockAuth = vi.mocked(auth)
const mockUserUpdate = vi.mocked(prisma.user.update)
const mockCookies = vi.mocked(cookies)

describe('setLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const mockCookieStore = { set: vi.fn() }
    mockCookies.mockResolvedValue(mockCookieStore as never)
  })

  it('should set cookie for unauthenticated user', async () => {
    mockAuth.mockResolvedValue(null as never)
    const mockCookieStore = { set: vi.fn() }
    mockCookies.mockResolvedValue(mockCookieStore as never)

    await setLocale('en')

    expect(mockCookieStore.set).toHaveBeenCalledWith('NEXT_LOCALE', 'en', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    expect(mockUserUpdate).not.toHaveBeenCalled()
  })

  it('should set cookie and update DB for authenticated user', async () => {
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } } as never)
    const mockCookieStore = { set: vi.fn() }
    mockCookies.mockResolvedValue(mockCookieStore as never)
    mockUserUpdate.mockResolvedValue({} as never)

    await setLocale('en')

    expect(mockCookieStore.set).toHaveBeenCalledWith('NEXT_LOCALE', 'en', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    expect(mockUserUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { locale: 'en' },
    })
  })

  it('should support switching back to Japanese', async () => {
    mockAuth.mockResolvedValue({ user: { id: 'user-1' } } as never)
    const mockCookieStore = { set: vi.fn() }
    mockCookies.mockResolvedValue(mockCookieStore as never)
    mockUserUpdate.mockResolvedValue({} as never)

    await setLocale('ja')

    expect(mockCookieStore.set).toHaveBeenCalledWith('NEXT_LOCALE', 'ja', expect.any(Object))
    expect(mockUserUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { locale: 'ja' },
    })
  })

  it('should reject invalid locale', async () => {
    mockAuth.mockResolvedValue(null as never)

    await expect(setLocale('fr' as 'ja' | 'en')).rejects.toThrow('Invalid locale')
  })
})
