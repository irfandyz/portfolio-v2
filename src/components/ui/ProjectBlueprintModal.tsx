import type { ProjectItem } from '../../data/portfolioData'
import { X, ExternalLink, CheckCircle2, Shield, Layers } from 'lucide-react'

interface ProjectBlueprintModalProps {
  project: ProjectItem | null
  onClose: () => void
  playClick: () => void
}

export function ProjectBlueprintModal({ project, onClose, playClick }: ProjectBlueprintModalProps) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] shrine-glass kazari-corner rounded-2xl border-amber-400/40 bg-[#080a10] shadow-[0_0_60px_rgba(225,29,72,0.22)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Imperial Accent Bar */}
        <div className="h-1 w-full shrine-accent-bar shrink-0" />

        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-amber-400/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-tech text-amber-300">
                <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji font-bold text-[10px]">
                  設計図
                </span>
                <span>SYSTEM BLUEPRINT // {project.code}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-amber-50 font-display mt-0.5">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            className="p-2 rounded-lg bg-slate-900/90 border border-amber-400/25 hover:border-rose-400 text-slate-400 hover:text-amber-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto cyber-scrollbar space-y-6 flex-1 kumiko-grid-bg">
          {/* Main Visual Image Banner */}
          <div className="relative rounded-xl overflow-hidden border border-amber-400/35 bg-black/60 shadow-lg aspect-video max-h-72 w-full">
            <img
              src={project.imageMockup}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 cyber-scanline opacity-20 pointer-events-none" />
          </div>

          {/* Project Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#0c0f18]/90 border border-amber-400/20 text-xs font-tech">
            <div>
              <span className="text-slate-500 block">CLIENT / PARTNER:</span>
              <span className="text-amber-50 font-semibold">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-500 block">DEPLOYMENT YEAR:</span>
              <span className="text-amber-300 font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="text-slate-500 block">SYSTEM DOMAIN:</span>
              <span className="text-rose-300 font-semibold">{project.category}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ARCHITECTURE:</span>
              <span className="text-teal-300 font-semibold">MODULAR & SCALABLE</span>
            </div>
          </div>

          {/* Overview & Architecture Details */}
          <div>
            <div className="text-xs font-tech text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>DESKRIPSI ARSITEKTUR & CAKUPAN SISTEM:</span>
            </div>
            <p className="text-sm text-slate-200 font-light leading-relaxed bg-[#0c0f18]/80 p-4 rounded-xl border border-amber-400/15">
              {project.summary}
            </p>
          </div>

          {/* Key Engineering Modules */}
          <div>
            <div className="text-xs font-tech text-rose-300 uppercase tracking-wider mb-3">
              // KEY TECHNICAL HIGHLIGHTS & DELIVERABLES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0c0f18]/85 border border-amber-400/15 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Deployed */}
          <div>
            <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
              // INTEGRATED TECH STACK:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-teal-950/40 border border-teal-400/35 text-xs font-tech text-teal-200 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-amber-400/20 bg-black/60 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            className="px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-amber-400/25 text-xs font-tech text-amber-100 transition-all cursor-pointer"
          >
            TUTUP BLUEPRINT
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-amber-50 font-bold text-xs font-tech flex items-center gap-1.5 shadow-[0_0_18px_rgba(225,29,72,0.4)] transition-all"
              >
                <span>BUKA SISTEM LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
