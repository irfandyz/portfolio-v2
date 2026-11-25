import { useState } from 'react'
import { CHAMBERS } from '../../hooks/useScrollSnap'

interface SideRadarProps {
  activeChamber: number
  scrollToChamber: (index: number) => void
  playClick: () => void
}

export function SideRadar({ activeChamber, scrollToChamber, playClick }: SideRadarProps) {
  const [isRadarHovered, setIsRadarHovered] = useState<boolean>(false)

  return (
    <nav
      aria-label="Shrine Pilgrimage Navigation"
      onMouseEnter={() => setIsRadarHovered(true)}
      onMouseLeave={() => setIsRadarHovered(false)}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3.5 group/radar"
    >
      <div className="text-[10px] font-kanji text-amber-400/60 tracking-widest mr-1 writing-mode-vertical transition-colors group-hover/radar:text-amber-300">
        // 参拝路
      </div>

      <div className="relative flex flex-col gap-2.5 items-end">
        {/* Vertical Pilgrimage Pillar Thread */}
        <div className="absolute right-[1.15rem] top-2 bottom-2 w-px bg-gradient-to-b from-rose-500/20 via-amber-400/35 to-teal-400/20 pointer-events-none" />

        {CHAMBERS.map((chamber, index) => {
          const isActive = activeChamber === index
          return (
            <button
              key={chamber.id}
              onClick={() => {
                playClick()
                scrollToChamber(index)
              }}
              className="group flex items-center gap-3 cursor-pointer py-1 text-right focus:outline-none relative"
            >
              {/* Tooltip Label */}
              <div
                className={`flex items-center gap-2 transition-all duration-300 pointer-events-none ${
                  isRadarHovered && isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <span className="hanko-seal px-1.5 py-0.5 rounded text-[10px] font-kanji font-bold">
                  {chamber.kanji}
                </span>
                <span
                  className={`font-tech text-xs tracking-wider font-semibold whitespace-nowrap px-2.5 py-0.5 rounded border transition-colors ${
                    isActive
                      ? 'shrine-glass-active text-amber-200 border-amber-400/50 shadow-[0_0_14px_rgba(251,191,36,0.28)]'
                      : 'bg-[#0a0d14]/90 border-amber-400/15 text-slate-400'
                  }`}
                >
                  {chamber.label}
                </span>
              </div>

              {/* Rotated 45deg Diamond Lantern Marker */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {isActive && (
                  <span className="absolute w-4 h-4 rotate-45 bg-amber-400/25 animate-ping" />
                )}
                <div
                  className={`transition-all duration-300 rotate-45 ${
                    isActive
                      ? 'w-3 h-3 bg-gradient-to-br from-rose-500 via-amber-400 to-teal-300 shadow-[0_0_12px_rgba(251,191,36,0.85)] border border-amber-100/80'
                      : 'w-2 h-2 bg-slate-700/90 border border-amber-500/30 group-hover:bg-amber-400/70 group-hover:scale-125'
                  }`}
                />
              </div>

              {/* Traditional Kanji Numeral Marker (壱–漆) */}
              <span
                className={`font-kanji text-xs transition-colors w-4 text-center ${
                  isActive
                    ? 'text-amber-300 font-bold glow-text-gold'
                    : 'text-slate-500 group-hover:text-amber-200'
                }`}
              >
                {chamber.kanjiNumeral}
              </span>
            </button>
          )
        })}
      </div>

      <div className="h-10 w-px bg-gradient-to-b from-amber-400/40 via-rose-500/30 to-transparent mr-3" />
    </nav>
  )
}
