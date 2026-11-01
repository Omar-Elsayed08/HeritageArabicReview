import { BookOpenText, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TOPICS, type TopicId } from "@/data/topics"

export function GrammarUses({ onPracticeTopic }: { onPracticeTopic: (topic: TopicId) => void }) {
  return (
    <div className="space-y-5 sm:space-y-7">
      <div className="flex flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-card to-primary/[0.065] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><BookOpenText className="size-5" /></span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">Quick reference</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Grammar field guide</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">Short explanations and examples for the patterns in your practice set.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm sm:text-right">
          <span className="block text-xl font-semibold tabular-nums">{TOPICS.length}</span>
          <span className="text-xs text-muted-foreground">grammar topics</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
      {TOPICS.map((t, index) => (
        <Card key={t.id} id={`uses-${t.id}`} className={["border-t-4 border-t-primary/70", "border-t-4 border-t-orange-400/80", "border-t-4 border-t-sky-500/70", "border-t-4 border-t-violet-400/80"][index % 4]}>
          <CardHeader>
            <div className="flex min-w-0 flex-col items-start justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <CardTitle className="min-w-0 text-base sm:text-lg">{t.title}</CardTitle>
              <span dir="rtl" className="font-arabic text-lg text-primary sm:text-xl">
                {t.arabicTitle}
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardDescription>{t.summary}</CardDescription>
              <Button size="sm" className="min-h-10 shrink-0" onClick={() => onPracticeTopic(t.id)}>
                <Play className="size-4" />
                Practice this topic
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {t.uses.map((u) => (
                <li key={u.label} className="grid grid-cols-1 gap-1.5 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-3">
                  <div>
                    <div className="text-sm font-medium">{u.label}</div>
                    {u.arabic && (
                      <div dir="rtl" className="text-left font-arabic text-lg text-primary">
                        {u.arabic}
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground [unicode-bidi:plaintext]">
                    <BidiText text={u.note} />
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  )
}

/** Renders runs of Arabic script in the Arabic font so mixed notes read cleanly. */
export function BidiText({ text }: { text: string }) {
  const parts = text.split(/([\u0600-\u06FF](?:[\u0600-\u06FF\s/←↔.…ـ]*[\u0600-\u06FF])?)/g)
  return (
    <>
      {parts.map((p, i) =>
        /[\u0600-\u06FF]/.test(p) ? (
          <bdi key={i} dir="rtl" className="font-arabic text-[1.15em] text-foreground">
            {p}
          </bdi>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}
