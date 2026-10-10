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
      aria-label="Chamber Navigation"
      onMouseEnter={() => setIsRadarHovered(true)}
      onMouseLeave={() => setIsRadarHovered(false)}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3.5 group/radar"
    >
      <div className="text-[10px] font-tech text-cyan-400/50 uppercase tracking-widest mr-1 writing-mode-vertical transition-colors group-hover/radar:text-cyan-400">
        // RADAR
      </div>

      <div className="flex flex-col gap-2.5 items-end">
        {CHAMBERS.map((chamber, index) => {
          const isActive = activeChamber === index
          return (
            <button
              key={chamber.id}
              onClick={() => {
                playClick()
                scrollToChamber(index)
              }}
              className="group flex items-center gap-3 cursor-pointer py-1 text-right focus:outline-none"
            >
              {/* Tooltip Label (Visible ONLY when cursor hovers over the radar area) */}
              <div
                className={`flex items-center gap-2 transition-all duration-300 pointer-events-none ${
                  isRadarHovered && isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <span className="font-kanji text-[10px] text-slate-500">
                  {chamber.kanji}
                </span>
                <span
                  className={`font-tech text-xs tracking-wider font-semibold whitespace-nowrap px-2 py-0.5 rounded border transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  {chamber.label}
                </span>
              </div>

              {/* Radar Bar / Dot */}
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <span className="absolute w-4 h-4 rounded-full bg-cyan-400/20 animate-ping" />
                )}
                <div
                  className={`transition-all duration-300 rounded-sm ${
                    isActive
                      ? 'w-6 h-1.5 bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                      : 'w-2 h-1.5 bg-slate-700 group-hover:bg-cyan-400/60 group-hover:w-3.5'
                  }`}
                />
              </div>

              {/* Code indicator */}
              <span
                className={`font-tech text-[10px] transition-colors w-4 ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              >
                {chamber.code}
              </span>
            </button>
          )
        })}
      </div>

      <div className="h-10 w-px bg-gradient-to-b from-cyan-500/30 to-transparent mr-3" />
    </nav>
  )
}
