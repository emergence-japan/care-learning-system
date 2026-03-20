'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { setLocale } from '@/lib/actions/locale'
import type { Locale } from '@/i18n/request'

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
]

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale
  const [isPending, startTransition] = useTransition()

  function handleChange(locale: Locale) {
    startTransition(async () => {
      await setLocale(locale)
    })
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          disabled={isPending || currentLocale === value}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            currentLocale === value
              ? 'bg-white/20 text-white font-semibold cursor-default'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
