import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../../utils/shrineTextures'
import {
  CurvedTempleRoof,
  IshiDoroLantern,
  ShimenawaRope,
} from '../primitives/ShrinePrimitives'

interface UplinkBeacon3DProps {
  activeChamber: number
}

const PAGODA_TIERS = [0, 1, 2, 3, 4]
const KURIN_RINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function UplinkBeacon3D({ activeChamber }: UplinkBeacon3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const spireMandala1Ref = useRef<THREE.Mesh>(null)
  const spireMandala2Ref = useRef<THREE.Mesh>(null)
  const suzuBellRef = useRef<THREE.Group>(null)

  const { jadeMandalaMat, goldMandalaMat } = useMemo(() => {
    const jadeTex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
      secondaryColor: '#fbbf24',
    })
    const goldTex = createMandalaSealTexture({
      primaryColor: '#fbbf24',
      secondaryColor: '#e11d48',
    })

    return {
      jadeMandalaMat: new THREE.MeshBasicMaterial({
        map: jadeTex,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      goldMandalaMat: new THREE.MeshBasicMaterial({
        map: goldTex,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 6
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -4.0

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    if (spireMandala1Ref.current) {
      spireMandala1Ref.current.rotation.z = time * 0.32
    }
    if (spireMandala2Ref.current) {
      spireMandala2Ref.current.rotation.z = -time * 0.4
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.22 + Math.sin(time * 2.8) * 0.06
    }
    if (suzuBellRef.current) {
      suzuBellRef.current.rotation.z = Math.sin(time * 1.4) * 0.045
      suzuBellRef.current.rotation.x = Math.cos(time * 1.1) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.001} visible={false}>
      {/* === 1. GRAND GOJUNOTO FIVE-STORY PAGODA (五重塔) === */}
      <group position={[0, 0, -3.2]}>
        {/* Stepped Basalt Kidan Foundation & Veranda */}
        <mesh position={[0, -1.92, 0]} material={materials.chiselledBasalt}>
          <boxGeometry args={[3.6, 0.42, 3.6]} />
        </mesh>
        <mesh position={[0, -1.66, 0]} material={materials.darkHinokiWood}>
          <boxGeometry args={[3.2, 0.1, 3.2]} />
        </mesh>
        <mesh position={[0, -1.6, 0]} material={materials.vermilionLacquer}>
          <boxGeometry args={[3.28, 0.04, 3.28]} />
        </mesh>

        {/* 5 Stacked Curved-Roof Pagoda Tiers */}
        {PAGODA_TIERS.map((t) => {
          const tierY = -1.25 + t * 0.88
          const coreWidth = 2.05 - t * 0.2
          const roofWidth = 3.45 - t * 0.3
          const halfPost = coreWidth * 0.52

          return (
            <group key={t}>
              {/* Story Core (Warm Washi Shoji Interior) */}
              <mesh position={[0, tierY, 0]} material={materials.washiShoji}>
                <boxGeometry args={[coreWidth, 0.56, coreWidth]} />
              </mesh>
              {/* 4 Corner Vermilion Posts */}
              {[
                [-halfPost, -halfPost],
                [halfPost, -halfPost],
                [-halfPost, halfPost],
                [halfPost, halfPost],
              ].map(([px, pz], pIdx) => (
                <mesh key={pIdx} position={[px, tierY, pz]} material={materials.vermilionLacquer}>
                  <cylinderGeometry args={[0.055, 0.06, 0.58, 10]} />
                </mesh>
              ))}
              {/* Bracket Beam */}
              <mesh position={[0, tierY + 0.24, 0]} material={materials.vermilionLacquer}>
                <boxGeometry args={[coreWidth + 0.14, 0.08, coreWidth + 0.14]} />
              </mesh>
              {/* Tier Curved Roof */}
              <CurvedTempleRoof
                sides={4}
                width={roofWidth}
                depth={roofWidth}
                height={0.44}
                soriCurvature={0.22}
                showFinial={false}
                showRafters={true}
                position={[0, tierY + 0.24, 0]}
              />
            </group>
          )
        })}

        {/* === GOLDEN SORIN (相輪 — NINE-RINGED PAGODA SPIRE) === */}
        <group position={[0, 3.18, 0]}>
          {/* Bronze Roban Base */}
          <mesh material={materials.darkHinokiWood}>
            <boxGeometry args={[0.46, 0.12, 0.46]} />
          </mesh>
          {/* Golden Fukubachi Hemisphere */}
          <mesh position={[0, 0.06, 0]} material={materials.kinpakuGold}>
            <sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          {/* Tall Golden Spire Mast */}
          <mesh position={[0, 0.95, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.045, 0.075, 1.85, 12]} />
          </mesh>
          {/* Nine Sacred Rings (Kurin) */}
          {KURIN_RINGS.map((ringIdx) => (
            <mesh
              key={ringIdx}
              position={[0, 0.34 + ringIdx * 0.13, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              material={materials.kinpakuGold}
            >
              <torusGeometry args={[0.14 - ringIdx * 0.006, 0.018, 8, 20]} />
            </mesh>
          ))}
          {/* Top Hoju Flame Jewel */}
          <mesh position={[0, 1.95, 0]} material={materials.lanternAmberEmissive}>
            <octahedronGeometry args={[0.11, 0]} />
          </mesh>

          {/* Orbiting Sacred Mandala Halos Around Spire */}
          <mesh ref={spireMandala1Ref} position={[0, 1.15, 0]} material={jadeMandalaMat}>
            <planeGeometry args={[2.3, 2.3]} />
          </mesh>
          <mesh
            ref={spireMandala2Ref}
            position={[0, 0.65, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={goldMandalaMat}
          >
            <planeGeometry args={[2.6, 2.6]} />
          </mesh>

          {/* Celestial Spirit Beacon Beam Rising Into Night Sky */}
          <mesh ref={beamRef} position={[0, 4.2, 0]}>
            <cylinderGeometry args={[0.22, 0.55, 8.0, 24, 1, true]} />
            <meshBasicMaterial
              color="#2dd4bf"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        <pointLight position={[0, 1.4, 1.4]} color="#f59e0b" intensity={2.4} distance={12} decay={2} />
        <pointLight position={[0, 4.0, 0]} color="#2dd4bf" intensity={2.2} distance={10} decay={2} />
      </group>

      {/* === 2. FOREGROUND SUZU BELL ALTAR FRAME & STONE LANTERNS === */}
      <group>
        {[-3.9, 3.9].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.18, 0.4]}>
            <mesh position={[0, -2.18, 0]} material={materials.chiselledBasalt}>
              <cylinderGeometry args={[0.2, 0.25, 0.34, 8]} />
            </mesh>
            <mesh position={[0, -1.99, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.15, 0.16, 0.08, 12]} />
            </mesh>
            <mesh position={[0, 0, 0]} material={materials.vermilionLacquer}>
              <cylinderGeometry args={[0.11, 0.13, 4.4, 14]} />
            </mesh>
            <mesh position={[0, 2.22, 0]} material={materials.kinpakuGold}>
              <sphereGeometry args={[0.14, 12, 12]} />
            </mesh>
          </group>
        ))}

        {/* Upper Altar Crossbeam */}
        <mesh position={[0, 2.36, 0.4]} material={materials.vermilionLacquer}>
          <boxGeometry args={[8.1, 0.14, 0.18]} />
        </mesh>

        {/* Sacred Shimenawa Rope */}
        <ShimenawaRope
          span={7.4}
          sag={0.3}
          thickness={0.065}
          shideCount={5}
          position={[0, 2.25, 0.46]}
        />

        {/* Central Hanging Golden Suzu Bell & Pull Rope */}
        <group ref={suzuBellRef} position={[0, 2.05, 0.45]}>
          <mesh material={materials.kinpakuGold}>
            <sphereGeometry args={[0.16, 16, 16]} />
          </mesh>
          <mesh position={[0, -0.1, 0]} material={materials.lanternAmberEmissive}>
            <cylinderGeometry args={[0.06, 0.1, 0.06, 12]} />
          </mesh>
          <mesh position={[0, -0.78, 0]} material={materials.vermilionLacquer}>
            <cylinderGeometry args={[0.032, 0.04, 1.4, 10]} />
          </mesh>
        </group>

        {/* Flanking Approach Stone Lanterns */}
        <IshiDoroLantern
          position={[-2.8, -2.1, -1.4]}
          scale={0.85}
          flameColor="amber"
          withPointLight={true}
          lightIntensity={1.5}
          lightDistance={5}
        />
        <IshiDoroLantern
          position={[2.8, -2.1, -1.4]}
          scale={0.85}
          flameColor="amber"
          withPointLight={true}
          lightIntensity={1.5}
          lightDistance={5}
        />
      </group>
    </group>
  )
}
