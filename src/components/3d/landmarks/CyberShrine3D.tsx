import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberShrine3DProps {
  activeChamber: number
  isEntered: boolean
}

export function CyberShrine3D({ activeChamber, isEntered }: CyberShrine3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerLightRef = useRef<THREE.PointLight>(null)
  const lanternsRef = useRef<THREE.Group>(null)

  // Floating ambient shrine embers
  const emberCount = 60
  const [emberPositions] = useMemo(() => {
    const pos = new Float32Array(emberCount * 3)
    for (let i = 0; i < emberCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5
      pos[i * 3 + 1] = Math.random() * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return [pos]
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = isEntered && activeChamber === 0
    const targetScale = isActive ? 1.0 : 0.001
    const targetZ = isActive ? 0.0 : 4.0
    const targetY = isActive ? -0.2 : -2.0

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    // Subtle gentle floating breathing animation
    const time = state.clock.getElapsedTime()
    if (isActive) {
      groupRef.current.position.y = targetY + Math.sin(time * 1.2) * 0.05
      // Mouse tilt parallax
      const targetRotY = state.pointer.x * 0.25
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
    }

    // Inner shrine pulsing light
    if (innerLightRef.current) {
      innerLightRef.current.intensity = 1.8 + Math.sin(time * 3) * 0.5
    }

    // Lantern subtle sway
    if (lanternsRef.current) {
      lanternsRef.current.rotation.z = Math.sin(time * 1.5) * 0.05
    }
  })

  // Materials
  const darkWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#080c14',
        roughness: 0.35,
        metalness: 0.8,
      }),
    []
  )

  const stonePlinth = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a101d',
        roughness: 0.6,
        metalness: 0.4,
      }),
    []
  )

  const neonCyan = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 1.6,
        roughness: 0.1,
      }),
    []
  )

  const neonPink = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff007f',
        emissive: '#ff007f',
        emissiveIntensity: 1.4,
        roughness: 0.1,
      }),
    []
  )

  const shojiWarm = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffeedd',
        emissive: '#ffeedd',
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
      }),
    []
  )

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. Stone Foundation Plinth & Steps */}
      <mesh position={[0, -0.4, 0]} material={stonePlinth}>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
      </mesh>
      <mesh position={[0, -0.25, 0]} material={stonePlinth}>
        <boxGeometry args={[2.8, 0.15, 2.8]} />
      </mesh>
      {/* Front Steps */}
      <mesh position={[0, -0.45, 1.6]} material={stonePlinth}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
      </mesh>
      <mesh position={[0, -0.35, 1.4]} material={stonePlinth}>
        <boxGeometry args={[1.0, 0.1, 0.4]} />
      </mesh>

      {/* 2. Main Shrine Chamber (Honden / Haiden) */}
      {/* Wooden Pillars (4 Corner Columns) */}
      <mesh position={[-0.9, 0.5, -0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[0.9, 0.5, -0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[-0.9, 0.5, 0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[0.9, 0.5, 0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>

      {/* Neon Base Column Trims */}
      <mesh position={[-0.9, -0.15, 0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[0.9, -0.15, 0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[-0.9, -0.15, -0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[0.9, -0.15, -0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>

      {/* Shoji Lattice Glowing Walls */}
      {/* Back Wall */}
      <mesh position={[0, 0.5, -0.85]} material={shojiWarm}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-0.85, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} material={shojiWarm}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[0.85, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]} material={shojiWarm}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Front Wall (Flanking Central Shrine Doorway) */}
      <mesh position={[-0.6, 0.5, 0.85]} material={shojiWarm}>
        <planeGeometry args={[0.45, 1.2]} />
      </mesh>
      <mesh position={[0.6, 0.5, 0.85]} material={shojiWarm}>
        <planeGeometry args={[0.45, 1.2]} />
      </mesh>

      {/* Inner Shrine Sanctuary Hearth Light */}
      <pointLight
        ref={innerLightRef}
        position={[0, 0.5, 0]}
        color="#ffaa44"
        intensity={2.2}
        distance={4.5}
      />

      {/* Central Holographic Altar Gem */}
      <mesh position={[0, 0.35, 0]}>
        <octahedronGeometry args={[0.18]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>

      {/* 3. Pagoda Roof Architecture (Tier 1 & Tier 2 Curved Eaves) */}
      {/* Roof Support Beams (Kumimono Brackets) */}
      <mesh position={[0, 1.2, 0]} material={darkWood}>
        <boxGeometry args={[2.0, 0.1, 2.0]} />
      </mesh>
      <mesh position={[0, 1.25, 0]} material={neonPink}>
        <boxGeometry args={[2.08, 0.03, 2.08]} />
      </mesh>

      {/* Main Curved Pagoda Roof (Pyramidal Japanese Temple Eaves) */}
      <mesh position={[0, 1.5, 0]} material={darkWood}>
        <coneGeometry args={[1.9, 0.65, 4]} />
      </mesh>
      {/* Neon Cyan Roof Ridge Trims */}
      <mesh position={[0, 1.52, 0]} material={neonCyan}>
        <coneGeometry args={[1.94, 0.62, 4]} />
      </mesh>

      {/* Top Roof Finial (Hoju / Sacred Jewel Finial) */}
      <mesh position={[0, 1.95, 0]} material={neonCyan}>
        <cylinderGeometry args={[0.04, 0.08, 0.35, 12]} />
      </mesh>
      <mesh position={[0, 2.15, 0]} material={neonPink}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* 4. Hanging Cyber Lanterns (Left & Right) */}
      <group ref={lanternsRef}>
        {/* Left Lantern */}
        <group position={[-1.25, 0.8, 1.1]}>
          <mesh material={darkWood}>
            <cylinderGeometry args={[0.08, 0.06, 0.22, 6]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={neonCyan}>
            <boxGeometry args={[0.14, 0.16, 0.14]} />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.4} distance={2.5} />
        </group>

        {/* Right Lantern */}
        <group position={[1.25, 0.8, 1.1]}>
          <mesh material={darkWood}>
            <cylinderGeometry args={[0.08, 0.06, 0.22, 6]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={neonCyan}>
            <boxGeometry args={[0.14, 0.16, 0.14]} />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.4} distance={2.5} />
        </group>
      </group>

      {/* 5. Floating Sacred Cyber Embers around Shrine */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f0ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
