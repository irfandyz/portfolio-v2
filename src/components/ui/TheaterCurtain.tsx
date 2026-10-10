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
    }, 2300)
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
      {/* 1. Left Cyber Curtain Panel (Organic Swaying Wave to Left) */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full curtain-cyber-velvet z-10 origin-top-left ${
          isOpen ? 'animate-curtain-sway-left' : 'translate-x-0'
        }`}
      >
        {/* Right Neon Cyan & Magenta Laser Seam Trim */}
        <div className="absolute right-0 top-0 bottom-0 w-1.5 curtain-cyber-laser" />

        {/* Subtle Ambient Depth Gradient at the split joint */}
        <div className="absolute right-1.5 top-0 bottom-0 w-12 bg-gradient-to-l from-black/90 to-transparent pointer-events-none" />

        {/* Vertical Shading Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. Right Cyber Curtain Panel (Organic Swaying Wave to Right) */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full curtain-cyber-velvet z-10 origin-top-right ${
          isOpen ? 'animate-curtain-sway-right' : 'translate-x-0'
        }`}
      >
        {/* Left Neon Cyan & Magenta Laser Seam Trim */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 curtain-cyber-laser" />

        {/* Subtle Ambient Depth Gradient at the split joint */}
        <div className="absolute left-1.5 top-0 bottom-0 w-12 bg-gradient-to-r from-black/90 to-transparent pointer-events-none" />

        {/* Vertical Shading Depth */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Top Valance & Dramatic Lighting Vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent z-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent z-15 pointer-events-none" />

      {/* 3. Center Sanctuary Seal & Grand Unveil Button */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-700 ease-out px-4 ${
          isOpen ? 'opacity-0 scale-90 -translate-y-6 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Glowing Background Radial Halo (Cyan & Deep Magenta Glow) */}
        <div className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-pink-950/30 blur-3xl pointer-events-none" />

        {/* Shinto Torii & Cyber Crest Container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

          {/* Top Kanji Badge & Cyber Torii Glyphs */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/80" />
            <div className="px-3.5 py-1 rounded-full border border-cyan-400/40 bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-tech tracking-[0.3em] text-cyan-300 shadow-[0_0_18px_rgba(0,240,255,0.3)] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>IRFANDY AZIZ</span>
              <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
            </div>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/80" />
          </div>

          {/* Majestic Kanji Title: 開 幕 (Cyber Holo-Glow) */}
          <h1 className="font-kanji text-5xl sm:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.7)] select-none">
            開幕
          </h1>

          {/* Elegant Cyber Shinto Divider Bar */}
          <div className="relative w-48 sm:w-60 h-2 my-5 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400 border border-white shadow-[0_0_10px_#00f0ff]" />
          </div>

          {/* The Grand Unveil Button (Click button or anywhere on screen) */}
          <button
            onClick={handleOpenCurtain}
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-tech text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-cyan-200 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.95), rgba(4, 7, 15, 0.98))',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.35), inset 0 0 20px rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.6)'
            }}
          >
            {/* Shimmer sweep effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Glowing borders */}
            <span className="absolute inset-0 rounded-xl border border-pink-500/30 group-hover:border-cyan-300/90 transition-colors" />

            {/* Button Inner Content */}
            <span className="relative z-10 flex items-center gap-2.5 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-white group-hover:scale-125 transition-all shadow-[0_0_10px_#00f0ff]" />
              <span>ENTER SANCTUM</span>
              <Play className="w-3.5 h-3.5 fill-cyan-300 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
