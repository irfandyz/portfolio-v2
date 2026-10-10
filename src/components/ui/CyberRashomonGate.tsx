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
  width: number
  height: number
  color: string
  alpha: number
  decay: number
  rotation: number
  spin: number
  type: 'shard' | 'spark' | 'ring'
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
  const [isFlashing, setIsFlashing] = useState<boolean>(false)
  const [isShaking, setIsShaking] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const shockwavesRef = useRef<Shockwave[]>([])

  // Initialize and handle canvas dimensions
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  // Trigger Gate Shatter / Dematerialization into Particles
  const handleBreach = useCallback(() => {
    if (isBreached) return
    setIsBreached(true)
    setIsFlashing(true)
    setIsShaking(true)

    // Flash and shake cleanup
    setTimeout(() => {
      setIsFlashing(false)
    }, 160)

    setTimeout(() => {
      setIsShaking(false)
    }, 380)

    // Audio SFX + Start Music Playback
    playClick?.()
    playHoloBeam?.()
    playWarp?.()
    onOpen()

    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.width || window.innerWidth
    const height = canvas.height || window.innerHeight
    const cx = width / 2
    const cy = height / 2

    // Vibrant Cyber Palette
    const cyberColors = ['#00f0ff', '#ff007f', '#ffe600', '#38bdf8', '#c084fc', '#ffffff']

    const newParticles: Particle[] = []

    // 1. ROOF SHARDS (Upper Pagoda Eaves: ~90 pieces exploding upwards and outwards)
    for (let i = 0; i < 90; i++) {
      const px = cx + (Math.random() - 0.5) * 440
      const py = cy - 120 + (Math.random() - 0.5) * 80
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.95)
      const speed = Math.random() * 12 + 4

      newParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        width: Math.random() * 20 + 8,
        height: Math.random() * 16 + 6,
        color: cyberColors[Math.floor(Math.random() * cyberColors.length)],
        alpha: 1,
        decay: Math.random() * 0.008 + 0.005,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 14,
        type: 'shard',
      })
    }

    // 2. LEFT PILLAR SHARDS (Left Column: ~80 pieces exploding to the left)
    for (let i = 0; i < 80; i++) {
      const px = cx - 150 + (Math.random() - 0.5) * 70
      const py = cy + 20 + (Math.random() - 0.5) * 220
      const angle = Math.PI + (Math.random() - 0.5) * (Math.PI * 0.75)
      const speed = Math.random() * 13 + 4

      newParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: Math.random() * 22 + 8,
        height: Math.random() * 18 + 6,
        color: Math.random() > 0.4 ? '#00f0ff' : '#ff007f',
        alpha: 1,
        decay: Math.random() * 0.008 + 0.005,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 14,
        type: 'shard',
      })
    }

    // 3. RIGHT PILLAR SHARDS (Right Column: ~80 pieces exploding to the right)
    for (let i = 0; i < 80; i++) {
      const px = cx + 150 + (Math.random() - 0.5) * 70
      const py = cy + 20 + (Math.random() - 0.5) * 220
      const angle = 0 + (Math.random() - 0.5) * (Math.PI * 0.75)
      const speed = Math.random() * 13 + 4

      newParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: Math.random() * 22 + 8,
        height: Math.random() * 18 + 6,
        color: Math.random() > 0.4 ? '#00f0ff' : '#ff007f',
        alpha: 1,
        decay: Math.random() * 0.008 + 0.005,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 14,
        type: 'shard',
      })
    }

    // 4. CENTRAL GATEWAY PORTAL & HEXAGON SHIELD (Center Core: ~120 festive glowing shards)
    for (let i = 0; i < 120; i++) {
      const px = cx + (Math.random() - 0.5) * 160
      const py = cy + 10 + (Math.random() - 0.5) * 160
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 15 + 4

      newParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: Math.random() * 16 + 6,
        height: Math.random() * 14 + 6,
        color: cyberColors[Math.floor(Math.random() * cyberColors.length)],
        alpha: 1,
        decay: Math.random() * 0.009 + 0.006,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 16,
        type: Math.random() > 0.3 ? 'shard' : 'spark',
      })
    }

    // 5. RADIANT SPARKS & GLOWING MOTES (~90 bright embers)
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 18 + 4

      newParticles.push({
        x: cx + (Math.random() - 0.5) * 220,
        y: cy + (Math.random() - 0.5) * 220,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        color: Math.random() > 0.5 ? '#ffe600' : '#ffffff',
        alpha: 1,
        decay: Math.random() * 0.01 + 0.006,
        rotation: 0,
        spin: 0,
        type: 'spark',
      })
    }

    particlesRef.current = newParticles

    // Concentric Neon Laser Shockwaves
    shockwavesRef.current = [
      {
        x: cx,
        y: cy,
        radius: 15,
        maxRadius: Math.max(width, height) * 0.95,
        color: '#00f0ff',
        alpha: 1,
        lineWidth: 6,
      },
      {
        x: cx,
        y: cy,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.8,
        color: '#ff007f',
        alpha: 0.95,
        lineWidth: 5,
      },
      {
        x: cx,
        y: cy,
        radius: 4,
        maxRadius: Math.max(width, height) * 0.65,
        color: '#ffe600',
        alpha: 0.85,
        lineWidth: 4,
      },
    ]

    // Start Canvas Render Animation
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 1. Draw Shockwaves
        const shockwaves = shockwavesRef.current
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i]
          sw.radius += 24
          sw.alpha -= 0.022

          if (sw.alpha > 0 && sw.radius < sw.maxRadius) {
            ctx.save()
            ctx.beginPath()
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
            ctx.strokeStyle = sw.color
            ctx.lineWidth = sw.lineWidth
            ctx.shadowColor = sw.color
            ctx.shadowBlur = 24
            ctx.globalAlpha = Math.max(0, sw.alpha)
            ctx.stroke()
            ctx.restore()
          } else {
            shockwaves.splice(i, 1)
          }
        }

        // 2. Draw Debris & Festive Shards
        const particles = particlesRef.current
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.982
          p.vy *= 0.982
          p.vy += 0.12 // slight gravity
          p.rotation += p.spin
          p.alpha -= p.decay

          if (p.alpha > 0) {
            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate((p.rotation * Math.PI) / 180)
            ctx.globalAlpha = Math.max(0, p.alpha)
            ctx.fillStyle = p.color
            ctx.shadowColor = p.color
            ctx.shadowBlur = 14

            if (p.type === 'shard') {
              // High-visibility angular cyber polygon shard
              ctx.beginPath()
              ctx.moveTo(-p.width / 2, -p.height / 2)
              ctx.lineTo(p.width / 2, -p.height / 4)
              ctx.lineTo(p.width / 3, p.height / 2)
              ctx.lineTo(-p.width / 2, p.height / 3)
              ctx.closePath()
              ctx.fill()
              // Bright border accent on shard
              ctx.strokeStyle = '#ffffff'
              ctx.lineWidth = 1
              ctx.stroke()
            } else {
              // Glowing circular spark
              ctx.beginPath()
              ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2)
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

    // Unmount after particles have completely dispersed
    setTimeout(() => {
      setIsExited(true)
    }, 2200)
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
    }
  }, [isBreached])

  // Cancel animation frame ONLY when component actually unmounts from DOM
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

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
      className={`fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center transition-colors duration-500 ${
        isBreached ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      } ${isShaking ? 'animate-[shake_0.38s_ease-in-out]' : ''}`}
      style={{
        backgroundColor: isBreached ? 'transparent' : '#05070e',
      }}
    >
      {/* 1. Flash Shockwave Burst Overlay upon Breach (Behind Canvas z-20) */}
      <div
        className={`absolute inset-0 bg-cyan-100 pointer-events-none z-20 transition-opacity duration-150 ${
          isFlashing ? 'opacity-40' : 'opacity-0'
        }`}
      />

      {/* 2. Background Cyber Grid & Vignette (Fades smoothly upon breach) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isBreached ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.09) 0%, rgba(5, 7, 14, 0.96) 75%),
            linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* 3. Cyber Fog Ambient Glow */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none transition-all duration-300 ${
          isBreached ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* 4. Fullscreen Particle Explosion Canvas (Always on top z-30) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* 5. Physical Gate Structure (INSTANTLY disappears on breach so shards take over) */}
      {!isBreached && (
        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-4 animate-fade-in">
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
              className="w-full h-full drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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

                <radialGradient id="portalShield" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,240,255,0.3)" />
                  <stop offset="70%" stopColor="rgba(255,0,127,0.15)" />
                  <stop offset="100%" stopColor="rgba(5,7,14,0.9)" />
                </radialGradient>
              </defs>

              {/* Tier 1 Upper Curved Pagoda Roof */}
              <path
                d="M 120 70 Q 300 40 480 70 L 460 85 Q 300 65 140 85 Z"
                fill="url(#gateRoofGrad)"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />
              <path d="M 290 40 L 300 20 L 310 40 Z" fill="#00f0ff" className="animate-pulse" />

              {/* Tier 2 Lower Pagoda Roof */}
              <path
                d="M 60 120 Q 300 80 540 120 L 515 145 Q 300 115 85 145 Z"
                fill="url(#gateRoofGrad)"
                stroke="#00f0ff"
                strokeWidth="2"
              />
              <path
                d="M 90 135 Q 300 108 510 135"
                stroke="#ff007f"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />

              {/* Support Beams & Corbels */}
              <rect x="150" y="145" width="300" height="15" fill="#0d1424" stroke="#00f0ff" strokeWidth="1" />
              <rect x="175" y="160" width="250" height="12" fill="#090e1a" stroke="#00f0ff" strokeWidth="0.8" />

              {/* Center Plaque: 羅 生 門 */}
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

              {/* Left Monolithic Pillar */}
              <rect
                x="130"
                y="172"
                width="45"
                height="250"
                fill="url(#pillarGrad)"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />
              <line x1="152" y1="180" x2="152" y2="415" stroke="#00f0ff" strokeWidth="1" strokeDasharray="12 4" />
              <rect x="140" y="270" width="25" height="40" fill="#060913" stroke="#ff007f" strokeWidth="1" />
              <text x="152" y="295" textAnchor="middle" fill="#ff007f" fontSize="16" fontWeight="bold">羅</text>

              {/* Right Monolithic Pillar */}
              <rect
                x="425"
                y="172"
                width="45"
                height="250"
                fill="url(#pillarGrad)"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />
              <line x1="448" y1="180" x2="448" y2="415" stroke="#00f0ff" strokeWidth="1" strokeDasharray="12 4" />
              <rect x="435" y="270" width="25" height="40" fill="#060913" stroke="#ff007f" strokeWidth="1" />
              <text x="448" y="295" textAnchor="middle" fill="#ff007f" fontSize="16" fontWeight="bold">門</text>

              {/* Base Line */}
              <line x1="60" y1="420" x2="130" y2="420" stroke="#00f0ff" strokeWidth="3" />
              <line x1="470" y1="420" x2="540" y2="420" stroke="#00f0ff" strokeWidth="3" />

              {/* Inner Portal Shield */}
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

              {/* Hexagon Seal */}
              <polygon
                points="300,230 355,260 355,325 300,355 245,325 245,260"
                fill="rgba(6,9,18,0.85)"
                stroke="#00f0ff"
                strokeWidth="2"
                className="drop-shadow-[0_0_20px_#00f0ff]"
              />
              <circle
                cx="300"
                cy="292"
                r="40"
                stroke="#ff007f"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                fill="none"
              />
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

              <rect x="110" y="420" width="380" height="10" fill="#0a0f1d" stroke="#00f0ff" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Call-To-Action Button */}
          <div className="mt-3 flex flex-col items-center">
            <div
              className="group relative px-8 py-3 rounded-xl font-tech text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-200 transition-all duration-300 overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(8, 14, 28, 0.95), rgba(4, 7, 15, 0.98))',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.15)',
                border: '1px solid rgba(0, 240, 255, 0.6)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="relative z-10 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-white group-hover:scale-125 transition-all shadow-[0_0_10px_#00f0ff] animate-ping" />
                <span>BREACH GATEWAY // 羅生門 突破</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-[11px] font-tech text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Klik di mana saja untuk memecahkan gerbang & mengaktifkan audio</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
