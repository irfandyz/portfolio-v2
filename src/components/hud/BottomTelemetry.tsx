import { useState, useEffect } from 'react'
import { ChevronDown, Cpu, Clock } from 'lucide-react'
import { CHAMBERS } from '../../hooks/useScrollSnap'

interface BottomTelemetryProps {
  activeChamber: number
  nextChamber: () => void
  playClick: () => void
}

export function BottomTelemetry({
  activeChamber,
  nextChamber,
  playClick
}: BottomTelemetryProps) {
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // WIB Timezone formatting (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setTimeStr(`${now.toLocaleTimeString('id-ID', options)} WIB`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const currentChamber = CHAMBERS[activeChamber]
  const isLastChamber = activeChamber === CHAMBERS.length - 1

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-2.5 flex items-center justify-between border-t border-cyan-500/10 bg-[#07080d]/85 backdrop-blur-md text-[11px] font-tech text-slate-400">
      {/* Left: Clock & Telemetry */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{timeStr || 'LIVE TELEMETRY'}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
          <Cpu className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-slate-400">FPS:</span>
          <span className="text-emerald-400 font-semibold">60.0</span>
        </div>
      </div>

      {/* Center: Scroll Navigation Hint */}
      {!isLastChamber ? (
        <button
          onClick={() => {
            playClick()
            nextChamber()
          }}
          className="group flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.15)]"
        >
          <span className="text-[10px] tracking-wider hidden sm:inline">NEXT PROTOCOL:</span>
          <span className="font-semibold">{CHAMBERS[activeChamber + 1]?.label}</span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </button>
      ) : (
        <div className="text-slate-500 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>TERMINAL END // UPLINK READY</span>
        </div>
      )}

      {/* Right: Active Chamber Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 hidden md:inline">POSITION:</span>
        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
          CHAMBER [{currentChamber?.code} / 07]
        </span>
      </div>
    </footer>
  )
}
