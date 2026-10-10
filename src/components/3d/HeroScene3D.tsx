import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { ToriiGate3D } from './ToriiGate3D'
import { InfiniteCyberGrid } from './InfiniteCyberGrid'

export function HeroScene3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0.8, 6.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Deep Cyber Fog */}
        <color attach="background" args={['#07080d']} />
        <fog attach="fog" args={['#07080d', 6, 18]} />

        {/* Dynamic Dramatic Lighting */}
        <ambientLight intensity={0.4} />
        {/* Cyan side light */}
        <directionalLight position={[-6, 4, 3]} intensity={2.2} color="#00f0ff" />
        {/* Magenta opposite light */}
        <directionalLight position={[6, 4, 3]} intensity={1.8} color="#ff0055" />
        {/* Top Rim Light */}
        <pointLight position={[0, 6, 0]} intensity={1.5} color="#00f0ff" />

        <Suspense fallback={null}>
          <ToriiGate3D />
          <InfiniteCyberGrid />

          {/* Post-Processing Effects (Cyber Glow) */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.15} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
