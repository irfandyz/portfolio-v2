import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CapabilitiesCluster3DProps {
  activeChamber: number
}

export function CapabilitiesCluster3D({ activeChamber }: CapabilitiesCluster3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const clusterRef = useRef<THREE.Group>(null)

  // 6 Modular Crystal Coordinates corresponding to the 6 professional services
  const modules = [
    { x: -4.2, y: 1.5, z: -2.0, color: '#00f0ff', type: 'dodeca' },
    { x: 0.0, y: 2.2, z: -3.0, color: '#ec4899', type: 'octa' },
    { x: 4.2, y: 1.5, z: -2.0, color: '#06b6d4', type: 'icosa' },
    { x: -4.2, y: -0.8, z: -2.0, color: '#a855f7', type: 'cylinder' },
    { x: 0.0, y: -1.2, z: -2.5, color: '#10b981', type: 'torus' },
    { x: 4.2, y: -0.8, z: -2.0, color: '#f59e0b', type: 'box' }
  ]

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 5
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()
    if (clusterRef.current) {
      clusterRef.current.children.forEach((child, idx) => {
        child.rotation.x = time * 0.4 * (idx % 2 === 0 ? 1 : -1)
        child.rotation.y = time * 0.5 * (idx % 3 === 0 ? 1 : -1)
        child.position.y += Math.sin(time * 1.8 + idx) * 0.003
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={clusterRef}>
        {modules.map((mod, i) => (
          <group key={i} position={[mod.x, mod.y, mod.z]}>
            {/* Core Solid Emissive Mesh */}
            <mesh>
              {mod.type === 'dodeca' && <dodecahedronGeometry args={[0.5, 0]} />}
              {mod.type === 'octa' && <octahedronGeometry args={[0.55, 0]} />}
              {mod.type === 'icosa' && <icosahedronGeometry args={[0.5, 0]} />}
              {mod.type === 'cylinder' && <cylinderGeometry args={[0.4, 0.4, 0.7, 16]} />}
              {mod.type === 'torus' && <torusGeometry args={[0.45, 0.12, 12, 24]} />}
              {mod.type === 'box' && <boxGeometry args={[0.65, 0.65, 0.65]} />}
              <meshStandardMaterial
                color={mod.color}
                emissive={mod.color}
                emissiveIntensity={1.8}
                roughness={0.2}
              />
            </mesh>
            {/* Wireframe Outer Shell */}
            <mesh scale={[1.2, 1.2, 1.2]}>
              {mod.type === 'dodeca' && <dodecahedronGeometry args={[0.5, 0]} />}
              {mod.type === 'octa' && <octahedronGeometry args={[0.55, 0]} />}
              {mod.type === 'icosa' && <icosahedronGeometry args={[0.5, 0]} />}
              {mod.type === 'cylinder' && <cylinderGeometry args={[0.4, 0.4, 0.7, 12]} />}
              {mod.type === 'torus' && <torusGeometry args={[0.45, 0.12, 8, 20]} />}
              {mod.type === 'box' && <boxGeometry args={[0.65, 0.65, 0.65]} />}
              <meshBasicMaterial color={mod.color} wireframe transparent opacity={0.65} />
            </mesh>
            <pointLight color={mod.color} intensity={1.5} distance={4} />
          </group>
        ))}
      </group>
    </group>
  )
}
