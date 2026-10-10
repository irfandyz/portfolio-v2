import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ChronoStream3DProps {
  activeChamber: number
}

export function ChronoStream3D({ activeChamber }: ChronoStream3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const packetsRef = useRef<THREE.Group>(null)

  // 4 Station Chrono Rings corresponding to Orbit, Java Genius, Rittercoding, Uniteda Arkato
  const stations = [
    { z: 1.0, color: '#00f0ff', radius: 2.2 },
    { z: -1.2, color: '#ec4899', radius: 2.6 },
    { z: -3.4, color: '#a855f7', radius: 3.0 },
    { z: -5.6, color: '#00f0ff', radius: 3.4 }
  ]

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 3
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    // Rotate chrono rings
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, idx) => {
        ring.rotation.z = time * 0.3 * (idx % 2 === 0 ? 1 : -1)
      })
    }

    // Animate light packets shooting forward along the chrono rails
    if (packetsRef.current) {
      packetsRef.current.children.forEach((pkt, idx) => {
        pkt.position.z += delta * 6.5
        if (pkt.position.z > 3.0) {
          pkt.position.z = -7.0 - idx * 1.5
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 4 Chrono Station Rings in Depth */}
      <group ref={ringsRef}>
        {stations.map((st, i) => (
          <group key={i} position={[0, 0.4, st.z]}>
            <mesh>
              <torusGeometry args={[st.radius, 0.035, 12, 48]} />
              <meshStandardMaterial
                color={st.color}
                emissive={st.color}
                emissiveIntensity={2.8}
                roughness={0.1}
              />
            </mesh>
            {/* Wireframe outer ring */}
            <mesh scale={[1.08, 1.08, 1.08]}>
              <torusGeometry args={[st.radius, 0.015, 8, 36]} />
              <meshBasicMaterial color={st.color} wireframe transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Chrono Perspective Floor Light Rails */}
      {[-3.0, -1.2, 1.2, 3.0].map((x, i) => (
        <group key={i} position={[x, -1.8, -2]}>
          <mesh>
            <boxGeometry args={[0.06, 0.02, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00f0ff' : '#ec4899'}
              emissive={i % 2 === 0 ? '#00f0ff' : '#ec4899'}
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      ))}

      {/* Kinetic Data Packets Racing down the Rails */}
      <group ref={packetsRef}>
        {[-3.0, -1.2, 1.2, 3.0].map((x, i) => (
          <mesh key={i} position={[x, -1.78, -i * 2]}>
            <boxGeometry args={[0.15, 0.05, 0.6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Central Ambient Glow */}
      <pointLight position={[0, 0.5, -2]} color="#00f0ff" intensity={2.5} distance={10} />
      <pointLight position={[0, 0.5, -5]} color="#ec4899" intensity={2.0} distance={10} />
    </group>
  )
}
