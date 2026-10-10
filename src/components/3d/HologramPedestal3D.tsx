import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PedestalRingsProps {
  isTransitioning: boolean
}

function PedestalRings({ isTransitioning }: PedestalRingsProps) {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const beamRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // Rotating concentric rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.8
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.5
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 1.2

    // Laser beam vertical pulse
    if (beamRef.current) {
      const targetScaleY = isTransitioning ? 1.6 : 1.0 + Math.sin(time * 3) * 0.08
      beamRef.current.scale.y = THREE.MathUtils.damp(beamRef.current.scale.y, targetScaleY, 8, delta)
      
      const targetOpacity = isTransitioning ? 0.8 : 0.25 + Math.sin(time * 2) * 0.06
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 8, delta)
    }
  })

  return (
    <group position={[0, -1.8, 0]} rotation={[0.4, 0, 0]}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.45, 64]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      {/* Mid Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.74, 48]} />
        <meshBasicMaterial color="#ff0055" side={THREE.DoubleSide} transparent opacity={0.65} />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.94, 32]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Center Pedestal Core Cylinder */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.85, 0.25, 32]} />
        <meshStandardMaterial color="#090d18" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Vertical Hologram Light Beam (Cone/Cylinder) */}
      <mesh ref={beamRef} position={[0, 1.8, 0]}>
        <cylinderGeometry args={[1.8, 0.7, 3.6, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point Light from Base */}
      <pointLight color="#00f0ff" intensity={isTransitioning ? 5 : 2.5} distance={8} />
      <pointLight color="#ff0055" intensity={isTransitioning ? 4 : 1.5} distance={5} />
    </group>
  )
}

interface HologramPedestal3DProps {
  isTransitioning: boolean
}

export function HologramPedestal3D({ isTransitioning }: HologramPedestal3DProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.2]}
      >
        <ambientLight intensity={0.2} />
        <PedestalRings isTransitioning={isTransitioning} />
      </Canvas>
    </div>
  )
}
