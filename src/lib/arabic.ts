const DIACRITICS = /[\u064B-\u065F\u0670\u0640]/g
const PUNCTUATION = /[؟?!.,،؛:"'«»()\-—]/g

export function stripDiacritics(text: string): string {
  return text.replace(DIACRITICS, "")
}

function base(text: string): string {
  return stripDiacritics(text).replace(PUNCTUATION, " ").replace(/\s+/g, " ").trim()
}

function lenient(text: string): string {
  return base(text)
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
}

export type Verdict = "correct" | "spelling" | "wrong"

/**
 * Diacritics are always ignored. "spelling" means the answer only matches once
 * hamza seats, alif maqsura and taa marbuta are normalized.
 */
export function grade(input: string, answers: string[], forgiving: boolean): Verdict {
  const typed = base(input)
  if (!typed) return "wrong"
  if (answers.some((a) => base(a) === typed)) return "correct"
  const loose = lenient(input)
  if (answers.some((a) => lenient(a) === loose)) return forgiving ? "correct" : "spelling"
  return "wrong"
}

export function needsSpellingNote(input: string, answers: string[]): boolean {
  const typed = base(input)
  return !answers.some((a) => base(a) === typed)
}

/** Standard Arabic (101) layout, keyed by KeyboardEvent.code. */
export const PHYSICAL_MAP: Record<string, { normal: string; shift?: string }> = {
  Backquote: { normal: "ذ", shift: "ّ" },
  KeyQ: { normal: "ض", shift: "َ" },
  KeyW: { normal: "ص", shift: "ً" },
  KeyE: { normal: "ث", shift: "ُ" },
  KeyR: { normal: "ق", shift: "ٌ" },
  KeyT: { normal: "ف", shift: "لإ" },
  KeyY: { normal: "غ", shift: "إ" },
  KeyU: { normal: "ع" },
  KeyI: { normal: "ه" },
  KeyO: { normal: "خ" },
  KeyP: { normal: "ح", shift: "؛" },
  BracketLeft: { normal: "ج" },
  BracketRight: { normal: "د" },
  KeyA: { normal: "ش", shift: "ِ" },
  KeyS: { normal: "س", shift: "ٍ" },
  KeyD: { normal: "ي" },
  KeyF: { normal: "ب" },
  KeyG: { normal: "ل", shift: "لأ" },
  KeyH: { normal: "ا", shift: "أ" },
  KeyJ: { normal: "ت", shift: "ـ" },
  KeyK: { normal: "ن", shift: "،" },
  KeyL: { normal: "م" },
  Semicolon: { normal: "ك" },
  Quote: { normal: "ط" },
  KeyZ: { normal: "ئ" },
  KeyX: { normal: "ء", shift: "ْ" },
  KeyC: { normal: "ؤ" },
  KeyV: { normal: "ر" },
  KeyB: { normal: "لا", shift: "لآ" },
  KeyN: { normal: "ى", shift: "آ" },
  KeyM: { normal: "ة" },
  Comma: { normal: "و" },
  Period: { normal: "ز" },
  Slash: { normal: "ظ", shift: "؟" },
}

export interface KeyDef {
  char: string
  latin?: string
  label?: string
  name?: string
}

const latinFor: Record<string, string> = {
  Backquote: "`", BracketLeft: "[", BracketRight: "]", Semicolon: ";", Quote: "'",
  Comma: ",", Period: ".", Slash: "/",
}

function codeToLatin(code: string): string {
  if (code.startsWith("Key")) return code.slice(3)
  return latinFor[code] ?? ""
}

function row(codes: string[]): KeyDef[] {
  return codes.map((code) => ({ char: PHYSICAL_MAP[code].normal, latin: codeToLatin(code) }))
}

export const LETTER_ROWS: KeyDef[][] = [
  row(["Backquote", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight"]),
  row(["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"]),
  row(["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"]),
]

export const HAMZA_KEYS: KeyDef[] = [
  { char: "أ", latin: "⇧H" },
  { char: "إ", latin: "⇧Y" },
  { char: "آ", latin: "⇧N" },
  { char: "ء", latin: "X" },
  { char: "ؤ", latin: "C" },
  { char: "ئ", latin: "Z" },
  { char: "ى", latin: "N" },
  { char: "ة", latin: "M" },
]

export const HARAKAT_KEYS: KeyDef[] = [
  { char: "َ", label: "ـَ", name: "fatha", latin: "⇧Q" },
  { char: "ُ", label: "ـُ", name: "damma", latin: "⇧E" },
  { char: "ِ", label: "ـِ", name: "kasra", latin: "⇧A" },
  { char: "ْ", label: "ـْ", name: "sukun", latin: "⇧X" },
  { char: "ّ", label: "ـّ", name: "shadda", latin: "⇧`" },
  { char: "ً", label: "ـً", name: "tanwin fath", latin: "⇧W" },
  { char: "ٌ", label: "ـٌ", name: "tanwin damm", latin: "⇧R" },
  { char: "ٍ", label: "ـٍ", name: "tanwin kasr", latin: "⇧S" },
]
