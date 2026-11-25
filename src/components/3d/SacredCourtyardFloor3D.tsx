import { useMemo, useRef } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../utils/shrineMaterials'
import { getBasaltStoneTextures } from '../../utils/shrineTextures'
import { IshiDoroLantern } from './primitives/ShrinePrimitives'

const SANDO_SLAB_COUNT = 14
const LANTERN_POSITIONS: [number, number, number][] = [
  [-4.8, 0, -4.2],
  [4.8, 0, -4.2],
  [-5.2, 0, -10.5],
  [5.2, 0, -10.5],
]

export function SacredCourtyardFloor3D() {
  const materials = useShrineMaterials()
  const seamMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const isMobile = useThree((state) => state.size.width < 768)

  const floorRoughnessMap = useMemo(() => {
    const basaltTex = getBasaltStoneTextures()
    const cloned = basaltTex.roughnessMap.clone()
    cloned.wrapS = THREE.RepeatWrapping
    cloned.wrapT = THREE.RepeatWrapping
    cloned.repeat.set(18, 18)
    cloned.needsUpdate = true
    return cloned
  }, [])

  const sandoZPositions = useMemo(() => {
    return Array.from({ length: SANDO_SLAB_COUNT }, (_, idx) => -18 + idx * 2.0)
  }, [])

  useFrame((state) => {
    if (seamMaterialRef.current) {
      const time = state.clock.getElapsedTime()
      seamMaterialRef.current.emissiveIntensity = 1.15 + Math.sin(time * 1.6) * 0.28
    }
  })

  return (
    <group position={[0, -2.15, 0]}>
      {/* Rain-Slicked Basalt Reflective Courtyard Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[70, 70]} />
        <MeshReflectorMaterial
          blur={isMobile ? [180, 60] : [280, 90]}
          resolution={isMobile ? 256 : 512}
          mixBlur={0.9}
          mixStrength={22}
          roughness={0.48}
          roughnessMap={floorRoughnessMap}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#090d15"
          metalness={0.55}
          mirror={0.55}
        />
      </mesh>

      {/* Central Raised Stone Sando Pathway (参道) */}
      <group>
        {sandoZPositions.map((zPos, idx) => (
          <mesh key={idx} position={[0, 0.02, zPos]} material={materials.chiselledBasalt}>
            <boxGeometry args={[3.2, 0.04, 1.75]} />
          </mesh>
        ))}

        {/* Left & Right Basalt Border Curbs */}
        <mesh position={[-1.75, 0.035, -5]} material={materials.chiselledBasalt}>
          <boxGeometry args={[0.16, 0.07, 28]} />
        </mesh>
        <mesh position={[1.75, 0.035, -5]} material={materials.chiselledBasalt}>
          <boxGeometry args={[0.16, 0.07, 28]} />
        </mesh>

        {/* Kinpaku Gold Trim Strips on Curbs */}
        <mesh position={[-1.75, 0.075, -5]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.04, 0.02, 28]} />
        </mesh>
        <mesh position={[1.75, 0.075, -5]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.04, 0.02, 28]} />
        </mesh>

        {/* Subtle Kitsunebi Spirit Seams Flanking the Sando */}
        <mesh position={[-1.63, 0.015, -5]}>
          <boxGeometry args={[0.028, 0.012, 28]} />
          <meshStandardMaterial
            ref={seamMaterialRef}
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={1.15}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[1.63, 0.015, -5]}>
          <boxGeometry args={[0.028, 0.012, 28]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1.1}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Flanking Perimeter Stone Lanterns (Ishi-doro) */}
      {LANTERN_POSITIONS.map((pos, idx) => (
        <IshiDoroLantern
          key={idx}
          position={pos}
          scale={0.82}
          flameColor={idx % 2 === 0 ? 'amber' : 'jade'}
          withPointLight={false}
        />
      ))}
    </group>
  )
}

