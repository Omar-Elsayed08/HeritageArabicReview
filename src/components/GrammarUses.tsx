import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TOPICS } from "@/data/topics"

export function GrammarUses() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {TOPICS.map((t) => (
        <Card key={t.id} id={`uses-${t.id}`}>
          <CardHeader>
            <div className="flex min-w-0 flex-col items-start justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <CardTitle className="min-w-0 text-base sm:text-lg">{t.title}</CardTitle>
              <span dir="rtl" className="font-arabic text-lg text-primary sm:text-xl">
                {t.arabicTitle}
              </span>
            </div>
            <CardDescription>{t.summary}</CardDescription>
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
