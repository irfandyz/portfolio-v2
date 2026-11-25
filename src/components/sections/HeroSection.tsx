import { OPERATOR_PROFILE } from '../../data/portfolioData'
import { ArrowDownRight } from 'lucide-react'

interface HeroSectionProps {
  playClick: () => void
  scrollToChamber: (index: number) => void
  isEntered?: boolean
}

export function HeroSection({
  playClick,
  scrollToChamber,
  isEntered = false,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-8 md:py-12"
    >
      {/* Subtle Washi Atmosphere Grid */}
      <div className="absolute inset-0 cyber-scanline opacity-15 pointer-events-none" />

      {/* Left & Right Vertical Kanji Sanctuary Watermarks (Revealed after entering Torii) */}
      <div
        className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 font-kanji text-5xl md:text-7xl font-black text-amber-400/[0.06] select-none pointer-events-none tracking-widest [writing-mode:vertical-rl] transition-opacity duration-1000 ${
          isEntered ? 'opacity-100 delay-[400ms]' : 'opacity-0'
        }`}
      >
        神域電脳建築
      </div>
      <div
        className={`hidden md:block absolute right-14 top-1/2 -translate-y-1/2 font-kanji text-5xl md:text-6xl font-black text-rose-400/[0.05] select-none pointer-events-none tracking-widest [writing-mode:vertical-rl] transition-opacity duration-1000 ${
          isEntered ? 'opacity-100 delay-[400ms]' : 'opacity-0'
        }`}
      >
        参拝第一・拝殿
      </div>

      {/* Central Content Container with Subtle Text-Contrast Radial Backdrop */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center px-4 sm:px-10 py-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(5,7,11,0.68)_0%,rgba(5,7,11,0.25)_55%,transparent_80%)]">
        {/* Top Sacred Sanctuary Badge */}
        <div
          className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full shrine-glass border-amber-400/25 mb-5 transition-all duration-700 ease-out ${
            isEntered
              ? 'opacity-100 translate-y-0 delay-[200ms]'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <span className="hanko-seal px-1.5 py-0.5 rounded text-[11px] font-kanji font-bold">
            壱
          </span>
          <span className="text-[10px] sm:text-xs font-tech tracking-[0.2em] text-amber-200/90 uppercase">
            SANCTUARY 01 // HAIDEN MAIN WORSHIP HALL
          </span>
        </div>

        {/* Main Name Headline with Pearl-to-Gold Gradient & Hanko Seal */}
        <h1
          className={`flex items-center justify-center gap-3 sm:gap-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4 drop-shadow-[0_6px_32px_rgba(0,0,0,0.95)] transition-all duration-800 ease-out ${
            isEntered
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[350ms]'
              : 'opacity-0 translate-y-6 filter blur-[4px] pointer-events-none'
          }`}
        >
          <span className="block sm:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-rose-300">
            {OPERATOR_PROFILE.name}
          </span>
          <span
            aria-hidden="true"
            className="hanko-seal px-2 py-1 rounded text-sm sm:text-xl font-kanji font-black self-start mt-2 shrink-0"
          >
            伊
          </span>
        </h1>

        {/* Role Subtitle with Gold Diamond Dividers */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7 text-xs sm:text-base md:text-lg font-tech tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out ${
            isEntered
              ? 'opacity-100 translate-y-0 delay-[550ms]'
              : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
        >
          <span className="text-amber-400">◆</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-teal-300">
            SOFTWARE ENGINEER
          </span>
          <span className="text-rose-400">◆</span>
          <span className="font-bold text-slate-200 hidden sm:inline">
            SYSTEM ARCHITECT
          </span>
          <span className="text-amber-400 hidden sm:inline">◆</span>
          <span className="font-kanji text-amber-200/80 text-xs sm:text-sm">
            システム開発者
          </span>
        </div>

        {/* Interactive Sacred Action Button */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ease-out ${
            isEntered
              ? 'opacity-100 scale-100 translate-y-0 delay-[850ms] pointer-events-auto'
              : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => {
              playClick()
              scrollToChamber(1)
            }}
            className="kazari-corner w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-amber-50 font-bold tracking-wider text-xs sm:text-sm font-tech flex items-center justify-center gap-2.5 border border-amber-400/50 shadow-[0_0_28px_rgba(225,29,72,0.45)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>MULAI PENJELAJAHAN // ENTER SANCTUARY</span>
            <ArrowDownRight className="w-4 h-4 text-amber-200" />
          </button>
        </div>
      </div>
    </section>
  )
}
