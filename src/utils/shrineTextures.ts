import * as THREE from 'three'

export interface PBRTextureSet {
  map: THREE.CanvasTexture
  bumpMap: THREE.CanvasTexture
  roughnessMap: THREE.CanvasTexture
}

export interface ShojiTextureSet {
  map: THREE.CanvasTexture
  emissiveMap: THREE.CanvasTexture
}

export interface KanjiPlaqueOptions {
  kanji: string
  subtitle?: string
  bgColor?: string
  textColor?: string
  borderColor?: string
  sealText?: string
  vertical?: boolean
}

export interface MandalaSealOptions {
  primaryColor?: string
  secondaryColor?: string
}

/** Deterministic Mulberry32 PRNG for reproducible procedural textures */
function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface TextureWrapOptions {
  repeatX?: number
  repeatY?: number
  srgb?: boolean
  clamp?: boolean
}

function buildCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  options: TextureWrapOptions = {}
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    draw(ctx, width, height)
  }

  const texture = new THREE.CanvasTexture(canvas)
  if (options.clamp) {
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
  } else {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    if (options.repeatX || options.repeatY) {
      texture.repeat.set(options.repeatX ?? 1, options.repeatY ?? 1)
    }
  }
  texture.colorSpace = options.srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}

const woodCache = new Map<string, PBRTextureSet>()
let basaltCache: PBRTextureSet | null = null
let kinpakuCache: PBRTextureSet | null = null
let kawaraCache: PBRTextureSet | null = null
const shojiCache = new Map<string, ShojiTextureSet>()
const plaqueCache = new Map<string, THREE.CanvasTexture>()
const mandalaCache = new Map<string, THREE.CanvasTexture>()
const particleCache = new Map<string, THREE.CanvasTexture>()

/**
 * Generates procedural wood lacquer PBR maps (diffuse, bump, roughness).
 * Supports 'vermilion' (Shu-iro temple lacquer) and 'dark-hinoki' (charred cedar).
 */
