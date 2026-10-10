import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberKitsuneProps {
  side: 'left' | 'right'
  position: [number, number, number]
  rotationY?: number
}

/**
 * CyberKitsune: Sacred 3D Shinto Guardian Fox Statues flanking the Cyber Torii Gate
 * Left: Cyan Energy (Celestial Fox with Sacred Scroll)
 * Right: Magenta Energy (Spirit Fox with Sacred Jewel)
 */
export function CyberKitsune({
  side,
  position,
  rotationY = 0,
}: CyberKitsuneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Group>(null)
  const orbRef = useRef<THREE.Mesh>(null)

  const isLeft = side === 'left'
  const primaryColor = isLeft ? '#00f0ff' : '#ff0055'
  const secondaryColor = isLeft ? '#ec4899' : '#00f0ff'

  // Materials for Statue
  const armorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#060a14',
        roughness: 0.18,
        metalness: 0.9,
      }),
    []
  )

  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      }),
    [primaryColor]
  )

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 3.5,
        roughness: 0.1,
      }),
    [primaryColor]
  )

  const spiritOrbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: secondaryColor,
        emissive: secondaryColor,
        emissiveIntensity: 2.8,
        roughness: 0.1,
      }),
    [secondaryColor]
  )

  const pedestalNeon = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 2.2,
      }),
    [primaryColor]
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Statue tail & orb gentle breathing animations
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(time * 1.5 + (isLeft ? 0 : 1.5)) * 0.12
      tailRef.current.rotation.x = Math.cos(time * 1.2) * 0.08
    }
    if (orbRef.current) {
      orbRef.current.rotation.y = time * 1.2
      orbRef.current.rotation.x = time * 0.8
      orbRef.current.position.y = 1.35 + Math.sin(time * 2.2) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
    >
      {/* === PEDESTAL / STONE PLINTH === */}
      {/* Base stepped block */}
      <mesh position={[0, -0.65, 0]} material={armorMaterial}>
        <boxGeometry args={[1.2, 0.35, 1.4]} />
      </mesh>
      {/* Neon base strip */}
      <mesh position={[0, -0.47, 0]} material={pedestalNeon}>
        <boxGeometry args={[1.22, 0.03, 1.42]} />
      </mesh>
      {/* Upper pedestal block */}
      <mesh position={[0, -0.3, 0]} material={armorMaterial}>
        <boxGeometry args={[1.05, 0.35, 1.25]} />
      </mesh>
      <mesh position={[0, -0.3, 0]} material={wireMaterial} scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1.05, 0.35, 1.25]} />
      </mesh>

      {/* Hologram Emitter Ring on Top of Pedestal */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} material={pedestalNeon}>
        <ringGeometry args={[0.55, 0.6, 32]} />
      </mesh>

      {/* === GUARDIAN KITSUNE STATUE (SEATED CYBER FOX) === */}
      <group position={[0, 0, 0]}>
        {/* Haunches / Hind legs */}
        <mesh position={[-0.24, -0.05, -0.22]} material={armorMaterial}>
          <boxGeometry args={[0.22, 0.45, 0.48]} />
        </mesh>
        <mesh position={[0.24, -0.05, -0.22]} material={armorMaterial}>
          <boxGeometry args={[0.22, 0.45, 0.48]} />
        </mesh>

        {/* Slender Seated Torso & Chest */}
        <mesh position={[0, 0.28, -0.02]} rotation={[-0.18, 0, 0]} material={armorMaterial}>
          <cylinderGeometry args={[0.22, 0.36, 0.78, 8]} />
        </mesh>
        <mesh position={[0, 0.28, -0.02]} rotation={[-0.18, 0, 0]} material={wireMaterial} scale={[1.04, 1.02, 1.04]}>
          <cylinderGeometry args={[0.22, 0.36, 0.78, 8]} />
        </mesh>

        {/* Forelegs */}
        <mesh position={[-0.16, -0.02, 0.24]} material={armorMaterial}>
          <cylinderGeometry args={[0.07, 0.08, 0.62, 8]} />
        </mesh>
        <mesh position={[0.16, -0.02, 0.24]} material={armorMaterial}>
          <cylinderGeometry args={[0.07, 0.08, 0.62, 8]} />
        </mesh>

        {/* Chest Plate / Sacred Collar */}
        <mesh position={[0, 0.48, 0.16]} rotation={[0.4, 0, 0]} material={pedestalNeon}>
          <boxGeometry args={[0.3, 0.06, 0.12]} />
        </mesh>

        {/* Sacred Relic Gem in Chest */}
        <mesh position={[0, 0.44, 0.24]} material={spiritOrbMaterial}>
          <octahedronGeometry args={[0.08, 0]} />
        </mesh>

        {/* Head & Muzzle */}
        <group position={[0, 0.76, 0.12]} rotation={[-0.05, 0, 0]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.3, 0.26, 0.32]} />
          </mesh>
          <mesh material={wireMaterial} scale={[1.04, 1.04, 1.04]}>
            <boxGeometry args={[0.3, 0.26, 0.32]} />
          </mesh>

          <mesh position={[0, -0.06, 0.25]} rotation={[-Math.PI / 2, 0, 0]} material={armorMaterial}>
            <coneGeometry args={[0.14, 0.32, 5]} />
          </mesh>
          <mesh position={[0, -0.04, 0.41]} material={pedestalNeon}>
            <sphereGeometry args={[0.035, 8, 8]} />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.11, 0.04, 0.17]} rotation={[0.2, -0.3, 0.2]} material={eyeMaterial}>
            <boxGeometry args={[0.06, 0.018, 0.03]} />
          </mesh>
          <mesh position={[0.11, 0.04, 0.17]} rotation={[0.2, 0.3, -0.2]} material={eyeMaterial}>
            <boxGeometry args={[0.06, 0.018, 0.03]} />
          </mesh>

          {/* Ears */}
          <group position={[-0.14, 0.22, -0.04]} rotation={[-0.15, -0.2, 0.25]}>
            <mesh material={armorMaterial}>
              <coneGeometry args={[0.09, 0.32, 4]} />
            </mesh>
            <mesh material={pedestalNeon} scale={[0.8, 0.9, 0.4]} position={[0, 0, 0.02]}>
              <coneGeometry args={[0.07, 0.28, 4]} />
            </mesh>
          </group>
          <group position={[0.14, 0.22, -0.04]} rotation={[-0.15, 0.2, -0.25]}>
            <mesh material={armorMaterial}>
              <coneGeometry args={[0.09, 0.32, 4]} />
            </mesh>
            <mesh material={pedestalNeon} scale={[0.8, 0.9, 0.4]} position={[0, 0, 0.02]}>
              <coneGeometry args={[0.07, 0.28, 4]} />
            </mesh>
          </group>
        </group>

        {/* Tail */}
        <group ref={tailRef} position={[0, 0.1, -0.35]}>
          <mesh position={[0, 0.24, -0.1]} rotation={[0.4, 0, 0]} material={armorMaterial}>
            <cylinderGeometry args={[0.12, 0.08, 0.42, 8]} />
          </mesh>
          <mesh position={[0, 0.6, -0.16]} rotation={[0.2, 0, 0]} material={armorMaterial}>
            <cylinderGeometry args={[0.18, 0.12, 0.48, 8]} />
          </mesh>
          <mesh position={[0, 0.6, -0.16]} rotation={[0.2, 0, 0]} material={wireMaterial} scale={[1.06, 1.02, 1.06]}>
            <cylinderGeometry args={[0.18, 0.12, 0.48, 8]} />
          </mesh>
          <mesh position={[0, 0.95, -0.08]} rotation={[-0.3, 0, 0]} material={armorMaterial}>
            <cylinderGeometry args={[0.1, 0.17, 0.42, 8]} />
          </mesh>
          <mesh ref={orbRef} position={[0, 1.3, 0]} material={spiritOrbMaterial}>
            <octahedronGeometry args={[0.12, 0]} />
          </mesh>
          <pointLight position={[0, 0.8, 0]} color={primaryColor} intensity={1.8} distance={3.5} />
        </group>
      </group>
    </group>
  )
}
