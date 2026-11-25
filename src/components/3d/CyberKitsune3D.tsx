import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../utils/shrineTextures'

export interface CyberKitsuneProps {
  side: 'left' | 'right'
  position: [number, number, number]
  rotationY?: number
}

/**
 * CyberKitsune (電脳狛狐): Sculpted Obsidian, Vermilion & Kinpaku Gold
 * Shinto Guardian Fox Statues flanking Ichi-no-Torii.
 * - Left: Kitsunebi Jade Spirit Fox holding Sacred Makimono Scroll
 * - Right: Vermilion Flame Fox holding Sacred Hoju Jewel Orb
 */
export function CyberKitsune({
  side,
  position,
  rotationY = 0,
}: CyberKitsuneProps) {
  const materials = useShrineMaterials()
  const tailRef = useRef<THREE.Group>(null)
  const orbRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  const isLeft = side === 'left'
  const auraHex = isLeft ? '#2dd4bf' : '#e11d48'
  const auraMaterial = isLeft
    ? materials.spiritJadeEmissive
    : materials.vermilionFlameEmissive

  const mandalaMaterial = useMemo(() => {
    const tex = createMandalaSealTexture({
      primaryColor: isLeft ? '#2dd4bf' : '#fb7185',
      secondaryColor: '#fbbf24',
    })
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [isLeft])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(time * 1.4 + (isLeft ? 0 : 1.5)) * 0.09
      tailRef.current.rotation.x = Math.cos(time * 1.1) * 0.06
    }

    if (orbRef.current) {
      orbRef.current.rotation.y = time * 1.1
      orbRef.current.rotation.x = time * 0.7
      orbRef.current.position.y = 1.24 + Math.sin(time * 2.0 + (isLeft ? 0 : 1.2)) * 0.045
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = (isLeft ? 1 : -1) * time * 0.28
    }
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* === STEPPED CHISELLED BASALT PEDESTAL (DAI) === */}
      <mesh position={[0, -0.64, 0]} material={materials.chiselledBasalt}>
        <boxGeometry args={[1.3, 0.34, 1.48]} />
      </mesh>
      {/* Kinpaku Gold Pedestal Trim Collar */}
      <mesh position={[0, -0.46, 0]} material={materials.kinpakuGold}>
        <boxGeometry args={[1.18, 0.04, 1.36]} />
      </mesh>
      <mesh position={[0, -0.29, 0]} material={materials.chiselledBasalt}>
        <boxGeometry args={[1.08, 0.32, 1.26]} />
      </mesh>
      {/* Glowing Pedestal Mandala Seal Disc */}
      <mesh position={[0, -0.125, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mandalaMaterial}>
        <planeGeometry args={[1.05, 1.05]} />
      </mesh>

      {/* === SCULPTED SEATED KOMAGITSUNE STATUE === */}
      <group position={[0, 0, 0]}>
        {/* Angular Seated Haunches */}
        <mesh position={[-0.23, -0.02, -0.18]} rotation={[0.15, 0, 0.08]} material={materials.obsidianArmor}>
          <boxGeometry args={[0.24, 0.42, 0.48]} />
        </mesh>
        <mesh position={[0.23, -0.02, -0.18]} rotation={[0.15, 0, -0.08]} material={materials.obsidianArmor}>
          <boxGeometry args={[0.24, 0.42, 0.48]} />
        </mesh>

        {/* Faceted Seated Torso */}
        <mesh position={[0, 0.28, -0.02]} rotation={[-0.18, 0, 0]} material={materials.obsidianArmor}>
          <cylinderGeometry args={[0.2, 0.34, 0.78, 6]} />
        </mesh>

        {/* Gold Spine & Shoulder Crest Plates */}
        <mesh position={[0, 0.42, -0.16]} rotation={[-0.25, 0, 0]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.12, 0.42, 0.08]} />
        </mesh>

        {/* Slender Forelegs + Kinpaku Gold Ankle Rings */}
        {[-0.16, 0.16].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.0, 0.23]}>
            <mesh material={materials.obsidianArmor}>
              <cylinderGeometry args={[0.068, 0.08, 0.62, 8]} />
            </mesh>
            <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.kinpakuGold}>
              <torusGeometry args={[0.082, 0.014, 8, 16]} />
            </mesh>
          </group>
        ))}

        {/* Traditional Vermilion Yodarekake (Votive Chest Bib/Apron) */}
        <group position={[0, 0.41, 0.18]} rotation={[0.28, 0, 0]}>
          <mesh material={materials.vermilionLacquer}>
            <boxGeometry args={[0.34, 0.26, 0.05]} />
          </mesh>
          {/* Gold Border Trim on Bib */}
          <mesh position={[0, -0.13, 0.005]} material={materials.kinpakuGold}>
            <boxGeometry args={[0.36, 0.025, 0.055]} />
          </mesh>
          <mesh position={[0, 0.11, 0.01]} material={materials.kinpakuGold}>
            <boxGeometry args={[0.36, 0.03, 0.06]} />
          </mesh>
        </group>

        {/* Sacred Relic Held by Guardian (Left: Scroll / Right: Hoju Orb) */}
        {isLeft ? (
          <group position={[0, 0.34, 0.3]} rotation={[0, 0, 0.18]}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.055, 0.055, 0.44, 12]} />
            </mesh>
            <mesh position={[-0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={auraMaterial}>
              <cylinderGeometry args={[0.062, 0.062, 0.05, 12]} />
            </mesh>
            <mesh position={[0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={auraMaterial}>
              <cylinderGeometry args={[0.062, 0.062, 0.05, 12]} />
            </mesh>
          </group>
        ) : (
          <group position={[0, 0.36, 0.29]}>
            <mesh position={[0, -0.07, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.08, 0.05, 0.06, 8]} />
            </mesh>
            <mesh material={auraMaterial}>
              <octahedronGeometry args={[0.1, 1]} />
            </mesh>
          </group>
        )}

        {/* === ROTATING SACRED MANDALA HALO BEHIND HEAD === */}
        <mesh ref={haloRef} position={[0, 0.84, -0.14]} material={mandalaMaterial}>
          <planeGeometry args={[1.05, 1.05]} />
        </mesh>

        {/* === SCULPTED KITSUNE HEAD & MUZZLE === */}
        <group position={[0, 0.78, 0.1]} rotation={[-0.04, 0, 0]}>
          {/* Angular Cranium */}
          <mesh material={materials.obsidianArmor}>
            <boxGeometry args={[0.3, 0.26, 0.32]} />
          </mesh>
          {/* Gold Brow Crest */}
          <mesh position={[0, 0.1, 0.14]} material={materials.kinpakuGold}>
            <boxGeometry args={[0.1, 0.04, 0.08]} />
          </mesh>

          {/* Tapered Fox Snout + Gold Nose Bridge */}
          <mesh position={[0, -0.05, 0.25]} rotation={[-Math.PI / 2, 0, 0]} material={materials.obsidianArmor}>
            <coneGeometry args={[0.13, 0.34, 5]} />
          </mesh>
          <mesh position={[0, -0.01, 0.24]} rotation={[-0.25, 0, 0]} material={materials.kinpakuGold}>
            <boxGeometry args={[0.035, 0.02, 0.22]} />
          </mesh>
          <mesh position={[0, -0.04, 0.42]} material={materials.kinpakuGold}>
            <sphereGeometry args={[0.032, 8, 8]} />
          </mesh>

          {/* Slanted Spirit Eyes */}
          <mesh position={[-0.1, 0.04, 0.17]} rotation={[0.18, -0.28, 0.22]} material={auraMaterial}>
            <boxGeometry args={[0.068, 0.02, 0.03]} />
          </mesh>
          <mesh position={[0.1, 0.04, 0.17]} rotation={[0.18, 0.28, -0.22]} material={auraMaterial}>
            <boxGeometry args={[0.068, 0.02, 0.03]} />
          </mesh>

          {/* Tall Pointed Fox Ears with Kinpaku Gold Inner Linings */}
          <group position={[-0.13, 0.23, -0.04]} rotation={[-0.14, -0.18, 0.22]}>
            <mesh material={materials.obsidianArmor}>
              <coneGeometry args={[0.085, 0.34, 4]} />
            </mesh>
            <mesh position={[0, -0.01, 0.022]} scale={[0.72, 0.85, 0.4]} material={materials.kinpakuGold}>
              <coneGeometry args={[0.07, 0.28, 4]} />
            </mesh>
          </group>
          <group position={[0.13, 0.23, -0.04]} rotation={[-0.14, 0.18, -0.22]}>
            <mesh material={materials.obsidianArmor}>
              <coneGeometry args={[0.085, 0.34, 4]} />
            </mesh>
            <mesh position={[0, -0.01, 0.022]} scale={[0.72, 0.85, 0.4]} material={materials.kinpakuGold}>
              <coneGeometry args={[0.07, 0.28, 4]} />
            </mesh>
          </group>
        </group>

        {/* === SWEEPING TAIL & FLOATING SPIRIT FLAME ORB === */}
        <group ref={tailRef} position={[0, 0.08, -0.34]}>
          <mesh position={[0, 0.22, -0.1]} rotation={[0.42, 0, 0]} material={materials.obsidianArmor}>
            <cylinderGeometry args={[0.12, 0.08, 0.4, 8]} />
          </mesh>
          <mesh position={[0, 0.56, -0.16]} rotation={[0.2, 0, 0]} material={materials.obsidianArmor}>
            <cylinderGeometry args={[0.17, 0.12, 0.46, 8]} />
          </mesh>
          <mesh position={[0, 0.56, -0.16]} rotation={[1.77, 0, 0]} material={materials.kinpakuGold}>
            <torusGeometry args={[0.155, 0.016, 8, 16]} />
          </mesh>
          <mesh position={[0, 0.9, -0.09]} rotation={[-0.28, 0, 0]} material={materials.obsidianArmor}>
            <cylinderGeometry args={[0.09, 0.16, 0.42, 8]} />
          </mesh>

          {/* Spirit Flame Orb Floating Above Tail Tip */}
          <mesh ref={orbRef} position={[0, 1.24, 0]} material={auraMaterial}>
            <octahedronGeometry args={[0.12, 0]} />
          </mesh>
          <pointLight position={[0, 0.95, 0]} color={auraHex} intensity={1.7} distance={4.2} decay={2} />
        </group>
      </group>
    </group>
  )
}
