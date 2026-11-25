import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import {
  createKanjiPlaqueTexture,
  createMandalaSealTexture,
  createSoftParticleTexture,
} from '../../../utils/shrineTextures'
import {
  CurvedTempleRoof,
  IshiDoroLantern,
  ShimenawaRope,
} from '../primitives/ShrinePrimitives'

interface CyberShrine3DProps {
  activeChamber: number
  isEntered: boolean
  isWarping?: boolean
}

const SHRINE_EMBER_COUNT = 72

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function CyberShrine3D({
  activeChamber,
  isEntered,
  isWarping = false,
}: CyberShrine3DProps) {
  const materials = useShrineMaterials()
  const groupRef = useRef<THREE.Group>(null)
  const innerLightRef = useRef<THREE.PointLight>(null)
  const lanternsRef = useRef<THREE.Group>(null)
  const mandalaRef = useRef<THREE.Mesh>(null)
  const suzuRef = useRef<THREE.Group>(null)

  const { emberPositions, emberColors, emberTex, gakuMaterial, mandalaMaterial } = useMemo(() => {
    const rand = createSeededRandom(80217)
    const pos = new Float32Array(SHRINE_EMBER_COUNT * 3)
    const col = new Float32Array(SHRINE_EMBER_COUNT * 3)
    const gold = new THREE.Color('#fbbf24')
    const jade = new THREE.Color('#2dd4bf')

    for (let i = 0; i < SHRINE_EMBER_COUNT; i++) {
      pos[i * 3] = (rand() - 0.5) * 6.5
      pos[i * 3 + 1] = -1.8 + rand() * 4.2
      pos[i * 3 + 2] = (rand() - 0.5) * 5.2
      const chosen = rand() > 0.3 ? gold : jade
      col[i * 3] = chosen.r
      col[i * 3 + 1] = chosen.g
      col[i * 3 + 2] = chosen.b
    }

    const gakuTex = createKanjiPlaqueTexture({
      kanji: '拝殿',
      subtitle: '神域 // HAIDEN',
      textColor: '#fbbf24',
      borderColor: '#e11d48',
      bgColor: '#0e131d',
      sealText: '神',
    })

    const gakuMat = new THREE.MeshStandardMaterial({
      map: gakuTex,
      emissiveMap: gakuTex,
      emissive: '#fbbf24',
      emissiveIntensity: 0.72,
      roughness: 0.35,
      metalness: 0.2,
    })

    const mandalaTex = createMandalaSealTexture({
      primaryColor: '#2dd4bf',
      secondaryColor: '#fbbf24',
    })

    const mandalaMat = new THREE.MeshBasicMaterial({
      map: mandalaTex,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    return {
      emberPositions: pos,
      emberColors: col,
      emberTex: createSoftParticleTexture('ember'),
      gakuMaterial: gakuMat,
      mandalaMaterial: mandalaMat,
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    let targetScale = 1.0
    let targetZ = -2.8
    let targetY = -0.2
    let dampSpeed = 2.6

    if (activeChamber === 0) {
      if (isWarping) {
        // Immediate continuous glide from deep courtyard to sanctuary focal point
        targetZ = -2.8
        targetScale = 1.0
        targetY = -0.2
        dampSpeed = 1.85
      } else if (isEntered) {
        targetZ = -2.8
        targetScale = 1.0
        targetY = -0.2
        dampSpeed = 2.6
      } else {
        targetZ = -13.5
        targetScale = 0.85
        targetY = -0.2
        dampSpeed = 2.5
      }
    } else {
      // Chamber 1..6: recedes smoothly so user enters inner pavilions
      targetZ = 4.2
      targetScale = 0.001
      targetY = -1.5
      dampSpeed = 4.0
    }

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, dampSpeed, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, dampSpeed, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, dampSpeed, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, dampSpeed, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, dampSpeed, delta)

    groupRef.current.visible = groupRef.current.scale.x > 0.05

    const time = state.clock.getElapsedTime()

    if (activeChamber === 0 && isEntered) {
      const targetRotY = state.pointer.x * 0.14
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
    }

    if (innerLightRef.current) {
      innerLightRef.current.intensity = 0.55 + Math.sin(time * 2.4) * 0.1
    }

    if (lanternsRef.current) {
      lanternsRef.current.children.forEach((child, idx) => {
        child.rotation.z = Math.sin(time * 1.4 + idx * 1.3) * 0.055
      })
    }

    if (mandalaRef.current) {
      mandalaRef.current.rotation.z = time * 0.25
    }

    if (suzuRef.current) {
      suzuRef.current.rotation.z = Math.sin(time * 1.2) * 0.03
    }
  })

  const pillarCoords: [number, number][] = [
    [-1.75, 1.05],
    [1.75, 1.05],
    [-1.75, -1.05],
    [1.75, -1.05],
    [-0.65, 1.05],
    [0.65, 1.05],
  ]

  const steps = [
    { y: -1.48, z: 1.52, w: 1.44 },
    { y: -1.62, z: 1.68, w: 1.48 },
    { y: -1.76, z: 1.84, w: 1.52 },
    { y: -1.9, z: 2.0, w: 1.56 },
  ]

  return (
    <group ref={groupRef} position={[0, -0.2, -13.5]} scale={[0.85, 0.85, 0.85]}>
      {/* === 1. STEPPED BASALT KIDAN FOUNDATION & FRONT STAIRS === */}
      <mesh position={[0, -1.75, 0]} material={materials.chiselledBasalt}>
        <boxGeometry args={[4.8, 0.36, 3.6]} />
      </mesh>
      <mesh position={[0, -1.48, 0]} material={materials.chiselledBasalt}>
        <boxGeometry args={[4.2, 0.24, 3.0]} />
      </mesh>

      {/* Front Stone Staircase (Kizahashi) */}
      <group>
        {steps.map((st, idx) => (
          <mesh key={idx} position={[0, st.y, st.z]} material={materials.chiselledBasalt}>
            <boxGeometry args={[st.w, 0.14, 0.2]} />
          </mesh>
        ))}
        {/* Stepped Vermilion Stair Curbs */}
        {[-0.8, 0.8].map((xPos, idx) => (
          <mesh
            key={idx}
            position={[xPos, -1.66, 1.75]}
            rotation={[0.68, 0, 0]}
            material={materials.vermilionLacquer}
          >
            <boxGeometry args={[0.1, 0.14, 0.88]} />
          </mesh>
        ))}
      </group>

      {/* === 2. ENGAWA VERANDA, KORAN RAILINGS & SAISEN-BAKO OFFERING BOX === */}
      <mesh position={[0, -1.32, 0]} material={materials.darkHinokiWood}>
        <boxGeometry args={[4.35, 0.1, 3.15]} />
      </mesh>
      {/* Gold Veranda Edge Trim */}
      <mesh position={[0, -1.36, 0]} material={materials.kinpakuGold}>
        <boxGeometry args={[4.38, 0.025, 3.18]} />
      </mesh>

      {/* Front Left & Right Koran Railings (leaving central steps open) */}
      {[-1.4, 1.4].map((xCenter, sideIdx) => (
        <group key={sideIdx} position={[xCenter, -1.04, 1.48]}>
          <mesh position={[0, 0.12, 0]} material={materials.vermilionLacquer}>
            <boxGeometry args={[1.3, 0.055, 0.06]} />
          </mesh>
          <mesh position={[0, -0.04, 0]} material={materials.vermilionLacquer}>
            <boxGeometry args={[1.3, 0.04, 0.05]} />
          </mesh>
          {[-0.6, 0.6].map((px, pIdx) => (
            <group key={pIdx} position={[px, 0, 0]}>
              <mesh material={materials.vermilionLacquer}>
                <boxGeometry args={[0.07, 0.42, 0.07]} />
              </mesh>
              <mesh position={[0, 0.24, 0]} material={materials.kinpakuGold}>
                <sphereGeometry args={[0.048, 12, 12]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Side Koran Railings */}
      {[-2.08, 2.08].map((xSide, idx) => (
        <group key={idx} position={[xSide, -1.04, 0]}>
          <mesh position={[0, 0.12, 0]} material={materials.vermilionLacquer}>
            <boxGeometry args={[0.06, 0.055, 2.95]} />
          </mesh>
          <mesh position={[0, -0.04, 0]} material={materials.vermilionLacquer}>
            <boxGeometry args={[0.05, 0.04, 2.95]} />
          </mesh>
          {[-1.4, 0, 1.4].map((pz, pIdx) => (
            <mesh key={pIdx} position={[0, 0, pz]} material={materials.vermilionLacquer}>
              <boxGeometry args={[0.07, 0.42, 0.07]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Saisen-bako Offering Box */}
      <group position={[0, -1.14, 1.15]}>
        <mesh material={materials.darkHinokiWood}>
          <boxGeometry args={[0.85, 0.28, 0.46]} />
        </mesh>
        <mesh position={[0, 0.145, 0]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.88, 0.025, 0.48]} />
        </mesh>
      </group>

      {/* === 3. MAIN HALL PILLARS, WASHI SHOJI WALLS & INNER ALTAR === */}
      {pillarCoords.map(([px, pz], idx) => (
        <group key={idx} position={[px, -0.49, pz]}>
          <mesh material={materials.vermilionLacquer}>
            <cylinderGeometry args={[0.09, 0.1, 1.56, 16]} />
          </mesh>
          <mesh position={[0, -0.74, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.115, 0.12, 0.08, 16]} />
          </mesh>
          <mesh position={[0, 0.72, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.105, 0.105, 0.06, 16]} />
          </mesh>
        </group>
      ))}

      {/* Upper Horizontal Lintel Beams (Nageshi) */}
      <mesh position={[0, 0.24, 1.05]} material={materials.vermilionLacquer}>
        <boxGeometry args={[3.7, 0.14, 0.18]} />
      </mesh>
      <mesh position={[0, 0.24, -1.05]} material={materials.vermilionLacquer}>
        <boxGeometry args={[3.7, 0.14, 0.18]} />
      </mesh>

      {/* Washi Shoji Lattice Enclosure Walls */}
      <mesh position={[0, -0.5, -1.0]} material={materials.washiShoji}>
        <planeGeometry args={[3.4, 1.48]} />
      </mesh>
      <mesh position={[-1.72, -0.5, 0]} rotation={[0, Math.PI / 2, 0]} material={materials.washiShoji}>
        <planeGeometry args={[2.0, 1.48]} />
      </mesh>
      <mesh position={[1.72, -0.5, 0]} rotation={[0, -Math.PI / 2, 0]} material={materials.washiShoji}>
        <planeGeometry args={[2.0, 1.48]} />
      </mesh>
      {/* Front Flanking Shoji Screens (Center Doorway Open) */}
      <mesh position={[-1.2, -0.5, 1.02]} material={materials.washiShoji}>
        <planeGeometry args={[0.98, 1.48]} />
      </mesh>
      <mesh position={[1.2, -0.5, 1.02]} material={materials.washiShoji}>
        <planeGeometry args={[0.98, 1.48]} />
      </mesh>

      {/* Inner Sacred Altar Mandala Seal & Warm Hearth Light */}
      <mesh ref={mandalaRef} position={[0, -0.48, 0.05]} material={mandalaMaterial}>
        <planeGeometry args={[1.05, 1.05]} />
      </mesh>
      <mesh position={[0, -0.88, 0.05]} material={materials.chiselledBasalt}>
        <cylinderGeometry args={[0.35, 0.44, 0.22, 8]} />
      </mesh>
      <pointLight
        ref={innerLightRef}
        position={[0, -0.42, 0.25]}
        color="#f59e0b"
        intensity={0.55}
        distance={4.8}
        decay={2}
      />

      {/* === 4. SHIMENAWA ROPE, GAKU PLAQUE & GOLDEN SUZU BELL === */}
      <ShimenawaRope
        span={1.45}
        sag={0.14}
        thickness={0.045}
        shideCount={4}
        position={[0, 0.08, 1.15]}
      />
      <group position={[0, 0.27, 1.14]}>
        <mesh material={materials.kinpakuGold}>
          <boxGeometry args={[0.78, 0.44, 0.05]} />
        </mesh>
        <mesh position={[0, 0, 0.03]} material={gakuMaterial}>
          <planeGeometry args={[0.7, 0.36]} />
        </mesh>
      </group>
      <group ref={suzuRef} position={[0, -0.08, 1.12]}>
        <mesh material={materials.kinpakuGold}>
          <sphereGeometry args={[0.095, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.45, 0]} material={materials.vermilionLacquer}>
          <cylinderGeometry args={[0.022, 0.026, 0.85, 8]} />
        </mesh>
      </group>

      {/* === 5. TWO-TIER CURVED IRIMOYA ROOFS === */}
      <CurvedTempleRoof
        sides={4}
        width={5.1}
        depth={3.8}
        height={0.68}
        soriCurvature={0.25}
        showFinial={false}
        showRafters={true}
        position={[0, 0.25, 0]}
      />

      {/* Upper Story Core (Joso) */}
      <group position={[0, 0.74, 0]}>
        <mesh material={materials.darkHinokiWood}>
          <boxGeometry args={[2.75, 0.54, 2.05]} />
        </mesh>
        <mesh position={[0, 0, 1.035]} material={materials.washiShoji}>
          <planeGeometry args={[2.2, 0.38]} />
        </mesh>
        <mesh position={[0, 0, -1.035]} rotation={[0, Math.PI, 0]} material={materials.washiShoji}>
          <planeGeometry args={[2.2, 0.38]} />
        </mesh>
        <mesh position={[0, 0.25, 0]} material={materials.vermilionLacquer}>
          <boxGeometry args={[2.86, 0.08, 2.16]} />
        </mesh>
      </group>

      <CurvedTempleRoof
        sides={4}
        width={3.9}
        depth={3.0}
        height={0.82}
        soriCurvature={0.3}
        showFinial={true}
        showRafters={true}
        position={[0, 0.98, 0]}
      />

      {/* === 6. HANGING CHOCHIN PAPER LANTERNS & COURTYARD ISHI-DORO LANTERNS === */}
      <group ref={lanternsRef}>
        {[-1.55, 1.55].map((xPos, idx) => (
          <group key={idx} position={[xPos, -0.06, 1.25]}>
            <mesh position={[0, 0.14, 0]} material={materials.darkHinokiWood}>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
            </mesh>
            <mesh position={[0, 0.04, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.09, 0.07, 0.05, 12]} />
            </mesh>
            <mesh position={[0, -0.08, 0]} material={materials.lanternAmberEmissive}>
              <cylinderGeometry args={[0.095, 0.095, 0.2, 12]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={materials.kinpakuGold}>
              <cylinderGeometry args={[0.07, 0.09, 0.045, 12]} />
            </mesh>
            <pointLight position={[0, -0.08, 0]} color="#f59e0b" intensity={0.75} distance={3.2} decay={2} />
          </group>
        ))}
      </group>

      {/* Flanking Courtyard Stone Lanterns (Ishi-doro) */}
      <IshiDoroLantern
        position={[-2.35, -1.92, 1.85]}
        scale={0.78}
        flameColor="amber"
        withPointLight={false}
      />
      <IshiDoroLantern
        position={[2.35, -1.92, 1.85]}
        scale={0.78}
        flameColor="amber"
        withPointLight={false}
      />

      {/* Shrine Sacred Golden & Jade Embers */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[emberColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={emberTex}
          size={0.13}
          vertexColors
          transparent
          opacity={0.78}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
