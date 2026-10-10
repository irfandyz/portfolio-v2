import { useState, useEffect } from 'react'
import { Sparkles, Play } from 'lucide-react'

interface TheaterCurtainProps {
  onOpen: () => void
  playClick?: () => void
  playHoloBeam?: () => void
}

export function TheaterCurtain({ onOpen, playClick, playHoloBeam }: TheaterCurtainProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isExited, setIsExited] = useState<boolean>(false)

  const handleOpenCurtain = () => {
    if (isOpen) return
    setIsOpen(true)

    // Trigger audio effects & BGM playback
    playClick?.()
    playHoloBeam?.()
    onOpen()

    // Completely unmount curtain after graceful theatrical sliding animation
    setTimeout(() => {
      setIsExited(true)
    }, 2000)
  }

  // Prevent keyboard scrolling or accidental jumps while curtain is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (isExited) return null

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Theater Grand Entrance Curtain - Klik di mana saja untuk membuka"
      onClick={handleOpenCurtain}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenCurtain()
        }
      }}
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-500 ${
        isOpen ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
    >
      {/* 1. Left Theater Curtain Panel */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full curtain-velvet z-10 transition-transform duration-[1800ms] origin-left ${isOpen ? '-translate-x-full scale-x-90' : 'translate-x-0 scale-x-100'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {/* Right Gold Trim Border with Vermilion Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-1.5 curtain-gold-border" />

        {/* Subtle Ambient Shadow at the split joint */}
        <div className="absolute right-1.5 top-0 bottom-0 w-8 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />

        {/* Vertical Shading Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. Right Theater Curtain Panel */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full curtain-velvet z-10 transition-transform duration-[1800ms] origin-right ${isOpen ? 'translate-x-full scale-x-90' : 'translate-x-0 scale-x-100'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {/* Left Gold Trim Border with Vermilion Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 curtain-gold-border" />

        {/* Subtle Ambient Shadow at the split joint */}
        <div className="absolute left-1.5 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />

        {/* Vertical Shading Depth */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Top Valance & Dramatic Lighting Vignette */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent z-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent z-15 pointer-events-none" />

      {/* 3. Center Sanctuary Seal & Grand Unveil Button */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-700 ease-out px-4 ${isOpen ? 'opacity-0 scale-90 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
          }`}
      >
        {/* Glowing Background Radial Halo */}
        <div className="absolute w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gradient-to-r from-rose-950/40 via-red-900/30 to-amber-950/20 blur-3xl pointer-events-none" />

        {/* Shinto Torii & Cyber Crest Container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

          {/* Top Kanji Badge & Cyber Torii Glyphs */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-amber-400/80" />
            <div className="px-3 py-1 rounded-full border border-amber-400/40 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-tech tracking-[0.3em] text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>IRFANDY AZIZ</span>
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            </div>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>

          {/* Majestic Kanji Title: 開 幕 (Curtain Unveiling) */}
          <h1 className="font-kanji text-5xl sm:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-rose-300 to-amber-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.6)] select-none">
            開幕
          </h1>

          {/* Elegant Shinto Rope / Divider Bar */}
          <div className="relative w-48 sm:w-60 h-2 my-5 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
            <div className="absolute w-2 h-2 rounded-full bg-rose-500 border border-amber-300 shadow-[0_0_8px_#ff0055]" />
          </div>

          {/* The Grand Unveil Button (Click button or anywhere on screen) */}
          <button
            onClick={handleOpenCurtain}
            className="group relative px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-tech text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-amber-200 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(35, 4, 10, 0.95), rgba(18, 2, 5, 0.98))',
              boxShadow: '0 0 30px rgba(225, 29, 72, 0.4), inset 0 0 20px rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.6)'
            }}
          >
            {/* Shimmer sweep effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Glowing borders */}
            <span className="absolute inset-0 rounded-xl border border-rose-500/40 group-hover:border-amber-400/90 transition-colors" />

            {/* Button Inner Content */}
            <span className="relative z-10 flex items-center gap-2.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
              <span className="w-2 h-2 rounded-full bg-rose-500 group-hover:bg-amber-300 group-hover:scale-125 transition-all shadow-[0_0_10px_#f43f5e]" />
              <span>BUKA TIRAI // ENTER SANCTUM</span>
              <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Sensory Cue / Note */}
          <div className="mt-4 flex items-center gap-2 text-[10px] font-tech text-slate-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Klik di mana saja pada layar untuk membuka gerbang & menyalakan musik</span>
          </div>
        </div>
      </div>
    </div>
  )
}
