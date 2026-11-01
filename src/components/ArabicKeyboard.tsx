import { useState } from "react"
import { CornerDownLeft, Delete, Eraser } from "lucide-react"
import { cn } from "@/lib/utils"
import { HAMZA_KEYS, HARAKAT_KEYS, LETTER_ROWS, type KeyDef } from "@/lib/arabic"

interface Props {
  onInsert: (text: string) => void
  onBackspace: () => void
  onClear: () => void
  onEnter: () => void
  enterLabel: string
  disabled?: boolean
  showLatin: boolean
}

function Key({
  def,
  onPress,
  disabled,
  showLatin,
  className,
}: {
  def: KeyDef
  onPress: (c: string) => void
  disabled?: boolean
  showLatin: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={def.name ? `${def.name}${def.latin ? ` (${def.latin})` : ""}` : def.latin ? `Key: ${def.latin}` : undefined}
      aria-label={def.name ?? def.char}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onPress(def.char)}
      className={cn(
        "relative flex h-11 min-w-0 flex-1 items-center justify-center rounded-xl border border-border/80 border-b-[3px] bg-card font-arabic text-xl text-foreground shadow-[0_2px_5px_rgba(22,38,30,0.06)] transition-all select-none",
        "hover:border-primary/35 hover:bg-primary/[0.035] active:translate-y-px active:border-b disabled:opacity-40 sm:h-12 sm:text-2xl",
        className,
      )}
    >
      <span className="leading-none">{def.label ?? def.char}</span>
      {showLatin && def.latin && (
        <span className="pointer-events-none absolute top-0.5 left-1 font-sans text-[9px] font-medium text-muted-foreground uppercase sm:text-[10px]">
          {def.latin}
        </span>
      )}
    </button>
  )
}

export function ArabicKeyboard({ onInsert, onBackspace, onClear, onEnter, enterLabel, disabled, showLatin }: Props) {
  const [layer, setLayer] = useState<"letters" | "harakat">("letters")

  return (
    <div
      dir="rtl"
      className="w-full rounded-3xl border border-border/75 bg-card/90 p-2 shadow-sm sm:p-3"
      aria-label="Arabic on-screen keyboard"
    >
      <div className="mb-1.5 flex gap-1 sm:mb-2 sm:gap-1.5">
        {(layer === "letters" ? HAMZA_KEYS : HARAKAT_KEYS).map((k) => (
          <Key
            key={k.char}
            def={k}
            onPress={onInsert}
            disabled={disabled}
            showLatin={showLatin}
            className="bg-primary/5 text-primary"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1 sm:gap-1.5">
        {LETTER_ROWS.map((r, i) => (
          <div key={i} dir="ltr" className={cn("flex gap-1 sm:gap-1.5", i === 1 && "px-2 sm:px-5", i === 2 && "px-5 sm:px-10")}>
            {r.map((k) => (
              <Key key={k.char + k.latin} def={k} onPress={onInsert} disabled={disabled} showLatin={showLatin} />
            ))}
          </div>
        ))}

        <div className="flex flex-wrap gap-1 sm:gap-1.5" dir="ltr">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setLayer(layer === "letters" ? "harakat" : "letters")}
            disabled={disabled}
            className={cn(
              "h-11 shrink-0 rounded-lg border border-b-[3px] px-2 text-xs font-medium transition-all sm:h-12 sm:px-3 sm:text-sm",
              layer === "harakat" ? "border-primary/40 bg-primary text-primary-foreground" : "bg-card hover:bg-accent",
            )}
          >
            <span className="font-arabic text-base">{layer === "letters" ? "ـَ ـُ ـِ" : "أ إ آ"}</span>
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClear}
            disabled={disabled}
            aria-label="Clear"
            className="flex h-11 shrink-0 items-center justify-center rounded-lg border border-b-[3px] bg-card px-3 text-muted-foreground transition-all hover:bg-accent active:translate-y-px sm:h-12"
          >
            <Eraser className="size-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onInsert(" ")}
            disabled={disabled}
            className="h-11 min-w-16 flex-1 rounded-lg border border-b-[3px] bg-card text-xs text-muted-foreground transition-all hover:bg-accent active:translate-y-px sm:h-12 sm:text-sm"
          >
            <span className="font-arabic">مسافة</span><span className="hidden sm:inline"> · space</span>
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onBackspace}
            disabled={disabled}
            aria-label="Backspace"
            className="flex h-11 shrink-0 items-center justify-center rounded-lg border border-b-[3px] bg-card px-3 transition-all hover:bg-accent active:translate-y-px sm:h-12 sm:px-4"
          >
            <Delete className="size-5 -scale-x-100" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onEnter}
            className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-b-[3px] border-primary/40 bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px sm:h-12 sm:px-4"
          >
            <CornerDownLeft className="size-4" />
            {enterLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
