import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataCitadel3DProps {
  activeChamber: number
}

export function DataCitadel3D({ activeChamber }: DataCitadel3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cubesRef = useRef<THREE.Group>(null)

  // Floating data cubes data
  const cubesData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 5 + 0.5,
      z: -2.5 - Math.random() * 3,
      size: 0.25 + Math.random() * 0.35,
      speed: 0.5 + Math.random() * 0.8,
      isMagenta: i % 3 === 0
    }))
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 1
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.0

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    // Animate floating cubes
    if (cubesRef.current) {
      const time = state.clock.getElapsedTime()
      cubesRef.current.children.forEach((child, i) => {
        child.rotation.x = time * 0.4 * (i % 2 === 0 ? 1 : -1)
        child.rotation.y = time * 0.5 * (i % 3 === 0 ? 1 : -1)
        child.position.y += Math.sin(time * 1.5 + i) * 0.003
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* === LEFT SERVER MONOLITH TOWER === */}
      <group position={[-4.5, 0.2, -1.5]}>
        {/* Main Pillar Body */}
        <mesh>
          <boxGeometry args={[1.2, 6.0, 1.2]} />
          <meshStandardMaterial color="#050a12" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Neon Wireframe Cage */}
        <mesh scale={[1.02, 1.01, 1.02]}>
          <boxGeometry args={[1.2, 6.0, 1.2]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
        </mesh>
        {/* Horizontal Server Rack Indicator Lights */}
        {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.62]}>
            <boxGeometry args={[0.9, 0.06, 0.04]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#00f0ff' : '#ff0055'}
              emissive={idx % 2 === 0 ? '#00f0ff' : '#ff0055'}
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      {/* === RIGHT SERVER MONOLITH TOWER === */}
      <group position={[4.5, 0.2, -1.5]}>
        {/* Main Pillar Body */}
        <mesh>
          <boxGeometry args={[1.2, 6.0, 1.2]} />
          <meshStandardMaterial color="#050a12" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Neon Wireframe Cage */}
        <mesh scale={[1.02, 1.01, 1.02]}>
          <boxGeometry args={[1.2, 6.0, 1.2]} />
          <meshBasicMaterial color="#ff0055" wireframe transparent opacity={0.6} />
        </mesh>
        {/* Horizontal Server Rack Indicator Lights */}
        {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.62]}>
            <boxGeometry args={[0.9, 0.06, 0.04]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#ff0055' : '#00f0ff'}
              emissive={idx % 2 === 0 ? '#ff0055' : '#00f0ff'}
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      {/* === FLOATING MAIN DEPTH DATA CUBES === */}
      <group ref={cubesRef}>
        {cubesData.map((cube, i) => (
          <group key={i} position={[cube.x, cube.y, cube.z]}>
            <mesh>
              <octahedronGeometry args={[cube.size, 0]} />
              <meshBasicMaterial
                color={cube.isMagenta ? '#ff0055' : '#00f0ff'}
                wireframe
                transparent
                opacity={0.7}
              />
            </mesh>
            <mesh scale={[0.5, 0.5, 0.5]}>
              <boxGeometry args={[cube.size, cube.size, cube.size]} />
              <meshStandardMaterial
                color={cube.isMagenta ? '#ff0055' : '#00f0ff'}
                emissive={cube.isMagenta ? '#ff0055' : '#00f0ff'}
                emissiveIntensity={1.8}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Flanking Point Lights */}
      <pointLight position={[-3.8, 0.5, -0.5]} color="#00f0ff" intensity={2.5} distance={7} />
      <pointLight position={[3.8, 0.5, -0.5]} color="#ff0055" intensity={2.2} distance={7} />
    </group>
  )
}
