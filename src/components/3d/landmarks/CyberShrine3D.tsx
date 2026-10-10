import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberShrine3DProps {
  activeChamber: number
  isEntered: boolean
  isWarping?: boolean
}

export function CyberShrine3D({
  activeChamber,
  isEntered,
  isWarping = false,
}: CyberShrine3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerLightRef = useRef<THREE.PointLight>(null)
  const lanternsRef = useRef<THREE.Group>(null)
  const warpStartTimeRef = useRef<number | null>(null)

  // Track elapsed time since warp started
  useEffect(() => {
    if (isWarping && warpStartTimeRef.current === null) {
      warpStartTimeRef.current = performance.now()
    } else if (!isWarping && isEntered) {
      warpStartTimeRef.current = null
    }
  }, [isWarping, isEntered])

  // Floating ambient shrine embers
  const emberCount = 60
  const [emberPositions] = useMemo(() => {
    const pos = new Float32Array(emberCount * 3)
    for (let i = 0; i < emberCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5
      pos[i * 3 + 1] = Math.random() * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return [pos]
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    let targetScale = 1.0
    let targetZ = 0.0
    let targetY = -0.2
    let dampSpeed = 3.5

    if (activeChamber === 0) {
      if (isWarping) {
        const elapsed = warpStartTimeRef.current ? performance.now() - warpStartTimeRef.current : 0
        // STEP 1 DELAY: While walking through the Torii Gate (~1100ms), shrine waits deep in the distance
        if (elapsed < 1100) {
          targetZ = -22.0
          targetScale = 0.3
          targetY = -0.1
          dampSpeed = 2.0
        } else {
          // STEP 2 REVEAL: Torii gate has passed, shrine emerges slowly and majestically from the deep fog
          targetZ = 0.0
          targetScale = 1.0
          targetY = -0.2
          dampSpeed = 2.2 // Gentle, graceful approaching speed
        }
      } else if (isEntered) {
        // STEP 3: Sits majestic in front of camera in Hero section
        targetZ = 0.0
        targetScale = 1.0
        targetY = -0.2
        dampSpeed = 3.5
      } else {
        // Initial state before entering: Placed far in the deep distance behind fog!
        targetZ = -22.0
        targetScale = 0.3
        targetY = -0.1
        dampSpeed = 2.0
      }
    } else {
      // Chamber 1..6 navigation: flies forward past camera
      targetZ = 4.0
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

    // Subtle gentle floating breathing animation
    const time = state.clock.getElapsedTime()
    if (activeChamber === 0 && isEntered) {
      groupRef.current.position.y = targetY + Math.sin(time * 1.2) * 0.05
      // Mouse tilt parallax
      const targetRotY = state.pointer.x * 0.25
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
    }

    // Inner shrine pulsing light (Gentle, dim warm candle ember)
    if (innerLightRef.current) {
      innerLightRef.current.intensity = 0.45 + Math.sin(time * 2) * 0.08
    }

    // Lantern subtle sway
    if (lanternsRef.current) {
      lanternsRef.current.rotation.z = Math.sin(time * 1.5) * 0.05
    }
  })

  // Materials
  const darkWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#080c14',
        roughness: 0.35,
        metalness: 0.8,
      }),
    []
  )

  const stonePlinth = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a101d',
        roughness: 0.6,
        metalness: 0.4,
      }),
    []
  )

  const neonCyan = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 1.6,
        roughness: 0.1,
      }),
    []
  )

  const neonPink = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff007f',
        emissive: '#ff007f',
        emissiveIntensity: 1.4,
        roughness: 0.1,
      }),
    []
  )

  // Authentic Japanese Shoji Lattice Grid Texture (Dim, moody, dark paper with wooden Kumiko grid)
  const shojiTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (!ctx) return new THREE.Texture()

    // 1. Dark muted washi paper base (dim, not bright!)
    ctx.fillStyle = '#181413'
    ctx.fillRect(0, 0, 256, 256)

    // Grid proportions: 4 columns x 6 rows of shoji panes
    const cols = 4
    const rows = 6
    const cellW = 256 / cols
    const cellH = 256 / rows

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW
        const y = r * cellH
        // Subtle, very dim soft amber center gradient per pane
        const grad = ctx.createRadialGradient(
          x + cellW / 2, y + cellH / 2, 2,
          x + cellW / 2, y + cellH / 2, cellW / 1.4
        )
        grad.addColorStop(0, '#2e2019') // Soft dim ember tone
        grad.addColorStop(1, '#1a1412') // Deep dark edge
        ctx.fillStyle = grad
        ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4)
      }
    }

    // 2. Wooden Kumiko Grid Lines (Dark obsidian-wood frame lines)
    ctx.strokeStyle = '#080c14'
    ctx.lineWidth = 4

    // Vertical lattice dividers
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath()
      ctx.moveTo(c * cellW, 0)
      ctx.lineTo(c * cellW, 256)
      ctx.stroke()
    }
    // Horizontal lattice dividers
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath()
      ctx.moveTo(0, r * cellH)
      ctx.lineTo(256, r * cellH)
      ctx.stroke()
    }

    // Outer sturdy frame
    ctx.lineWidth = 8
    ctx.strokeRect(0, 0, 256, 256)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [])

  // Dim, Non-Blinding Shoji Material
  const shojiMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: shojiTexture,
        roughness: 0.85,
        metalness: 0.1,
        emissive: '#d97736',
        emissiveMap: shojiTexture,
        emissiveIntensity: 0.18, // Very dim, moody ambiance
      }),
    [shojiTexture]
  )

  return (
    <group ref={groupRef} position={[0, -0.1, -22.0]} scale={[0.3, 0.3, 0.3]}>
      {/* 1. Stone Foundation Plinth & Steps */}
      <mesh position={[0, -0.4, 0]} material={stonePlinth}>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
      </mesh>
      <mesh position={[0, -0.25, 0]} material={stonePlinth}>
        <boxGeometry args={[2.8, 0.15, 2.8]} />
      </mesh>
      {/* Front Steps */}
      <mesh position={[0, -0.45, 1.6]} material={stonePlinth}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
      </mesh>
      <mesh position={[0, -0.35, 1.4]} material={stonePlinth}>
        <boxGeometry args={[1.0, 0.1, 0.4]} />
      </mesh>

      {/* 2. Main Shrine Chamber (Honden / Haiden) */}
      {/* Wooden Pillars (4 Corner Columns) */}
      <mesh position={[-0.9, 0.5, -0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[0.9, 0.5, -0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[-0.9, 0.5, 0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>
      <mesh position={[0.9, 0.5, 0.9]} material={darkWood}>
        <cylinderGeometry args={[0.07, 0.08, 1.4, 16]} />
      </mesh>

      {/* Neon Base Column Trims */}
      <mesh position={[-0.9, -0.15, 0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[0.9, -0.15, 0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[-0.9, -0.15, -0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
      <mesh position={[0.9, -0.15, -0.9]} material={neonCyan}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>

      {/* Authentic Japanese Shoji Lattice Walls (Dim, Moody, Kumiko Grid) */}
      {/* Back Wall */}
      <mesh position={[0, 0.5, -0.85]} material={shojiMaterial}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-0.85, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} material={shojiMaterial}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[0.85, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]} material={shojiMaterial}>
        <planeGeometry args={[1.65, 1.2]} />
      </mesh>
      {/* Front Wall (Flanking Central Shrine Doorway) */}
      <mesh position={[-0.6, 0.5, 0.85]} material={shojiMaterial}>
        <planeGeometry args={[0.45, 1.2]} />
      </mesh>
      <mesh position={[0.6, 0.5, 0.85]} material={shojiMaterial}>
        <planeGeometry args={[0.45, 1.2]} />
      </mesh>

      {/* Inner Shrine Sanctuary Hearth Light (Dim, Warm, Atmospheric) */}
      <pointLight
        ref={innerLightRef}
        position={[0, 0.5, 0]}
        color="#cc6622"
        intensity={0.45}
        distance={3.0}
      />

      {/* Central Holographic Altar Gem */}
      <mesh position={[0, 0.35, 0]}>
        <octahedronGeometry args={[0.18]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>

      {/* 3. Pagoda Roof Architecture (Tier 1 & Tier 2 Curved Eaves) */}
      {/* Roof Support Beams (Kumimono Brackets) */}
      <mesh position={[0, 1.2, 0]} material={darkWood}>
        <boxGeometry args={[2.0, 0.1, 2.0]} />
      </mesh>
      <mesh position={[0, 1.25, 0]} material={neonPink}>
        <boxGeometry args={[2.08, 0.03, 2.08]} />
      </mesh>

      {/* Main Curved Pagoda Roof (Pyramidal Japanese Temple Eaves) */}
      <mesh position={[0, 1.5, 0]} material={darkWood}>
        <coneGeometry args={[1.9, 0.65, 4]} />
      </mesh>
      {/* Neon Cyan Roof Ridge Trims */}
      <mesh position={[0, 1.52, 0]} material={neonCyan}>
        <coneGeometry args={[1.94, 0.62, 4]} />
      </mesh>

      {/* Top Roof Finial (Hoju / Sacred Jewel Finial) */}
      <mesh position={[0, 1.95, 0]} material={neonCyan}>
        <cylinderGeometry args={[0.04, 0.08, 0.35, 12]} />
      </mesh>
      <mesh position={[0, 2.15, 0]} material={neonPink}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* 4. Hanging Cyber Lanterns (Left & Right) */}
      <group ref={lanternsRef}>
        {/* Left Lantern */}
        <group position={[-1.25, 0.8, 1.1]}>
          <mesh material={darkWood}>
            <cylinderGeometry args={[0.08, 0.06, 0.22, 6]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={neonCyan}>
            <boxGeometry args={[0.14, 0.16, 0.14]} />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.4} distance={2.5} />
        </group>

        {/* Right Lantern */}
        <group position={[1.25, 0.8, 1.1]}>
          <mesh material={darkWood}>
            <cylinderGeometry args={[0.08, 0.06, 0.22, 6]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={neonCyan}>
            <boxGeometry args={[0.14, 0.16, 0.14]} />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.4} distance={2.5} />
        </group>
      </group>

      {/* 5. Floating Sacred Cyber Embers around Shrine */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f0ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