export function getWoodLacquerTextures(
  variant: 'vermilion' | 'dark-hinoki'
): PBRTextureSet {
  const cached = woodCache.get(variant)
  if (cached) return cached

  const isVermilion = variant === 'vermilion'
  const size = 512

  const map = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      const rand = createSeededRandom(isVermilion ? 104729 : 224737)
      // High-value modulated diffuse base so material.color tints cleanly without crushing to black
      ctx.fillStyle = isVermilion ? '#f5d0d8' : '#d8dde8'
      ctx.fillRect(0, 0, w, h)

      // Subtle base lacquer tonal band
      const baseGrad = ctx.createLinearGradient(0, 0, w, 0)
      if (isVermilion) {
        baseGrad.addColorStop(0, 'rgba(180, 95, 115, 0.3)')
        baseGrad.addColorStop(0.5, 'rgba(255, 240, 244, 0.35)')
        baseGrad.addColorStop(1, 'rgba(180, 95, 115, 0.3)')
      } else {
        baseGrad.addColorStop(0, 'rgba(140, 150, 170, 0.32)')
        baseGrad.addColorStop(0.5, 'rgba(245, 248, 255, 0.28)')
        baseGrad.addColorStop(1, 'rgba(140, 150, 170, 0.32)')
      }
      ctx.fillStyle = baseGrad
      ctx.fillRect(0, 0, w, h)

      // Flowing vertical wood fiber lines
      for (let i = 0; i < 240; i++) {
        const baseX = (i / 240) * w + (rand() - 0.5) * 4
        const freq = 0.012 + rand() * 0.018
        const amp = 1.5 + rand() * 3.5
        const phase = rand() * Math.PI * 2
        ctx.strokeStyle = isVermilion
          ? rand() > 0.45
            ? 'rgba(155, 65, 85, 0.32)'
            : 'rgba(255, 245, 248, 0.25)'
          : rand() > 0.45
            ? 'rgba(90, 102, 125, 0.42)'
            : 'rgba(240, 245, 255, 0.22)'
        ctx.lineWidth = 0.6 + rand() * 1.6
        ctx.beginPath()
        for (let y = 0; y <= h; y += 16) {
          const x = baseX + Math.sin(y * freq + phase) * amp
          if (y === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Subtle elliptical wood knots
      for (let k = 0; k < 4; k++) {
        const kx = rand() * w
        const ky = rand() * h
        for (let r = 1; r <= 5; r++) {
          ctx.strokeStyle = isVermilion
            ? 'rgba(140, 55, 72, 0.24)'
            : 'rgba(80, 90, 110, 0.35)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.ellipse(kx, ky, r * 4, r * 14, 0, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      // Plank seams
      ctx.strokeStyle = isVermilion ? 'rgba(110, 35, 52, 0.45)' : 'rgba(65, 75, 92, 0.6)'
      ctx.lineWidth = 2
      for (let p = 1; p < 4; p++) {
        const px = (p * w) / 4
        ctx.beginPath()
        ctx.moveTo(px, 0)
        ctx.lineTo(px, h)
        ctx.stroke()
      }
    },
    { srgb: true }
  )

  const bumpMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(isVermilion ? 104729 : 224737)
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 240; i++) {
      const baseX = (i / 240) * w + (rand() - 0.5) * 4
      const freq = 0.012 + rand() * 0.018
      const amp = 1.5 + rand() * 3.5
      const phase = rand() * Math.PI * 2
      const val = rand() > 0.45 ? 104 : 152
      ctx.strokeStyle = `rgba(${val},${val},${val},0.35)`
      ctx.lineWidth = 0.6 + rand() * 1.6
      ctx.beginPath()
      for (let y = 0; y <= h; y += 16) {
        const x = baseX + Math.sin(y * freq + phase) * amp
        if (y === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Recessed plank seams
    ctx.strokeStyle = '#383838'
    ctx.lineWidth = 2.5
    for (let p = 1; p < 4; p++) {
      const px = (p * w) / 4
      ctx.beginPath()
      ctx.moveTo(px, 0)
      ctx.lineTo(px, h)
      ctx.stroke()
    }
  })

  const roughnessMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(isVermilion ? 314159 : 654321)
    // Lacquer is smoother overall; dark cedar is slightly more matte
    ctx.fillStyle = isVermilion ? '#4c4c4c' : '#8a8a8a'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 180; i++) {
      const x = rand() * w
      const v = isVermilion ? Math.floor(60 + rand() * 48) : Math.floor(110 + rand() * 68)
      ctx.strokeStyle = `rgba(${v},${v},${v},0.35)`
      ctx.lineWidth = 1 + rand() * 2
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + (rand() - 0.5) * 6, h)
      ctx.stroke()
    }
  })

  const result = { map, bumpMap, roughnessMap }
  woodCache.set(variant, result)
  return result
}

/**
 * Generates chiselled dark basalt & granite masonry textures for shrine plinths, steps, and lanterns.
 */
