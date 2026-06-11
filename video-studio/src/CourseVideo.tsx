import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { Captions, ProgressBar } from './components/Captions'
import { BulletsScene } from './components/BulletsScene'
import { CardsScene } from './components/CardsScene'
import { ChecklistScene } from './components/ChecklistScene'
import { ChipsScene } from './components/ChipsScene'
import { OutroScene } from './components/OutroScene'
import { PrinciplesScene } from './components/PrinciplesScene'
import { SceneShell } from './components/shared'
import { StatementScene } from './components/StatementScene'
import { TitleScene } from './components/TitleScene'
import { sceneDurationInFrames, sentenceStartsSec } from './timing'
import type {
  AudioManifest,
  BulletsData,
  CardsData,
  ChecklistData,
  ChipsData,
  CourseScript,
  OutroData,
  PrinciplesData,
  Scene,
  StatementData,
  TitleData,
} from './types'

const SceneContent: React.FC<{
  scene: Scene
  brand: string
  startFrames: number[]
}> = ({ scene, brand, startFrames }) => {
  const revealFrames = scene.revealAt?.map((sentenceIdx) => startFrames[sentenceIdx] ?? 0)
  const lastStart = startFrames[startFrames.length - 1]
  switch (scene.layout) {
    case 'title':
      return <TitleScene data={scene.data as TitleData} brand={brand} />
    case 'statement':
      return <StatementScene data={scene.data as StatementData} />
    case 'cards':
      return <CardsScene data={scene.data as CardsData} />
    case 'chips':
      return <ChipsScene data={scene.data as ChipsData} />
    case 'bullets':
      return <BulletsScene data={scene.data as BulletsData} />
    case 'principles':
      return (
        <PrinciplesScene
          data={scene.data as PrinciplesData}
          revealFrames={revealFrames}
          footnoteFrame={lastStart}
        />
      )
    case 'checklist':
      return (
        <ChecklistScene
          data={scene.data as ChecklistData}
          revealFrames={revealFrames}
          closingFrame={lastStart}
        />
      )
    case 'outro':
      return <OutroScene data={scene.data as OutroData} lastSentenceFrame={lastStart} />
    default:
      return null
  }
}

const GlobalProgress: React.FC = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  return <ProgressBar progress={frame / durationInFrames} />
}

export const CourseVideo: React.FC<{
  script: CourseScript
  manifest: AudioManifest
}> = ({ script, manifest }) => {
  const { fps } = useVideoConfig()
  let from = 0
  const sequences = script.scenes.map((scene, idx) => {
    const duration = sceneDurationInFrames(scene, manifest)
    const startFrames = sentenceStartsSec(scene, manifest).map((s) => Math.round(s * fps))
    const hasAudio = Boolean(manifest[scene.id])
    const showLabel = scene.layout !== 'title' && scene.layout !== 'outro'
    const element = (
      <Sequence key={scene.id} from={from} durationInFrames={duration} name={scene.label}>
        <SceneShell
          brand={script.brand}
          label={showLabel ? scene.label : undefined}
          indexLabel={`${String(idx + 1).padStart(2, '0')} / ${script.scenes.length}`}
        >
          <SceneContent scene={scene} brand={script.brand} startFrames={startFrames} />
        </SceneShell>
        {hasAudio
          ? scene.narration.map((_, i) => (
              <Sequence key={`audio-${i}`} from={startFrames[i]} name={`${scene.id}-audio-${i}`}>
                <Audio src={staticFile(`audio/${script.courseId}/${scene.id}-${i}.wav`)} />
              </Sequence>
            ))
          : null}
        <Captions narration={scene.narration} startFrames={startFrames} />
      </Sequence>
    )
    from += duration
    return element
  })

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      {sequences}
      <GlobalProgress />
    </AbsoluteFill>
  )
}
