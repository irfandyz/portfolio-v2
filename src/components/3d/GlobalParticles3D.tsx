import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSoftParticleTexture } from '../../utils/shrineTextures'

const EMBER_COUNT = 180
const SAKURA_COUNT = 110
const WISP_COUNT = 90

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface ParticleBuffers {
  positions: Float32Array
  colors: Float32Array
  phases: Float32Array
}

function createLayerBuffers(
  count: number,
  seed: number,
  paletteHex: [string, string],
  yMin: number,
  yMax: number,
  spreadX: number,
  spreadZ: number
): ParticleBuffers {
  const rand = createSeededRandom(seed)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const colorA = new THREE.Color(paletteHex[0])
  const colorB = new THREE.Color(paletteHex[1])

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * spreadX
    positions[i * 3 + 1] = yMin + rand() * (yMax - yMin)
    positions[i * 3 + 2] = (rand() - 0.5) * spreadZ - 2.0

    const chosen = rand() > 0.45 ? colorA : colorB
    colors[i * 3] = chosen.r
    colors[i * 3 + 1] = chosen.g
    colors[i * 3 + 2] = chosen.b
    phases[i] = rand() * Math.PI * 2
  }

  return { positions, colors, phases }
}

export function GlobalParticles3D() {
  const embersRef = useRef<THREE.Points>(null)
  const sakuraRef = useRef<THREE.Points>(null)
  const wispsRef = useRef<THREE.Points>(null)

  const { emberTex, sakuraTex, embers, sakura, wisps } = useMemo(() => {
    return {
      emberTex: createSoftParticleTexture('ember'),
      sakuraTex: createSoftParticleTexture('sakura'),
      embers: createLayerBuffers(EMBER_COUNT, 11021, ['#fbbf24', '#f59e0b'], -2.2, 9.0, 22, 24),
      sakura: createLayerBuffers(SAKURA_COUNT, 33047, ['#fb7185', '#fda4af'], -2.2, 8.5, 24, 24),
      wisps: createLayerBuffers(WISP_COUNT, 77109, ['#2dd4bf', '#38bdf8'], -2.0, 2.2, 18, 22),
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const time = state.clock.getElapsedTime()

    // Layer 1: Rising Golden Lantern Embers
    if (embersRef.current) {
      const pos = embersRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < EMBER_COUNT; i++) {
        let y = pos.getY(i) + dt * 0.32
        if (y > 9.0) y = -2.2
        const x = pos.getX(i) + Math.sin(time * 0.9 + embers.phases[i]) * dt * 0.14
        pos.setXY(i, x, y)
      }
      pos.needsUpdate = true
    }

    // Layer 2: Drifting Yozakura Night Cherry Blossom Petals
    if (sakuraRef.current) {
      const pos = sakuraRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < SAKURA_COUNT; i++) {
        const phase = sakura.phases[i]
        let y = pos.getY(i) - dt * 0.25
        if (y < -2.2) y = 8.5
        const x = pos.getX(i) + Math.sin(time * 0.8 + phase) * dt * 0.38
        const z = pos.getZ(i) + Math.cos(time * 0.65 + phase) * dt * 0.22
        pos.setXYZ(i, x, y, z)
      }
      pos.needsUpdate = true
    }

    // Layer 3: Low-Lying Kitsunebi Spirit Jade Wisps
    if (wispsRef.current) {
      const pos = wispsRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < WISP_COUNT; i++) {
        const phase = wisps.phases[i]
        const x = pos.getX(i) + Math.cos(time * 0.55 + phase) * dt * 0.24
        let y = pos.getY(i) + Math.sin(time * 1.1 + phase) * dt * 0.12
        if (y > 2.2) y = -2.0
        if (y < -2.0) y = 2.2
        const z = pos.getZ(i) + Math.sin(time * 0.5 + phase) * dt * 0.24
        pos.setXYZ(i, x, y, z)
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Layer 1: Rising Golden Embers */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[embers.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[embers.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={emberTex}
          size={0.14}
          vertexColors
          transparent
          opacity={0.82}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Layer 2: Drifting Yozakura Night Cherry Blossom Petals */}
      <points ref={sakuraRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sakura.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[sakura.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sakuraTex}
          size={0.18}
          vertexColors
          transparent
          opacity={0.78}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      {/* Layer 3: Low-Lying Kitsunebi Spirit Jade Wisps */}
      <points ref={wispsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[wisps.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[wisps.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={emberTex}
          size={0.19}
          vertexColors
          transparent
          opacity={0.62}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
