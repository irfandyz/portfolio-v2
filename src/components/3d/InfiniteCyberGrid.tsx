import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function InfiniteCyberGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((_state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1.2
      if (gridRef.current.position.z > 2) {
        gridRef.current.position.z = 0
      }
    }
  })

  return (
    <group position={[0, -2.4, 0]}>
      {/* Dynamic Cyber Grid */}
      <primitive
        object={new THREE.GridHelper(40, 40, new THREE.Color('#00f0ff'), new THREE.Color('#141e30'))}
        ref={gridRef}
      />
      {/* Dark Floor Fog / Fade Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#07080d" transparent opacity={0.65} />
      </mesh>
    </group>
  )
}
