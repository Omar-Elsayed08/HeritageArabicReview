import { RotateCcw, Settings2, Trophy } from "lucide-react"
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
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Trophy className="size-7" />
          </div>
          <div className="text-5xl font-semibold tabular-nums">{pct}%</div>
          <div className="text-muted-foreground">
            {correct} of {total} correct{unanswered > 0 && ` · ${unanswered} not attempted`}
          </div>
          <p className="font-medium">{message(pct)}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {missed.length + unanswered > 0 && (
              <Button onClick={onRetryMissed}>
                <RotateCcw /> Retry {missed.length + unanswered} missed
              </Button>
            )}
            <Button variant="outline" onClick={onRestart}>
              <RotateCcw /> Same topics, new mix
            </Button>
            <Button variant="ghost" onClick={onSetup}>
              <Settings2 /> Change topics
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>By topic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {perTopic.map(({ topic, total: t, ok }) => (
            <div key={topic.id} className="flex items-center gap-3">
              <div className="w-40 shrink-0 text-sm">{topic.title}</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", ok / t >= 0.8 ? "bg-emerald-500" : ok / t >= 0.5 ? "bg-amber-500" : "bg-rose-500")}
                  style={{ width: `${(ok / t) * 100}%` }}
                />
              </div>
              <div className="w-12 text-right text-sm text-muted-foreground tabular-nums">
                {ok}/{t}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {missed.length > 0 && (
        <Card>
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
