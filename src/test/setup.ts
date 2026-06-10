import '@testing-library/jest-dom'
import { vi } from 'vitest'
import jaMessages from '../../messages/ja.json'

// Mock Next.js features that don't work well in JSDOM/Vitest
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  notFound: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => ''),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// Mock next-intl: 実際の messages/ja.json から訳文を解決する
function createTranslator(namespace?: string) {
  const root = namespace
    ? namespace.split('.').reduce<unknown>((obj, key) => (obj as Record<string, unknown> | undefined)?.[key], jaMessages)
    : jaMessages

  return (key: string, values?: Record<string, unknown>) => {
    const message = key
      .split('.')
      .reduce<unknown>((obj, k) => (obj as Record<string, unknown> | undefined)?.[k], root)
    if (typeof message !== 'string') return key
    if (!values) return message
    return Object.entries(values).reduce(
      (msg, [name, value]) => msg.replaceAll(`{${name}}`, String(value)),
      message,
    )
  }
}

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (ns?: string | { namespace?: string }) =>
    createTranslator(typeof ns === 'string' ? ns : ns?.namespace)),
  getLocale: vi.fn(async () => 'ja'),
  getMessages: vi.fn(async () => jaMessages),
  getRequestConfig: (fn: unknown) => fn,
}))

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => createTranslator(ns),
  useLocale: () => 'ja',
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}))
