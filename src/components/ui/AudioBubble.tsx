import { useState, useRef, useEffect, useCallback } from 'react'
import { Volume2, VolumeX, Music2, Volume1 } from 'lucide-react'

interface AudioBubbleProps {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
  volume: number
  setVolume: (val: number) => void
}

export function AudioBubble({
  isMuted,
  toggleMute,
  playClick,
  volume,
  setVolume
}: AudioBubbleProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear timeout utility
  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  // Trigger hover open ONLY when directly on the bubble button
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
    // Grace period to move cursor into the volume panel smoothly
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 240)
  }

  // Keep open when cursor enters the volume panel
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

  // Calculate volume from click/drag Y position on the vertical track
  const updateVolumeFromY = useCallback((clientY: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const height = rect.height
    // Bottom is 0, Top is 1
    const offsetY = rect.bottom - clientY
    const newVol = Math.max(0, Math.min(1, offsetY / height))
    setVolume(newVol)
  }, [setVolume])

  // Drag interaction handlers
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

  // Close immediately if muted
  useEffect(() => {
    if (isMuted) {
      clearCloseTimer()
      setIsMenuOpen(false)
    }
  }, [isMuted])

  // Wheel scroll to adjust volume while hovering over the panel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY < 0 ? 0.05 : -0.05
    setVolume(Math.max(0, Math.min(1, volume + delta)))
  }

  const volPercent = Math.round(volume * 100)

  return (
    <aside
      aria-label="Audio Controls"
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Top Row: Tooltip + Bubble Button */}
      <div className="flex items-center gap-2.5">
        {/* Dynamic Tooltip Badge (Visible on button hover or menu open) */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-tech tracking-wider border backdrop-blur-md transition-all duration-300 pointer-events-none ${
            isButtonHovered || isMenuOpen
              ? 'opacity-100 -translate-x-1'
              : 'opacity-0 translate-x-2'
          } ${
            !isMuted
              ? 'bg-cyan-950/85 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'bg-slate-900/85 border-slate-700/60 text-slate-400'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{!isMuted ? `BGM & SFX // ${volPercent}%` : 'AUDIO // MUTED'}</span>

          {/* Equalizer animation when active */}
          {!isMuted && (
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-cyan-400 h-2.5 animate-pulse" />
              <span className="w-0.5 bg-pink-400 h-3 animate-ping" />
              <span className="w-0.5 bg-cyan-400 h-1.5 animate-pulse" />
            </div>
          )}
        </div>

        {/* Futuristic Floating Audio Bubble Button (Only button captures hover initially) */}
        <button
          onClick={() => {
            toggleMute()
            playClick()
          }}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          aria-label={isMuted ? 'Nyalakan Audio BGM & SFX' : 'Senyapkan Audio BGM & SFX'}
          title={isMuted ? 'Klik untuk Nyalakan Musik' : 'Klik untuk Senyapkan (Hover untuk Volume)'}
          className={`pointer-events-auto relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            !isMuted
              ? 'bg-[#080d1a]/90 border border-cyan-400/70 text-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:shadow-[0_0_32px_rgba(0,240,255,0.7)] hover:border-cyan-300 hover:scale-105'
              : 'bg-[#0b0e17]/85 border border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:scale-105'
          }`}
        >
          {/* Outer Ping Ring when Active */}
          {!isMuted && (
            <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-60 pointer-events-none" />
          )}

          {/* Icon states */}
          {!isMuted ? (
            <div className="relative flex items-center justify-center">
              {volume > 0.4 ? (
                <Volume2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
              ) : (
                <Volume1 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
              )}
              <Music2 className="absolute -top-1 -right-1.5 w-2.5 h-2.5 text-pink-400 animate-pulse" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          )}

          {/* Mini Status Dot */}
          <span
            className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border border-[#080d1a] ${
              !isMuted ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]' : 'bg-slate-600'
            }`}
          />
        </button>
      </div>

      {/* Vertical Volume Slider Card (Mounted ONLY when hovered from the button) */}
      <div
        onMouseEnter={handlePanelMouseEnter}
        onMouseLeave={handlePanelMouseLeave}
        onWheel={handleWheel}
        className={`mt-2 mr-0.5 w-11 md:w-12 py-3 px-2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 flex flex-col items-center gap-2.5 shadow-[0_0_30px_rgba(0,240,255,0.3)] ${
          isMenuOpen && !isMuted
            ? 'opacity-100 translate-y-0 pointer-events-auto bg-[#080d1a]/95 border-cyan-400/60'
            : 'opacity-0 -translate-y-2 pointer-events-none bg-[#080d1a]/0 border-transparent'
        }`}
      >
        {/* Top Percent Indicator */}
        <span className="font-tech text-[10px] font-bold text-cyan-300 tracking-wider">
          {volPercent}%
        </span>

        {/* Interactive Vertical Slider Track */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          className="relative w-2.5 h-28 rounded-full bg-slate-900 border border-cyan-500/40 cursor-pointer overflow-hidden flex flex-col justify-end items-center group shadow-inner"
          title="Geser atau scroll untuk atur volume"
        >
          {/* Subtle Grid Track Tick Marks */}
          <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-30">
            <div className="w-full h-px bg-cyan-300" />
            <div className="w-full h-px bg-cyan-300" />
            <div className="w-full h-px bg-cyan-300" />
            <div className="w-full h-px bg-cyan-300" />
          </div>

          {/* Filled Volume Level Bar (from bottom up) */}
          <div
            style={{ height: `${volPercent}%` }}
            className="w-full rounded-b-full bg-gradient-to-t from-pink-500 via-cyan-400 to-cyan-300 shadow-[0_0_12px_#00f0ff] transition-all duration-75 relative"
          >
            {/* Glowing Handle Cap on Top of Level */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        {/* Quick Min / Max Buttons */}
        <div className="flex flex-col gap-1 w-full pt-1 border-t border-cyan-500/20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setVolume(1.0)
              playClick()
            }}
            title="Max Volume (100%)"
            className="w-full py-0.5 text-[8px] font-tech font-bold text-cyan-400 hover:text-white hover:bg-cyan-500/20 rounded transition-colors text-center cursor-pointer"
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
            className="w-full py-0.5 text-[8px] font-tech font-bold text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded transition-colors text-center cursor-pointer"
          >
            LOW
          </button>
        </div>
      </div>
    </aside>
  )
}
