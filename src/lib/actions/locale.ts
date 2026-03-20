'use server'

import { cookies } from 'next/headers'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { type Locale, locales } from '@/i18n/request'

export async function setLocale(locale: Locale): Promise<void> {
  if (!locales.includes(locale)) {
    throw new Error('Invalid locale')
  }

  const cookieStore = await cookies()
  cookieStore.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })

  const session = await auth()
  if (session?.user?.id) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { locale },
    })
  }

  revalidatePath('/', 'layout')
}
