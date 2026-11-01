import { ChartNoAxesColumnIncreasing, RotateCcw, Settings2, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TOPIC_MAP, TOPICS } from "@/data/topics"
import type { Question } from "@/data/questions"
import { cn } from "@/lib/utils"
import type { AnswerRecord } from "@/types"

interface Props {
  questions: Question[]
  records: AnswerRecord[]
  onRetryMissed: () => void
  onRestart: () => void
  onSetup: () => void
}

function message(pct: number) {
  if (pct === 100) return "Perfect score. You're ready for Quiz 2!"
  if (pct >= 85) return "Excellent work — just a few to polish."
  if (pct >= 65) return "Good progress. Review the missed ones below."
  return "Keep going — try the missed questions again."
}

export function Results({ questions, records, onRetryMissed, onRestart, onSetup }: Props) {
  const byId = new Map(questions.map((q) => [q.id, q]))
  const answeredRecords = records.filter((r) => byId.has(r.questionId))
  const correct = answeredRecords.filter((r) => r.outcome === "correct").length
  const total = questions.length
  const pct = total ? Math.round((correct / total) * 100) : 0
  const missed = answeredRecords.filter((r) => r.outcome !== "correct")
  const unanswered = total - answeredRecords.length

  const perTopic = TOPICS.map((t) => {
    const qs = questions.filter((q) => q.topic === t.id)
    const ok = answeredRecords.filter((r) => r.outcome === "correct" && byId.get(r.questionId)?.topic === t.id).length
    return { topic: t, total: qs.length, ok }
  }).filter((x) => x.total > 0)

  return (
    <div className="mx-auto max-w-4xl space-y-5 sm:space-y-7">
      <Card className="relative isolate overflow-hidden border-primary/10 bg-primary text-primary-foreground shadow-xl shadow-primary/10">
        <div aria-hidden="true" className="absolute -right-20 -top-24 size-72 rounded-full border border-current/10" />
        <div aria-hidden="true" className="absolute -right-2 -bottom-40 size-80 rounded-full border border-current/10" />
        <CardContent className="relative flex flex-col items-center gap-5 px-5 py-8 text-center sm:flex-row sm:gap-8 sm:px-9 sm:py-10 sm:text-left">
          <div className="flex size-28 shrink-0 flex-col items-center justify-center rounded-full border border-current/20 bg-white/10 shadow-inner backdrop-blur-sm sm:size-32">
            <span className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">{pct}%</span>
            <span className="mt-0.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-primary-foreground/70">score</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-primary-foreground/65 uppercase">
              <Trophy className="size-3.5" /> Session complete
            </div>
            <p className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">{message(pct)}</p>
            <div className="mt-2 text-sm text-primary-foreground/75">
              {correct} of {total} correct{unanswered > 0 && ` · ${unanswered} not attempted`}
            </div>
          </div>
          <div className="relative mt-1 flex w-full flex-col gap-2 sm:mt-0 sm:w-auto sm:min-w-48">
            {missed.length + unanswered > 0 && (
              <Button className="h-11 w-full border-0 bg-accent text-accent-foreground shadow-sm hover:bg-accent/85 sm:w-auto" onClick={onRetryMissed}>
                <RotateCcw /> Retry {missed.length + unanswered} missed
              </Button>
            )}
            <Button variant="outline" className="h-11 w-full border-white/25 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground sm:w-auto" onClick={onRestart}>
              <RotateCcw /> Same topics, new mix
            </Button>
            <Button variant="ghost" className="h-11 w-full text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground sm:w-auto" onClick={onSetup}>
              <Settings2 /> Change topics
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="sm:rounded-3xl">
        <CardHeader>
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><ChartNoAxesColumnIncreasing className="size-5" /></span>
            <span>
              <CardTitle className="text-lg font-semibold tracking-tight">Your results by topic</CardTitle>
              <CardDescription>See where you’re already strong and what to practice next.</CardDescription>
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {perTopic.map(({ topic, total: t, ok }) => (
            <div key={topic.id} className="flex items-center gap-2 sm:gap-3">
              <div className="min-w-0 flex-1 truncate text-xs sm:w-40 sm:flex-none sm:text-sm">{topic.title}</div>
              <div className="h-2.5 w-16 shrink-0 overflow-hidden rounded-full bg-muted sm:flex-1">
                <div
                  className={cn("h-full rounded-full", ok / t >= 0.8 ? "bg-emerald-500" : ok / t >= 0.5 ? "bg-amber-500" : "bg-rose-500")}
                  style={{ width: `${(ok / t) * 100}%` }}
                />
              </div>
              <div className="w-12 shrink-0 text-right text-xs text-muted-foreground tabular-nums sm:text-sm">
                {ok}/{t}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {missed.length > 0 && (
        <Card className="sm:rounded-3xl">
          <CardHeader>
            <CardTitle>Review</CardTitle>
            <CardDescription>Your answer, the correct answer, and why.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {missed.map((r) => {
                const q = byId.get(r.questionId)!
                return (
                  <li key={r.questionId} className="space-y-1.5 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{TOPIC_MAP[q.topic].title}</span>
                      <span>{r.outcome === "revealed" ? "Revealed" : r.outcome === "spelling" ? "Spelling" : "Incorrect"}</span>
                    </div>
                    {q.topic === "vocabulary" ? (
                      <p className="text-sm"><bdi dir="rtl" className="font-arabic text-xl">{q.cue}</bdi><span className="mx-2 text-muted-foreground">means</span><span className="rounded bg-emerald-100 px-1.5 text-emerald-800">{q.answers[0]}</span></p>
                    ) : (
                      <p dir="rtl" className="font-arabic text-xl leading-loose">
                        {q.sentence.split("___")[0]}
                        <span className="mx-1 rounded bg-emerald-100 px-1.5 text-emerald-800">{q.answers[0]}</span>
                        {q.sentence.split("___")[1]}
                      </p>
                    )}
                    {r.input.trim() && (
                      <p className="text-sm text-muted-foreground">
                        You wrote:{" "}
                        <bdi dir="rtl" className="font-arabic text-base text-rose-700 line-through">
                          {r.input}
                        </bdi>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">{q.english}</p>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
