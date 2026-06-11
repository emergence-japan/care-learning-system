import React from 'react'
import { ACCENTS, COLORS } from '../theme'
import type { StatementData } from '../types'
import { Eyebrow, useRise } from './shared'

export const StatementScene: React.FC<{ data: StatementData }> = ({ data }) => {
  const accent = ACCENTS[data.accent ?? 'blue']
  const head = useRise(8)
  const body1 = useRise(24)
  const body2 = useRise(36)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 44,
        maxWidth: 1480,
        textAlign: 'center',
      }}
    >
      {data.eyebrow ? (
        <Eyebrow bg={accent.bg} color={accent.dark} border={accent.border}>
          {data.eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        style={{
          ...head,
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.slate900,
          lineHeight: 1.35,
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {data.heading}
      </h2>
      <div
        style={{
          ...body1,
          backgroundColor: accent.bg,
          border: `3px solid ${accent.border}`,
          borderRadius: 56,
          padding: '52px 80px',
          boxShadow: 'inset 0 4px 18px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        {data.body.map((p, i) => (
          <p
            key={i}
            style={{
              ...(i === 1 ? body2 : {}),
              fontSize: 38,
              fontWeight: 900,
              color: accent.dark,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
