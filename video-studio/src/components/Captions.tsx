import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../theme'

export const Captions: React.FC<{
  narration: string[]
  startFrames: number[]
}> = ({ narration, startFrames }) => {
  const frame = useCurrentFrame()
  let idx = -1
  for (let i = 0; i < startFrames.length; i++) {
    if (frame >= startFrames[i]) idx = i
  }
  if (idx < 0) return null
  const sinceStart = frame - startFrames[idx]
  const opacity = interpolate(sinceStart, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1560,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          color: COLORS.white,
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.55,
          padding: '18px 46px',
          borderRadius: 26,
          textAlign: 'center',
          opacity,
        }}
      >
        {narration[idx]}
      </div>
    </div>
  )
}

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 10,
      backgroundColor: COLORS.slate100,
    }}
  >
    <div
      style={{
        width: `${Math.min(100, progress * 100)}%`,
        height: '100%',
        backgroundColor: COLORS.blue700,
      }}
    />
  </div>
)
