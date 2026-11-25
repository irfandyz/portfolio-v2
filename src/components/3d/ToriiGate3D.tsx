import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CyberKitsune } from './CyberKitsune3D'
import { CurvedToriiGate, IshiDoroLantern } from './primitives/ShrinePrimitives'
import { createMandalaSealTexture, createSoftParticleTexture } from '../../utils/shrineTextures'

const GATE_PARTICLE_COUNT = 160

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function ToriiGate3D() {
  const groupRef = useRef<THREE.Group>(null)
  const floorMandalaRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, colors, emberTex, floorMandalaMat } = useMemo(() => {
    const rand = createSeededRandom(4091)
    const pos = new Float32Array(GATE_PARTICLE_COUNT * 3)
    const col = new Float32Array(GATE_PARTICLE_COUNT * 3)

    const gold = new THREE.Color('#fbbf24')
    const vermilion = new THREE.Color('#fb7185')
    const jade = new THREE.Color('#2dd4bf')

    for (let i = 0; i < GATE_PARTICLE_COUNT; i++) {
      pos[i * 3] = (rand() - 0.5) * 15
      pos[i * 3 + 1] = (rand() - 0.2) * 9
      pos[i * 3 + 2] = (rand() - 0.5) * 11

      const pick = rand()
      const chosen = pick < 0.45 ? gold : pick < 0.78 ? vermilion : jade
      col[i * 3] = chosen.r
      col[i * 3 + 1] = chosen.g
      col[i * 3 + 2] = chosen.b
    }

    const mandalaTex = createMandalaSealTexture({
      primaryColor: '#fbbf24',
      secondaryColor: '#e11d48',
    })

    const mandalaMat = new THREE.MeshBasicMaterial({
      map: mandalaTex,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    return {
      positions: pos,
      colors: col,
      emberTex: createSoftParticleTexture('ember'),
      floorMandalaMat: mandalaMat,
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)

    // Subtle grounded yaw response to cursor (no vertical bob so bases remain planted on floor)
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.08
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04)
    }

    if (floorMandalaRef.current) {
      floorMandalaRef.current.rotation.z += dt * 0.14
    }

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < GATE_PARTICLE_COUNT; i++) {
        let y = posAttr.getY(i) + dt * 0.36
        if (y > 7.5) y = -2.1
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={groupRef} position={[0, 0, -1.2]}>
        {/* Authentic Myojin Ichi-no-Torii Gate */}
        <CurvedToriiGate
          width={6.2}
          height={5.2}
          position={[0, -2.1, 0]}
          kanjiText="電脳神域"
          subtitle="ICHI-NO-TORII"
          withShimenawa={true}
          accentColor="gold"
          glowIntensity={0.85}
        />

        {/* Sacred Floor Mandala Seal Beneath the Gate */}
        <mesh
          ref={floorMandalaRef}
          position={[0, -2.08, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={floorMandalaMat}
        >
          <planeGeometry args={[5.2, 5.2]} />
        </mesh>

        {/* Twin Guardian Komagitsune Statues */}
        <CyberKitsune
          side="left"
          position={[-4.2, -1.35, 0.65]}
          rotationY={0.38}
        />
        <CyberKitsune
          side="right"
          position={[4.2, -1.35, 0.65]}
          rotationY={-0.38}
        />

        {/* Flanking Approach Stone Lanterns (Ishi-doro) */}
        <IshiDoroLantern
          position={[-3.3, -2.1, 1.55]}
          scale={0.82}
          flameColor="amber"
          withPointLight={true}
          lightIntensity={1.4}
          lightDistance={5}
        />
        <IshiDoroLantern
          position={[3.3, -2.1, 1.55]}
          scale={0.82}
          flameColor="amber"
          withPointLight={true}
          lightIntensity={1.4}
          lightDistance={5}
        />
      </group>

      {/* Gate Entrance Sacred Embers */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={emberTex}
          size={0.14}
          vertexColors
          transparent
          opacity={0.85}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}
