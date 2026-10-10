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

  // Set scrollRestoration to manual so reloads start at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

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

  // Mobile Touch Swipe Navigation with Inner Scroll Protection
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0
    let scrollableAncestor: HTMLElement | null = null
    let startScrollTop = 0

    // Find nearest scrollable ancestor between touch target and container
    const findScrollableAncestor = (target: HTMLElement | null): HTMLElement | null => {
      let current = target
      while (current && current !== containerRef.current) {
        if (
          current.classList.contains('cyber-scrollbar') ||
          current.classList.contains('overflow-y-auto') ||
          current.classList.contains('overflow-y-scroll')
        ) {
          if (current.scrollHeight > current.clientHeight) {
            return current
          }
        }
        current = current.parentElement
      }
      return null
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX

      const target = e.target as HTMLElement
      scrollableAncestor = findScrollableAncestor(target)
      if (scrollableAncestor) {
        startScrollTop = scrollableAncestor.scrollTop
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY - touchEndY
      const deltaX = touchStartX - touchEndX

      // Must be predominantly vertical swipe (not horizontal/diagonal)
      if (Math.abs(deltaY) < Math.abs(deltaX) * 1.5) {
        return
      }

      // If user was touching an inner scrollable element (e.g. cards, bento list)
      if (scrollableAncestor) {
        const currentScrollTop = scrollableAncestor.scrollTop
        const maxScrollTop = scrollableAncestor.scrollHeight - scrollableAncestor.clientHeight

        // If swiping up (scrolling content downward):
        if (deltaY > 0) {
          const wasAtBottom = startScrollTop >= maxScrollTop - 15
          const isAtBottom = currentScrollTop >= maxScrollTop - 15
          // If not already at bottom, user is still reading content! Do NOT switch chamber!
          if (!wasAtBottom || !isAtBottom) {
            return
          }
        }
        // If swiping down (scrolling content upward):
        else if (deltaY < 0) {
          const wasAtTop = startScrollTop <= 15
          const isAtTop = currentScrollTop <= 15
          // If not already at top, user is still scrolling up content! Do NOT switch chamber!
          if (!wasAtTop || !isAtTop) {
            return
          }
        }

        // Inside inner container, require deliberate swipe distance (>= 85px)
        if (Math.abs(deltaY) < 85) {
          return
        }
      } else {
        // Outside inner scrollable container (e.g. background, header)
        if (Math.abs(deltaY) < 65) {
          return
        }
      }

      if (deltaY > 0) {
        nextChamber()
      } else {
        prevChamber()
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
