import { useState } from 'react'
import { PROJECTS_DATA, type ProjectItem } from '../../data/portfolioData'
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, FileText } from 'lucide-react'
import { ProjectBlueprintModal } from '../ui/ProjectBlueprintModal'

interface ShowcaseSectionProps {
  playClick: () => void
  playHoloBeam: () => void
  isActive?: boolean
}

export function ShowcaseSection({ playClick, playHoloBeam, isActive = true }: ShowcaseSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)

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
            className={`flex items-center justify-between mb-2 sm:mb-3 md:mb-5 shrink-0 transition-all duration-700 ease-out ${isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[150ms]'
              : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
              }`}
          >
            <div>
              <div className="text-[10px] sm:text-[11px] font-tech text-cyan-400 tracking-widest flex items-center gap-1.5 sm:gap-2">
                <span>// PROTOCOL 03</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">CENTRAL HOLOGRAM CHAMBER</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
                Enterprise Systems <span className="font-kanji text-cyan-400/80 text-base sm:text-xl font-normal">[案件投射体]</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-xs font-tech text-cyan-300">
                PROJECT [{String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}]
              </span>
            </div>
          </div>

          {/* Central Holographic Projector Pod */}
          <div
            className={`relative cyber-glass rounded-2xl border-cyan-500/30 bg-[#080b14]/90 p-3 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(0,240,255,0.18)] flex-1 max-h-[85dvh] sm:max-h-[80dvh] lg:max-h-[72dvh] flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out ${isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[300ms]'
              : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
              }`}
          >
            {/* Top Scanline Line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            {/* Scrollable Project Details Container on Compact / Mobile Screens */}
            <div className="flex-1 min-h-0 overflow-y-auto cyber-scrollbar pr-1 sm:pr-2 pb-2">
              {/* Project Details Grid */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-start lg:items-center py-0.5 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                  }`}
              >
                {/* Left Col: Holographic Mockup Screen (7 cols) */}
                <div className="lg:col-span-7 relative group">
                  <div className="relative rounded-xl overflow-hidden border border-cyan-400/40 bg-black/60 shadow-[0_0_30px_rgba(0,240,255,0.2)] aspect-video max-h-[19dvh] sm:max-h-[26dvh] lg:max-h-[42dvh] w-full flex items-center justify-center">
                    <img
                      src={activeProject.imageMockup}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 cyber-scanline opacity-40 pointer-events-none" />

                    {/* Corner Cyber Brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                    {/* Badge Status */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[9px] sm:text-[10px] font-tech text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{activeProject.status}</span>
                    </div>
                  </div>

                </div>

                {/* Right Col: Specifications & Architecture (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-tech text-pink-400 mb-0.5 sm:mb-1">
                      <span>{activeProject.code}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{activeProject.client} ({activeProject.year})</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold font-display text-white mb-1.5 leading-snug">
                      {activeProject.title}
                    </h3>

                    <p className="text-[11px] sm:text-sm text-slate-300 font-light leading-relaxed mb-2 sm:mb-3">
                      {activeProject.summary}
                    </p>

                    {/* Key Architectural Highlights */}
                    <div className="space-y-1 mb-2.5 sm:mb-3.5">
                      <div className="text-[10px] sm:text-[11px] font-tech text-cyan-400 uppercase tracking-wider font-semibold">
                      // KEY ARCHITECTURAL FEATURES:
                      </div>
                      {activeProject.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {activeProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-tech text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: Blueprint Modal & Live System */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => {
                          playClick()
                          setActiveModalProject(activeProject)
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-400/50 text-cyan-300 font-bold text-xs font-tech flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>VIEW BLUEPRINT</span>
                      </button>

                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="py-2 px-3.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs font-tech flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all"
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
                          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 text-xs font-tech flex items-center transition-all"
                          title="View GitHub Archive"
                        >
                          <svg className="w-3.5 h-3.5 text-cyan-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Dock: Selector Thumbnails & Prev/Next Controls (Always Pinned & Fully Visible) */}
            <div className="shrink-0 pt-2 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1.5 sm:gap-3 bg-[#080b14]/95">
              <button
                onClick={() => {
                  playClick()
                  handlePrev()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-tech"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span className="hidden sm:inline">PREV_SYS</span>
              </button>

              {/* Thumbnails Mini Switcher */}
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0.5 cyber-scrollbar max-w-[200px] sm:max-w-none">
                {PROJECTS_DATA.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(idx)}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-tech tracking-wider border transition-all cursor-pointer whitespace-nowrap ${currentIndex === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                      }`}
                  >
                    <span className="font-bold text-cyan-400/90">// {String(idx + 1).padStart(2, '0')}</span>
                    <span className="ml-1 sm:ml-1.5 font-semibold">{proj.shortTitle || proj.title}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  playClick()
                  handleNext()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-tech"
              >
                <span className="hidden sm:inline">NEXT_SYS</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* System Blueprint Dossier Modal */}
      <ProjectBlueprintModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playClick={playClick}
      />
    </>
  )
}
