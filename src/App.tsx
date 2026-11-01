import { useCallback, useEffect, useRef, useState } from "react"
import { BookOpenText, PanelsTopLeft, Play, Shuffle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Setup } from "@/components/Setup"
import { GrammarUses } from "@/components/GrammarUses"
import { Quiz } from "@/components/Quiz"
import { Results } from "@/components/Results"
import { QUESTIONS, type Question } from "@/data/questions"
import { TOPICS, type TopicId } from "@/data/topics"
import { usePersistentState } from "@/lib/storage"
import type { AnswerRecord, Mastery, Settings } from "@/types"

type Screen = "setup" | "quiz" | "results"

const DEFAULT_SETTINGS: Settings = {
  shuffle: true,
  wordBank: false,
  forgiving: true,
  physicalMap: true,
  showLatin: true,
  deviceKeyboard: false,
}

function shuffled<T>(list: T[]): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("setup")
  const [setupTab, setSetupTab] = useState("practice")
  const [prefs, setPrefs] = usePersistentState("ahq-prefs", {
    selected: TOPICS.map((t) => t.id) as TopicId[],
    length: 20 as number | "all",
    settings: DEFAULT_SETTINGS,
  })
  const [mastery, setMastery] = usePersistentState<Mastery>("ahq-mastery", {})
  const [session, setSession] = useState<Question[]>([])
  const [records, setRecords] = useState<AnswerRecord[]>([])
  const [sessionKey, setSessionKey] = useState(0)
  const migratedTopics = useRef(false)

  // Add newly introduced topics to saved selections from earlier app versions.
  useEffect(() => {
    if (migratedTopics.current) return
    migratedTopics.current = true
    const known = new Set(TOPICS.map((topic) => topic.id))
    const selected = Array.isArray(prefs.selected) ? prefs.selected.filter((id) => known.has(id)) : []
    const newTopics: TopicId[] = [
      "present-negation", "past-negation", "laysa", "kana", "attached-pronouns",
      "future", "dual", "noun-adjective", "idaafa", "nominal-sentences", "nisba", "subjunctive",
      "verbal-sentences", "roots-patterns", "vocabulary",
    ]
    const additions = newTopics.filter((id) => !selected.includes(id))
    if (additions.length) setPrefs((current) => ({ ...current, selected: [...selected, ...additions] }))
  }, [prefs.selected, setPrefs])

  const settings = { ...DEFAULT_SETTINGS, ...(prefs.settings && typeof prefs.settings === "object" ? prefs.settings : {}) }

  const begin = useCallback(
    (pool: Question[], limit: number | "all") => {
      const ordered = settings.shuffle
        ? shuffled(pool)
        : [...pool].sort((a, b) => QUESTIONS.indexOf(a) - QUESTIONS.indexOf(b))
      setSession(limit === "all" ? ordered : ordered.slice(0, limit))
      setRecords([])
      setSessionKey((k) => k + 1)
      setScreen("quiz")
      window.scrollTo({ top: 0 })
    },
    [settings.shuffle],
  )

  const start = () => {
    const selected = Array.isArray(prefs.selected) ? prefs.selected : []
    const pool = QUESTIONS.filter((q) => selected.includes(q.topic))
    if (pool.length) begin(pool, prefs.length === "all" || typeof prefs.length === "number" ? prefs.length : 20)
  }

  const startTopic = (topic: TopicId) => {
    const pool = QUESTIONS.filter((question) => question.topic === topic)
    if (!pool.length) return
    setPrefs((current) => ({ ...current, selected: [topic] }))
    begin(pool, prefs.length === "all" || typeof prefs.length === "number" ? prefs.length : 20)
  }

  const markCorrect = useCallback((id: string) => setMastery((m) => (m[id] ? m : { ...m, [id]: true })), [setMastery])

  return (
    <div className="min-h-svh">
      <header className={`${screen === "quiz" ? "hidden sm:block" : ""} sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
          <button type="button" onClick={() => setScreen("setup")} className="flex min-w-0 items-center gap-3 text-left">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-white shadow-sm sm:size-11 sm:rounded-2xl">
              <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" className="size-7 object-contain sm:size-9" />
            </div>
            <div className="min-w-0">
              <p className="hidden truncate text-[10px] font-semibold tracking-[0.18em] text-primary uppercase xs:block sm:block">Heritage Arabic · Review</p>
              <h1 className="truncate text-sm leading-tight font-semibold sm:text-base">Arabic for Heritage I · Quiz 2</h1>
            </div>
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-primary" />
            {QUESTIONS.length.toLocaleString()} practice questions
          </div>
        </div>
      </header>

      <main className={`mx-auto max-w-6xl px-3 pt-3 sm:px-6 sm:py-8 ${screen === "setup" ? "pb-24 sm:pb-8" : "pb-6"} ${screen === "quiz" ? "sm:pt-8" : ""}`}>
        {screen === "setup" && (
          <Tabs value={setupTab} onValueChange={setSetupTab} className="gap-3 sm:gap-7">
            <TabsList className="hidden h-12 border border-border/70 bg-card/70 p-1 shadow-sm sm:flex sm:w-fit">
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="uses">Grammar uses</TabsTrigger>
            </TabsList>
            <TabsContent value="practice" className="animate-screen-enter">
              <Setup
                selected={prefs.selected}
                onToggleTopic={(id) =>
                  setPrefs((p) => ({
                    ...p,
                    selected: p.selected.includes(id) ? p.selected.filter((x) => x !== id) : [...p.selected, id],
                  }))
                }
                onSelectAll={(all) => setPrefs((p) => ({ ...p, selected: all ? TOPICS.map((t) => t.id) : [] }))}
                onSelectGroup={(ids, select) => setPrefs((p) => {
                  const current = Array.isArray(p.selected) ? p.selected : []
                  return {
                    ...p,
                    selected: select
                      ? Array.from(new Set([...current, ...ids]))
                      : current.filter((id) => !ids.includes(id)),
                  }
                })}
                onFocusTopic={(id) => setPrefs((p) => ({ ...p, selected: [id] }))}
                length={prefs.length}
                onLength={(length) => setPrefs((p) => ({ ...p, length }))}
                settings={settings}
                onSettings={(s) => setPrefs((p) => ({ ...p, settings: s }))}
                mastery={mastery}
                onResetMastery={() => setMastery({})}
                onStart={start}
              />
            </TabsContent>
            <TabsContent value="uses" className="animate-screen-enter">
              <GrammarUses onPracticeTopic={startTopic} />
            </TabsContent>
          </Tabs>
        )}

        {screen === "setup" && (
          <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-20px_rgba(24,42,33,0.35)] backdrop-blur-xl sm:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-2">
              <button type="button" onClick={() => setSetupTab("practice")} aria-current={setupTab === "practice" ? "page" : undefined} className={`flex min-h-12 min-w-[4.25rem] flex-col items-center justify-center gap-0.5 rounded-xl px-2 text-[10px] font-medium transition-colors ${setupTab === "practice" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                <PanelsTopLeft className="size-5" />Practice
              </button>
              <button type="button" onClick={() => setSetupTab("uses")} aria-current={setupTab === "uses" ? "page" : undefined} className={`flex min-h-12 min-w-[4.25rem] flex-col items-center justify-center gap-0.5 rounded-xl px-2 text-[10px] font-medium transition-colors ${setupTab === "uses" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                <BookOpenText className="size-5" />Grammar
              </button>
              {setupTab === "practice" && (() => {
                const selected = Array.isArray(prefs.selected) ? prefs.selected : []
                const count = QUESTIONS.filter((question) => selected.includes(question.topic)).length
                const sessionLength = prefs.length === "all" ? count : Math.min(prefs.length, count)
                return <button type="button" onClick={start} disabled={!count} className="ml-auto flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-md disabled:opacity-50">
                  {settings.shuffle ? <Shuffle className="size-4" /> : <Play className="size-4" />}
                  <span className="truncate">Start {sessionLength} questions</span>
                </button>
              })()}
            </div>
          </nav>
        )}

        {screen === "quiz" && session.length > 0 && (
          <Quiz
            key={sessionKey}
            questions={session}
            settings={settings}
            onCorrect={markCorrect}
            onExit={(r) => {
              setRecords(r)
              setScreen(r.length ? "results" : "setup")
            }}
            onFinish={(r) => {
              setRecords(r)
              setScreen("results")
            }}
          />
        )}

        {screen === "results" && (
          <div className="animate-screen-enter">
          <Results
            questions={session}
            records={records}
            onRetryMissed={() => {
              const ok = new Set(records.filter((r) => r.outcome === "correct").map((r) => r.questionId))
              begin(session.filter((q) => !ok.has(q.id)), "all")
            }}
            onRestart={start}
            onSetup={() => setScreen("setup")}
          />
          </div>
        )}
      </main>

      <footer className="mx-auto hidden max-w-6xl px-4 pb-8 text-xs text-muted-foreground sm:block sm:px-6">
        Based on the Arabic for Heritage I Quiz 2 study guide (Fall 2026).
      </footer>
    </div>
  )
}
