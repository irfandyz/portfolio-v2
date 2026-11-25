import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShrineMaterials } from '../../../utils/shrineMaterials'
import { createKanjiPlaqueTexture } from '../../../utils/shrineTextures'

/* ============================================================================
 * 1. CurvedTempleRoof (Irimoya / Rokkaku Sori Upturned Japanese Roof)
 * ========================================================================== */

export interface CurvedTempleRoofProps {
  sides?: 4 | 6
  width?: number
  depth?: number
  height?: number
  soriCurvature?: number
  showFinial?: boolean
  showRafters?: boolean
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

function buildSquareSoriRoofGeometry(
  width: number,
  depth: number,
  height: number,
  soriCurvature: number
): THREE.BufferGeometry {
  const segs = 18
  const geom = new THREE.PlaneGeometry(width, depth, segs, segs)
  geom.rotateX(-Math.PI / 2)

  const pos = geom.attributes.position as THREE.BufferAttribute
  const halfW = width * 0.5
  const halfD = depth * 0.5
  const isWide = width > depth * 1.15
  const ridgeHalf = isWide ? (width - depth) * 0.38 : 0

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const nx = halfW > 0 ? x / halfW : 0
    const nz = halfD > 0 ? z / halfD : 0

    // Distance from central ridge (for wide Irimoya) or peak (for square roof)
    const effectiveX = isWide ? Math.max(0, Math.abs(x) - ridgeHalf) / Math.max(halfW - ridgeHalf, 0.001) : Math.abs(nx)
    const d = Math.min(1, Math.max(effectiveX, Math.abs(nz)))

    // Corner amplification produces authentic Japanese Sori upturned eaves
    const corner = Math.abs(nx * nz)
    const baseSlope = height * (1 - Math.pow(d, 0.78))
    const eaveCurl = soriCurvature * (Math.pow(d, 2.4) * 0.55 + Math.pow(corner, 0.9) * 0.7)

    pos.setY(i, baseSlope + eaveCurl)
  }

  geom.computeVertexNormals()
  return geom
}

function buildHexSoriRoofGeometry(
  radius: number,
  height: number,
  soriCurvature: number
): THREE.BufferGeometry {
  const sides = 6
  const rings = 10
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  // Build ring vertices from center (r=0) to outer eaves (r=rings)
  for (let r = 0; r <= rings; r++) {
    const t = r / rings
    const ringRadius = t * radius
    const baseSlope = height * (1 - Math.pow(t, 0.75))
    const eaveLift = soriCurvature * Math.pow(t, 2.5) * 0.9

    for (let s = 0; s <= sides; s++) {
      // Subdivide each side edge with midpoints along ring for smooth curve?
      // Using corner vertices per ring gives crisp 6-ribbed Rokkaku eaves
      const angle = (s / sides) * Math.PI * 2 + Math.PI / 6
      const px = Math.cos(angle) * ringRadius
      const pz = Math.sin(angle) * ringRadius
      positions.push(px, baseSlope + eaveLift, pz)
      uvs.push(s / sides, t)
    }
  }

  const stride = sides + 1
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < sides; s++) {
      const a = r * stride + s
      const b = (r + 1) * stride + s
      const c = (r + 1) * stride + (s + 1)
      const d = r * stride + (s + 1)
      indices.push(a, d, b)
      indices.push(b, d, c)
    }
  }

  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geom.setIndex(indices)
  geom.computeVertexNormals()
  return geom
}

