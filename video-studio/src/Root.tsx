import React from 'react'
import { Composition } from 'remotion'
import { CourseVideo } from './CourseVideo'
import { FPS, totalDurationInFrames } from './timing'
import type { AudioManifest, CourseScript } from './types'

import abuseScript from './courses/abuse/script.json'
import abuseManifest from '../public/audio/abuse/manifest.json'
import infectionScript from './courses/infection/script.json'
import infectionManifest from '../public/audio/infection/manifest.json'
import restraintScript from './courses/restraint/script.json'
import restraintManifest from '../public/audio/restraint/manifest.json'
import harassmentScript from './courses/harassment/script.json'
import harassmentManifest from '../public/audio/harassment/manifest.json'
import disasterScript from './courses/disaster/script.json'
import disasterManifest from '../public/audio/disaster/manifest.json'
import dementiaScript from './courses/dementia/script.json'
import dementiaManifest from '../public/audio/dementia/manifest.json'
import accidentScript from './courses/accident/script.json'
import accidentManifest from '../public/audio/accident/manifest.json'
import emergencyScript from './courses/emergency/script.json'
import emergencyManifest from '../public/audio/emergency/manifest.json'
import privacyScript from './courses/privacy/script.json'
import privacyManifest from '../public/audio/privacy/manifest.json'
import ethicsScript from './courses/ethics/script.json'
import ethicsManifest from '../public/audio/ethics/manifest.json'
import etiquetteScript from './courses/etiquette/script.json'
import etiquetteManifest from '../public/audio/etiquette/manifest.json'
import terminalScript from './courses/terminal/script.json'
import terminalManifest from '../public/audio/terminal/manifest.json'
import mentalScript from './courses/mental/script.json'
import mentalManifest from '../public/audio/mental/manifest.json'
import preventionScript from './courses/prevention/script.json'
import preventionManifest from '../public/audio/prevention/manifest.json'
import medicalScript from './courses/medical/script.json'
import medicalManifest from '../public/audio/medical/manifest.json'

type CourseEntry = {
  script: CourseScript
  manifest: AudioManifest
}

// Register one composition per course. The composition id matches the courseId
// and the audio folder name, so `remotion render <id>` always lines up.
const COURSES: CourseEntry[] = [
  { script: abuseScript as unknown as CourseScript, manifest: abuseManifest as AudioManifest },
  { script: infectionScript as unknown as CourseScript, manifest: infectionManifest as AudioManifest },
  { script: restraintScript as unknown as CourseScript, manifest: restraintManifest as AudioManifest },
  { script: harassmentScript as unknown as CourseScript, manifest: harassmentManifest as AudioManifest },
  { script: disasterScript as unknown as CourseScript, manifest: disasterManifest as AudioManifest },
  { script: dementiaScript as unknown as CourseScript, manifest: dementiaManifest as AudioManifest },
  { script: accidentScript as unknown as CourseScript, manifest: accidentManifest as AudioManifest },
  { script: emergencyScript as unknown as CourseScript, manifest: emergencyManifest as AudioManifest },
  { script: privacyScript as unknown as CourseScript, manifest: privacyManifest as AudioManifest },
  { script: ethicsScript as unknown as CourseScript, manifest: ethicsManifest as AudioManifest },
  { script: etiquetteScript as unknown as CourseScript, manifest: etiquetteManifest as AudioManifest },
  { script: medicalScript as unknown as CourseScript, manifest: medicalManifest as AudioManifest },
  { script: terminalScript as unknown as CourseScript, manifest: terminalManifest as AudioManifest },
  { script: mentalScript as unknown as CourseScript, manifest: mentalManifest as AudioManifest },
  { script: preventionScript as unknown as CourseScript, manifest: preventionManifest as AudioManifest },
]

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {COURSES.map(({ script, manifest }) => (
        <Composition
          key={script.courseId}
          id={script.courseId}
          component={CourseVideo}
          durationInFrames={totalDurationInFrames(script.scenes, manifest)}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ script, manifest }}
        />
      ))}
    </>
  )
}
