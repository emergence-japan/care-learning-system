import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS, FONT } from '../theme'

/** Spring-based rise-in animation style, starting after `delay` frames */
export const useRise = (delay: number, distance = 30) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 26,
  })
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  }
}

/** Pop (scale) animation, starting after `delay` frames */
export const usePop = (delay: number) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8 },
    durationInFrames: 24,
  })
  return { opacity: Math.min(1, progress * 2), transform: `scale(${progress})` }
}

export const Eyebrow: React.FC<{
  children: React.ReactNode
  bg?: string
  color?: string
  border?: string
}> = ({ children, bg = COLORS.blue700, color = COLORS.white, border }) => (
  <div
    style={{
      display: 'inline-block',
      backgroundColor: bg,
      color,
      border: border ? `2px solid ${border}` : undefined,
      padding: '10px 36px',
      borderRadius: 999,
      fontSize: 22,
      fontWeight: 900,
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      boxShadow: '0 8px 24px rgba(29, 78, 216, 0.18)',
    }}
  >
    {children}
  </div>
)

export const SceneShell: React.FC<{
  brand: string
  label?: string
  indexLabel?: string
  children: React.ReactNode
}> = ({ brand, label, indexLabel, children }) => {
  const frame = useCurrentFrame()
  const enter = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white, fontFamily: FONT }}>
      {/* Soft background atmosphere */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          backgroundColor: COLORS.blue100,
          filter: 'blur(160px)',
          opacity: 0.55,
          top: -380,
          right: -260,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          backgroundColor: COLORS.slate100,
          filter: 'blur(140px)',
          opacity: 0.8,
          bottom: -300,
          left: -200,
        }}
      />
      {/* Top chrome */}
      {label ? (
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            opacity: enter,
          }}
        >
          <span
            style={{
              backgroundColor: COLORS.blue700,
              color: COLORS.white,
              fontWeight: 900,
              fontSize: 24,
              padding: '8px 20px',
              borderRadius: 14,
              letterSpacing: '0.1em',
            }}
          >
            {indexLabel}
          </span>
          <span
            style={{
              color: COLORS.slate600,
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: '0.06em',
            }}
          >
            {label}
          </span>
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          top: 52,
          right: 72,
          color: COLORS.slate400,
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: '0.5em',
          opacity: enter,
        }}
      >
        {brand}
      </div>
      {/* Content area (kept clear of the caption zone at the bottom) */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 0,
          right: 0,
          bottom: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: enter,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  )
}