export function CurvedTempleRoof({
  sides = 4,
  width = 3.2,
  depth = 3.2,
  height = 0.85,
  soriCurvature = 0.24,
  showFinial = true,
  showRafters = true,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CurvedTempleRoofProps) {
  const materials = useShrineMaterials()

  const roofGeom = useMemo(() => {
    if (sides === 6) {
      return buildHexSoriRoofGeometry(width * 0.5, height, soriCurvature)
    }
    return buildSquareSoriRoofGeometry(width, depth, height, soriCurvature)
  }, [sides, width, depth, height, soriCurvature])

  const doubleKawara = useMemo(() => {
    const mat = materials.kawaraTile.clone()
    mat.side = THREE.DoubleSide
    return mat
  }, [materials.kawaraTile])

  const hipRibs = useMemo(() => {
    if (sides === 6) {
      const rad = width * 0.5
      return Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6
        const pts: THREE.Vector3[] = []
        for (let step = 0; step <= 8; step++) {
          const t = step / 8
          const r = t * rad
          const y = height * (1 - Math.pow(t, 0.75)) + soriCurvature * Math.pow(t, 2.5) * 0.9 + 0.025
          pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r))
        }
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.028, 6, false)
      })
    }

    const halfW = width * 0.5
    const halfD = depth * 0.5
    const isWide = width > depth * 1.15
    const ridgeHalf = isWide ? (width - depth) * 0.38 : 0
    const corners: [number, number][] = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]
    return corners.map(([sx, sz]) => {
      const pts: THREE.Vector3[] = []
      for (let step = 0; step <= 8; step++) {
        const t = step / 8
        const x = sx * (ridgeHalf + t * (halfW - ridgeHalf))
        const z = sz * t * halfD
        const y =
          height * (1 - Math.pow(t, 0.78)) +
          soriCurvature * (Math.pow(t, 2.4) * 0.55 + Math.pow(t * t, 0.9) * 0.7) +
          0.028
        pts.push(new THREE.Vector3(x, y, z))
      }
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.032, 6, false)
    })
  }, [sides, width, depth, height, soriCurvature])

  const isWide = sides === 4 && width > depth * 1.15
  const ridgeLen = isWide ? (width - depth) * 0.76 : 0.32

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Curved Kawara Roof Surface */}
      <mesh geometry={roofGeom} material={doubleKawara} />

      {/* Under-roof Wooden Eave Trim */}
      {showRafters && (
        <group position={[0, -0.02, 0]}>
          {sides === 4 ? (
            <>
              <mesh material={materials.vermilionLacquer} position={[0, 0, 0]}>
                <boxGeometry args={[width * 0.74, 0.08, depth * 0.74]} />
              </mesh>
              <mesh material={materials.darkHinokiWood} position={[0, 0.05, 0]}>
                <boxGeometry args={[width * 0.84, 0.04, depth * 0.84]} />
              </mesh>
            </>
          ) : (
            <mesh material={materials.vermilionLacquer} position={[0, 0, 0]}>
              <cylinderGeometry args={[width * 0.36, width * 0.4, 0.08, 6]} />
            </mesh>
          )}
        </group>
      )}

      {/* Gold / Vermilion Curved Hip Ridge Ribs */}
      {hipRibs.map((ribGeom, idx) => (
        <mesh key={idx} geometry={ribGeom} material={materials.kinpakuGold} />
      ))}

      {/* Main Roof Peak Ridge (Mune) */}
      {sides === 4 && (
        <group position={[0, height + 0.04, 0]}>
          <mesh material={materials.darkHinokiWood}>
            <boxGeometry args={[ridgeLen + 0.16, 0.09, 0.11]} />
          </mesh>
          <mesh position={[0, 0.05, 0]} material={materials.kinpakuGold}>
            <boxGeometry args={[ridgeLen + 0.2, 0.03, 0.07]} />
          </mesh>
          {/* Left & Right Onigawara Gold End Caps */}
          <mesh position={[-(ridgeLen * 0.5 + 0.1), 0.04, 0]} material={materials.kinpakuGold}>
            <octahedronGeometry args={[0.075, 0]} />
          </mesh>
          <mesh position={[ridgeLen * 0.5 + 0.1, 0.04, 0]} material={materials.kinpakuGold}>
            <octahedronGeometry args={[0.075, 0]} />
          </mesh>
        </group>
      )}

      {/* Sacred Hoju Finial Jewel */}
      {showFinial && (
        <group position={[0, height + 0.12, 0]}>
          <mesh material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.09, 0.13, 0.08, 8]} />
          </mesh>
          <mesh position={[0, 0.11, 0]} material={materials.kinpakuGold}>
            <cylinderGeometry args={[0.03, 0.06, 0.18, 12]} />
          </mesh>
          <mesh position={[0, 0.24, 0]} material={materials.kinpakuGold}>
            <sphereGeometry args={[0.085, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.34, 0]} material={materials.lanternAmberEmissive}>
            <coneGeometry args={[0.05, 0.12, 12]} />
          </mesh>
        </group>
      )}
    </group>
  )
}