export function getBasaltStoneTextures(): PBRTextureSet {
  if (basaltCache) return basaltCache

  const size = 512
  const rows = 4
  const cols = 2

  const map = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      const rand = createSeededRandom(88421)
      ctx.fillStyle = '#cfd6e2'
      ctx.fillRect(0, 0, w, h)

      // Mineral granite speckles
      for (let i = 0; i < 6500; i++) {
        const x = rand() * w
        const y = rand() * h
        const sz = 1 + rand() * 2.4
        const shade = rand()
        if (shade < 0.45) {
          ctx.fillStyle = 'rgba(110, 120, 138, 0.48)'
        } else if (shade < 0.85) {
          ctx.fillStyle = 'rgba(175, 185, 202, 0.38)'
        } else {
          ctx.fillStyle = 'rgba(248, 250, 255, 0.35)'
        }
        ctx.fillRect(x, y, sz, sz)
      }

      // Ashlar stone block mortar joints (staggered)
      const rowH = h / rows
      const colW = w / cols
      ctx.strokeStyle = 'rgba(72, 82, 98, 0.82)'
      ctx.lineWidth = 3
      for (let r = 0; r < rows; r++) {
        const y = r * rowH
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()

        const offset = (r % 2) * (colW * 0.5)
        for (let c = 0; c <= cols; c++) {
          const x = (c * colW + offset) % w
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + rowH)
          ctx.stroke()
        }
      }

      // Subtle weathered cracks
      ctx.strokeStyle = 'rgba(85, 95, 112, 0.48)'
      ctx.lineWidth = 1
      for (let c = 0; c < 14; c++) {
        let cx = rand() * w
        let cy = rand() * h
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        for (let s = 0; s < 5; s++) {
          cx += (rand() - 0.5) * 34
          cy += (rand() - 0.5) * 26
          ctx.lineTo(cx, cy)
        }
        ctx.stroke()
      }
    },
    { srgb: true }
  )

  const bumpMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(88421)
    ctx.fillStyle = '#8a8a8a'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 6500; i++) {
      const x = rand() * w
      const y = rand() * h
      const sz = 1 + rand() * 2.5
      const v = rand() > 0.5 ? 168 : 96
      ctx.fillStyle = `rgba(${v},${v},${v},0.42)`
      ctx.fillRect(x, y, sz, sz)
    }

    const rowH = h / rows
    const colW = w / cols
    ctx.strokeStyle = '#222222'
    ctx.lineWidth = 4
    for (let r = 0; r < rows; r++) {
      const y = r * rowH
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()

      const offset = (r % 2) * (colW * 0.5)
      for (let c = 0; c <= cols; c++) {
        const x = (c * colW + offset) % w
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + rowH)
        ctx.stroke()
      }
    }
  })

  const roughnessMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(99103)
    ctx.fillStyle = '#a8a8a8'
    ctx.fillRect(0, 0, w, h)

    // Damp night patches (darker = glossier wet stone)
    for (let p = 0; p < 16; p++) {
      const px = rand() * w
      const py = rand() * h
      const pr = 36 + rand() * 72
      const grad = ctx.createRadialGradient(px, py, 4, px, py, pr)
      grad.addColorStop(0, 'rgba(48, 48, 48, 0.65)')
      grad.addColorStop(1, 'rgba(168, 168, 168, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(px, py, pr, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  basaltCache = { map, bumpMap, roughnessMap }
  return basaltCache
}

/**
 * Generates Kinpaku gold leaf & Seigaiha (concentric wave) engraved metal textures.
 */
export function getKinpakuGoldTextures(): PBRTextureSet {
  if (kinpakuCache) return kinpakuCache

  const size = 512

  const drawSeigaiha = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    strokeColor: string,
    lineWidth: number
  ) => {
    const radius = 32
    const stepX = radius * 2
    const stepY = radius * 0.85
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    for (let row = -1; row <= Math.ceil(h / stepY) + 1; row++) {
      const y = row * stepY
      const offsetX = (row % 2) * radius
      for (let col = -1; col <= Math.ceil(w / stepX) + 1; col++) {
        const x = col * stepX + offsetX
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath()
          ctx.arc(x, y, (ring * radius) / 3, Math.PI, Math.PI * 2)
          ctx.stroke()
        }
      }
    }
  }

  const map = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      const rand = createSeededRandom(55123)
      ctx.fillStyle = '#fff5d6'
      ctx.fillRect(0, 0, w, h)

      // Hammered gold leaf square patches
      const patch = 128
      for (let py = 0; py < h; py += patch) {
        for (let px = 0; px < w; px += patch) {
          const tint = rand() > 0.5 ? 'rgba(255, 255, 255, 0.22)' : 'rgba(210, 165, 95, 0.18)'
          ctx.fillStyle = tint
          ctx.fillRect(px, py, patch, patch)
        }
      }

      // Brushed micro strokes
      for (let i = 0; i < 400; i++) {
        const y = rand() * h
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y + (rand() - 0.5) * 4)
        ctx.stroke()
      }

      drawSeigaiha(ctx, w, h, 'rgba(165, 120, 48, 0.35)', 1.2)
    },
    { srgb: true }
  )

  const bumpMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, w, h)
    drawSeigaiha(ctx, w, h, 'rgba(48, 48, 48, 0.7)', 1.6)
  })

  const roughnessMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(55129)
    ctx.fillStyle = '#484848'
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 240; i++) {
      const x = rand() * w
      const y = rand() * h
      const v = Math.floor(45 + rand() * 55)
      ctx.fillStyle = `rgba(${v},${v},${v},0.3)`
      ctx.fillRect(x, y, 28, 10)
    }
    drawSeigaiha(ctx, w, h, 'rgba(115, 115, 115, 0.6)', 1.5)
  })

  kinpakuCache = { map, bumpMap, roughnessMap }
  return kinpakuCache
}

/**
 * Generates Hon-gawara ceramic roof tile textures (ribbed vertical channels + horizontal tile steps).
 */
