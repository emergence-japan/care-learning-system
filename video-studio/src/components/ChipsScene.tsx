import React from 'react'
import { ACCENTS, COLORS } from '../theme'
import type { ChipsData } from '../types'
import { useRise } from './shared'

const Chip: React.FC<{ label: string; color: keyof typeof ACCENTS; delay: number }> = ({
  label,
  color,
  delay,
}) => {
  const rise = useRise(delay, 22)
  const accent = ACCENTS[color]
  return (
    <div
      style={{
        ...rise,
        backgroundColor: accent.bg,
        border: `3px solid ${accent.border}`,
        color: accent.dark,
        fontSize: 40,
        fontWeight: 900,
        padding: '30px 0',
        width: 560,
        textAlign: 'center',
        borderRadius: 30,
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
      }}
    >
      {label}
    </div>
  )
}

export const ChipsScene: React.FC<{ data: ChipsData }> = ({ data }) => {
  const head = useRise(6)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
      <div
        style={{
          ...head,
          backgroundColor: COLORS.white,
          borderRadius: 48,
          border: `2px solid ${COLORS.slate200}`,
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.10)',
          padding: '40px 90px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 52, fontWeight: 900, color: COLORS.slate900, margin: 0 }}>
          {data.heading}
        </h2>
        {data.sub ? (
          <p
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: COLORS.slate700,
              margin: '20px 0 0',
            }}
          >
            {data.sub}
          </p>
        ) : null}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 30,
          maxWidth: 1500,
        }}
      >
        {data.items.map((item, i) => (
          <Chip key={i} label={item.label} color={item.color} delay={18 + i * 7} />
        ))}
      </div>
    </div>
  )
}
