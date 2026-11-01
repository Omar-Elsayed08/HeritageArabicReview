import type { Verdict } from "@/lib/arabic"

export interface Settings {
  shuffle: boolean
  wordBank: boolean
  forgiving: boolean
  physicalMap: boolean
  showLatin: boolean
  deviceKeyboard: boolean
}

export type Outcome = Verdict | "revealed"

export interface AnswerRecord {
  questionId: string
  input: string
  outcome: Outcome
}

export type Mastery = Record<string, true>
