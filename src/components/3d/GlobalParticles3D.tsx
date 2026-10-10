import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GlobalParticles3D() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 350

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const cyan = new THREE.Color('#00f0ff')
    const magenta = new THREE.Color('#ff0055')
    const violet = new THREE.Color('#a855f7')

    for (let i = 0; i < particleCount; i++) {
      // Wide distribution across the continuous world
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.2) * 14 - 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20

      const rand = Math.random()
      const color = rand < 0.5 ? cyan : rand < 0.8 ? magenta : violet
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < particleCount; i++) {
      let y = posAttr.getY(i)
      y += delta * 0.35
      if (y > 9) y = -3.5
      posAttr.setY(i, y)

      // Slight horizontal drift
      let x = posAttr.getX(i)
      x += Math.sin(y * 0.5 + i) * 0.003
      posAttr.setX(i, x)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
