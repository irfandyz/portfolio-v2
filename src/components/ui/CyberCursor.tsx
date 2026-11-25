import { useState, useEffect } from 'react'

export function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer')
        )
        setIsPointer(isClickable)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Sacred Tomoe Reticle */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 flex items-center justify-center ${
            isPointer
              ? 'w-10 h-10 border-rose-500/85 shadow-[0_0_15px_rgba(225,29,72,0.6)] rotate-45'
              : 'w-7 h-7 border-amber-400/70 shadow-[0_0_10px_rgba(251,191,36,0.35)]'
          }`}
        >
          {/* Gold Cardinal Notches */}
          <div className="absolute top-0 w-0.5 h-1 bg-amber-300" />
          <div className="absolute bottom-0 w-0.5 h-1 bg-amber-300" />
          <div className="absolute left-0 w-1 h-0.5 bg-amber-300" />
          <div className="absolute right-0 w-1 h-0.5 bg-amber-300" />
        </div>
      </div>

      {/* Kitsunebi Jade Center Micro Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.9)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
        }}
      />
    </>
  )
}