/* ============================================================================
 * 2. ShimenawaRope (Sacred Braided Rope with Swaying Zig-Zag Shide Talismans)
 * ========================================================================== */

export interface ShimenawaRopeProps {
  span?: number
  sag?: number
  thickness?: number
  shideCount?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function buildShideGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-0.035, 0)
  shape.lineTo(0.035, 0)
  shape.lineTo(0.055, -0.09)
  shape.lineTo(-0.015, -0.09)
  shape.lineTo(-0.06, -0.18)
  shape.lineTo(0.025, -0.18)
  shape.lineTo(0.05, -0.28)
  shape.lineTo(-0.02, -0.28)
  shape.lineTo(-0.045, -0.36)
  shape.lineTo(-0.08, -0.26)
  shape.lineTo(-0.01, -0.26)
  shape.lineTo(-0.055, -0.17)
  shape.lineTo(0.01, -0.17)
  shape.lineTo(-0.035, -0.08)
  shape.closePath()

  return new THREE.ShapeGeometry(shape)
}

export function ShimenawaRope({
  span = 3.6,
  sag = 0.28,
  thickness = 0.09,
  shideCount = 4,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ShimenawaRopeProps) {
  const materials = useShrineMaterials()
  const shidesGroupRef = useRef<THREE.Group>(null)

  const { ropeGeom, shideGeom, shidePositions } = useMemo(() => {
    const half = span * 0.5
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-half, 0.04, 0),
      new THREE.Vector3(-half * 0.5, -sag * 0.65, 0.02),
      new THREE.Vector3(0, -sag, 0.03),
      new THREE.Vector3(half * 0.5, -sag * 0.65, 0.02),
      new THREE.Vector3(half, 0.04, 0),
    ])

    const segs = 28
    const radialSegs = 8
    const tube = new THREE.TubeGeometry(curve, segs, thickness, radialSegs, false)

    // Taper rope ends realistically (thicker in middle, narrow at ties)
    const pos = tube.attributes.position as THREE.BufferAttribute
    const center = new THREE.Vector3()
    const v = new THREE.Vector3()
    for (let i = 0; i <= segs; i++) {
      const t = i / segs
      curve.getPointAt(t, center)
      const taper = 0.35 + Math.sin(t * Math.PI) * 0.85
      for (let j = 0; j <= radialSegs; j++) {
        const idx = i * (radialSegs + 1) + j
        v.fromBufferAttribute(pos, idx)
        v.sub(center).multiplyScalar(taper).add(center)
        pos.setXYZ(idx, v.x, v.y, v.z)
      }
    }
    tube.computeVertexNormals()

    const shidePositionsList: THREE.Vector3[] = []
    for (let s = 0; s < shideCount; s++) {
      const t = (s + 1) / (shideCount + 1)
      shidePositionsList.push(curve.getPointAt(t))
    }

    return {
      ropeGeom: tube,
      shideGeom: buildShideGeometry(),
      shidePositions: shidePositionsList,
    }
  }, [span, sag, thickness, shideCount])

  useFrame((state) => {
    if (!shidesGroupRef.current) return
    const time = state.clock.getElapsedTime()
    shidesGroupRef.current.children.forEach((child, idx) => {
      child.rotation.x = Math.sin(time * 1.4 + idx * 0.9) * 0.08
      child.rotation.z = Math.cos(time * 1.1 + idx * 1.3) * 0.06
    })
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={ropeGeom} material={materials.shimenawaStraw} />
      <group ref={shidesGroupRef}>
        {shidePositions.map((pt, idx) => (
          <mesh
            key={idx}
            geometry={shideGeom}
            material={materials.shidePaper}
            position={[pt.x, pt.y - 0.02, pt.z + 0.02]}
          />
        ))}
      </group>
    </group>
  )
}