export function getKawaraTileTextures(): PBRTextureSet {
  if (kawaraCache) return kawaraCache

  const size = 512
  const cols = 12
  const rows = 8
  const colW = size / cols
  const rowH = size / rows

  const map = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      ctx.fillStyle = '#bcc6d6'
      ctx.fillRect(0, 0, w, h)

      // Vertical ribbed tile ridges (high value modulated for dark kawara tint)
      for (let c = 0; c < cols; c++) {
        const x = c * colW
        const ribGrad = ctx.createLinearGradient(x, 0, x + colW, 0)
        ribGrad.addColorStop(0, '#747f94')
        ribGrad.addColorStop(0.28, '#d4dde9')
        ribGrad.addColorStop(0.5, '#9eaabe')
        ribGrad.addColorStop(0.82, '#f1f5f9')
        ribGrad.addColorStop(1, '#747f94')
        ctx.fillStyle = ribGrad
        ctx.fillRect(x, 0, colW, h)
      }

      // Horizontal tile course shadow lines
      for (let r = 0; r < rows; r++) {
        const y = r * rowH
        const stepGrad = ctx.createLinearGradient(0, y, 0, y + rowH)
        stepGrad.addColorStop(0, 'rgba(40, 48, 62, 0.72)')
        stepGrad.addColorStop(0.14, 'rgba(255, 255, 255, 0.2)')
        stepGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = stepGrad
        ctx.fillRect(0, y, w, rowH)
      }
    },
    { srgb: true }
  )

  const bumpMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    ctx.fillStyle = '#505050'
    ctx.fillRect(0, 0, w, h)
    for (let c = 0; c < cols; c++) {
      const x = c * colW
      const ribGrad = ctx.createLinearGradient(x, 0, x + colW, 0)
      ribGrad.addColorStop(0, '#252525')
      ribGrad.addColorStop(0.5, '#909090')
      ribGrad.addColorStop(0.84, '#ebebeb')
      ribGrad.addColorStop(1, '#252525')
      ctx.fillStyle = ribGrad
      ctx.fillRect(x, 0, colW, h)
    }
    ctx.fillStyle = '#181818'
    for (let r = 0; r < rows; r++) {
      ctx.fillRect(0, r * rowH, w, 4)
    }
  })

  const roughnessMap = buildCanvasTexture(size, size, (ctx, w, h) => {
    const rand = createSeededRandom(44091)
    ctx.fillStyle = '#686868'
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 60; i++) {
      const x = rand() * w
      const y = rand() * h
      const r = 18 + rand() * 44
      const g = ctx.createRadialGradient(x, y, 2, x, y, r)
      g.addColorStop(0, 'rgba(35, 35, 35, 0.55)')
      g.addColorStop(1, 'rgba(104, 104, 104, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  kawaraCache = { map, bumpMap, roughnessMap }
  return kawaraCache
}

/**
 * Generates Washi Shoji translucent rice paper + Kumiko wood lattice textures.
 */
export function getWashiShojiTextures(cols = 4, rows = 6): ShojiTextureSet {
  const key = `${cols}x${rows}`
  const cached = shojiCache.get(key)
  if (cached) return cached

  const size = 512
  const cellW = size / cols
  const cellH = size / rows

  const drawLattice = (ctx: CanvasRenderingContext2D, isEmissive: boolean) => {
    const rand = createSeededRandom(7331)
    ctx.fillStyle = isEmissive ? '#241205' : '#1b1410'
    ctx.fillRect(0, 0, size, size)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW
        const y = r * cellH
        const cx = x + cellW / 2
        const cy = y + cellH / 2
        const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, Math.max(cellW, cellH) * 0.72)

        if (isEmissive) {
          grad.addColorStop(0, '#fef08a')
          grad.addColorStop(0.55, '#f59e0b')
          grad.addColorStop(1, '#78350f')
        } else {
          grad.addColorStop(0, '#fde68a')
          grad.addColorStop(0.6, '#d97706')
          grad.addColorStop(1, '#451a03')
        }
        ctx.fillStyle = grad
        ctx.fillRect(x + 3, y + 3, cellW - 6, cellH - 6)

        // Subtle Washi paper fibers
        ctx.strokeStyle = isEmissive ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 251, 235, 0.18)'
        ctx.lineWidth = 0.8
        for (let f = 0; f < 6; f++) {
          const fx = x + 6 + rand() * (cellW - 12)
          const fy = y + 6 + rand() * (cellH - 12)
          ctx.beginPath()
          ctx.moveTo(fx, fy)
          ctx.lineTo(fx + (rand() - 0.5) * 20, fy + (rand() - 0.5) * 16)
          ctx.stroke()
        }

        // Delicate inner Kumiko diagonal diamond brace inside each pane
        ctx.strokeStyle = isEmissive ? '#05070b' : '#0b0e14'
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(cx, y + 4)
        ctx.lineTo(x + cellW - 4, cy)
        ctx.lineTo(cx, y + cellH - 4)
        ctx.lineTo(x + 4, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }

    // Sturdy outer and grid Kumiko dark wood bars (non-emissive)
    ctx.strokeStyle = isEmissive ? '#000000' : '#090c12'
    ctx.lineWidth = 7
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath()
      ctx.moveTo(c * cellW, 0)
      ctx.lineTo(c * cellW, size)
      ctx.stroke()
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath()
      ctx.moveTo(0, r * cellH)
      ctx.lineTo(size, r * cellH)
      ctx.stroke()
    }
    ctx.lineWidth = 14
    ctx.strokeRect(0, 0, size, size)
  }

  const map = buildCanvasTexture(size, size, (ctx) => drawLattice(ctx, false), { srgb: true })
  const emissiveMap = buildCanvasTexture(size, size, (ctx) => drawLattice(ctx, true), { srgb: true })

  const result = { map, emissiveMap }
  shojiCache.set(key, result)
  return result
}

