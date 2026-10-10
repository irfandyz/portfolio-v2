import { Sparkles, ChevronDown } from 'lucide-react'

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
      className={`fixed inset-0 z-30 flex flex-col justify-between items-center py-10 md:py-14 px-4 select-none cursor-pointer transition-all duration-700 ${
        isWarping ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Top Header Badge */}
      <div className="flex items-center gap-3 animate-pulse">
        <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-cyan-400" />
        <div className="px-4 py-1.5 rounded-full border border-cyan-400/50 bg-[#090d18]/80 backdrop-blur-md text-[11px] sm:text-xs font-tech tracking-[0.3em] text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>CYBER GATEWAY // KITSUNE SANCTUARY</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
        </div>
        <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
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
      <div className="flex flex-col items-center gap-3">
        <div
          className="group relative px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl font-tech text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-200 transition-all duration-300 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.9), rgba(4, 7, 15, 0.95))',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.35), inset 0 0 20px rgba(0, 240, 255, 0.15)',
            border: '1px solid rgba(0, 240, 255, 0.6)',
          }}
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] animate-ping" />
            <span>進入 // KLIK DI MANA SAJA UNTUK MASUK</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-tech text-slate-400/90 animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere to warp through the gate & activate audio</span>
        </div>
      </div>
    </div>
  )
}