/* ============================================================================
 * 3. CurvedToriiGate (Myojin Torii with Sori Kasagi, Kamebara & Gaku Plaque)
 * ========================================================================== */

export interface CurvedToriiGateProps {
  width?: number
  height?: number
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  kanjiText?: string
  subtitle?: string
  withShimenawa?: boolean
  accentColor?: 'gold' | 'jade' | 'amber'
  glowIntensity?: number
}

function buildCurvedBeamGeometry(
  length: number,
  height: number,
  depth: number,
  curveAmount: number,
  flareOut = 0.14
): THREE.BufferGeometry {
  const segX = 24
  const geom = new THREE.BoxGeometry(length, height, depth, segX, 2, 2)
  const pos = geom.attributes.position as THREE.BufferAttribute
  const half = length * 0.5

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const ratio = half > 0 ? Math.abs(x) / half : 0
    const signX = x >= 0 ? 1 : -1

    // Sori upward sweep + angled bevel tip flare at ends
    const soriY = Math.pow(ratio, 2.2) * curveAmount
    const tipFlare = y > 0 ? signX * Math.pow(ratio, 3) * flareOut : 0

    pos.setX(i, x + tipFlare)
    pos.setY(i, y + soriY)
  }

  geom.computeVertexNormals()
  return geom
}

