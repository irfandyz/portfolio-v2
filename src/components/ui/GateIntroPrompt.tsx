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
      aria-label="Klik di mana saja untuk masuk ke dalam gerbang Torii"
      onClick={onEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onEnter()
        }
      }}
      className={`fixed inset-0 z-30 flex flex-col justify-between items-center py-10 md:py-14 px-4 select-none cursor-pointer transition-all duration-700 ${isWarping ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
        }`}
    >
      {/* Top Header Badge */}
      <div className="flex items-center gap-3 animate-pulse">
      </div>

      {/* Center Cinematic Focus Note (Minimalist) */}
      <div className="text-center">
        <h2 className="font-kanji text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-cyan-100/70 to-cyan-500/30 tracking-[0.4em] drop-shadow-[0_0_30px_rgba(0,240,255,0.3)] mb-2">
          鳥居
        </h2>
        <p className="font-tech text-[10px] sm:text-xs tracking-[0.35em] text-slate-400 uppercase">
          THE TORII PORTAL
        </p>
      </div>

      {/* Bottom Floating Call to Action */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-tech text-cyan-300/90 tracking-[0.25em] uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] animate-pulse">
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Click anywhere to warp through the gate</span>
        </div>
      </div>
    </div>
  )
}
