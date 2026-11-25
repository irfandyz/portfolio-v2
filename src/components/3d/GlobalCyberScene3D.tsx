import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

import { SacredCourtyardFloor3D } from './SacredCourtyardFloor3D'
import { GlobalParticles3D } from './GlobalParticles3D'
import { ToriiStation3D } from './landmarks/ToriiStation3D'
import { CyberShrine3D } from './landmarks/CyberShrine3D'
import { DataCitadel3D } from './landmarks/DataCitadel3D'
import { HologramStation3D } from './landmarks/HologramStation3D'
import { ChronoStream3D } from './landmarks/ChronoStream3D'
import { NeuralLattice3D } from './landmarks/NeuralLattice3D'
import { CapabilitiesCluster3D } from './landmarks/CapabilitiesCluster3D'
import { UplinkBeacon3D } from './landmarks/UplinkBeacon3D'

interface CameraRigProps {
  activeChamber: number
  isEntered?: boolean
  isWarping?: boolean
}

// Spatial Shrine Pilgrimage Camera Coordinates per Chamber
const CHAMBER_CAMERA_CONFIGS = [
  // 0: Hero Gateway (Haiden Main Worship Hall)
  { pos: [0, 0.72, 5.8], lookAt: [0, 0.42, -2.2] },
  // 1: Operator Dossier (Ema-den & Chozuya Pavilion)
  { pos: [-0.3, 0.75, 5.8], lookAt: [0, 0.4, -0.8] },
  // 2: Project Showcase (Kagura-den Stage & Yata-no-Kagami)
  { pos: [0, 0.45, 5.3], lookAt: [0, 0.1, 0.0] },
  // 3: Career Logs (Senbon Torii Chronicle Corridor)
  { pos: [0, 0.7, 5.0], lookAt: [0, 0.5, -5.5] },
  // 4: Academic Matrix (Taiko-bashi & Kyozou Scrolls)
  { pos: [0, 0.85, 6.0], lookAt: [0, 0.35, -0.5] },
  // 5: Capabilities (Rokkakudo & Six Sacred Toro)
  { pos: [0, 1.0, 6.2], lookAt: [0, 0.3, -1.2] },
  // 6: Direct Uplink (Gojunoto Five-Story Pagoda & Suzu Altar)
  { pos: [0, 1.25, 6.8], lookAt: [0, 1.65, -2.5] },
]

function CameraRig({ activeChamber, isEntered = false, isWarping = false }: CameraRigProps) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0.7, -0.5))

  useFrame((state, delta) => {
    const chamber = isEntered ? activeChamber : 0
    let config = CHAMBER_CAMERA_CONFIGS[chamber] || CHAMBER_CAMERA_CONFIGS[0]

    if (chamber === 0) {
      if (isWarping) {
        // Fluid dolly forward through Ichi-no-Torii toward Haiden courtyard
        config = { pos: [0, 0.68, 4.2], lookAt: [0, 0.42, -3.5] }
      } else if (isEntered) {
        // Inside Sanctuary facing Haiden Main Worship Hall
        config = CHAMBER_CAMERA_CONFIGS[0]
      } else {
        // Initial state: Standing outside facing Ichi-no-Torii & Komagitsune
        config = { pos: [0, 0.9, 6.6], lookAt: [0, 0.7, -0.5] }
      }
    }

    const dampSpeed = isWarping ? 2.0 : 3.5

    // Subtle Mouse Parallax Offset
    const parallaxX = state.pointer.x * 0.42
    const parallaxY = -state.pointer.y * 0.28

    const targetX = config.pos[0] + parallaxX
    const targetY = config.pos[1] + parallaxY
    const targetZ = config.pos[2]

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, dampSpeed, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, dampSpeed, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, dampSpeed, delta)

    const targetLookAtX = config.lookAt[0] + parallaxX * 0.3
    const targetLookAtY = config.lookAt[1] + parallaxY * 0.2
    const targetLookAtZ = config.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAtX, dampSpeed + 0.5, delta)
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAtY, dampSpeed + 0.5, delta)
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAtZ, dampSpeed + 0.5, delta)

    state.camera.lookAt(currentLookAt.current)
  })

  return null
}

