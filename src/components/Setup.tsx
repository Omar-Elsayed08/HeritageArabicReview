import { Check, ChevronDown, Play, Search, Shuffle, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { TOPICS, type TopicId } from "@/data/topics"
import { QUESTIONS } from "@/data/questions"
import { cn } from "@/lib/utils"
import type { Mastery, Settings } from "@/types"

const LENGTHS = [10, 20, 30, 50] as const

interface Props {
  selected: TopicId[]
  onToggleTopic: (id: TopicId) => void
  onSelectAll: (all: boolean) => void
  onSelectGroup: (ids: TopicId[], select: boolean) => void
  onFocusTopic: (id: TopicId) => void
  length: number | "all"
  onLength: (l: number | "all") => void
  settings: Settings
  onSettings: (s: Settings) => void
  mastery: Mastery
  onResetMastery: () => void
  onStart: () => void
}

const OPTION_ROWS: { key: keyof Settings; title: string; body: string }[] = [
  { key: "shuffle", title: "Shuffle questions", body: "Mix topics together instead of going topic by topic." },
  { key: "wordBank", title: "Show word bank", body: "Tap-to-fill choices for prepositions, question words, pronouns and adjectives." },
  { key: "forgiving", title: "Forgiving spelling", body: "Accept answers that only differ in hamza seat, ى/ي or ة/ه. Diacritics are always ignored." },
  { key: "physicalMap", title: "Type Arabic on an English keyboard", body: "Your physical keys type Arabic using the standard Arabic layout." },
  { key: "showLatin", title: "Show English key hints", body: "Small Latin letters on each on-screen key." },
  { key: "deviceKeyboard", title: "Allow phone / tablet keyboard", body: "Off: only the on-screen Arabic keyboard opens on touch devices." },
]

const TOPIC_GROUPS: { title: string; description: string; ids: TopicId[] }[] = [
  { title: "Foundations", description: "Core words, pronouns, and agreement", ids: ["prepositions", "questions", "pronouns", "plurals", "adjectives", "noun-adjective", "dual", "nisba"] },
  { title: "Verb forms", description: "Tenses, conjugation, and negation", ids: ["present", "future", "past", "present-negation", "past-negation", "laysa", "kana", "subjunctive", "verbal-sentences"] },
  { title: "Sentence patterns", description: "Build and analyze Arabic phrases and sentences", ids: ["attached-pronouns", "idaafa", "nominal-sentences", "roots-patterns"] },
  { title: "Vocabulary", description: "Review all listed vocabulary with multiple choice", ids: ["vocabulary"] },
]

const GROUP_TONES: Record<string, { border: string; header: string; badge: string; dot: string }> = {
  Foundations: { border: "border-emerald-200/80 dark:border-emerald-900/70", header: "bg-emerald-50/80 dark:bg-emerald-950/30", badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200", dot: "bg-emerald-500" },
  "Verb forms": { border: "border-sky-200/80 dark:border-sky-900/70", header: "bg-sky-50/80 dark:bg-sky-950/30", badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200", dot: "bg-sky-500" },
  "Sentence patterns": { border: "border-violet-200/80 dark:border-violet-900/70", header: "bg-violet-50/80 dark:bg-violet-950/30", badge: "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200", dot: "bg-violet-500" },
  Vocabulary: { border: "border-amber-200/80 dark:border-amber-900/70", header: "bg-amber-50/80 dark:bg-amber-950/30", badge: "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200", dot: "bg-amber-500" },
}

export function Setup({
  selected,
  onToggleTopic,
  onSelectAll,
  onSelectGroup,
  onFocusTopic,
  length,
  onLength,
  settings,
  onSettings,
  mastery,
  onResetMastery,
  onStart,
}: Props) {
  const [search, setSearch] = useState("")
  const [openGroups, setOpenGroups] = useState<string[]>(["Foundations"])
  const available = QUESTIONS.filter((q) => selected.includes(q.topic)).length
  const sessionSize = length === "all" ? available : Math.min(length, available)
  const selectedTopics = TOPICS
    .filter((topic) => selected.includes(topic.id))
    .map((topic) => ({ topic, count: QUESTIONS.filter((question) => question.topic === topic.id).length }))
  const topicProgress = TOPICS.map((topic) => {
    const questions = QUESTIONS.filter((question) => question.topic === topic.id)
    const mastered = questions.filter((question) => mastery[question.id]).length
    return { topic, total: questions.length, mastered, remaining: questions.length - mastered, percent: questions.length ? mastered / questions.length : 0 }
  })
  const totalMastered = topicProgress.reduce((sum, item) => sum + item.mastered, 0)
  const practicedTopics = topicProgress.filter((item) => item.mastered > 0).length
  const recommendations = [...topicProgress]
    .filter((item) => item.remaining > 0)
    .sort((a, b) => a.percent - b.percent || b.remaining - a.remaining)
    .slice(0, 3)
  const overallPercent = QUESTIONS.length ? Math.round((totalMastered / QUESTIONS.length) * 100) : 0

  function focusTopic(id: TopicId) {
    onFocusTopic(id)
    const group = TOPIC_GROUPS.find((item) => item.ids.includes(id))
    if (group) setOpenGroups((current) => current.includes(group.title) ? current : [...current, group.title])
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Choose your topics</h2>
            <p className="text-sm text-muted-foreground">
              {selected.length} of {TOPICS.length} selected · {available} questions available
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onSelectAll(true)}>
              Select all
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onSelectAll(false)}>
              Clear
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-card via-card to-primary/[0.06]">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Your learning dashboard</CardTitle>
              <Badge variant="outline">Updates as you practice</Badge>
            </div>
            <CardDescription>Progress is based on questions you have answered correctly at least once.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-emerald-200/70 bg-emerald-50/70 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="text-xl font-semibold tabular-nums">{totalMastered}<span className="text-sm font-normal text-muted-foreground"> / {QUESTIONS.length}</span></div>
                <div className="text-xs text-muted-foreground">questions mastered</div>
              </div>
              <div className="rounded-lg border border-sky-200/70 bg-sky-50/70 p-3 dark:border-sky-900/50 dark:bg-sky-950/30">
                <div className="text-xl font-semibold tabular-nums">{practicedTopics}<span className="text-sm font-normal text-muted-foreground"> / {TOPICS.length}</span></div>
                <div className="text-xs text-muted-foreground">topics practiced</div>
              </div>
              <div className="rounded-lg border border-violet-200/70 bg-violet-50/70 p-3 dark:border-violet-900/50 dark:bg-violet-950/30">
                <div className="text-xl font-semibold tabular-nums">{overallPercent}%</div>
                <div className="text-xs text-muted-foreground">overall progress</div>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted" aria-label={`Overall progress ${overallPercent}%`}>
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overallPercent}%` }} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">Suggested practice</h3>
                  <p className="text-xs text-muted-foreground">Topics with the most room to build mastery.</p>
                </div>
              </div>
              {recommendations.length ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {recommendations.map(({ topic, total, mastered, remaining, percent }) => (
                    <div key={topic.id} className={cn(
                      "rounded-lg border bg-background/80 p-3",
                      ["border-t-2 border-t-emerald-400/80", "border-t-2 border-t-sky-400/80", "border-t-2 border-t-violet-400/80"][recommendations.findIndex((item) => item.topic.id === topic.id) % 3],
                    )}>
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{topic.title}</span>
                          <span dir="rtl" className="block text-sm font-arabic text-primary">{topic.arabicTitle}</span>
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{Math.round(percent * 100)}%</span>
                      </div>
                      <div className="my-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary/75" style={{ width: `${percent * 100}%` }} />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">{remaining} to master · {mastered}/{total}</span>
                        <button type="button" onClick={() => focusTopic(topic.id)} className="shrink-0 text-xs font-medium text-primary underline-offset-2 hover:underline">
                          Focus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-dashed bg-background/60 p-3 text-sm text-muted-foreground">
                  You’ve mastered every question so far. Choose any topic below for a review session.
                </p>
              )}
            </div>

            <details className="group rounded-lg border bg-background/60">
              <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium marker:hidden">
                <span className="flex items-center justify-between gap-2">
                  Progress across all topics
                  <span className="text-xs font-normal text-muted-foreground">{TOPICS.length} topics</span>
                </span>
              </summary>
              <div className="grid gap-x-5 border-t px-3 py-3 sm:grid-cols-2">
                {topicProgress.map(({ topic, total, mastered, percent }) => (
                  <div key={topic.id} className="flex items-center gap-2 py-1.5">
                    <span className="min-w-0 flex-1 truncate text-xs" title={topic.title}>{topic.title}</span>
                    <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary/75" style={{ width: `${percent * 100}%` }} />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{mastered}/{total}</span>
                  </div>
                ))}
              </div>
            </details>
          </CardContent>
        </Card>

        <label className="flex h-10 items-center gap-2 rounded-lg border bg-card px-3 text-muted-foreground focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <Search className="size-4 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search topics"
            aria-label="Search topics"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {search && <button type="button" onClick={() => setSearch("")} className="text-xs hover:text-foreground">Clear search</button>}
        </label>

        <div className="space-y-2">
          {TOPIC_GROUPS.map((group) => {
            const topics = group.ids
              .map((id) => TOPICS.find((topic) => topic.id === id))
              .filter((topic): topic is (typeof TOPICS)[number] => Boolean(topic))
            const matching = topics.filter((topic) =>
              `${topic.title} ${topic.arabicTitle} ${topic.summary}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
            )
            if (!matching.length) return null
            const groupSelected = matching.filter((topic) => selected.includes(topic.id)).length
            const open = Boolean(search.trim()) || openGroups.includes(group.title)

            return (
              <section key={group.title} className={cn("overflow-hidden rounded-xl border bg-card shadow-xs", GROUP_TONES[group.title].border)}>
                <div className={cn("flex items-center gap-2 px-3 py-2.5 sm:px-4", GROUP_TONES[group.title].header)}>
                  <button
                    type="button"
                    onClick={() => setOpenGroups((current) => current.includes(group.title) ? current.filter((name) => name !== group.title) : [...current, group.title])}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <span className={cn("size-2 shrink-0 rounded-full", GROUP_TONES[group.title].dot)} />
                    <ChevronDown className={cn("size-4 shrink-0 transition-transform", !open && "-rotate-90")} />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{group.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{group.description}</span>
                    </span>
                    <Badge variant="secondary" className={cn("ml-auto shrink-0 border-0", GROUP_TONES[group.title].badge)}>{groupSelected}/{matching.length}</Badge>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => onSelectGroup(matching.map((topic) => topic.id), groupSelected < matching.length)}
                  >
                    {groupSelected === matching.length ? "Clear" : "Select"}
                  </Button>
                </div>
                {open && (
                  <div className="grid border-t sm:grid-cols-2">
                    {matching.map((topic) => {
                      const qs = QUESTIONS.filter((question) => question.topic === topic.id)
                      const done = qs.filter((question) => mastery[question.id]).length
                      const on = selected.includes(topic.id)
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => onToggleTopic(topic.id)}
                          aria-pressed={on}
                          className={cn(
                            "flex min-w-0 items-center gap-3 border-b p-3 text-left transition-colors hover:bg-muted/60 sm:even:border-l",
                            on && "bg-primary/[0.055]",
                          )}
                        >
                          <span className={cn("flex size-5 shrink-0 items-center justify-center rounded border", on ? "border-primary bg-primary text-primary-foreground" : "bg-background")}>
                            {on && <Check className="size-3.5" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-baseline justify-between gap-2">
                              <span className="truncate text-sm font-medium">{topic.title}</span>
                              <span dir="rtl" className="shrink-0 font-arabic text-sm text-primary">{topic.arabicTitle}</span>
                            </span>
                            <span className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{qs.length} questions</span>
                              <span aria-hidden="true">·</span>
                              <span>{done}/{qs.length} mastered</span>
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })}
          {search.trim() && !TOPICS.some((topic) => `${topic.title} ${topic.arabicTitle} ${topic.summary}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())) && (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No topics match “{search}”.</p>
          )}
        </div>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <Card className="border-primary/15 shadow-md shadow-primary/[0.04]">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Session</CardTitle>
              <Badge variant="outline" className="border-primary/20 bg-primary/[0.06] text-primary">{selectedTopics.length} topics</Badge>
            </div>
            <CardDescription>Choose the length and review the topics in your question pool.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <div className="flex items-center justify-between gap-2 border-b bg-background/70 px-3 py-2">
                <span className="text-xs font-semibold">Selected topics</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums text-muted-foreground">{available} questions in pool</span>
                  {selectedTopics.length > 0 && (
                    <button type="button" onClick={() => onSelectAll(false)} className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-destructive hover:underline">
                      Clear all
                    </button>
                  )}
                </div>
              </div>
              {selectedTopics.length ? (
                <ul className="max-h-48 divide-y overflow-y-auto">
                  {selectedTopics.map(({ topic, count }) => {
                    const group = TOPIC_GROUPS.find((item) => item.ids.includes(topic.id))
                    const tone = group ? GROUP_TONES[group.title] : GROUP_TONES.Foundations
                    return (
                      <li key={topic.id} className="flex items-center gap-2 px-3 py-2">
                        <span className={cn("size-1.5 shrink-0 rounded-full", tone.dot)} />
                        <span className="min-w-0 flex-1 truncate text-xs font-medium">{topic.title}</span>
                        <span dir="rtl" className="shrink-0 font-arabic text-xs text-muted-foreground">{topic.arabicTitle}</span>
                        <span className="w-14 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{count} Q</span>
                        <button
                          type="button"
                          aria-label={`Remove ${topic.title} from selected topics`}
                          title={`Remove ${topic.title}`}
                          onClick={() => onToggleTopic(topic.id)}
                          className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <X className="size-3.5" />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="px-3 py-4 text-center text-xs text-muted-foreground">Select one or more topics to build your question pool.</p>
              )}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {LENGTHS.map((l) => (
                <Button
                  key={l}
                  variant={length === l ? "default" : "outline"}
                  size="sm"
                  disabled={available === 0}
                  onClick={() => onLength(l)}
                >
                  {l}
                </Button>
              ))}
              <Button variant={length === "all" ? "default" : "outline"} size="sm" onClick={() => onLength("all")}>
                All
              </Button>
            </div>
            <Button className="h-11 w-full text-base" disabled={available === 0} onClick={onStart}>
              {settings.shuffle ? <Shuffle /> : <Play />}
              {available === 0 ? "Pick at least one topic" : `Start ${sessionSize} questions`}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {OPTION_ROWS.map((o) => (
              <label key={o.key} className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block text-sm font-medium">{o.title}</span>
                  <span className="block text-xs text-muted-foreground">{o.body}</span>
                </span>
                <Switch
                  checked={settings[o.key]}
                  onCheckedChange={(v) => onSettings({ ...settings, [o.key]: v })}
                />
              </label>
            ))}
          </CardContent>
        </Card>

        <p className="px-1 text-xs text-muted-foreground">
          {totalMastered} of {QUESTIONS.length} questions answered correctly at least once.{" "}
          {totalMastered > 0 && (
            <button type="button" className="underline underline-offset-2 hover:text-foreground" onClick={onResetMastery}>
              Reset progress
            </button>
          )}
        </p>
      </aside>
    </div>
  )
}
