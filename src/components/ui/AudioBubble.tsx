import { useState, useRef, useEffect, useCallback } from 'react'
import { Volume2, VolumeX, Music2, Volume1, SkipForward } from 'lucide-react'

interface AudioBubbleProps {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
  volume: number
  setVolume: (val: number) => void
  trackTitle?: string
  nextTrack?: () => void
}

export function AudioBubble({
  isMuted,
  toggleMute,
  playClick,
  volume,
  setVolume,
  trackTitle = 'TRACK-01',
  nextTrack
}: AudioBubbleProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showMenu = isMenuOpen && !isMuted

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleButtonMouseEnter = () => {
    clearCloseTimer()
    setIsButtonHovered(true)
    if (!isMuted) {
      setIsMenuOpen(true)
    }
  }

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false)
    if (isDragging) return
    clearCloseTimer()
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 240)
  }

  const handlePanelMouseEnter = () => {
    clearCloseTimer()
  }

  const handlePanelMouseLeave = () => {
    if (isDragging) return
    clearCloseTimer()
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 240)
  }

  const updateVolumeFromY = useCallback((clientY: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const height = rect.height
    const offsetY = rect.bottom - clientY
    const newVol = Math.max(0, Math.min(1, offsetY / height))
    setVolume(newVol)
  }, [setVolume])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDragging(true)
    updateVolumeFromY(e.clientY)
    playClick()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateVolumeFromY(e.clientY)
      }
    }
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updateVolumeFromY])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY < 0 ? 0.05 : -0.05
    setVolume(Math.max(0, Math.min(1, volume + delta)))
  }

  const volPercent = Math.round(volume * 100)

  return (
    <aside
      aria-label="Suzu Resonance Audio Controls"
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Top Row: Tooltip + Suzu Bell Resonance Bubble */}
      <div className="flex items-center gap-2.5">
        {/* Dynamic Tooltip Badge */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-tech tracking-wider border backdrop-blur-md transition-all duration-300 pointer-events-none ${
            isButtonHovered || showMenu
              ? 'opacity-100 -translate-x-1'
              : 'opacity-0 translate-x-2'
          } ${
            !isMuted
              ? 'bg-[#120d12]/90 border-amber-400/50 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.28)]'
              : 'bg-[#0a0d14]/90 border-amber-400/15 text-slate-400'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${!isMuted ? 'bg-teal-400' : 'bg-slate-500'}`} />
          <span>{!isMuted ? `${trackTitle} // ${volPercent}%` : 'SUZU // MUTED'}</span>

          {!isMuted && (
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-amber-400 h-2.5 animate-pulse" />
              <span className="w-0.5 bg-rose-400 h-3 animate-ping" />
              <span className="w-0.5 bg-teal-400 h-1.5 animate-pulse" />
            </div>
          )}
        </div>

        {/* Suzu Resonance Talisman Button */}
        <button
          onClick={() => {
            if (!isMuted) {
              clearCloseTimer()
              setIsMenuOpen(false)
            }
            toggleMute()
            playClick()
          }}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          aria-label={isMuted ? 'Nyalakan Audio BGM & SFX' : 'Senyapkan Audio BGM & SFX'}
          title={isMuted ? 'Klik untuk Nyalakan Musik' : `Klik untuk Senyapkan (${trackTitle} - Hover untuk Volume)`}
          className={`pointer-events-auto relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            !isMuted
              ? 'bg-[#120d14]/90 border border-amber-400/60 text-amber-200 shadow-[0_0_24px_rgba(251,191,36,0.35)] hover:shadow-[0_0_32px_rgba(225,29,72,0.5)] hover:border-amber-300 hover:scale-105'
              : 'bg-[#0a0d14]/85 border border-amber-400/20 text-slate-400 hover:border-amber-400/50 hover:text-amber-200 hover:scale-105'
          }`}
        >
          {!isMuted && (
            <span className="absolute inset-0 rounded-full border border-rose-400/40 animate-ping opacity-60 pointer-events-none" />
          )}

          {!isMuted ? (
            <div className="relative flex items-center justify-center">
              {volume > 0.4 ? (
                <Volume2 className="w-5 h-5 text-amber-300 group-hover:text-amber-100 transition-colors" />
              ) : (
                <Volume1 className="w-5 h-5 text-amber-300 group-hover:text-amber-100 transition-colors" />
              )}
              <Music2 className="absolute -top-1 -right-1.5 w-2.5 h-2.5 text-rose-400 animate-pulse" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-slate-500 group-hover:text-amber-200 transition-colors" />
          )}

          <span
            className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border border-[#0a0d14] ${
              !isMuted ? 'bg-teal-400 shadow-[0_0_6px_#2dd4bf]' : 'bg-rose-500/70'
            }`}
          />
        </button>
      </div>

      {/* Vertical Volume Slider Card */}
      <div
        onMouseEnter={handlePanelMouseEnter}
        onMouseLeave={handlePanelMouseLeave}
        onWheel={handleWheel}
        className={`mt-2 mr-0.5 w-11 md:w-12 py-3 px-2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 flex flex-col items-center gap-2 shadow-[0_0_30px_rgba(251,191,36,0.22)] ${
          showMenu
            ? 'opacity-100 translate-y-0 pointer-events-auto bg-[#0f0c14]/95 border-amber-400/50'
            : 'opacity-0 -translate-y-2 pointer-events-none bg-[#0f0c14]/0 border-transparent'
        }`}
      >
        <span className="font-tech text-[10px] font-bold text-amber-200 tracking-wider">
          {volPercent}%
        </span>

        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          className="relative w-2.5 h-24 rounded-full bg-slate-950 border border-amber-400/35 cursor-pointer overflow-hidden flex flex-col justify-end items-center group shadow-inner"
          title="Geser atau scroll untuk atur volume"
        >
          <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-30">
            <div className="w-full h-px bg-amber-300" />
            <div className="w-full h-px bg-amber-300" />
            <div className="w-full h-px bg-amber-300" />
            <div className="w-full h-px bg-amber-300" />
          </div>

          <div
            style={{ height: `${volPercent}%` }}
            className="w-full rounded-b-full bg-gradient-to-t from-rose-500 via-amber-400 to-teal-300 shadow-[0_0_12px_rgba(251,191,36,0.65)] transition-all duration-75 relative"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-1.5 rounded-full bg-amber-50 shadow-[0_0_8px_#fef08a]" />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full pt-1 border-t border-amber-400/20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setVolume(1.0)
              playClick()
            }}
            title="Max Volume (100%)"
            className="w-full py-0.5 text-[8px] font-tech font-bold text-amber-300 hover:text-white hover:bg-amber-500/20 rounded transition-colors text-center cursor-pointer"
          >
            MAX
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setVolume(0.3)
              playClick()
            }}
            title="Low Volume (30%)"
            className="w-full py-0.5 text-[8px] font-tech font-bold text-slate-400 hover:text-teal-300 hover:bg-teal-500/20 rounded transition-colors text-center cursor-pointer"
          >
            LOW
          </button>

          {nextTrack && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextTrack()
                playClick()
              }}
              title="Lewati / Putar Track Berikutnya"
              className="w-full mt-0.5 py-1 text-[8px] font-tech font-bold text-rose-300 hover:text-white hover:bg-rose-500/25 border border-rose-500/40 rounded flex items-center justify-center gap-0.5 transition-colors cursor-pointer group"
            >
              <SkipForward className="w-2.5 h-2.5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>SKIP</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