interface GlobalCyberScene3DProps {
  activeChamber: number
  isEntered?: boolean
  isWarping?: boolean
}

export function GlobalCyberScene3D({
  activeChamber,
  isEntered = false,
  isWarping = false,
}: GlobalCyberScene3DProps) {
  const effectiveChamber = isEntered ? activeChamber : 0

  return (
    <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0.9, 6.6], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        {/* Sacred Night Shrine Sky & Organic Exponential Mist */}
        <color attach="background" args={['#05070b']} />
        <fogExp2 attach="fog" args={['#070910', 0.042]} />

        {/* 3-Layer Cinematic Shrine Lighting */}
        <ambientLight intensity={0.35} color="#cbd5e1" />
        {/* Moonlight Silver-Blue Rim Light */}
        <directionalLight position={[4, 10, -8]} intensity={1.6} color="#7dd3fc" />
        {/* Warm Lantern Amber Key Light */}
        <directionalLight position={[-5, 6, 5]} intensity={2.0} color="#fbbf24" />
        {/* Vermilion Sanctuary Bounce Fill */}
        <directionalLight position={[5, 3, 4]} intensity={1.2} color="#f43f5e" />
        {/* Spirit Jade Overhead Accent */}
        <pointLight position={[0, 6, 2]} intensity={1.1} color="#2dd4bf" distance={18} />

        <Suspense fallback={null}>
          {/* Procedural Environment Reflections for Kinpaku Gold & Vermilion Lacquer */}
          <Environment resolution={256}>
            <Lightformer
              form="circle"
              intensity={1.8}
              color="#93c5fd"
              position={[0, 10, -4]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[12, 12, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2.4}
              color="#f59e0b"
              position={[-8, 2, 2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[6, 3, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.6}
              color="#e11d48"
              position={[8, 1.5, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[6, 2, 1]}
            />
            <Lightformer
              form="ring"
              intensity={1.2}
              color="#2dd4bf"
              position={[0, 2, 8]}
              scale={[5, 5, 1]}
            />
          </Environment>

          {/* Dynamic Spatial Camera Rig */}
          <CameraRig
            activeChamber={effectiveChamber}
            isEntered={isEntered}
            isWarping={isWarping}
          />

          {/* Reflective Wet Basalt Courtyard & Sando Walkway */}
          <SacredCourtyardFloor3D />

          {/* 3-Layer Atmospheric Particles (Golden Embers, Yozakura Petals, Kitsunebi Wisps) */}
          <GlobalParticles3D />

          {/* Station 0A: Ichi-no-Torii & Komagitsune Guardians (Outside) */}
          <ToriiStation3D
            activeChamber={effectiveChamber}
            isEntered={isEntered}
            isWarping={isWarping}
          />

          {/* Station 0B: Haiden Main Worship Hall */}
          <CyberShrine3D
            activeChamber={effectiveChamber}
            isEntered={isEntered}
            isWarping={isWarping}
          />

          {/* Station 1: Chozuya & Ema-den Pavilion (Operator Dossier) */}
          <DataCitadel3D activeChamber={effectiveChamber} />

          {/* Station 2: Kagura-den & Yata-no-Kagami Stage (Project Showcase) */}
          <HologramStation3D activeChamber={effectiveChamber} />

          {/* Station 3: Senbon Torii Chronicle Corridor (Career Logs) */}
          <ChronoStream3D activeChamber={effectiveChamber} />

          {/* Station 4: Taiko-bashi & Kyozou Scrolls (Academic Matrix) */}
          <NeuralLattice3D activeChamber={effectiveChamber} />

          {/* Station 5: Rokkakudo & Six Sacred Toro (Capabilities) */}
          <CapabilitiesCluster3D activeChamber={effectiveChamber} />

          {/* Station 6: Gojunoto Five-Story Pagoda & Suzu Altar (Direct Uplink) */}
          <UplinkBeacon3D activeChamber={effectiveChamber} />

          {/* Calibrated Post-Processing Pipeline */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.65}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.18} darkness={0.95} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
