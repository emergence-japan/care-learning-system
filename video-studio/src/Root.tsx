import React from 'react'
import { Composition } from 'remotion'
import { CourseVideo } from './CourseVideo'
import abuseScript from './courses/abuse/script.json'
import abuseManifest from '../public/audio/abuse/manifest.json'
import { FPS, totalDurationInFrames } from './timing'
import type { AudioManifest, CourseScript } from './types'

const script = abuseScript as unknown as CourseScript
const manifest = abuseManifest as AudioManifest

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="abuse"
      component={CourseVideo}
      durationInFrames={totalDurationInFrames(script.scenes, manifest)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ script, manifest }}
    />
  )
}
