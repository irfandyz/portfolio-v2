import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../../utils/shrineTextures'
import {
  CurvedTempleRoof,
  EmaPlaque3D,
  IshiDoroLantern,
} from '../primitives/ShrinePrimitives'

interface CapabilitiesCluster3DProps {
  activeChamber: number
}

interface ToroStationSpec {
  pos: [number, number, number]
  kanji: string
  subtitle: string
  flameColor: 'amber' | 'jade' | 'vermilion'
  accentHex: string
}

const TORO_STATIONS: ToroStationSpec[] = [
  { pos: [-4.4, -2.1, -0.5], kanji: '壱', subtitle: 'MOD-01', flameColor: 'amber', accentHex: '#fbbf24' },
  { pos: [-3.0, -2.1, -1.6], kanji: '弐', subtitle: 'MOD-02', flameColor: 'jade', accentHex: '#2dd4bf' },
  { pos: [-1.5, -2.1, -2.1], kanji: '参', subtitle: 'MOD-03', flameColor: 'vermilion', accentHex: '#fb7185' },
  { pos: [1.5, -2.1, -2.1], kanji: '肆', subtitle: 'MOD-04', flameColor: 'vermilion', accentHex: '#fb7185' },
  { pos: [3.0, -2.1, -1.6], kanji: '伍', subtitle: 'MOD-05', flameColor: 'jade', accentHex: '#2dd4bf' },
  { pos: [4.4, -2.1, -0.5], kanji: '陸', subtitle: 'MOD-06', flameColor: 'amber', accentHex: '#fbbf24' },
]

export function CapabilitiesCluster3D({ activeChamber }: CapabilitiesCluster3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const floorMandalaRef = useRef<THREE.Mesh>(null)
  const plaquesGroupRef = useRef<THREE.Group>(null)

  const floorMandalaMat = useMemo(() => {
    const tex = createMandalaSealTexture({
      primaryColor: '#fbbf24',
      secondaryColor: '#2dd4bf',
    })
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.44,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

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

    if (floorMandalaRef.current) {
      floorMandalaRef.current.rotation.z = time * 0.16
    }

    if (plaquesGroupRef.current) {
      plaquesGroupRef.current.children.forEach((child, idx) => {
        child.position.y = TORO_STATIONS[idx].pos[1] + 1.65 + Math.sin(time * 1.8 + idx * 0.9) * 0.06
      })
    }
  })

  const hexPillars = useMemo(() => {
    const radius = 1.48
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6
      return [Math.cos(angle) * radius, Math.sin(angle) * radius] as [number, number]
    })
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.001} visible={false}>
      {/* === 1. CENTRAL ROKKAKUDO HEXAGONAL SANCTUARY PAVILION === */}
      <group position={[0, 0, -2.6]}>
        {/* Stepped Hexagonal Basalt Base */}
        <mesh position={[0, -1.94, 0]} material={materials.chiselledBasalt}>
          <cylinderGeometry args={[2.1, 2.4, 0.36, 6]} />
        </mesh>
        {/* Hexagonal Dark Hinoki Veranda & Gold Trim */}
        <mesh position={[0, -1.72, 0]} material={materials.darkHinokiWood}>
          <cylinderGeometry args={[1.95, 2.0, 0.1, 6]} />
        </mesh>
        <mesh position={[0, -1.66, 0]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[1.97, 1.97, 0.025, 6]} />
        </mesh>

        {/* 6 Vermilion Pillars with Gold Collars */}
        {hexPillars.map(([px, pz], idx) => (
          <group key={idx} position={[px, -0.85, pz]}>
            <mesh material={materials.vermilionLacquer}>
              <cylinderGeometry args={[0.08, 0.09, 1.65, 14]} />
            </mesh>
            <mesh position={[0, -0.78, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.105, 0.11, 0.07, 12]} />
            </mesh>
          </group>
        ))}

        {/* Warm Glowing Hexagonal Washi Shoji Sanctuary Core */}
        <mesh position={[0, -0.88, 0]} material={materials.washiShoji}>
          <cylinderGeometry args={[1.22, 1.22, 1.55, 6]} />
        </mesh>

        {/* 6-Sided Curved Rokkaku-zukuri Temple Roof */}
        <CurvedTempleRoof
          sides={6}
          width={4.0}
          depth={4.0}
          height={0.92}
          soriCurvature={0.28}
          showFinial={true}
          showRafters={true}
          position={[0, -0.02, 0]}
        />

        <pointLight position={[0, -0.6, 0.8]} color="#f59e0b" intensity={2.2} distance={8} decay={2} />
      </group>

      {/* Sacred Floor Mandala Beneath Rokkakudo */}
      <mesh
        ref={floorMandalaRef}
        position={[0, -2.09, -2.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={floorMandalaMat}
      >
        <planeGeometry args={[4.8, 4.8]} />
      </mesh>

      {/* === 2. SIX SACRED ISHI-DORO STONE LANTERN SHRINES === */}
      {TORO_STATIONS.map((st, idx) => (
        <IshiDoroLantern
          key={idx}
          position={st.pos}
          scale={0.84}
          flameColor={st.flameColor}
          withPointLight={false}
        />
      ))}

      {/* Floating Kanji Ema Plaques Above Each Toro Lantern */}
      <group ref={plaquesGroupRef}>
        {TORO_STATIONS.map((st, idx) => (
          <EmaPlaque3D
            key={st.subtitle}
            position={[st.pos[0], st.pos[1] + 1.65, st.pos[2]]}
            scale={0.85}
            kanji={st.kanji}
            subtitle={st.subtitle}
            sealText="能"
            accentColor={st.accentHex}
            swayPhase={idx * 0.85}
          />
        ))}
      </group>
    </group>
  )
}
