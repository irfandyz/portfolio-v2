import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../../utils/shrineTextures'
import { ShimenawaRope } from '../primitives/ShrinePrimitives'

interface HologramStation3DProps {
  activeChamber: number
}

export function HologramStation3D({ activeChamber }: HologramStation3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const outerMandalaRef = useRef<THREE.Mesh>(null)
  const innerMandalaRef = useRef<THREE.Mesh>(null)
  const floatingRing1Ref = useRef<THREE.Mesh>(null)
  const floatingRing2Ref = useRef<THREE.Mesh>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const lanternsRef = useRef<THREE.Group>(null)

  const { outerMandalaMat, innerMandalaMat } = useMemo(() => {
    const outerTex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
      secondaryColor: '#fbbf24',
    })
    const innerTex = createMandalaSealTexture({
      primaryColor: '#fb7185',
      secondaryColor: '#fbbf24',
    })

    return {
      outerMandalaMat: new THREE.MeshBasicMaterial({
        map: outerTex,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      innerMandalaMat: new THREE.MeshBasicMaterial({
        map: innerTex,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const isActive = activeChamber === 2
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    if (outerMandalaRef.current) outerMandalaRef.current.rotation.z = time * 0.28
    if (innerMandalaRef.current) innerMandalaRef.current.rotation.z = -time * 0.42
    if (floatingRing1Ref.current) {
      floatingRing1Ref.current.position.y = -0.75 + Math.sin(time * 1.6) * 0.08
      floatingRing1Ref.current.rotation.z = time * 0.35
    }
    if (floatingRing2Ref.current) {
      floatingRing2Ref.current.position.y = 0.25 + Math.cos(time * 1.4) * 0.08
      floatingRing2Ref.current.rotation.z = -time * 0.3
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.16 + Math.sin(time * 2.2) * 0.04
    }
    if (lanternsRef.current) {
      lanternsRef.current.children.forEach((child, idx) => {
        child.rotation.z = Math.sin(time * 1.5 + idx * 1.4) * 0.055
      })
    }
  })

  const stagePillars: [number, number, number][] = [
    [-3.8, -0.1, -1.4],
    [3.8, -0.1, -1.4],
    [-4.3, -0.1, 0.4],
    [4.3, -0.1, 0.4],
  ]

  return (
    <group ref={groupRef} position={[0, 0, -0.4]} scale={0.001} visible={false}>
      {/* === 1. OCTAGONAL KAGURA-DEN CEREMONIAL STAGE BASE === */}
      <group position={[0, -1.92, 0]}>
        <mesh material={materials.chiselledBasalt}>
          <cylinderGeometry args={[3.4, 3.75, 0.34, 8]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={materials.darkHinokiWood}>
          <cylinderGeometry args={[3.15, 3.22, 0.14, 8]} />
        </mesh>
        {/* Octagonal Gold Stage Trim */}
        <mesh position={[0, 0.29, 0]} rotation={[Math.PI / 2, 0, Math.PI / 8]} material={materials.kinpakuGold}>
          <torusGeometry args={[3.18, 0.032, 8, 8]} />
        </mesh>

        {/* Low Vermilion Koran Stage Railings (Left, Right, Back) */}
        {[
          { pos: [-2.85, 0.5, 0] as [number, number, number], rotY: Math.PI / 2, len: 2.3 },
          { pos: [2.85, 0.5, 0] as [number, number, number], rotY: Math.PI / 2, len: 2.3 },
          { pos: [0, 0.5, -2.85] as [number, number, number], rotY: 0, len: 2.5 },
        ].map((rail, idx) => (
          <group key={idx} position={rail.pos} rotation={[0, rail.rotY, 0]}>
            <mesh position={[0, 0.1, 0]} material={materials.vermilionLacquer}>
              <boxGeometry args={[rail.len, 0.05, 0.055]} />
            </mesh>
            <mesh position={[0, -0.05, 0]} material={materials.vermilionLacquer}>
              <boxGeometry args={[rail.len, 0.04, 0.045]} />
            </mesh>
            {[-rail.len * 0.48, 0, rail.len * 0.48].map((px, pIdx) => (
              <group key={pIdx} position={[px, 0, 0]}>
                <mesh material={materials.vermilionLacquer}>
                  <boxGeometry args={[0.065, 0.38, 0.065]} />
                </mesh>
                <mesh position={[0, 0.22, 0]} material={materials.kinpakuGold}>
                  <sphereGeometry args={[0.045, 10, 10]} />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* Outer Ceremonial Vermilion Stage Pillars */}
      {stagePillars.map(([px, py, pz], idx) => (
        <group key={idx} position={[px, py, pz]}>
          <mesh position={[0, -1.85, 0]} material={materials.chiselledBasalt}>
            <cylinderGeometry args={[0.2, 0.25, 0.34, 8]} />
          </mesh>
          <mesh position={[0, -1.66, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.15, 0.16, 0.07, 14]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={materials.vermilionLacquer}>
            <cylinderGeometry args={[0.115, 0.13, 3.6, 16]} />
          </mesh>
          <mesh position={[0, 1.82, 0]} material={materials.kinpakuGold}>
            <sphereGeometry args={[0.15, 14, 14]} />
          </mesh>
        </group>
      ))}

      {/* Back Upper Sacred Shimenawa & Chochin Paper Lanterns */}
      <mesh position={[0, 1.68, -1.4]} material={materials.vermilionLacquer}>
        <boxGeometry args={[7.8, 0.14, 0.16]} />
      </mesh>
      <ShimenawaRope
        span={7.2}
        sag={0.32}
        thickness={0.07}
        shideCount={5}
        position={[0, 1.55, -1.32]}
      />
      <group ref={lanternsRef}>
        {[-2.8, 2.8].map((lx, idx) => (
          <group key={idx} position={[lx, 1.25, -1.3]}>
            <mesh position={[0, 0.2, 0]} material={materials.darkHinokiWood}>
              <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
            </mesh>
            <mesh position={[0, 0.05, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.11, 0.09, 0.05, 12]} />
            </mesh>
            <mesh position={[0, -0.1, 0]} material={materials.lanternAmberEmissive}>
              <cylinderGeometry args={[0.12, 0.12, 0.24, 12]} />
            </mesh>
            <mesh position={[0, -0.24, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.09, 0.11, 0.05, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* === 2. CENTRAL YATA-NO-KAGAMI (八咫鏡) SACRED MIRROR PROJECTOR === */}
      <group position={[0, -1.61, 0]}>
        <mesh material={materials.kinpakuGold}>
          <cylinderGeometry args={[1.65, 1.85, 0.08, 8]} />
        </mesh>
        <mesh position={[0, 0.045, 0]} material={materials.darkHinokiWood}>
          <cylinderGeometry args={[1.56, 1.56, 0.02, 8]} />
        </mesh>

        {/* Counter-Rotating Sacred Mandala Mirror Discs */}
        <mesh
          ref={outerMandalaRef}
          position={[0, 0.06, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={outerMandalaMat}
        >
          <planeGeometry args={[3.2, 3.2]} />
        </mesh>
        <mesh
          ref={innerMandalaRef}
          position={[0, 0.075, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={innerMandalaMat}
        >
          <planeGeometry args={[2.2, 2.2]} />
        </mesh>
      </group>

      {/* Kami-oroshi Spirit Projection Beam & Floating Seal Rings */}
      <mesh ref={beamRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2.2, 1.35, 3.8, 32, 1, true]} />
        <meshBasicMaterial
          color="#2dd4bf"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={floatingRing1Ref} position={[0, -0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.018, 8, 48]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={floatingRing2Ref} position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.95, 0.014, 8, 48]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.6} />
      </mesh>

      {/* Balanced Warm-Gold & Spirit-Jade Stage Uplighting */}
      <pointLight position={[0, -0.8, 0]} color="#2dd4bf" intensity={2.2} distance={8} decay={2} />
      <pointLight position={[0, 0.5, -1.2]} color="#f59e0b" intensity={1.8} distance={7} decay={2} />
    </group>
  )
}
