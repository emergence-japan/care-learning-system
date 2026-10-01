import React from 'react'
import { ACCENTS, COLORS } from '../theme'
import type { Accent } from '../theme'
import type { BulletsData } from '../types'
import { useRise } from './shared'

const BulletItem: React.FC<{ text: string; accent: Accent; delay: number }> = ({
  text,
  accent,
  delay,
}) => {
  const rise = useRise(delay, 24)
  return (
    <li
      style={{
        ...rise,
        fontSize: 54,
        fontWeight: 900,
        color: COLORS.slate800,
        lineHeight: 1.3,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: accent.main,
          flexShrink: 0,
        }}
      />
      {text}
    </li>
  )
}

export const BulletsScene: React.FC<{ data: BulletsData }> = ({ data }) => {
  const accent = ACCENTS[data.color]
  const head = useRise(6)
  return (
    <div style={{ width: 1460, display: 'flex', flexDirection: 'column', gap: 64 }}>
      <div style={{ ...head, display: 'flex', alignItems: 'center', gap: 36 }}>
        <span
          style={{
            width: 16,
            height: 92,
            borderRadius: 999,
            backgroundColor: accent.main,
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: accent.dark,
            margin: 0,
            letterSpacing: '0.01em',
          }}
        >
          {data.heading}
        </h2>
      </div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: '0 0 0 52px',
          display: 'flex',
          flexDirection: 'column',
          gap: 44,
        }}
      >
        {data.items.map((item, i) => (
          <BulletItem key={i} text={item} accent={accent} delay={20 + i * 9} />
        ))}
      </ul>
    </div>
  )
}
