import React from 'react'
import { COLORS } from '../theme'
import type { PrinciplesData } from '../types'
import { useRise } from './shared'

const PrincipleRow: React.FC<{
  kicker: string
  term: string
  desc: string
  delay: number
  divider: boolean
}> = ({ kicker, term, desc, delay, divider }) => {
  const rise = useRise(delay)
  return (
    <div>
      {divider ? (
        <div style={{ height: 2, backgroundColor: COLORS.slate100, margin: '10px 0' }} />
      ) : null}
      <div style={{ ...rise, padding: '22px 0' }}>
        <p
          style={{
            color: COLORS.blue800,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: '0 0 10px',
          }}
        >
          {kicker}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 44 }}>
          <p
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: COLORS.slate900,
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {term}
          </p>
          <p style={{ fontSize: 34, fontWeight: 700, color: COLORS.slate600, margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export const PrinciplesScene: React.FC<{
  data: PrinciplesData
  revealFrames?: number[]
  footnoteFrame?: number
}> = ({ data, revealFrames, footnoteFrame }) => {
  const head = useRise(6)
  const foot = useRise(footnoteFrame ?? 20 + data.items.length * 12)
  return (
    <div style={{ width: 1380, display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ ...head, textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: COLORS.blue50,
            border: `2px solid ${COLORS.blue100}`,
            color: COLORS.blue800,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: '0.2em',
            padding: '16px 56px',
            borderRadius: 999,
          }}
        >
          {data.heading}
        </span>
      </div>
      <div
        style={{
          backgroundColor: COLORS.white,
          border: `2px solid ${COLORS.slate200}`,
          borderRadius: 52,
          boxShadow: '0 30px 70px rgba(15, 23, 42, 0.10)',
          padding: '40px 90px',
        }}
      >
        {data.items.map((item, i) => (
          <PrincipleRow
            key={i}
            kicker={item.kicker}
            term={item.term}
            desc={item.desc}
            delay={revealFrames?.[i] ?? 20 + i * 12}
            divider={i > 0}
          />
        ))}
      </div>
      {data.footnote ? (
        <p
          style={{
            ...foot,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 900,
            color: COLORS.blue800,
            backgroundColor: COLORS.blue50,
            border: `2px solid ${COLORS.blue100}`,
            borderRadius: 24,
            padding: '20px 40px',
            margin: 0,
          }}
        >
          {data.footnote}
        </p>
      ) : null}
    </div>
  )
}
