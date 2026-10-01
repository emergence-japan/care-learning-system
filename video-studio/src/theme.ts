import { loadFont } from '@remotion/google-fonts/NotoSansJP'
import type { AccentColor } from './types'

// Subsets are intentionally omitted: Noto Sans JP ships Japanese glyphs as
// numbered unicode-range slices, so the renderer fetches only what it needs.
const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '900'],
})

export const FONT = fontFamily

export const COLORS = {
  white: '#ffffff',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue400: '#60a5fa',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  rose50: '#fff1f2',
  rose200: '#fecdd3',
  rose600: '#e11d48',
  rose900: '#881337',
  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber300: '#fcd34d',
  amber700: '#b45309',
  amber900: '#78350f',
  purple50: '#faf5ff',
  purple200: '#e9d5ff',
  purple700: '#7e22ce',
  purple900: '#581c87',
  emerald50: '#ecfdf5',
  emerald200: '#a7f3d0',
  emerald700: '#047857',
  emerald900: '#064e3b',
  red100: '#fee2e2',
  red700: '#b91c1c',
  red800: '#991b1b',
  sky50: '#f0f9ff',
  sky200: '#bae6fd',
  sky700: '#0369a1',
  sky900: '#0c4a6e',
  orange50: '#fff7ed',
  orange200: '#fed7aa',
  orange700: '#c2410c',
  orange900: '#7c2d12',
  indigo50: '#eef2ff',
  indigo200: '#c7d2fe',
  indigo700: '#4338ca',
  indigo900: '#312e81',
} as const

export type Accent = {
  main: string
  dark: string
  bg: string
  border: string
}

export const ACCENTS: Record<AccentColor, Accent> = {
  blue: { main: COLORS.blue700, dark: COLORS.blue900, bg: COLORS.blue50, border: COLORS.blue200 },
  rose: { main: COLORS.rose600, dark: COLORS.rose900, bg: COLORS.rose50, border: COLORS.rose200 },
  amber: { main: COLORS.amber700, dark: COLORS.amber900, bg: COLORS.amber50, border: COLORS.amber300 },
  purple: { main: COLORS.purple700, dark: COLORS.purple900, bg: COLORS.purple50, border: COLORS.purple200 },
  emerald: { main: COLORS.emerald700, dark: COLORS.emerald900, bg: COLORS.emerald50, border: COLORS.emerald200 },
  red: { main: COLORS.red700, dark: COLORS.red800, bg: COLORS.red100, border: '#fecaca' },
  sky: { main: COLORS.sky700, dark: COLORS.sky900, bg: COLORS.sky50, border: COLORS.sky200 },
  orange: { main: COLORS.orange700, dark: COLORS.orange900, bg: COLORS.orange50, border: COLORS.orange200 },
  indigo: { main: COLORS.indigo700, dark: COLORS.indigo900, bg: COLORS.indigo50, border: COLORS.indigo200 },
}
