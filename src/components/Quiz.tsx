import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, BookOpen, CheckCircle2, CircleAlert, Eye, Lightbulb, X, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArabicKeyboard } from "@/components/ArabicKeyboard"
import { BidiText } from "@/components/GrammarUses"
import { TOPIC_MAP } from "@/data/topics"
import type { Question } from "@/data/questions"
import { PHYSICAL_MAP, grade, needsSpellingNote } from "@/lib/arabic"
import { cn } from "@/lib/utils"
import type { AnswerRecord, Settings } from "@/types"

interface Props {
  questions: Question[]
  settings: Settings
  onFinish: (records: AnswerRecord[]) => void
  onExit: (records: AnswerRecord[]) => void
  onCorrect: (id: string) => void
}

export function Quiz({ questions, settings, onFinish, onExit, onCorrect }: Props) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [records, setRecords] = useState<AnswerRecord[]>([])
  const [showHint, setShowHint] = useState(false)
  const [showUses, setShowUses] = useState(false)
  const [nudge, setNudge] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[index]
  const topic = TOPIC_MAP[q.topic]
  const current = records.find((r) => r.questionId === q.id)
  const answered = Boolean(current)
  const score = records.filter((r) => r.outcome === "correct").length
  const isLast = index === questions.length - 1

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [index])

  const insert = useCallback(
    (text: string) => {
      if (answered) return
      const el = inputRef.current
      const start = el?.selectionStart ?? input.length
      const end = el?.selectionEnd ?? input.length
      const next = input.slice(0, start) + text + input.slice(end)
      setInput(next)
      requestAnimationFrame(() => {
        if (!el) return
        el.focus({ preventScroll: true })
        const caret = start + text.length
        el.setSelectionRange(caret, caret)
      })
    },
    [answered, input],
  )

  const backspace = useCallback(() => {
    if (answered) return
    const el = inputRef.current
    const start = el?.selectionStart ?? input.length
    const end = el?.selectionEnd ?? input.length
    let next: string
    let caret: number
    if (start !== end) {
      next = input.slice(0, start) + input.slice(end)
      caret = start
    } else if (start > 0) {
      next = input.slice(0, start - 1) + input.slice(start)
      caret = start - 1
    } else return
    setInput(next)
    requestAnimationFrame(() => {
      el?.focus({ preventScroll: true })
      el?.setSelectionRange(caret, caret)
    })
  }, [answered, input])

  const check = useCallback(() => {
    if (answered) return
    if (!input.trim()) {
      setNudge(true)
      setTimeout(() => setNudge(false), 600)
      inputRef.current?.focus()
      return
    }
    const outcome = grade(input, q.answers, settings.forgiving)
    if (outcome === "correct") onCorrect(q.id)
    setRecords((r) => [...r, { questionId: q.id, input, outcome }])
  }, [answered, input, q, settings.forgiving, onCorrect])

  const reveal = useCallback(() => {
    if (answered) return
    setRecords((r) => [...r, { questionId: q.id, input, outcome: "revealed" }])
  }, [answered, input, q.id])

  const choose = useCallback((choice: string) => {
    if (answered) return
    const outcome = grade(choice, q.answers, settings.forgiving)
    if (outcome === "correct") onCorrect(q.id)
    setRecords((r) => [...r, { questionId: q.id, input: choice, outcome }])
  }, [answered, onCorrect, q, settings.forgiving])

  const next = useCallback(() => {
    if (!answered) return
    if (isLast) {
      onFinish(records)
      return
    }
    setIndex((i) => i + 1)
    setInput("")
    setShowHint(false)
    setShowUses(false)
  }, [answered, isLast, onFinish, records])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && answered && document.activeElement !== inputRef.current) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [answered, next])

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (answered) next()
      else check()
      return
    }
    if (!settings.physicalMap || answered || e.ctrlKey || e.metaKey || e.altKey) return
    const mapping = PHYSICAL_MAP[e.code]
    if (!mapping || e.key.length !== 1 || e.key.charCodeAt(0) > 127) return
    const ch = e.shiftKey ? mapping.shift : mapping.normal
    e.preventDefault()
    if (ch) insert(ch)
  }

  const [before, after] = q.sentence.split("___")
  const outcome = current?.outcome
  const filledSentence = q.sentence.replace("___", q.answers[0].replace(/ـ$/, ""))

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onExit(records)} aria-label="End session">
          <X />
        </Button>
        <Progress value={((index + (answered ? 1 : 0)) / questions.length) * 100} className="flex-1" />
        <div className="text-sm whitespace-nowrap text-muted-foreground tabular-nums">
          {index + 1} / {questions.length}
        </div>
        <Badge variant="outline" className="tabular-nums">
          {score} correct
        </Badge>
      </div>

      <Card className="overflow-visible">
        <CardContent className="space-y-5 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge>{topic.title}</Badge>
              <span dir="rtl" className="font-arabic text-primary">
                {topic.arabicTitle}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowUses((v) => !v)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <BookOpen className="size-3.5" />
              {showUses ? "Hide uses" : "Uses for this type"}
            </button>
          </div>

          {showUses && (
            <ul className="space-y-1.5 rounded-lg bg-muted/60 p-3 text-sm">
              {topic.uses.map((u) => (
                <li key={u.label} className="text-muted-foreground">
                  <span className="font-medium text-foreground">{u.label}</span>
                  {u.arabic && (
                    <bdi dir="rtl" className="mx-1.5 font-arabic text-base text-primary">
                      {u.arabic}
                    </bdi>
                  )}
                  — <BidiText text={u.note} />
                </li>
              ))}
            </ul>
          )}

          <p className="text-sm text-muted-foreground">{topic.instruction}</p>

          {q.topic === "vocabulary" ? (
            <div className="rounded-xl bg-muted/50 p-5 text-center">
              <p className="text-sm text-muted-foreground">What does this word mean?</p>
              <p dir="rtl" className="mt-2 font-arabic text-3xl text-primary">{q.cue}</p>
            </div>
          ) : q.cue && (
            <div className="flex justify-end">
              <span
                dir="rtl"
                className="rounded-full border border-dashed border-primary/50 bg-primary/5 px-3 py-1 font-arabic text-lg text-primary"
              >
                {q.topic === "pronouns" ? (
                  /[\u0600-\u06FF]/.test(q.cue) ? <>استبدل: «{q.cue}»</> : <span dir="ltr" className="font-sans text-sm">{q.cue}</span>
                ) : (
                  <>الصيغة الأصلية: «{q.cue}»</>
                )}
              </span>
            </div>
          )}

          {q.choices ? (
            <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Answer choices">
              {q.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  disabled={answered}
                  onClick={() => choose(choice)}
                  className={cn(
                    "min-h-12 rounded-lg border bg-background px-4 py-3 text-left text-sm transition-colors hover:border-primary hover:bg-primary/5 disabled:cursor-default",
                    current?.input === choice && current.outcome === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-800",
                    current?.input === choice && current.outcome !== "correct" && "border-rose-400 bg-rose-50 text-rose-800",
                    answered && choice === q.answers[0] && current?.outcome !== "correct" && "border-emerald-500 bg-emerald-50 text-emerald-800",
                  )}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : <div dir="rtl" className="font-arabic text-2xl leading-[2.4] sm:text-3xl sm:leading-[2.4]">
            {before}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => !answered && setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              readOnly={answered}
              inputMode={settings.deviceKeyboard ? "text" : "none"}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              lang="ar"
              dir="rtl"
              aria-label="Your answer"
              placeholder="؟"
              style={{ width: `${Math.max(5, input.length * 0.75 + 2)}em` }}
              className={cn(
                "mx-1.5 inline-block max-w-full rounded-lg border-2 border-dashed bg-background px-2 py-0.5 text-center align-middle font-arabic text-primary outline-none transition-all placeholder:text-muted-foreground/40",
                "focus:border-solid focus:border-primary focus:ring-4 focus:ring-primary/15",
                nudge && "animate-shake border-destructive",
                outcome === "correct" && "border-solid border-emerald-500 bg-emerald-50 text-emerald-700",
                (outcome === "wrong" || outcome === "spelling") && "border-solid border-rose-400 bg-rose-50 text-rose-700 line-through decoration-2",
                outcome === "revealed" && "border-solid border-muted-foreground/30 text-muted-foreground",
              )}
            />
            {after}
          </div>}

          {showHint && !answered && !q.choices && (
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              <Lightbulb className="mt-0.5 size-4 shrink-0" />
              <span>{q.english}</span>
            </div>
          )}

          {settings.wordBank && topic.bank && !answered && !q.choices && (
            <div className="space-y-1.5">
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Word bank</div>
              <div dir="rtl" className="flex flex-wrap gap-1.5">
                {topic.bank.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setInput(w)
                      inputRef.current?.focus({ preventScroll: true })
                    }}
                    className={cn(
                      "rounded-full border bg-background px-3 py-1 font-arabic text-lg transition-colors hover:border-primary hover:bg-primary/5",
                      input === w && "border-primary bg-primary/10 text-primary",
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {answered && outcome && (
            <Feedback
              outcome={outcome}
              modelAnswer={q.answers[0]}
              filledSentence={filledSentence}
              vocabularyWord={q.topic === "vocabulary" ? q.cue : undefined}
              english={q.english}
              explanation={q.explanation}
              spellingNote={outcome === "correct" && needsSpellingNote(current!.input, q.answers)}
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              {!answered && !q.choices && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setShowHint((v) => !v)}>
                    <Lightbulb /> {showHint ? "Hide hint" : "Hint"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reveal}>
                    <Eye /> Show answer
                  </Button>
                </>
              )}
            </div>
            {answered ? (
              <Button onClick={next} size="lg">
                {isLast ? "See results" : "Next question"} <ArrowRight />
              </Button>
            ) : q.choices ? null : (
              <Button onClick={check} size="lg">
                Check answer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {!q.choices && <ArabicKeyboard
        onInsert={insert}
        onBackspace={backspace}
        onClear={() => !answered && setInput("")}
        onEnter={answered ? next : check}
        enterLabel={answered ? (isLast ? "Results" : "Next") : "Check"}
        disabled={answered}
        showLatin={settings.showLatin}
      />}
    </div>
  )
}

function Feedback({
  outcome,
  modelAnswer,
  filledSentence,
  vocabularyWord,
  english,
  explanation,
  spellingNote,
}: {
  outcome: AnswerRecord["outcome"]
  modelAnswer: string
  filledSentence: string
  vocabularyWord?: string
  english: string
  explanation: string
  spellingNote: boolean
}) {
  const styles = {
    correct: { box: "border-emerald-200 bg-emerald-50", icon: <CheckCircle2 className="size-5 text-emerald-600" />, title: "Correct!" },
    spelling: { box: "border-amber-200 bg-amber-50", icon: <CircleAlert className="size-5 text-amber-600" />, title: "Almost — check the spelling" },
    wrong: { box: "border-rose-200 bg-rose-50", icon: <XCircle className="size-5 text-rose-600" />, title: "Not quite" },
    revealed: { box: "border-border bg-muted/60", icon: <Eye className="size-5 text-muted-foreground" />, title: "Here's the answer" },
  }[outcome]

  return (
    <div className={cn("space-y-3 rounded-xl border p-4", styles.box)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          {styles.icon}
          {styles.title}
        </div>
        <span dir={vocabularyWord ? "ltr" : "rtl"} className={cn("text-2xl font-semibold text-primary", !vocabularyWord && "font-arabic")}>
          {modelAnswer}
        </span>
      </div>
      {spellingNote && (
        <p className="text-xs text-amber-800">Accepted with forgiving spelling. The exact spelling is shown on the right.</p>
      )}
      {vocabularyWord ? (
        <p dir="rtl" className="font-arabic text-xl leading-relaxed">{vocabularyWord} — {modelAnswer}</p>
      ) : (
        <p dir="rtl" className="font-arabic text-xl leading-relaxed">{filledSentence}</p>
      )}
      <p className="text-sm text-muted-foreground italic">{english}</p>
      <p className="text-sm">
        <BidiText text={explanation} />
      </p>
    </div>
  )
}
