import { ChevronDown } from 'lucide-react'

interface GateIntroPromptProps {
  onEnter: () => void
  isWarping: boolean
}

export function GateIntroPrompt({ onEnter, isWarping }: GateIntroPromptProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Klik di mana saja untuk masuk ke dalam kawasan suci gerbang Torii"
      onClick={onEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onEnter()
        }
      }}
      className={`fixed inset-0 z-30 flex flex-col justify-between items-center py-10 md:py-14 px-4 select-none cursor-pointer transition-all duration-700 ${
        isWarping ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Top Sacred Boundary Header Badge */}
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full shrine-glass border-amber-400/25">
        <span className="hanko-seal px-1.5 py-0.5 rounded text-[11px] font-kanji font-bold">
          神域
        </span>
        <span className="font-tech text-[10px] sm:text-xs tracking-[0.25em] text-amber-200/90 uppercase">
          ICHI-NO-TORII // SACRED BOUNDARY
        </span>
      </div>

      {/* Center Monumental Kanji Focus */}
      <div className="text-center">
        <h2 className="font-kanji text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-rose-400 tracking-[0.4em] drop-shadow-[0_0_32px_rgba(251,191,36,0.35)] mb-3">
          鳥居
        </h2>
        <div className="flex items-center justify-center gap-2.5 text-[10px] sm:text-xs font-tech tracking-[0.32em] text-amber-200/80 uppercase">
          <span className="text-amber-400">◆</span>
          <span>THE SACRED TORII PORTAL • 電脳神社</span>
          <span className="text-rose-400">◆</span>
        </div>
      </div>

      {/* Bottom Sacred Call to Action Pill */}
      <div className="flex flex-col items-center">
        <div className="shrine-glass kazari-corner px-5 sm:px-7 py-3 rounded-xl border-amber-400/35 flex items-center gap-2.5 text-[11px] sm:text-xs font-tech text-amber-100 tracking-[0.22em] uppercase shadow-[0_0_25px_rgba(225,29,72,0.28)] hover:border-rose-400/60 transition-all">
          <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>[ MASUKI KAWASAN SUCI // ENTER SANCTUARY ]</span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