export function CurvedToriiGate({
  width = 5.6,
  height = 4.6,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  kanjiText = '電脳神社',
  subtitle = '',
  withShimenawa = true,
  accentColor = 'gold',
  glowIntensity = 0.65,
}: CurvedToriiGateProps) {
  const materials = useShrineMaterials()

  const kasagiLen = width * 1.18
  const shimakiLen = width * 1.08
  const nukiLen = width * 0.98
  const pillarOffset = width * 0.36
  const pillarHeight = height * 0.88
  const topY = height * 0.88
  const nukiY = height * 0.72

  const { kasagiGeom, shimakiGeom, gakuTexture } = useMemo(() => {
    const accentHex =
      accentColor === 'jade' ? '#2dd4bf' : accentColor === 'amber' ? '#f59e0b' : '#fbbf24'
    return {
      kasagiGeom: buildCurvedBeamGeometry(kasagiLen, 0.22, 0.56, 0.34, 0.18),
      shimakiGeom: buildCurvedBeamGeometry(shimakiLen, 0.18, 0.44, 0.28, 0.1),
      gakuTexture: createKanjiPlaqueTexture({
        kanji: kanjiText,
        subtitle,
        textColor: accentHex,
        borderColor: '#e11d48',
        bgColor: '#0e131d',
      }),
    }
  }, [kasagiLen, shimakiLen, kanjiText, subtitle, accentColor])

  const gakuMaterial = useMemo(() => {
    const emissiveHex =
      accentColor === 'jade' ? '#2dd4bf' : accentColor === 'amber' ? '#f59e0b' : '#fbbf24'
    return new THREE.MeshStandardMaterial({
      map: gakuTexture,
      emissiveMap: gakuTexture,
      emissive: emissiveHex,
      emissiveIntensity: glowIntensity,
      roughness: 0.35,
      metalness: 0.2,
    })
  }, [gakuTexture, accentColor, glowIntensity])

  const pillarLean = 0.035

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left Pillar (Hashira) + Kamebara Basalt Base + Gold Ring */}
      <group position={[-pillarOffset, 0, 0]}>
        <mesh position={[0, 0.2, 0]} material={materials.chiselledBasalt}>
          <cylinderGeometry args={[0.28, 0.34, 0.45, 8]} />
        </mesh>
        <mesh position={[0, 0.44, 0]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[0.25, 0.27, 0.08, 16]} />
        </mesh>
        <mesh
          position={[0.06, pillarHeight * 0.5, 0]}
          rotation={[0, 0, -pillarLean]}
          material={materials.vermilionLacquer}
        >
          <cylinderGeometry args={[0.19, 0.23, pillarHeight, 20]} />
        </mesh>
      </group>

      {/* Right Pillar (Hashira) + Kamebara Basalt Base + Gold Ring */}
      <group position={[pillarOffset, 0, 0]}>
        <mesh position={[0, 0.2, 0]} material={materials.chiselledBasalt}>
          <cylinderGeometry args={[0.28, 0.34, 0.45, 8]} />
        </mesh>
        <mesh position={[0, 0.44, 0]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[0.25, 0.27, 0.08, 16]} />
        </mesh>
        <mesh
          position={[-0.06, pillarHeight * 0.5, 0]}
          rotation={[0, 0, pillarLean]}
          material={materials.vermilionLacquer}
        >
          <cylinderGeometry args={[0.19, 0.23, pillarHeight, 20]} />
        </mesh>
      </group>

      {/* Top Curved Roof Cap (Kasagi - Dark Charcoal/Hinoki) */}
      <mesh position={[0, topY + 0.14, 0]} geometry={kasagiGeom} material={materials.darkHinokiWood} />

      {/* Secondary Curved Vermilion Beam (Shimaki) */}
      <mesh position={[0, topY - 0.04, 0]} geometry={shimakiGeom} material={materials.vermilionLacquer} />

      {/* Gold End Caps (Kazari-kanagu) on Kasagi/Shimaki tips */}
      <mesh position={[-(kasagiLen * 0.5 + 0.05), topY + 0.43, 0]} rotation={[0, 0, 0.22]} material={materials.kinpakuGold}>
        <boxGeometry args={[0.1, 0.26, 0.58]} />
      </mesh>
      <mesh position={[kasagiLen * 0.5 + 0.05, topY + 0.43, 0]} rotation={[0, 0, -0.22]} material={materials.kinpakuGold}>
        <boxGeometry args={[0.1, 0.26, 0.58]} />
      </mesh>

      {/* Middle Tie Beam (Nuki) + Kusabi Wedges */}
      <group position={[0, nukiY, 0]}>
        <mesh material={materials.vermilionLacquer}>
          <boxGeometry args={[nukiLen, 0.2, 0.24]} />
        </mesh>
        {/* Left & Right Nuki Gold End Fittings */}
        <mesh position={[-(nukiLen * 0.5), 0, 0]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.08, 0.22, 0.26]} />
        </mesh>
        <mesh position={[nukiLen * 0.5, 0, 0]} material={materials.kinpakuGold}>
          <boxGeometry args={[0.08, 0.22, 0.26]} />
        </mesh>
        {/* Kusabi Locking Wedges at Pillar Intersections */}
        <mesh position={[-pillarOffset, 0.12, 0]} material={materials.darkHinokiWood}>
          <boxGeometry args={[0.56, 0.08, 0.28]} />
        </mesh>
        <mesh position={[pillarOffset, 0.12, 0]} material={materials.darkHinokiWood}>
          <boxGeometry args={[0.56, 0.08, 0.28]} />
        </mesh>
      </group>

      {/* Central Vertical Post (Gakuzuka) & Calligraphy Plaque (Gaku) */}
      <group position={[0, (topY + nukiY) * 0.5, 0]}>
        <mesh material={materials.vermilionLacquer}>
          <boxGeometry args={[0.22, topY - nukiY, 0.22]} />
        </mesh>
        {/* Framed Gaku Tablet */}
        <group position={[0, 0, 0.16]} rotation={[0.08, 0, 0]}>
          <mesh material={materials.kinpakuGold}>
            <boxGeometry args={[0.92, 0.58, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.036]} material={gakuMaterial}>
            <planeGeometry args={[0.84, 0.5]} />
          </mesh>
        </group>
      </group>

      {/* Sacred Shimenawa Rope hanging below Nuki */}
      {withShimenawa && (
        <ShimenawaRope
          span={width * 0.66}
          sag={0.16}
          thickness={0.07}
          shideCount={4}
          position={[0, nukiY - 0.12, 0.12]}
        />
      )}
    </group>
  )
}

/* ============================================================================
 * 4. IshiDoroLantern (6-Part Japanese Stone Lantern with Flickering Flame Core)
 * ========================================================================== */

