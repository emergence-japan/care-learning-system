import React from 'react'
import { COLORS } from '../theme'
import type { ChecklistData } from '../types'
import { usePop, useRise } from './shared'

const CheckItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const rise = useRise(delay, 22)
  const pop = usePop(delay + 8)
  return (
    <div style={{ ...rise, display: 'flex', alignItems: 'center', gap: 32 }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          backgroundColor: COLORS.blue700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 10px 24px rgba(29, 78, 216, 0.28)',
        }}
      >
        <span style={{ ...pop, color: COLORS.white, fontSize: 34, fontWeight: 900 }}>✓</span>
      </div>
      <p
        style={{
          fontSize: 40,
          fontWeight: 900,
          color: COLORS.slate900,
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {text}
      </p>
    </div>
  )
}

export const ChecklistScene: React.FC<{
  data: ChecklistData
  revealFrames?: number[]
  closingFrame?: number
}> = ({ data, revealFrames, closingFrame }) => {
  const head = useRise(6)
  const closing = useRise(closingFrame ?? 24 + data.items.length * 10)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 52 }}>
      <h2
        style={{
          ...head,
          fontSize: 56,
          fontWeight: 900,
          color: COLORS.slate900,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {data.heading}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 1480 }}>
        {data.items.map((item, i) => (
          <CheckItem key={i} text={item} delay={revealFrames?.[i] ?? 20 + i * 10} />
        ))}
      </div>
      {data.closing ? (
        <p
          style={{
            ...closing,
            fontSize: 34,
            fontWeight: 900,
            color: COLORS.blue800,
            backgroundColor: COLORS.blue50,
            border: `2px solid ${COLORS.blue100}`,
            borderRadius: 999,
            padding: '20px 56px',
            margin: 0,
          }}
        >
          {data.closing}
        </p>
      ) : null}
    </div>
  )
}
