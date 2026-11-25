import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../../utils/shrineTextures'
import {
  CurvedTempleRoof,
  EmaPlaque3D,
  IshiDoroLantern,
  ShimenawaRope,
} from '../primitives/ShrinePrimitives'

interface DataCitadel3DProps {
  activeChamber: number
}

const EMA_ITEMS = [
  { kanji: '架構', subtitle: 'SYSTEM', accent: '#fbbf24', seal: '構' },
  { kanji: '後端', subtitle: 'BACKEND', accent: '#fb7185', seal: '端' },
  { kanji: '界面', subtitle: 'FRONTEND', accent: '#2dd4bf', seal: '界' },
  { kanji: '基盤', subtitle: 'DEVOPS', accent: '#fbbf24', seal: '基' },
  { kanji: '安全', subtitle: 'RBAC', accent: '#2dd4bf', seal: '護' },
  { kanji: '高速', subtitle: 'PERF', accent: '#fb7185', seal: '速' },
  { kanji: '設計', subtitle: 'CLEAN', accent: '#fbbf24', seal: '匠' },
  { kanji: '論理', subtitle: 'LOGIC', accent: '#2dd4bf', seal: '理' },
  { kanji: '神域', subtitle: 'SHRINE', accent: '#fb7185', seal: '神' },
]

const EMA_COORDS: [number, number][] = [
  [-0.68, 0.45],
  [0, 0.45],
  [0.68, 0.45],
  [-0.68, -0.25],
  [0, -0.25],
  [0.68, -0.25],
  [-0.68, -0.95],
  [0, -0.95],
  [0.68, -0.95],
]

export function DataCitadel3D({ activeChamber }: DataCitadel3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const waterMandalaRef = useRef<THREE.Mesh>(null)

  const waterMandalaMat = useMemo(() => {
    const tex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
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
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 1
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.2

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    if (waterMandalaRef.current) {
      waterMandalaRef.current.rotation.z = state.clock.getElapsedTime() * 0.25
    }
  })

  const renderEmakakeRack = (
    rackPos: [number, number, number],
    rotY: number,
    phaseOffset: number
  ) => (
    <group position={rackPos} rotation={[0, rotY, 0]}>
      {/* Twin Basalt Plinth Bases & Vermilion Frame Pillars */}
      {[-1.15, 1.15].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0, 0]}>
          <mesh position={[0, -2.0, 0]} material={materials.chiselledBasalt}>
            <boxGeometry args={[0.36, 0.3, 0.36]} />
          </mesh>
          <mesh position={[0, -1.82, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.13, 0.14, 0.08, 12]} />
          </mesh>
          <mesh position={[0, -0.35, 0]} material={materials.vermilionLacquer}>
            <cylinderGeometry args={[0.09, 0.105, 3.3, 14]} />
          </mesh>
        </group>
      ))}

      {/* 3 Horizontal Dark Hinoki Hanging Crossbars */}
      {[0.65, -0.05, -0.75].map((barY, idx) => (
        <mesh key={idx} position={[0, barY, 0]} material={materials.darkHinokiWood}>
          <boxGeometry args={[2.45, 0.08, 0.08]} />
        </mesh>
      ))}

      {/* Top Protective Curved Roof */}
      <CurvedTempleRoof
        sides={4}
        width={2.9}
        depth={0.95}
        height={0.42}
        soriCurvature={0.18}
        showFinial={false}
        showRafters={true}
        position={[0, 1.25, 0]}
      />

      {/* 9 Hanging Ema Votive Plaques */}
      {EMA_ITEMS.map((item, idx) => {
        const [ex, ey] = EMA_COORDS[idx]
        return (
          <EmaPlaque3D
            key={item.kanji}
            position={[ex, ey, 0.04]}
            scale={0.82}
            kanji={item.kanji}
            subtitle={item.subtitle}
            sealText={item.seal}
            accentColor={item.accent}
            swayPhase={phaseOffset + idx * 0.65}
          />
        )
      })}
    </group>
  )

  return (
    <group ref={groupRef}>
      {/* Left & Right Roofed Emakake Wooden Votive Plaque Racks */}
      {renderEmakakeRack([-4.1, 0, -1.1], 0.28, 0)}
      {renderEmakakeRack([4.1, 0, -1.1], -0.28, 3.1)}

      {/* Central Background Chozuya (Sacred Water Purification Pavilion) */}
      <group position={[0, 0, -2.6]}>
        {/* Basalt Foundation Platform */}
        <mesh position={[0, -2.0, 0]} material={materials.chiselledBasalt}>
          <boxGeometry args={[3.0, 0.28, 2.0]} />
        </mesh>

        {/* 4 Corner Vermilion Pillars */}
        {[
          [-1.2, 0.75],
          [1.2, 0.75],
          [-1.2, -0.75],
          [1.2, -0.75],
        ].map(([px, pz], idx) => (
          <group key={idx} position={[px, -0.68, pz]}>
            <mesh material={materials.vermilionLacquer}>
              <cylinderGeometry args={[0.08, 0.095, 2.5, 14]} />
            </mesh>
            <mesh position={[0, -1.18, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.11, 0.115, 0.08, 14]} />
            </mesh>
          </group>
        ))}

        {/* Sacred Shimenawa & Curved Roof */}
        <ShimenawaRope
          span={2.2}
          sag={0.14}
          thickness={0.04}
          shideCount={3}
          position={[0, 0.22, 0.78]}
        />
        <CurvedTempleRoof
          sides={4}
          width={3.4}
          depth={2.4}
          height={0.58}
          soriCurvature={0.22}
          showFinial={true}
          showRafters={true}
          position={[0, 0.46, 0]}
        />

        {/* Carved Basalt Tsukubai Water Basin */}
        <mesh position={[0, -1.58, 0]} material={materials.chiselledBasalt}>
          <boxGeometry args={[1.35, 0.56, 0.9]} />
        </mesh>
        {/* Basin Rim */}
        <mesh position={[0, -1.29, 0]} material={materials.kinpakuGold}>
          <boxGeometry args={[1.28, 0.025, 0.84]} />
        </mesh>
        {/* Glowing Kitsunebi Spirit Water Surface */}
        <mesh
          position={[0, -1.275, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.spiritJadeEmissive}
        >
          <planeGeometry args={[1.15, 0.7]} />
        </mesh>
        {/* Rotating Water Mandala Ripple */}
        <mesh
          ref={waterMandalaRef}
          position={[0, -1.268, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={waterMandalaMat}
        >
          <planeGeometry args={[0.75, 0.75]} />
        </mesh>

        {/* Bamboo/Gold Kakehi Water Spout & Stream */}
        <mesh position={[0.48, -0.84, 0]} rotation={[0, 0, 0.22]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[0.04, 0.04, 0.52, 10]} />
        </mesh>
        <mesh position={[0.25, -1.04, 0]} material={materials.spiritJadeEmissive}>
          <cylinderGeometry args={[0.022, 0.028, 0.44, 8]} />
        </mesh>
      </group>

      {/* Flanking Jade Stone Lanterns */}
      <IshiDoroLantern
        position={[-2.2, -2.1, -1.6]}
        scale={0.78}
        flameColor="jade"
        withPointLight={true}
        lightIntensity={1.2}
        lightDistance={5}
      />
      <IshiDoroLantern
        position={[2.2, -2.1, -1.6]}
        scale={0.78}
        flameColor="jade"
        withPointLight={true}
        lightIntensity={1.2}
        lightDistance={5}
      />
    </group>
  )
}