export interface IshiDoroLanternProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  flameColor?: 'amber' | 'jade' | 'vermilion'
  withPointLight?: boolean
  lightIntensity?: number
  lightDistance?: number
}

export function IshiDoroLantern({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  flameColor = 'amber',
  withPointLight = false,
  lightIntensity = 1.6,
  lightDistance = 4.5,
}: IshiDoroLanternProps) {
  const materials = useShrineMaterials()
  const flameRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  const flameMat =
    flameColor === 'jade'
      ? materials.spiritJadeEmissive
      : flameColor === 'vermilion'
        ? materials.vermilionFlameEmissive
        : materials.lanternAmberEmissive

  const lightHex =
    flameColor === 'jade' ? '#2dd4bf' : flameColor === 'vermilion' ? '#e11d48' : '#f59e0b'

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const flicker = 0.92 + Math.sin(time * 4.2 + position[0] * 2.1 + position[2]) * 0.08
    if (flameRef.current) {
      flameRef.current.scale.setScalar(flicker)
    }
    if (lightRef.current) {
      lightRef.current.intensity = lightIntensity * flicker
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Kiso (Hexagonal Stone Base) */}
      <mesh position={[0, 0.08, 0]} material={materials.chiselledBasalt}>
        <cylinderGeometry args={[0.3, 0.38, 0.16, 6]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={materials.chiselledBasalt}>
        <cylinderGeometry args={[0.2, 0.28, 0.1, 6]} />
      </mesh>

      {/* 2. Sao (Cylindrical Carved Shaft) */}
      <mesh position={[0, 0.62, 0]} material={materials.chiselledBasalt}>
        <cylinderGeometry args={[0.11, 0.13, 0.76, 12]} />
      </mesh>
      <mesh position={[0, 0.62, 0]} material={materials.kinpakuGold}>
        <torusGeometry args={[0.13, 0.015, 8, 16]} />
      </mesh>

      {/* 3. Chudai (Middle Flared Platform) */}
      <mesh position={[0, 1.05, 0]} material={materials.chiselledBasalt}>
        <cylinderGeometry args={[0.28, 0.16, 0.14, 6]} />
      </mesh>

      {/* 4. Hibukuro (Firebox with 6 Stone Pillars & Glowing Core) */}
      <group position={[0, 1.28, 0]}>
        <mesh ref={flameRef} material={flameMat}>
          <octahedronGeometry args={[0.13, 0]} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx / 6) * Math.PI * 2
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 0.18, 0, Math.sin(angle) * 0.18]}
              material={materials.chiselledBasalt}
            >
              <boxGeometry args={[0.045, 0.34, 0.045]} />
            </mesh>
          )
        })}
        {withPointLight && (
          <pointLight
            ref={lightRef}
            color={lightHex}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={2}
          />
        )}
      </group>

      {/* 5. Kasa (6-Sided Curved Umbrella Roof) */}
      <CurvedTempleRoof
        sides={6}
        width={0.78}
        depth={0.78}
        height={0.28}
        soriCurvature={0.09}
        showFinial={true}
        showRafters={false}
        position={[0, 1.45, 0]}
        scale={0.72}
      />
    </group>
  )
}

/* ============================================================================
 * 5. EmaPlaque3D (Pentagonal Votive Wooden Plaque)
 * ========================================================================== */

export interface EmaPlaque3DProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  kanji?: string
  subtitle?: string
  sealText?: string
  accentColor?: string
  swayPhase?: number
}

function buildEmaShapeGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-0.22, -0.18)
  shape.lineTo(0.22, -0.18)
  shape.lineTo(0.24, 0.08)
  shape.lineTo(0, 0.22)
  shape.lineTo(-0.24, 0.08)
  shape.closePath()

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  })
}

