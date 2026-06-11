export type AccentColor = 'blue' | 'rose' | 'amber' | 'purple' | 'emerald' | 'red'

export type TitleData = {
  badge: string
  title: string
  subtitle: string
}

export type StatementData = {
  eyebrow?: string
  heading: string
  body: string[]
  accent?: AccentColor
}

export type CardItem = {
  title: string
  body: string
}

export type CardsData = {
  heading: string
  items: CardItem[]
  numbered?: boolean
  footnote?: string
}

export type ChipsData = {
  heading: string
  sub?: string
  items: { label: string; color: AccentColor }[]
}

export type BulletsData = {
  heading: string
  color: AccentColor
  items: string[]
}

export type PrinciplesData = {
  heading: string
  items: { kicker: string; term: string; desc: string }[]
  footnote?: string
}

export type ChecklistData = {
  heading: string
  items: string[]
  closing?: string
}

export type OutroData = {
  heading: string
  sub: string
  credits: string[]
}

export type SceneLayout =
  | 'title'
  | 'statement'
  | 'cards'
  | 'chips'
  | 'bullets'
  | 'principles'
  | 'checklist'
  | 'outro'

export type Scene = {
  id: string
  label: string
  layout: SceneLayout
  narration: string[]
  /** Optional: for item lists, which narration sentence index reveals each item */
  revealAt?: number[]
  data:
    | TitleData
    | StatementData
    | CardsData
    | ChipsData
    | BulletsData
    | PrinciplesData
    | ChecklistData
    | OutroData
}

export type CourseScript = {
  courseId: string
  courseTitle: string
  subtitle: string
  brand: string
  speaker: number
  speakerCredit: string
  scenes: Scene[]
}

/** sceneId -> duration (seconds) of each narration sentence wav */
export type AudioManifest = Record<string, number[]>
