import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

import { InfiniteCyberGrid } from './InfiniteCyberGrid'
import { GlobalParticles3D } from './GlobalParticles3D'
import { ToriiStation3D } from './landmarks/ToriiStation3D'
import { DataCitadel3D } from './landmarks/DataCitadel3D'
import { HologramStation3D } from './landmarks/HologramStation3D'
import { ChronoStream3D } from './landmarks/ChronoStream3D'
import { NeuralLattice3D } from './landmarks/NeuralLattice3D'
import { CapabilitiesCluster3D } from './landmarks/CapabilitiesCluster3D'
import { UplinkBeacon3D } from './landmarks/UplinkBeacon3D'

interface CameraRigProps {
  activeChamber: number
}

// Camera coordinates & lookAt targets per chamber
const CHAMBER_CAMERA_CONFIGS = [
  // 0: Hero Gateway
  { pos: [0, 0.8, 6.2], lookAt: [0, 0.4, 0] },
  // 1: Operator Dossier (Data Citadel)
  { pos: [0, 0.4, 5.4], lookAt: [0, 0.2, 0] },
  // 2: Project Showcase (Hologram Pedestal)
  { pos: [0, 0.1, 5.0], lookAt: [0, -0.2, 0] },
  // 3: Career Chrono-Console (Chrono-Stream)
  { pos: [0, 0.3, 5.5], lookAt: [0, 0.1, 0] },
  // 4: Academic Matrix (Neural Lattice)
  { pos: [0, 0.5, 5.6], lookAt: [0, 0.2, 0] },
  // 5: Capabilities (Modular Cluster)
  { pos: [0, 0.3, 5.4], lookAt: [0, 0.0, 0] },
  // 6: Direct Uplink (Uplink Beacon)
  { pos: [0, 0.9, 6.0], lookAt: [0, 0.8, 0] }
]

function CameraRig({ activeChamber }: CameraRigProps) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0.4, 0))

  useFrame((state, delta) => {
    const config = CHAMBER_CAMERA_CONFIGS[activeChamber] || CHAMBER_CAMERA_CONFIGS[0]

    // Mouse Parallax Offset
    const parallaxX = state.pointer.x * 0.45
    const parallaxY = -state.pointer.y * 0.3

    const targetX = config.pos[0] + parallaxX
    const targetY = config.pos[1] + parallaxY
    const targetZ = config.pos[2]

    // Smooth Camera Position Lerping
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3.5, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3.5, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3.5, delta)

    // Smooth LookAt Target Lerping
    const targetLookAtX = config.lookAt[0] + parallaxX * 0.3
    const targetLookAtY = config.lookAt[1] + parallaxY * 0.2
    const targetLookAtZ = config.lookAt[2]

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAtX, 4, delta)
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAtY, 4, delta)
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAtZ, 4, delta)

    state.camera.lookAt(currentLookAt.current)
  })

  return null
}

interface GlobalCyberScene3DProps {
  activeChamber: number
}

export function GlobalCyberScene3D({ activeChamber }: GlobalCyberScene3DProps) {
  return (
    <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0.8, 6.2], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        {/* Deep Cyber Universe Atmosphere */}
        <color attach="background" args={['#07080d']} />
        <fog attach="fog" args={['#07080d', 7, 24]} />

        {/* Global Key & Accent Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[-6, 5, 4]} intensity={2.0} color="#00f0ff" />
        <directionalLight position={[6, 5, 4]} intensity={1.8} color="#ff0055" />
        <pointLight position={[0, 8, 2]} intensity={1.2} color="#00f0ff" />

        <Suspense fallback={null}>
          {/* Dynamic Interpolated Camera Rig */}
          <CameraRig activeChamber={activeChamber} />

          {/* Continuous Cyber Floor Grid */}
          <InfiniteCyberGrid />

          {/* Continuous Floating Data Particle Swarm */}
          <GlobalParticles3D />

          {/* Station 0: Hero Cyber Torii Gate & Kitsune Guardians */}
          <ToriiStation3D activeChamber={activeChamber} />

          {/* Station 1: Operator Dossier Data Citadel Monoliths */}
          <DataCitadel3D activeChamber={activeChamber} />

          {/* Station 2: Project Showcase Hologram Pedestal Laser Rings */}
          <HologramStation3D activeChamber={activeChamber} />

          {/* Station 3: Career Chrono-Stream Warp Rails */}
          <ChronoStream3D activeChamber={activeChamber} />

          {/* Station 4: Academic Neural Lattice Circuit Bridge */}
          <NeuralLattice3D activeChamber={activeChamber} />

          {/* Station 5: Capabilities Hexagonal Modular Cluster */}
          <CapabilitiesCluster3D activeChamber={activeChamber} />

          {/* Station 6: Direct Uplink Cyber Beacon */}
          <UplinkBeacon3D activeChamber={activeChamber} />

          {/* Single Unified Post-Processing Pipeline (60 FPS) */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.45}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.15} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