export function EmaPlaque3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  kanji = '技',
  subtitle = '',
  sealText = '印',
  accentColor = '#fbbf24',
  swayPhase = 0,
}: EmaPlaque3DProps) {
  const materials = useShrineMaterials()
  const swayRef = useRef<THREE.Group>(null)

  const { boardGeom, faceMaterial } = useMemo(() => {
    const tex = createKanjiPlaqueTexture({
      kanji,
      subtitle,
      sealText,
      textColor: accentColor,
      borderColor: '#e11d48',
      bgColor: '#19130f',
    })
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: accentColor,
      emissiveIntensity: 0.35,
      roughness: 0.55,
    })
    return {
      boardGeom: buildEmaShapeGeometry(),
      faceMaterial: mat,
    }
  }, [kanji, subtitle, sealText, accentColor])

  useFrame((state) => {
    if (!swayRef.current) return
    const t = state.clock.getElapsedTime()
    swayRef.current.rotation.z = Math.sin(t * 1.3 + swayPhase) * 0.045
    swayRef.current.rotation.x = Math.cos(t * 0.9 + swayPhase) * 0.03
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={swayRef}>
        {/* Red Hanging Cord */}
        <mesh position={[0, 0.27, 0.015]} material={materials.vermilionLacquer}>
          <torusGeometry args={[0.045, 0.008, 6, 16]} />
        </mesh>
        {/* Pentagonal Wood Body */}
        <mesh geometry={boardGeom} material={materials.darkHinokiWood} />
        {/* Engraved Kanji Face */}
        <mesh position={[0, -0.02, 0.04]} material={faceMaterial}>
          <planeGeometry args={[0.38, 0.26]} />
        </mesh>
      </group>
    </group>
  )
}

/* ============================================================================
 * 6. KakemonoScroll3D (Vertical Hanging Sacred Scroll with Gold Rollers)
 * ========================================================================== */

export interface KakemonoScroll3DProps {
  width?: number
  height?: number
  kanji: string
  subtitle?: string
  sealText?: string
  accentColor?: 'gold' | 'jade' | 'vermilion'
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function KakemonoScroll3D({
  width = 1.25,
  height = 2.4,
  kanji,
  subtitle = '',
  sealText = '印',
  accentColor = 'gold',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: KakemonoScroll3DProps) {
  const materials = useShrineMaterials()
  const accentHex =
    accentColor === 'jade' ? '#2dd4bf' : accentColor === 'vermilion' ? '#fb7185' : '#fbbf24'

  const faceMaterial = useMemo(() => {
    const tex = createKanjiPlaqueTexture({
      kanji,
      subtitle,
      sealText,
      textColor: accentHex,
      borderColor: accentHex,
      bgColor: '#0e121c',
      vertical: true,
    })
    return new THREE.MeshStandardMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: accentHex,
      emissiveIntensity: 0.45,
      roughness: 0.65,
      metalness: 0.1,
    })
  }, [kanji, subtitle, sealText, accentHex])

  const glowEdgeMat =
    accentColor === 'jade'
      ? materials.spiritJadeEmissive
      : accentColor === 'vermilion'
        ? materials.vermilionFlameEmissive
        : materials.lanternAmberEmissive

