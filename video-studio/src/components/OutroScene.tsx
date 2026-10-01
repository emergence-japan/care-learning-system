import React from 'react'
import { COLORS } from '../theme'
import type { OutroData } from '../types'
import { useRise } from './shared'

export const OutroScene: React.FC<{ data: OutroData; lastSentenceFrame?: number }> = ({
  data,
  lastSentenceFrame,
}) => {
  const icon = useRise(6)
  const card = useRise(16)
  const sub = useRise(30)
  const credits = useRise(lastSentenceFrame ?? 48)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
      <div
        style={{
          ...icon,
          width: 130,
          height: 130,
          borderRadius: 44,
          backgroundColor: COLORS.blue700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `${icon.transform} rotate(3deg)`,
          boxShadow: '0 30px 60px rgba(29, 78, 216, 0.35)',
        }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        style={{
          ...card,
          backgroundColor: COLORS.white,
          border: `6px solid ${COLORS.blue700}`,
          borderRadius: 60,
          boxShadow: '0 36px 80px rgba(15, 23, 42, 0.16)',
          padding: '56px 100px',
          maxWidth: 1320,
        }}
      >
        <p
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: COLORS.blue900,
            lineHeight: 1.55,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            fontStyle: 'italic',
          }}
        >
          {data.heading}
        </p>
      </div>
      <p
        style={{
          ...sub,
          fontSize: 40,
          fontWeight: 900,
          color: COLORS.slate800,
          margin: 0,
        }}
      >
        {data.sub}
      </p>
      <div
        style={{
          ...credits,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          paddingTop: 26,
          borderTop: `2px solid ${COLORS.slate200}`,
          width: 720,
        }}
      >
        {data.credits.map((c, i) => (
          <p
            key={i}
            style={{
              fontSize: i === 0 ? 30 : 24,
              fontWeight: 900,
              color: i === 0 ? COLORS.emerald700 : COLORS.slate400,
              margin: 0,
            }}
          >
            {c}
          </p>
        ))}
      </div>
    </div>
  )
}
