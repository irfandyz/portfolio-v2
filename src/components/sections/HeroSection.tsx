import { OPERATOR_PROFILE } from '../../data/portfolioData'
import { ArrowDownRight } from 'lucide-react'

interface HeroSectionProps {
  playClick: () => void
  scrollToChamber: (index: number) => void
}

export function HeroSection({ playClick, scrollToChamber }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-8 md:py-12"
    >
      {/* Background Ambience Grid */}
      <div className="absolute inset-0 cyber-scanline opacity-25 pointer-events-none" />

      {/* Vertical Kanji Watermark */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 font-kanji text-5xl md:text-8xl font-black text-cyan-500/[0.04] select-none pointer-events-none tracking-widest writing-mode-vertical">
        電脳東京建築
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center px-4 sm:px-8 py-8">
        {/* Main Name & Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-pink-200">
            {OPERATOR_PROFILE.name}
          </span>
        </h1>

        <div className="flex items-center justify-center gap-3 mb-6 text-sm sm:text-base md:text-lg font-tech text-cyan-400 tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <span className="text-slate-500">//</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-100">
            FULL-STACK SYSTEM ARCHITECT
          </span>
          <span className="text-slate-500">//</span>
          <span className="font-kanji text-slate-300 text-xs sm:text-sm hidden sm:inline">
            システム開発者
          </span>
        </div>

        {/* Philosophy Callout */}
        <p className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          {OPERATOR_PROFILE.philosophy}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              playClick()
              scrollToChamber(1) // Jump to Operator Dossier / Next Chamber
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold tracking-wider text-xs sm:text-sm font-tech flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
          >
            <span>GET STARTED</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
