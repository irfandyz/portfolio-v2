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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] cyber-glass rounded-2xl border-cyan-400/50 bg-[#090d18] shadow-[0_0_60px_rgba(0,240,255,0.3)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-tech text-cyan-400">
                SYSTEM BLUEPRINT // {project.code}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto cyber-scrollbar space-y-6 flex-1">
          {/* Main Visual Image Banner */}
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-black/60 shadow-lg aspect-video max-h-72 w-full">
            <img 
              src={project.imageMockup} 
              alt={project.title}
              className="w-full h-full object-cover object-top" 
            />
            <div className="absolute inset-0 cyber-scanline opacity-30 pointer-events-none" />
          </div>

          {/* Project Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-tech">
            <div>
              <span className="text-slate-500 block">CLIENT / PARTNER:</span>
              <span className="text-slate-200 font-semibold">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-500 block">DEPLOYMENT YEAR:</span>
              <span className="text-cyan-400 font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="text-slate-500 block">SYSTEM DOMAIN:</span>
              <span className="text-pink-400 font-semibold">{project.category}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ARCHITECTURE:</span>
              <span className="text-emerald-400 font-semibold">MODULAR & SCALABLE</span>
            </div>
          </div>

          {/* Overview & Architecture Details */}
          <div>
            <div className="text-xs font-tech text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>DESKRIPSI ARSITEKTUR & CAKUPAN SISTEM:</span>
            </div>
            <p className="text-sm text-slate-300 font-light leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {project.summary}
            </p>
          </div>

          {/* Key Engineering Modules */}
          <div>
            <div className="text-xs font-tech text-pink-400 uppercase tracking-wider mb-3">
              // KEY TECHNICAL HIGHLIGHTS & DELIVERABLES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
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
                  className="px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-tech text-cyan-300 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 bg-black/60 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-tech text-slate-300 transition-all cursor-pointer"
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
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-tech flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
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
