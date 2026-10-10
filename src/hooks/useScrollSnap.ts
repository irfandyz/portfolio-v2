import { useState, useEffect, useCallback, useRef } from 'react'

export interface ChamberInfo {
  id: string
  code: string
  label: string
  kanji: string
}

export const CHAMBERS: ChamberInfo[] = [
  { id: 'hero', code: '01', label: 'HERO // GATEWAY', kanji: '電脳門' },
  { id: 'dossier', code: '02', label: 'OPERATOR DOSSIER', kanji: '操縦者' },
  { id: 'showcase', code: '03', label: 'PROJECT HOLOGRAM', kanji: '投射体' },
  { id: 'career', code: '04', label: 'CAREER CHRONO', kanji: '経歴録' },
  { id: 'academic', code: '05', label: 'ACADEMIC MATRIX', kanji: '学歴録' },
  { id: 'services', code: '06', label: 'CAPABILITIES', kanji: '機能群' },
  { id: 'contact', code: '07', label: 'DIRECT UPLINK', kanji: '通信路' }
]

export function useScrollSnap() {
  const [activeChamber, setActiveChamber] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isScrollingRef = useRef<boolean>(false)

  const scrollToChamber = useCallback((index: number) => {
    if (index < 0 || index >= CHAMBERS.length) return
    const container = containerRef.current
    if (!container) return

    const targetEl = container.children[index] as HTMLElement
    if (targetEl) {
      isScrollingRef.current = true
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveChamber(index)
      setTimeout(() => {
        isScrollingRef.current = false
      }, 700)
    }
  }, [])

  const nextChamber = useCallback(() => {
    if (activeChamber < CHAMBERS.length - 1) {
      scrollToChamber(activeChamber + 1)
    }
  }, [activeChamber, scrollToChamber])

  const prevChamber = useCallback(() => {
    if (activeChamber > 0) {
      scrollToChamber(activeChamber - 1)
    }
  }, [activeChamber, scrollToChamber])

  // Observer to track visible section during manual wheel / touch scrolling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(container.children).indexOf(entry.target)
            if (index !== -1) {
              setActiveChamber(index)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.55
      }
    )

    Array.from(container.children).forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form fields
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        nextChamber()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        prevChamber()
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToChamber(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToChamber(CHAMBERS.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextChamber, prevChamber, scrollToChamber])

  // Mobile Touch Swipe Navigation
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY
      const deltaY = touchStartY - touchEndY
      // Swipe threshold: 50px
      if (Math.abs(deltaY) > 50 && !isScrollingRef.current) {
        if (deltaY > 0) {
          nextChamber()
        } else {
          prevChamber()
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [nextChamber, prevChamber])

  return {
    activeChamber,
    containerRef,
    scrollToChamber,
    nextChamber,
    prevChamber,
    chambers: CHAMBERS
  }
}
