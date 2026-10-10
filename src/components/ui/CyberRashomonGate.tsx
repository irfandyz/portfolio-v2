import { useState, useRef, useEffect, useCallback } from 'react'
import { Sparkles, Zap } from 'lucide-react'

interface CyberRashomonGateProps {
  onOpen: () => void
  playClick?: () => void
  playHoloBeam?: () => void
  playWarp?: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  decay: number
  rotation: number
  spin: number
  isShard: boolean
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  color: string
  alpha: number
  lineWidth: number
}

export function CyberRashomonGate({
  onOpen,
  playClick,
  playHoloBeam,
  playWarp,
}: CyberRashomonGateProps) {
  const [isBreached, setIsBreached] = useState<boolean>(false)
  const [isExited, setIsExited] = useState<boolean>(false)
  const [isShaking, setIsShaking] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const shockwavesRef = useRef<Shockwave[]>([])

  // Trigger Gate Shatter / Dematerialization
  const handleBreach = useCallback(() => {
    if (isBreached) return
    setIsBreached(true)
    setIsShaking(true)

    // Stop camera shake quickly
    setTimeout(() => {
      setIsShaking(false)
    }, 400)

    // Audio SFX + Start Music Playback
    playClick?.()
    playHoloBeam?.()
    playWarp?.()
    onOpen()

    // Initialize Canvas Dimensions & Fireworks / Digital Particles
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Vibrant Cyber Colors: Cyan, Magenta, Amber Gold, Violet, White
      const colors = ['#00f0ff', '#ff007f', '#ffe600', '#38bdf8', '#c084fc', '#ffffff']

      // Spawn 180 festive cyber particles
      const newParticles: Particle[] = []
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 16 + 3
        const spreadX = (Math.random() - 0.5) * (rect.width * 0.4)
        const spreadY = (Math.random() - 0.5) * (rect.height * 0.4)

        newParticles.push({
          x: centerX + spreadX,
          y: centerY + spreadY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3,
          size: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.016 + 0.008,
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 12,
          isShard: Math.random() > 0.4,
        })
      }
      particlesRef.current = newParticles

      // Spawn concentric neon shockwaves
      shockwavesRef.current = [
        {
          x: centerX,
          y: centerY,
          radius: 10,
          maxRadius: Math.max(rect.width, rect.height) * 0.9,
          color: '#00f0ff',
          alpha: 1,
          lineWidth: 5,
        },
        {
          x: centerX,
          y: centerY,
          radius: 5,
          maxRadius: Math.max(rect.width, rect.height) * 0.75,
          color: '#ff007f',
          alpha: 0.9,
          lineWidth: 4,
        },
        {
          x: centerX,
          y: centerY,
          radius: 2,
          maxRadius: Math.max(rect.width, rect.height) * 0.6,
          color: '#ffe600',
          alpha: 0.8,
          lineWidth: 3,
        },
      ]

      // Start Canvas Particle Render Loop
      const ctx = canvas.getContext('2d')
      if (ctx) {
        let lastTime = performance.now()

        const render = (currentTime: number) => {
          const delta = (currentTime - lastTime) / 16.66 || 1
          lastTime = currentTime

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // 1. Draw Expanding Shockwaves
          const shockwaves = shockwavesRef.current
          for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i]
            sw.radius += 18 * delta
            sw.alpha -= 0.02 * delta

            if (sw.alpha > 0 && sw.radius < sw.maxRadius) {
              ctx.save()
              ctx.beginPath()
              ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
              ctx.strokeStyle = sw.color
              ctx.lineWidth = sw.lineWidth
              ctx.shadowColor = sw.color
              ctx.shadowBlur = 20
              ctx.globalAlpha = Math.max(0, sw.alpha)
              ctx.stroke()
              ctx.restore()
            } else {
              shockwaves.splice(i, 1)
            }
          }

          // 2. Draw Dispersing Cyber Shards & Sparks
          const particles = particlesRef.current
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.x += p.vx * delta
            p.y += p.vy * delta
            p.vx *= 0.98
            p.vy *= 0.98
            p.vy += 0.08 * delta // gentle gravity
            p.rotation += p.spin * delta
            p.alpha -= p.decay * delta

            if (p.alpha > 0) {
              ctx.save()
              ctx.translate(p.x, p.y)
              ctx.rotate((p.rotation * Math.PI) / 180)
              ctx.globalAlpha = Math.max(0, p.alpha)
              ctx.shadowColor = p.color
              ctx.shadowBlur = 12
              ctx.fillStyle = p.color

              if (p.isShard) {
                // Polygonal tech shard
                ctx.beginPath()
                ctx.moveTo(-p.size, -p.size * 0.6)
                ctx.lineTo(p.size, -p.size * 0.2)
                ctx.lineTo(p.size * 0.6, p.size)
                ctx.lineTo(-p.size * 0.5, p.size * 0.8)
                ctx.closePath()
                ctx.fill()
              } else {
                // Glowing circular ember
                ctx.beginPath()
                ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2)
                ctx.fill()
              }
              ctx.restore()
            } else {
              particles.splice(i, 1)
            }
          }

          if (particles.length > 0 || shockwaves.length > 0) {
            animFrameRef.current = requestAnimationFrame(render)
          }
        }

        animFrameRef.current = requestAnimationFrame(render)
      }
    }

    // Unmount entire overlay after festive particles disperse
    setTimeout(() => {
      setIsExited(true)
    }, 1800)
  }, [isBreached, onOpen, playClick, playHoloBeam, playWarp])

  // Prevent background scrolling while gate is active
  useEffect(() => {
    if (!isBreached) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [isBreached])

  if (isExited) return null

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Cyber Rashomon Gate - Klik di mana saja untuk memecahkan gerbang"
      onClick={handleBreach}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleBreach()
        }
      }}
      className={`fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center transition-all duration-700 ${
        isBreached ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      } ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
      style={{
        backgroundColor: isBreached ? 'transparent' : '#05070e',
      }}
    >
      {/* Background Cyber Grid & Vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isBreached ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(5, 7, 14, 0.95) 75%),
            linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* Cyber Fog & Ambient Bloom Halo */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none transition-all duration-500 ${
          isBreached ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* Fullscreen Canvas for Digital Particle Explosion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* Rashomon Gate Structure Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-4 transition-all duration-700 ease-out ${
          isBreached
            ? 'opacity-0 scale-110 filter blur-sm -translate-y-4'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Top Header Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-cyan-400" />
          <div className="px-3.5 py-1 rounded-full border border-cyan-400/50 bg-[#090d18]/80 backdrop-blur-md text-[10px] sm:text-xs font-tech tracking-[0.3em] text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>NEURAL SANCTUARY // IRFANDY AZIZ</span>
            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
          </div>
          <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        {/* ======================================================== */}
        {/* CYBER RASHOMON GATE SVG ILLUSTRATION                      */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[540px] aspect-[4/3] flex items-center justify-center">
          <svg
            viewBox="0 0 600 450"
            className="w-full h-full drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for Cyber Gradients & Glows */}
            <defs>
              <linearGradient id="gateRoofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a0f1d" />
                <stop offset="50%" stopColor="#16223b" />
                <stop offset="100%" stopColor="#0a0f1d" />
              </linearGradient>

              <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#080c18" />
                <stop offset="50%" stopColor="#131c31" />
                <stop offset="100%" stopColor="#080c18" />
              </linearGradient>

              <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#ff007f" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>

              <radialGradient id="portalShield" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,240,255,0.25)" />
                <stop offset="70%" stopColor="rgba(255,0,127,0.12)" />
                <stop offset="100%" stopColor="rgba(5,7,14,0.85)" />
              </radialGradient>
            </defs>

            {/* --- 1. RASHOMON TIER 1 UPPER ROOF (Curved Pagoda Eaves) --- */}
            {/* Top Curved Ridge */}
            <path
              d="M 120 70 Q 300 40 480 70 L 460 85 Q 300 65 140 85 Z"
              fill="url(#gateRoofGrad)"
              stroke="#00f0ff"
              strokeWidth="1.5"
            />
            {/* Top Roof Crown Ornament (Shibi / Cyber Crest) */}
            <path
              d="M 290 40 L 300 20 L 310 40 Z"
              fill="#00f0ff"
              className="animate-pulse"
            />

            {/* --- 2. RASHOMON TIER 2 LOWER MAIN ROOF --- */}
            <path
              d="M 60 120 Q 300 80 540 120 L 515 145 Q 300 115 85 145 Z"
              fill="url(#gateRoofGrad)"
              stroke="#00f0ff"
              strokeWidth="2"
            />
            {/* Neon Circuit Tracer on Main Roof */}
            <path
              d="M 90 135 Q 300 108 510 135"
              stroke="#ff007f"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />

            {/* --- 3. ROOF SUPPORT BEAMS & CORBELS --- */}
            <rect x="150" y="145" width="300" height="15" fill="#0d1424" stroke="#00f0ff" strokeWidth="1" />
            <rect x="175" y="160" width="250" height="12" fill="#090e1a" stroke="#00f0ff" strokeWidth="0.8" />

            {/* --- 4. CENTER KANJI PLAQUE: 羅 生 門 --- */}
            <rect
              x="250"
              y="150"
              width="100"
              height="35"
              rx="4"
              fill="#060913"
              stroke="#ff007f"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_10px_#ff007f]"
            />
            <text
              x="300"
              y="174"
              textAnchor="middle"
              fill="#00f0ff"
              fontSize="18"
              fontWeight="bold"
              fontFamily="'Noto Sans JP', sans-serif"
              letterSpacing="6"
              className="drop-shadow-[0_0_8px_#00f0ff]"
            >
              羅生門
            </text>

            {/* --- 5. MONOLITHIC MASSIVE PILLARS (Left & Right) --- */}
            {/* Left Pillar */}
            <rect
              x="130"
              y="172"
              width="45"
              height="250"
              fill="url(#pillarGrad)"
              stroke="#00f0ff"
              strokeWidth="1.5"
            />
            {/* Left Pillar Laser Circuit Linework */}
            <line x1="152" y1="180" x2="152" y2="415" stroke="#00f0ff" strokeWidth="1" strokeDasharray="12 4" />
            <rect x="140" y="270" width="25" height="40" fill="#060913" stroke="#ff007f" strokeWidth="1" />
            <text x="152" y="295" textAnchor="middle" fill="#ff007f" fontSize="16" fontWeight="bold">羅</text>

            {/* Right Pillar */}
            <rect
              x="425"
              y="172"
              width="45"
              height="250"
              fill="url(#pillarGrad)"
              stroke="#00f0ff"
              strokeWidth="1.5"
            />
            {/* Right Pillar Laser Circuit Linework */}
            <line x1="448" y1="180" x2="448" y2="415" stroke="#00f0ff" strokeWidth="1" strokeDasharray="12 4" />
            <rect x="435" y="270" width="25" height="40" fill="#060913" stroke="#ff007f" strokeWidth="1" />
            <text x="448" y="295" textAnchor="middle" fill="#ff007f" fontSize="16" fontWeight="bold">門</text>

            {/* Outer Flanking Gate Walls */}
            <line x1="60" y1="420" x2="130" y2="420" stroke="#00f0ff" strokeWidth="3" />
            <line x1="470" y1="420" x2="540" y2="420" stroke="#00f0ff" strokeWidth="3" />

            {/* --- 6. INNER SANCTUARY PORTAL BARRIER (The Breachable Core) --- */}
            <rect
              x="175"
              y="180"
              width="250"
              height="240"
              fill="url(#portalShield)"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />

            {/* Central Holographic Hexagon Seal */}
            <polygon
              points="300,230 355,260 355,325 300,355 245,325 245,260"
              fill="rgba(6,9,18,0.85)"
              stroke="#00f0ff"
              strokeWidth="2"
              className="drop-shadow-[0_0_20px_#00f0ff]"
            />
            {/* Inner Rotating Ring Effect */}
            <circle
              cx="300"
              cy="292"
              r="40"
              stroke="#ff007f"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
            />

            {/* Kanji Core: 開 (Open / Breach) */}
            <text
              x="300"
              y="303"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="30"
              fontWeight="bold"
              fontFamily="'Noto Sans JP', sans-serif"
              className="drop-shadow-[0_0_12px_#00f0ff]"
            >
              開
            </text>

            {/* Barrier Laser Grid Crosslines */}
            <line x1="175" y1="300" x2="245" y2="300" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
            <line x1="355" y1="300" x2="425" y2="300" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
            <line x1="300" y1="180" x2="300" y2="230" stroke="#ff007f" strokeWidth="1" opacity="0.6" />
            <line x1="300" y1="355" x2="300" y2="420" stroke="#ff007f" strokeWidth="1" opacity="0.6" />

            {/* Base Monolith Steps */}
            <rect x="110" y="420" width="380" height="10" fill="#0a0f1d" stroke="#00f0ff" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Call-To-Action Button / HUD Indicator */}
        <div className="mt-3 flex flex-col items-center">
          <div
            className="group relative px-8 py-3 rounded-xl font-tech text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-200 transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.95), rgba(4, 7, 15, 0.98))',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.6)',
            }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            <div className="relative z-10 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-white group-hover:scale-125 transition-all shadow-[0_0_10px_#00f0ff] animate-ping" />
              <span>BREACH GATEWAY // 羅生門 突破</span>
            </div>
          </div>

          {/* Sensory Subtitle Cue */}
          <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-[11px] font-tech text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Klik di mana saja untuk memecahkan gerbang & mengaktifkan audio</span>
          </div>
        </div>
      </div>
    </div>
  )
}
