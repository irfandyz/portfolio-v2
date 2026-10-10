import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CyberKitsune } from './CyberKitsune3D'

export function ToriiGate3D() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Floating Cyber Particles
  const particleCount = 200
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const cyan = new THREE.Color('#00f0ff')
    const magenta = new THREE.Color('#ff0055')

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.2) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12

      const mixed = Math.random() > 0.5 ? cyan : magenta
      col[i * 3] = mixed.r
      col[i * 3 + 1] = mixed.g
      col[i * 3 + 2] = mixed.b
    }
    return [pos, col]
  }, [])

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // Gentle floating rotation
    if (groupRef.current) {
      // Parallax mouse tilt
      const targetRotY = state.pointer.x * 0.35
      const targetRotX = -state.pointer.y * 0.2
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.15 - 0.2
    }

    // Particle drift
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i)
        y += delta * 0.4
        if (y > 8) y = -2
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
    }
  })

  // Materials
  const pillarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#05101a',
        roughness: 0.2,
        metalness: 0.85,
        wireframe: false
      }),
    []
  )

  const beamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a0510',
        roughness: 0.2,
        metalness: 0.9,
        wireframe: false
      }),
    []
  )

  const cyanWireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#00f0ff',
        wireframe: true,
        transparent: true,
        opacity: 0.65
      }),
    []
  )

  const magentaWireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ff0055',
        wireframe: true,
        transparent: true,
        opacity: 0.6
      }),
    []
  )

  const neonCyanEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 2.2,
        roughness: 0.1
      }),
    []
  )

  const neonPinkEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff0055',
        emissive: '#ff0055',
        emissiveIntensity: 2.5,
        roughness: 0.1
      }),
    []
  )

  return (
    <>
      {/* 3D Cyber Torii Gate */}
      <group ref={groupRef} position={[0, 0, -1.2]}>
        {/* === PILLARS (HASHIRA) === */}
        {/* Left Pillar */}
        <group position={[-3.1, 0.6, 0]}>
          <mesh material={pillarMaterial}>
            <cylinderGeometry args={[0.22, 0.26, 5.4, 16]} />
          </mesh>
          <mesh material={cyanWireMaterial} scale={[1.04, 1.01, 1.04]}>
            <cylinderGeometry args={[0.22, 0.26, 5.4, 12]} />
          </mesh>
          {/* Base pedestal ring */}
          <mesh position={[0, -2.6, 0]} material={neonCyanEmissive}>
            <torusGeometry args={[0.34, 0.04, 8, 24]} />
          </mesh>
        </group>

        {/* Right Pillar */}
        <group position={[3.1, 0.6, 0]}>
          <mesh material={pillarMaterial}>
            <cylinderGeometry args={[0.22, 0.26, 5.4, 16]} />
          </mesh>
          <mesh material={cyanWireMaterial} scale={[1.04, 1.01, 1.04]}>
            <cylinderGeometry args={[0.22, 0.26, 5.4, 12]} />
          </mesh>
          {/* Base pedestal ring */}
          <mesh position={[0, -2.6, 0]} material={neonCyanEmissive}>
            <torusGeometry args={[0.34, 0.04, 8, 24]} />
          </mesh>
        </group>

        {/* === TOP MAIN ROOF BEAM (KASAGI & SHIMAKI) === */}
        {/* Top curved beam */}
        <group position={[0, 3.4, 0]}>
          <mesh material={beamMaterial}>
            <boxGeometry args={[7.8, 0.32, 0.55]} />
          </mesh>
          <mesh material={magentaWireMaterial} scale={[1.02, 1.1, 1.05]}>
            <boxGeometry args={[7.8, 0.32, 0.55]} />
          </mesh>
          {/* Top Neon Laser strip */}
          <mesh position={[0, 0.18, 0]} material={neonPinkEmissive}>
            <boxGeometry args={[7.6, 0.05, 0.05]} />
          </mesh>
        </group>

        {/* Secondary Beam (Shimaki) right below top beam */}
        <group position={[0, 3.05, 0]}>
          <mesh material={beamMaterial}>
            <boxGeometry args={[6.8, 0.22, 0.45]} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={neonCyanEmissive}>
            <boxGeometry args={[6.6, 0.04, 0.04]} />
          </mesh>
        </group>

        {/* Middle Tie Beam (Nuki) */}
        <group position={[0, 2.15, 0]}>
          <mesh material={pillarMaterial}>
            <boxGeometry args={[6.4, 0.2, 0.32]} />
          </mesh>
          <mesh material={cyanWireMaterial} scale={[1.02, 1.1, 1.05]}>
            <boxGeometry args={[6.4, 0.2, 0.32]} />
          </mesh>
        </group>

        {/* Central Vertical Post (Gakuzuka) */}
        <mesh position={[0, 2.6, 0]} material={neonCyanEmissive}>
          <boxGeometry args={[0.3, 0.9, 0.15]} />
        </mesh>

        {/* Floor Reflective Laser Ring */}
        <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} material={neonCyanEmissive}>
          <ringGeometry args={[2.5, 2.55, 48]} />
        </mesh>
        <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} material={neonPinkEmissive}>
          <ringGeometry args={[3.6, 3.64, 48]} />
        </mesh>

        {/* === CYBER GUARDIAN KITSUNE STATUES (電脳狛狐) === */}
        {/* Left Guardian Kitsune (Cyan Aura, holding Sacred Key/Scroll) */}
        <CyberKitsune
          side="left"
          position={[-4.5, -1.35, 0.5]}
          rotationY={0.42}
        />

        {/* Right Guardian Kitsune (Magenta Aura, holding Sacred Jewel/Orb) */}
        <CyberKitsune
          side="right"
          position={[4.5, -1.35, 0.5]}
          rotationY={-0.42}
        />
      </group>

      {/* Cyber Particle Sparks */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}
