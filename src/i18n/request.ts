import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'

export type Locale = 'ja' | 'en'
export const locales: Locale[] = ['ja', 'en']
export const defaultLocale: Locale = 'ja'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale

  // 1. Try logged-in user's DB setting
  const session = await auth()
  if (session?.user?.locale && isValidLocale(session.user.locale)) {
    locale = session.user.locale
  } else {
    // 2. Fall back to cookie
    const cookieStore = await cookies()
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
    if (cookieLocale && isValidLocale(cookieLocale)) {
      locale = cookieLocale
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
