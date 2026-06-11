import type { AudioManifest, Scene } from './types'

export const FPS = 30
/** Silence before the first sentence of each scene (sec) */
export const ENTER_DELAY_SEC = 0.6
/** Pause between sentences (sec) */
export const GAP_SEC = 0.35
/** Silence after the last sentence of each scene (sec) */
export const TAIL_SEC = 1.1
/** Fallback duration per sentence when audio is not generated yet (sec) */
export const FALLBACK_SENTENCE_SEC = 2.5

export function sentenceDurations(scene: Scene, manifest: AudioManifest): number[] {
  const durs = manifest[scene.id]
  if (durs && durs.length === scene.narration.length) return durs
  return scene.narration.map(() => FALLBACK_SENTENCE_SEC)
}

/** Start time (sec, relative to scene start) of each narration sentence */
export function sentenceStartsSec(scene: Scene, manifest: AudioManifest): number[] {
  const durs = sentenceDurations(scene, manifest)
  const starts: number[] = []
  let t = ENTER_DELAY_SEC
  for (const d of durs) {
    starts.push(t)
    t += d + GAP_SEC
  }
  return starts
}

export function sceneDurationInFrames(scene: Scene, manifest: AudioManifest): number {
  const durs = sentenceDurations(scene, manifest)
  const starts = sentenceStartsSec(scene, manifest)
  const last = starts[starts.length - 1] + durs[durs.length - 1]
  return Math.ceil((last + TAIL_SEC) * FPS)
}

export function totalDurationInFrames(scenes: Scene[], manifest: AudioManifest): number {
  return scenes.reduce((sum, s) => sum + sceneDurationInFrames(s, manifest), 0)
}
