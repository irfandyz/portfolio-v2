import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { ToriiGate3D } from './ToriiGate3D'
import { SacredCourtyardFloor3D } from './SacredCourtyardFloor3D'

export function HeroScene3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0.9, 6.6], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Sacred Night Shrine Atmosphere */}
        <color attach="background" args={['#05070b']} />
        <fogExp2 attach="fog" args={['#070910', 0.042]} />

        {/* Neo-Shinto 3-Layer Lighting */}
        <ambientLight intensity={0.35} color="#cbd5e1" />
        <directionalLight position={[4, 10, -8]} intensity={1.6} color="#7dd3fc" />
        <directionalLight position={[-5, 6, 5]} intensity={2.0} color="#fbbf24" />
        <directionalLight position={[5, 3, 4]} intensity={1.2} color="#f43f5e" />
        <pointLight position={[0, 6, 2]} intensity={1.1} color="#2dd4bf" distance={18} />

        <Suspense fallback={null}>
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
          </Environment>

          <ToriiGate3D />
          <SacredCourtyardFloor3D />

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