  return (
    <group position={position} rotation={rotation}>
      {/* Brocade Backing Sheet */}
      <mesh material={materials.darkHinokiWood}>
        <boxGeometry args={[width, height, 0.035]} />
      </mesh>

      {/* Vertical Calligraphy Parchment */}
      <mesh position={[0, 0, 0.022]} material={faceMaterial}>
        <planeGeometry args={[width * 0.86, height * 0.88]} />
      </mesh>

      {/* Subtle Side Trim Lines */}
      <mesh position={[-width * 0.48, 0, 0.02]} material={glowEdgeMat}>
        <boxGeometry args={[0.015, height * 0.92, 0.01]} />
      </mesh>
      <mesh position={[width * 0.48, 0, 0.02]} material={glowEdgeMat}>
        <boxGeometry args={[0.015, height * 0.92, 0.01]} />
      </mesh>

      {/* Top Wooden Bar (Hasso) */}
      <mesh position={[0, height * 0.5 + 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.darkHinokiWood}>
        <cylinderGeometry args={[0.03, 0.03, width + 0.14, 12]} />
      </mesh>

      {/* Bottom Heavy Roller (Jiku) with Kinpaku Gold End-Caps */}
      <group position={[0, -height * 0.5 - 0.03, 0.01]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.darkHinokiWood}>
          <cylinderGeometry args={[0.05, 0.05, width + 0.16, 16]} />
        </mesh>
        <mesh position={[-(width * 0.5 + 0.1), 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[0.058, 0.058, 0.08, 16]} />
        </mesh>
        <mesh position={[width * 0.5 + 0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.kinpakuGold}>
          <cylinderGeometry args={[0.058, 0.058, 0.08, 16]} />
        </mesh>
      </group>
    </group>
  )
}

/* ============================================================================
 * 7. TaikoBashiBridge3D (Arched Red Drum Bridge with Gold Giboshi Post Tops)
 * ========================================================================== */

export interface TaikoBashiBridge3DProps {
  span?: number
  width?: number
  archHeight?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function TaikoBashiBridge3D({
  span = 4.6,
  width = 1.4,
  archHeight = 0.72,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TaikoBashiBridge3DProps) {
  const materials = useShrineMaterials()

  const { plankTransforms, railGeoms, postPoints } = useMemo(() => {
    const half = span * 0.5
    const getArchY = (x: number) => archHeight * (1 - (x / half) * (x / half))

    const planksCount = 18
    const planks: { x: number; y: number; rotZ: number }[] = []
    for (let i = 0; i < planksCount; i++) {
      const t = (i + 0.5) / planksCount
      const x = -half + t * span
      const y = getArchY(x)
      const slope = (-2 * archHeight * x) / (half * half)
      planks.push({ x, y, rotZ: Math.atan(slope) })
    }

    const railCurvePts: THREE.Vector3[] = []
    const stringerCurvePts: THREE.Vector3[] = []
    for (let s = 0; s <= 16; s++) {
      const x = -half + (s / 16) * span
      const y = getArchY(x)
      railCurvePts.push(new THREE.Vector3(x, y + 0.42, 0))
      stringerCurvePts.push(new THREE.Vector3(x, y - 0.04, 0))
    }

    const railTube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railCurvePts), 24, 0.032, 8, false)
    const stringerTube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(stringerCurvePts), 24, 0.055, 8, false)

    const posts: { x: number; y: number; hasGiboshi: boolean }[] = []
    const postCount = 5
    for (let p = 0; p < postCount; p++) {
      const x = -half + (p / (postCount - 1)) * span
      posts.push({ x, y: getArchY(x), hasGiboshi: p === 0 || p === postCount - 1 || p === 2 })
    }

    return {
      plankTransforms: planks,
      railGeoms: { railTube, stringerTube },
      postPoints: posts,
    }
  }, [span, archHeight])

  const sideZ = width * 0.48

  return (
    <group position={position} rotation={rotation}>
      {/* Arched Wooden Deck Planks */}
      {plankTransforms.map((p, idx) => (
        <mesh
          key={idx}
          position={[p.x, p.y, 0]}
          rotation={[0, 0, p.rotZ]}
          material={materials.darkHinokiWood}
        >
          <boxGeometry args={[span / 19, 0.06, width]} />
        </mesh>
      ))}

      {/* Left & Right Arched Side Beams, Handrails & Giboshi Posts */}
      {[-sideZ, sideZ].map((zPos, sideIdx) => (
        <group key={sideIdx} position={[0, 0, zPos]}>
          <mesh geometry={railGeoms.stringerTube} material={materials.vermilionLacquer} />
          <mesh geometry={railGeoms.railTube} material={materials.vermilionLacquer} />
          {postPoints.map((pt, pIdx) => (
            <group key={pIdx} position={[pt.x, pt.y + 0.22, 0]}>
              <mesh material={materials.vermilionLacquer}>
                <boxGeometry args={[0.07, 0.46, 0.07]} />
              </mesh>
              {pt.hasGiboshi && (
                <group position={[0, 0.27, 0]}>
                  <mesh material={materials.kinpakuGold}>
                    <cylinderGeometry args={[0.045, 0.052, 0.04, 12]} />
                  </mesh>
                  <mesh position={[0, 0.055, 0]} material={materials.kinpakuGold}>
                    <sphereGeometry args={[0.048, 12, 12]} />
                  </mesh>
                </group>
              )}
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}