/**
 * Generates high-contrast calligraphy plaque or hanging scroll textures with Hanko seal stamp.
 */
export function createKanjiPlaqueTexture(options: KanjiPlaqueOptions): THREE.CanvasTexture {
  const {
    kanji,
    subtitle = '',
    bgColor = '#111520',
    textColor = '#fbbf24',
    borderColor = '#e11d48',
    sealText = '印',
    vertical = false,
  } = options

  const key = JSON.stringify({ kanji, subtitle, bgColor, textColor, borderColor, sealText, vertical })
  const cached = plaqueCache.get(key)
  if (cached) return cached

  const w = vertical ? 256 : 512
  const h = vertical ? 512 : 256

  const texture = buildCanvasTexture(
    w,
    h,
    (ctx, cw, ch) => {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, cw, ch)

      // Subtle silk/wood surface sheen
      const sheen = ctx.createLinearGradient(0, 0, cw, ch)
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.04)')
      sheen.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0.25)')
      ctx.fillStyle = sheen
      ctx.fillRect(0, 0, cw, ch)

      // Outer gold/vermilion frame
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 8
      ctx.strokeRect(10, 10, cw - 20, ch - 20)

      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2.5
      ctx.strokeRect(20, 20, cw - 40, ch - 40)

      // Main Kanji
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (vertical) {
        const chars = Array.from(kanji)
        const fontSize = Math.min(64, Math.floor((ch - 140) / Math.max(chars.length, 1)))
        ctx.font = `900 ${fontSize}px "Noto Sans JP", "Yu Mincho", serif`
        const totalH = chars.length * (fontSize * 1.15)
        const startY = ch / 2 - totalH / 2 + fontSize * 0.5
        chars.forEach((char, idx) => {
          ctx.fillText(char, cw / 2, startY + idx * (fontSize * 1.15))
        })

        if (subtitle) {
          ctx.fillStyle = '#cbd5e1'
          ctx.font = '700 18px "JetBrains Mono", monospace'
          ctx.fillText(subtitle, cw / 2, ch - 46)
        }
      } else {
        const fontSize = kanji.length > 4 ? 64 : 84
        ctx.font = `900 ${fontSize}px "Noto Sans JP", "Yu Mincho", serif`
        ctx.fillText(kanji, cw / 2, subtitle ? ch / 2 - 16 : ch / 2)

        if (subtitle) {
          ctx.fillStyle = '#e2e8f0'
          ctx.font = '700 22px "JetBrains Mono", monospace'
          ctx.fillText(subtitle, cw / 2, ch / 2 + 54)
        }
      }

      // Traditional Red Square Hanko Seal
      const sealSize = 36
      const sx = cw - sealSize - 28
      const sy = ch - sealSize - 28
      ctx.fillStyle = '#dc2626'
      ctx.fillRect(sx, sy, sealSize, sealSize)
      ctx.strokeStyle = '#fca5a5'
      ctx.lineWidth = 2
      ctx.strokeRect(sx + 2, sy + 2, sealSize - 4, sealSize - 4)
      ctx.fillStyle = '#fffbeb'
      ctx.font = '700 20px "Noto Sans JP", serif'
      ctx.fillText(sealText, sx + sealSize / 2, sy + sealSize / 2 + 1)
    },
    { srgb: true, clamp: true }
  )

  plaqueCache.set(key, texture)
  return texture
}

