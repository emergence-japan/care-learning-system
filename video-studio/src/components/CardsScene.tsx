import React from 'react'
import { COLORS } from '../theme'
import type { CardsData } from '../types'
import { useRise } from './shared'

const Card: React.FC<{
  title: string
  body: string
  num?: number
  delay: number
  wide: boolean
}> = ({ title, body, num, delay, wide }) => {
  const rise = useRise(delay)
  return (
    <div
      style={{
        ...rise,
        backgroundColor: COLORS.white,
        border: `2px solid ${COLORS.slate200}`,
        borderRadius: 44,
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.10)',
        padding: body ? '48px 56px' : '42px 56px',
        width: wide ? 690 : 620,
        display: 'flex',
        alignItems: body ? 'flex-start' : 'center',
        justifyContent: body ? 'flex-start' : 'center',
        gap: 32,
        textAlign: body ? 'left' : 'center',
      }}
    >
      {num !== undefined ? (
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: COLORS.blue700,
            color: COLORS.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 900,
            flexShrink: 0,
            boxShadow: '0 12px 28px rgba(29, 78, 216, 0.30)',
          }}
        >
          {num}
        </div>
      ) : null}
      <div>
        <p
          style={{
            fontSize: body ? 38 : 34,
            fontWeight: 900,
            color: body ? COLORS.blue800 : COLORS.slate900,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {title}
        </p>
        {body ? (
          <p
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.slate700,
              lineHeight: 1.75,
              margin: '18px 0 0',
              whiteSpace: 'pre-line',
            }}
          >
            {body}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export const CardsScene: React.FC<{ data: CardsData }> = ({ data }) => {
  const head = useRise(6)
  const foot = useRise(16 + data.items.length * 9)
  const twoCols = data.items.length >= 2
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 36,
          maxWidth: twoCols ? 1500 : 800,
        }}
      >
        {data.items.map((item, i) => (
          <Card
            key={i}
            title={item.title}
            body={item.body}
            num={data.numbered ? i + 1 : undefined}
            delay={16 + i * 9}
            wide={data.items.length === 2}
          />
        ))}
      </div>
      {data.footnote ? (
        <p
          style={{
            ...foot,
            fontSize: 32,
            fontWeight: 900,
            color: COLORS.red700,
            textDecoration: 'underline',
            textUnderlineOffset: 10,
            margin: 0,
          }}
        >
          {data.footnote}
        </p>
      ) : null}
    </div>
  )
}
