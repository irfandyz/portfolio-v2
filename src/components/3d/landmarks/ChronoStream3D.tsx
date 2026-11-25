import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { CurvedToriiGate, IshiDoroLantern } from '../primitives/ShrinePrimitives'

interface ChronoStream3DProps {
  activeChamber: number
}

interface CorridorGateSpec {
  z: number
  isMainEra: boolean
  kanji: string
  subtitle: string
  accent: 'gold' | 'jade' | 'amber'
  scale: number
}

const CORRIDOR_GATES: CorridorGateSpec[] = [
  { z: 1.0, isMainEra: true, kanji: '二〇一九', subtitle: 'ERA 01 // ORBIT', accent: 'gold', scale: 1.0 },
  { z: -0.8, isMainEra: false, kanji: '千本鳥居', subtitle: '', accent: 'amber', scale: 0.96 },
  { z: -2.6, isMainEra: true, kanji: '二〇二一', subtitle: 'ERA 02 // JAVA GENIUS', accent: 'jade', scale: 1.0 },
  { z: -4.4, isMainEra: false, kanji: '千本鳥居', subtitle: '', accent: 'amber', scale: 0.96 },
  { z: -6.2, isMainEra: true, kanji: '二〇二二', subtitle: 'ERA 03 // RITTERCODING', accent: 'gold', scale: 1.0 },
  { z: -8.0, isMainEra: false, kanji: '千本鳥居', subtitle: '', accent: 'amber', scale: 0.96 },
  { z: -9.8, isMainEra: true, kanji: '二〇二五', subtitle: 'ERA 04 // ARKADAYA', accent: 'jade', scale: 1.0 },
  { z: -11.6, isMainEra: false, kanji: '千本鳥居', subtitle: '', accent: 'amber', scale: 0.96 },
]

const LANTERN_Z = [0.1, -3.5, -7.1]
const ORB_LANES = [-1.55, 1.55, -1.55, 1.55, -1.55, 1.55]

export function ChronoStream3D({ activeChamber }: ChronoStream3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const orbsRef = useRef<THREE.Group>(null)

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

    const dt = Math.min(delta, 0.05)
    const time = state.clock.getElapsedTime()

    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, idx) => {
        orb.position.z += dt * 3.2
        if (orb.position.z > 2.5) {
          orb.position.z = -12.0 - idx * 0.4
        }
        orb.position.y = -1.65 + Math.sin(time * 2.5 + idx) * 0.16
        orb.rotation.y = time * 1.4
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.001} visible={false}>
      {/* === 1. SENBON TORII PERSPECTIVE TUNNEL (8 ARCHWAYS) === */}
      {CORRIDOR_GATES.map((gate, idx) => (
        <CurvedToriiGate
          key={idx}
          width={5.4}
          height={4.5}
          scale={gate.scale}
          position={[0, -2.1, gate.z]}
          kanjiText={gate.kanji}
          subtitle={gate.subtitle}
          withShimenawa={gate.isMainEra}
          accentColor={gate.accent}
          glowIntensity={gate.isMainEra ? 0.9 : 0.35}
        />
      ))}

      {/* === 2. FLANKING ISHI-DORO STONE LANTERN COLONNADE === */}
      {LANTERN_Z.map((zPos, idx) => (
        <group key={idx}>
          <IshiDoroLantern
            position={[-3.5, -2.1, zPos]}
            scale={0.78}
            flameColor={idx % 2 === 0 ? 'amber' : 'jade'}
            withPointLight={false}
          />
          <IshiDoroLantern
            position={[3.5, -2.1, zPos]}
            scale={0.78}
            flameColor={idx % 2 === 0 ? 'amber' : 'jade'}
            withPointLight={false}
          />
        </group>
      ))}

      {/* === 3. GOLDEN SPIRIT FLOOR THREADS & FLOWING KITSUNEBI ORBS === */}
      <mesh position={[-1.55, -2.08, -5.2]} material={materials.kinpakuGold}>
        <boxGeometry args={[0.045, 0.02, 15]} />
      </mesh>
      <mesh position={[1.55, -2.08, -5.2]} material={materials.vermilionFlameEmissive}>
        <boxGeometry args={[0.045, 0.02, 15]} />
      </mesh>

      <group ref={orbsRef}>
        {ORB_LANES.map((xPos, idx) => (
          <mesh
            key={idx}
            position={[xPos, -1.65, -idx * 2.4]}
            material={idx % 2 === 0 ? materials.lanternAmberEmissive : materials.spiritJadeEmissive}
          >
            <octahedronGeometry args={[0.1, 0]} />
          </mesh>
        ))}
      </group>

      {/* Warm Corridor Atmospheric Lighting */}
      <pointLight position={[0, 1.4, -2.5]} color="#f59e0b" intensity={2.2} distance={12} decay={2} />
      <pointLight position={[0, 1.4, -8.5]} color="#2dd4bf" intensity={1.8} distance={12} decay={2} />
    </group>
  )
}
