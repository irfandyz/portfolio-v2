import { useMemo } from 'react'
import * as THREE from 'three'
import {
  getBasaltStoneTextures,
  getKawaraTileTextures,
  getKinpakuGoldTextures,
  getWashiShojiTextures,
  getWoodLacquerTextures,
} from './shrineTextures'

export interface ShrineMaterialSet {
  vermilionLacquer: THREE.MeshPhysicalMaterial
  darkHinokiWood: THREE.MeshPhysicalMaterial
  chiselledBasalt: THREE.MeshStandardMaterial
  kinpakuGold: THREE.MeshStandardMaterial
  kawaraTile: THREE.MeshPhysicalMaterial
  washiShoji: THREE.MeshStandardMaterial
  spiritJadeEmissive: THREE.MeshStandardMaterial
  lanternAmberEmissive: THREE.MeshStandardMaterial
  vermilionFlameEmissive: THREE.MeshStandardMaterial
  shimenawaStraw: THREE.MeshStandardMaterial
  shidePaper: THREE.MeshStandardMaterial
  obsidianArmor: THREE.MeshPhysicalMaterial
}

let cachedMaterials: ShrineMaterialSet | null = null

/**
 * Returns singleton memoized PBR materials for the Sacred Neo-Shinto 3D Sanctuary.
 * Reusing shared material instances keeps shader compilation and draw overhead low.
 */
export function getShrineMaterials(): ShrineMaterialSet {
  if (cachedMaterials) return cachedMaterials

  const vermilionTex = getWoodLacquerTextures('vermilion')
  const darkHinokiTex = getWoodLacquerTextures('dark-hinoki')
  const basaltTex = getBasaltStoneTextures()
  const kinpakuTex = getKinpakuGoldTextures()
  const kawaraTex = getKawaraTileTextures()
  const shojiTex = getWashiShojiTextures(4, 6)

  cachedMaterials = {
    vermilionLacquer: new THREE.MeshPhysicalMaterial({
      color: '#d91b42',
      map: vermilionTex.map,
      bumpMap: vermilionTex.bumpMap,
      bumpScale: 0.015,
      roughnessMap: vermilionTex.roughnessMap,
      clearcoat: 0.78,
      clearcoatRoughness: 0.18,
      roughness: 0.34,
      metalness: 0.08,
    }),

    darkHinokiWood: new THREE.MeshPhysicalMaterial({
      color: '#121620',
      map: darkHinokiTex.map,
      bumpMap: darkHinokiTex.bumpMap,
      bumpScale: 0.02,
      roughnessMap: darkHinokiTex.roughnessMap,
      clearcoat: 0.45,
      clearcoatRoughness: 0.35,
      roughness: 0.48,
      metalness: 0.12,
    }),

    chiselledBasalt: new THREE.MeshStandardMaterial({
      color: '#1a2130',
      map: basaltTex.map,
      bumpMap: basaltTex.bumpMap,
      bumpScale: 0.045,
      roughnessMap: basaltTex.roughnessMap,
      roughness: 0.72,
      metalness: 0.15,
    }),

    kinpakuGold: new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      map: kinpakuTex.map,
      bumpMap: kinpakuTex.bumpMap,
      bumpScale: 0.012,
      roughnessMap: kinpakuTex.roughnessMap,
      emissive: '#b45309',
      emissiveIntensity: 0.28,
      metalness: 0.92,
      roughness: 0.24,
    }),

    kawaraTile: new THREE.MeshPhysicalMaterial({
      color: '#0f141f',
      map: kawaraTex.map,
      bumpMap: kawaraTex.bumpMap,
      bumpScale: 0.045,
      roughnessMap: kawaraTex.roughnessMap,
      clearcoat: 0.38,
      clearcoatRoughness: 0.36,
      roughness: 0.42,
      metalness: 0.28,
    }),

    washiShoji: new THREE.MeshStandardMaterial({
      map: shojiTex.map,
      emissiveMap: shojiTex.emissiveMap,
      emissive: '#f59e0b',
      emissiveIntensity: 0.28,
      roughness: 0.82,
      metalness: 0.05,
    }),

    spiritJadeEmissive: new THREE.MeshStandardMaterial({
      color: '#2dd4bf',
      emissive: '#2dd4bf',
      emissiveIntensity: 2.0,
      roughness: 0.15,
    }),

    lanternAmberEmissive: new THREE.MeshStandardMaterial({
      color: '#fef08a',
      emissive: '#f59e0b',
      emissiveIntensity: 2.2,
      roughness: 0.15,
    }),

    vermilionFlameEmissive: new THREE.MeshStandardMaterial({
      color: '#fb7185',
      emissive: '#e11d48',
      emissiveIntensity: 2.0,
      roughness: 0.15,
    }),

    shimenawaStraw: new THREE.MeshStandardMaterial({
      color: '#c9b382',
      roughness: 0.85,
      metalness: 0.05,
    }),

    shidePaper: new THREE.MeshStandardMaterial({
      color: '#fffbeb',
      emissive: '#fde68a',
      emissiveIntensity: 0.35,
      roughness: 0.35,
      side: THREE.DoubleSide,
    }),

    obsidianArmor: new THREE.MeshPhysicalMaterial({
      color: '#090d16',
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      roughness: 0.25,
      metalness: 0.82,
    }),
  }

  return cachedMaterials
}

/** React hook wrapper returning memoized shared Shrine PBR materials */
export function useShrineMaterials(): ShrineMaterialSet {
  return useMemo(() => getShrineMaterials(), [])
}