/**
 * Generates sacred Shinto Mandala & Yata-no-Kagami mirror ring texture on transparent canvas.
 */
export function createMandalaSealTexture(options: MandalaSealOptions = {}): THREE.CanvasTexture {
  const { primaryColor = '#2dd4bf', secondaryColor = '#fbbf24' } = options
  const key = `${primaryColor}_${secondaryColor}`
  const cached = mandalaCache.get(key)
  if (cached) return cached

  const size = 512
  const texture = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      const cx = w / 2
      const cy = h / 2

      ctx.clearRect(0, 0, w, h)

      // Outer sacred double ring
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(cx, cy, 232, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, 218, 0, Math.PI * 2)
      ctx.stroke()

      // Radial degree tick marks (48 ticks)
      for (let i = 0; i < 48; i++) {
        const angle = (i / 48) * Math.PI * 2
        const r1 = i % 4 === 0 ? 196 : 206
        const r2 = 218
        ctx.strokeStyle = i % 4 === 0 ? secondaryColor : primaryColor
        ctx.lineWidth = i % 4 === 0 ? 3 : 1.5
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1)
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2)
        ctx.stroke()
      }

      // 8-petal Yata-no-Kagami sacred mirror outline
      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 3.5
      ctx.beginPath()
      const petals = 8
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 2
        const r = 152 + Math.abs(Math.sin((t * petals) / 2)) * 22
        const px = cx + Math.cos(t) * r
        const py = cy + Math.sin(t) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()

      // Inner octagonal sacred frame
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let i = 0; i <= 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
        const px = cx + Math.cos(angle) * 124
        const py = cy + Math.sin(angle) * 124
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.stroke()

      // Center Mitsudomoe-inspired triple swirl ring
      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(cx, cy, 78, 0, Math.PI * 2)
      ctx.stroke()

      for (let m = 0; m < 3; m++) {
        const baseA = (m * Math.PI * 2) / 3
        const mx = cx + Math.cos(baseA) * 36
        const my = cy + Math.sin(baseA) * 36
        ctx.fillStyle = m % 2 === 0 ? primaryColor : secondaryColor
        ctx.beginPath()
        ctx.arc(mx, my, 14, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(cx, cy, 48, baseA, baseA + 1.15)
        ctx.stroke()
      }
    },
    { srgb: true, clamp: true }
  )

  mandalaCache.set(key, texture)
  return texture
}

/**
 * Generates soft radial ember or notched sakura petal particle sprite textures.
 */
export function createSoftParticleTexture(type: 'ember' | 'sakura'): THREE.CanvasTexture {
  const cached = particleCache.get(type)
  if (cached) return cached

  const size = 128
  const texture = buildCanvasTexture(
    size,
    size,
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2

      if (type === 'ember') {
        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, w * 0.46)
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
        grad.addColorStop(0.32, 'rgba(255, 245, 210, 0.85)')
        grad.addColorStop(0.7, 'rgba(255, 200, 120, 0.22)')
        grad.addColorStop(1, 'rgba(255, 200, 120, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, w * 0.46, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Cherry blossom petal with subtle V-notch at tip
        ctx.save()
        ctx.translate(cx, cy)
        ctx.beginPath()
        ctx.moveTo(0, 42)
        ctx.bezierCurveTo(-36, 18, -32, -26, -10, -40)
        ctx.lineTo(0, -28)
        ctx.lineTo(10, -40)
        ctx.bezierCurveTo(32, -26, 36, 18, 0, 42)
        ctx.closePath()

        const petalGrad = ctx.createRadialGradient(0, 6, 4, 0, 0, 44)
        petalGrad.addColorStop(0, 'rgba(255, 240, 245, 0.98)')
        petalGrad.addColorStop(0.65, 'rgba(251, 182, 206, 0.9)')
        petalGrad.addColorStop(1, 'rgba(244, 114, 182, 0.35)')
        ctx.fillStyle = petalGrad
        ctx.fill()
        ctx.restore()
      }
    },
    { srgb: true, clamp: true }
  )

  particleCache.set(type, texture)
  return texture
}
