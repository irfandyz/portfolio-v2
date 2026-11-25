import { useState, useRef, useEffect } from 'react'
import { PROJECTS_DATA, type ProjectItem } from '../../data/portfolioData'
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, FileText } from 'lucide-react'
import { ProjectBlueprintModal } from '../ui/ProjectBlueprintModal'

interface ShowcaseSectionProps {
  playClick: () => void
  playHoloBeam: () => void
  isActive?: boolean
}

const KANJI_INDICES = ['一', '二', '三', '四', '五', '六']

export function ShowcaseSection({ playClick, playHoloBeam, isActive = true }: ShowcaseSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)

  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const startXRef = useRef<number>(0)
  const scrollLeftRef = useRef<number>(0)
  const hasMovedRef = useRef<boolean>(false)

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.children[currentIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentIndex])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - (tabsContainerRef.current?.offsetLeft || 0)
    scrollLeftRef.current = tabsContainerRef.current?.scrollLeft || 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !tabsContainerRef.current) return
    const x = e.pageX - (tabsContainerRef.current.offsetLeft || 0)
    const walk = x - startXRef.current
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true
    }
    tabsContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    setTimeout(() => {
      hasMovedRef.current = false
    }, 60)
  }

  const activeProject: ProjectItem = PROJECTS_DATA[currentIndex]

  const handleSelectProject = (index: number) => {
    if (index === currentIndex || isTransitioning) return
    playHoloBeam()
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 280)
  }

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PROJECTS_DATA.length
    handleSelectProject(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length
    handleSelectProject(prevIdx)
  }

  return (
    <>
      <section
        id="showcase"
        className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-3 sm:px-6 md:px-12 py-3 sm:py-6 md:py-8"
      >
        <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-center">
          {/* Section Header */}
          <div
            className={`flex items-center justify-between mb-2 sm:mb-3 md:mb-5 shrink-0 transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[150ms]'
                : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div>
              <div className="text-[10px] sm:text-[11px] font-tech text-amber-300 tracking-widest flex items-center gap-1.5 sm:gap-2 mb-1">
                <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji font-bold text-[10px]">
                  参
                </span>
                <span>// SANCTUARY 03</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">KAGURA-DEN ARCHIVE</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-amber-50">
                Enterprise Systems <span className="font-kanji text-amber-300/85 text-base sm:text-xl font-normal">[神楽殿 // 投射鏡]</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#0c1018]/90 border border-amber-400/35 text-xs font-tech text-amber-200">
                MIRROR [{KANJI_INDICES[currentIndex] || currentIndex + 1} // {String(currentIndex + 1).padStart(2, '0')} OF {String(PROJECTS_DATA.length).padStart(2, '0')}]
              </span>
            </div>
          </div>

          {/* Central Kagura-den Mirror Stage Pod */}
          <div
            className={`relative shrine-glass kazari-corner rounded-2xl border-amber-400/30 p-3 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(251,191,36,0.12)] flex-1 max-h-[85dvh] sm:max-h-[80dvh] lg:max-h-[72dvh] flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[300ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            {/* Top Imperial Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 shrine-accent-bar" />

            {/* Scrollable Project Details */}
            <div className="flex-1 min-h-0 overflow-y-auto cyber-scrollbar pr-1 sm:pr-2 pb-2">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-start lg:items-center py-0.5 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                }`}
              >
                {/* Left Col: Yata-no-Kagami Mirror Screen */}
                <div className="lg:col-span-7 relative group">
                  <div className="relative rounded-xl overflow-hidden border border-amber-400/40 bg-black/60 shadow-[0_0_30px_rgba(45,212,191,0.14)] aspect-video max-h-[19dvh] sm:max-h-[26dvh] lg:max-h-[42dvh] w-full flex items-center justify-center">
                    <img
                      src={activeProject.imageMockup}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top opacity-92 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/60 via-transparent to-amber-500/5 pointer-events-none" />
                    <div className="absolute inset-0 cyber-scanline opacity-20 pointer-events-none" />

                    {/* Gold & Vermilion Kazari Corner Brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-rose-400" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-rose-400" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300" />
                  </div>
                </div>

                {/* Right Col: Specifications & Architecture */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-tech text-rose-300 mb-0.5 sm:mb-1">
                      <span>{activeProject.code}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-amber-200/80">{activeProject.client} ({activeProject.year})</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold font-display text-amber-50 mb-1.5 leading-snug">
                      {activeProject.title}
                    </h3>

                    <p className="text-[11px] sm:text-sm text-slate-300 font-light leading-relaxed mb-2 sm:mb-3">
                      {activeProject.summary}
                    </p>

                    <div className="space-y-1 mb-2.5 sm:mb-3.5">
                      <div className="text-[10px] sm:text-[11px] font-tech text-amber-300 uppercase tracking-wider font-semibold">
                        // KEY ARCHITECTURAL FEATURES:
                      </div>
                      {activeProject.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {activeProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-[#0c1018] border border-amber-400/20 text-[10px] font-tech text-amber-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => {
                          playClick()
                          setActiveModalProject(activeProject)
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-teal-950/60 hover:bg-teal-900/60 border border-teal-400/50 text-teal-200 font-bold text-xs font-tech flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(45,212,191,0.2)] transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-300" />
                        <span>VIEW BLUEPRINT</span>
                      </button>

                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="py-2 px-3.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-amber-50 font-bold text-xs font-tech flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(225,29,72,0.35)] transition-all"
                        >
                          <span>LIVE SYSTEM</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="p-2 rounded-lg bg-[#0c1018]/90 hover:bg-slate-800 border border-amber-400/25 hover:border-amber-400 text-amber-200 text-xs font-tech flex items-center transition-all"
                          title="View GitHub Archive"
                        >
                          <svg className="w-3.5 h-3.5 text-amber-300 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Wooden Ema Selector Dock with Japanese Numerals (一–六) */}
            <div className="shrink-0 pt-2 sm:pt-3 border-t border-amber-400/20 flex items-center justify-between gap-1.5 sm:gap-3 bg-[#07090f]/95">
              <button
                onClick={() => {
                  playClick()
                  handlePrev()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-[#0c1018] hover:bg-rose-950/60 border border-amber-400/25 hover:border-amber-400 text-slate-300 hover:text-amber-200 transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-tech"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="hidden sm:inline">PREV</span>
              </button>

              <div
                ref={tabsContainerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-1 cyber-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
                style={{
                  touchAction: 'pan-x',
                  overscrollBehaviorX: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {PROJECTS_DATA.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      if (hasMovedRef.current) return
                      playClick()
                      handleSelectProject(idx)
                    }}
                    className={`px-2 sm:px-3 py-1 rounded text-[9px] sm:text-[10px] font-tech tracking-wider border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      currentIndex === idx
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                        : 'bg-[#0c1018]/80 border-amber-400/15 text-slate-400 hover:text-amber-100 hover:border-amber-400/40'
                    }`}
                  >
                    <span className="font-kanji font-bold text-rose-300">
                      {KANJI_INDICES[idx] || idx + 1}
                    </span>
                    <span className="font-semibold">{proj.shortTitle || proj.title}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  playClick()
                  handleNext()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-[#0c1018] hover:bg-rose-950/60 border border-amber-400/25 hover:border-amber-400 text-slate-300 hover:text-amber-200 transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-tech"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProjectBlueprintModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playClick={playClick}
      />
    </>
  )
}
