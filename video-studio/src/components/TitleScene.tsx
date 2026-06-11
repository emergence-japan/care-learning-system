import React from 'react'
import { COLORS } from '../theme'
import type { TitleData } from '../types'
import { Eyebrow, useRise } from './shared'

export const TitleScene: React.FC<{ data: TitleData; brand: string }> = ({ data, brand }) => {
  const card = useRise(6)
  const sub = useRise(20)
  const foot = useRise(34)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
      <div
        style={{
          ...card,
          backgroundColor: COLORS.white,
          borderRadius: 72,
          border: `1px solid ${COLORS.slate200}`,
          boxShadow: '0 40px 90px rgba(15, 23, 42, 0.14)',
          padding: '90px 130px',
          textAlign: 'center',
          maxWidth: 1500,
        }}
      >
        <Eyebrow>{data.badge}</Eyebrow>
        <h1
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: COLORS.slate900,
            lineHeight: 1.18,
            margin: '52px 0 0',
            letterSpacing: '0.01em',
          }}
        >
          {data.title}
        </h1>
        <p
          style={{
            ...sub,
            fontSize: 44,
            fontWeight: 900,
            color: COLORS.blue700,
            margin: '36px 0 0',
          }}
        >
          {data.subtitle}
        </p>
      </div>
      <div
        style={{
          ...foot,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          color: COLORS.slate500,
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: '0.45em',
        }}
      >
        <span style={{ height: 2, width: 70, backgroundColor: COLORS.slate300 }} />
        {brand}
        <span style={{ height: 2, width: 70, backgroundColor: COLORS.slate300 }} />
      </div>
    </div>
  )
}
