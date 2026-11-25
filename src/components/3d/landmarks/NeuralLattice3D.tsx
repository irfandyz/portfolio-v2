import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createMandalaSealTexture } from '../../../utils/shrineTextures'
import {
  CurvedTempleRoof,
  KakemonoScroll3D,
  TaikoBashiBridge3D,
} from '../primitives/ShrinePrimitives'

interface NeuralLattice3DProps {
  activeChamber: number
}

export function NeuralLattice3D({ activeChamber }: NeuralLattice3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const pondMandalaRef = useRef<THREE.Mesh>(null)
  const leftHaloRef = useRef<THREE.Mesh>(null)
  const rightHaloRef = useRef<THREE.Mesh>(null)
  const pulseGroupRef = useRef<THREE.Group>(null)

  const { pondMandalaMat, goldHaloMat, jadeHaloMat } = useMemo(() => {
    const pondTex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
      secondaryColor: '#fbbf24',
    })
    const goldTex = createMandalaSealTexture({
      primaryColor: '#fbbf24',
      secondaryColor: '#e11d48',
    })
    const jadeTex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
      secondaryColor: '#fbbf24',
    })

    return {
      pondMandalaMat: new THREE.MeshBasicMaterial({
        map: pondTex,
        transparent: true,
        opacity: 0.38,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      goldHaloMat: new THREE.MeshBasicMaterial({
        map: goldTex,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      jadeHaloMat: new THREE.MeshBasicMaterial({
        map: jadeTex,
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
    const isActive = activeChamber === 4
    const targetScale = isActive ? 1.0 : 0.001
    const targetY = isActive ? 0.0 : -3.5

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    if (pondMandalaRef.current) pondMandalaRef.current.rotation.z = time * 0.18
    if (leftHaloRef.current) leftHaloRef.current.rotation.z = time * 0.25
    if (rightHaloRef.current) rightHaloRef.current.rotation.z = -time * 0.25

    if (pulseGroupRef.current) {
      const px = Math.sin(time * 1.6) * 2.3
      const py = -1.1 + 0.74 * (1 - Math.pow(px / 2.3, 2))
      pulseGroupRef.current.position.set(px, py, -0.9)
      pulseGroupRef.current.rotation.y = time * 2.2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.001} visible={false}>
      {/* === 1. CENTRAL ARCHED TAIKO-BASHI BRIDGE & SPIRIT POND === */}
      <TaikoBashiBridge3D
        span={4.6}
        width={1.4}
        archHeight={0.74}
        position={[0, -2.06, -0.9]}
      />
      <mesh
        ref={pondMandalaRef}
        position={[0, -2.11, -0.9]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={pondMandalaMat}
      >
        <planeGeometry args={[4.4, 4.4]} />
      </mesh>

      {/* === 2A. LEFT KYOZOU SCROLL SHRINE: UNIVERSITAS CIC (D3 INFORMATICS) === */}
      <group position={[-3.65, 0, -1.1]} rotation={[0, 0.24, 0]}>
        <mesh position={[0, -1.92, 0]} material={materials.chiselledBasalt}>
          <boxGeometry args={[2.25, 0.36, 1.05]} />
        </mesh>
        {[-0.92, 0.92].map((px, idx) => (
          <group key={idx} position={[px, -0.32, 0]}>
            <mesh material={materials.vermilionLacquer}>
              <cylinderGeometry args={[0.085, 0.095, 3.3, 14]} />
            </mesh>
            <mesh position={[0, -1.56, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.11, 0.115, 0.08, 14]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.24, 0]} material={materials.vermilionLacquer}>
          <boxGeometry args={[2.0, 0.1, 0.14]} />
        </mesh>
        <CurvedTempleRoof
          sides={4}
          width={2.4}
          depth={1.1}
          height={0.44}
          soriCurvature={0.18}
          showFinial={true}
          showRafters={true}
          position={[0, 1.32, 0]}
        />
        <mesh ref={leftHaloRef} position={[0, -0.1, -0.12]} material={goldHaloMat}>
          <planeGeometry args={[2.1, 2.1]} />
        </mesh>
        <KakemonoScroll3D
          width={1.25}
          height={2.3}
          kanji="情報工学"
          subtitle="D3 INFORMATICS"
          sealText="学"
          accentColor="gold"
          position={[0, -0.1, 0.05]}
        />
        <pointLight position={[0, 0.2, 0.6]} color="#fbbf24" intensity={1.8} distance={5.5} decay={2} />
      </group>

      {/* === 2B. RIGHT KYOZOU SCROLL SHRINE: SMK AL-IRSYAD (RPL FOUNDATION) === */}
      <group position={[3.65, 0, -1.1]} rotation={[0, -0.24, 0]}>
        <mesh position={[0, -1.92, 0]} material={materials.chiselledBasalt}>
          <boxGeometry args={[2.25, 0.36, 1.05]} />
        </mesh>
        {[-0.92, 0.92].map((px, idx) => (
          <group key={idx} position={[px, -0.32, 0]}>
            <mesh material={materials.vermilionLacquer}>
              <cylinderGeometry args={[0.085, 0.095, 3.3, 14]} />
            </mesh>
            <mesh position={[0, -1.56, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.11, 0.115, 0.08, 14]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.24, 0]} material={materials.vermilionLacquer}>
          <boxGeometry args={[2.0, 0.1, 0.14]} />
        </mesh>
        <CurvedTempleRoof
          sides={4}
          width={2.4}
          depth={1.1}
          height={0.44}
          soriCurvature={0.18}
          showFinial={true}
          showRafters={true}
          position={[0, 1.32, 0]}
        />
        <mesh ref={rightHaloRef} position={[0, -0.1, -0.12]} material={jadeHaloMat}>
          <planeGeometry args={[2.1, 2.1]} />
        </mesh>
        <KakemonoScroll3D
          width={1.25}
          height={2.3}
          kanji="基礎算法"
          subtitle="SMK RPL CORE"
          sealText="技"
          accentColor="jade"
          position={[0, -0.1, 0.05]}
        />
        <pointLight position={[0, 0.2, 0.6]} color="#2dd4bf" intensity={1.8} distance={5.5} decay={2} />
      </group>

      {/* === 3. PARABOLIC WISDOM SPIRIT PULSE ABOVE TAIKO-BASHI === */}
      <group ref={pulseGroupRef} position={[0, -0.36, -0.9]}>
        <mesh material={materials.lanternAmberEmissive}>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.spiritJadeEmissive}>
          <torusGeometry args={[0.2, 0.016, 8, 24]} />
        </mesh>
        <pointLight color="#fbbf24" intensity={1.5} distance={4} decay={2} />
      </group>
    </group>
  )
}
