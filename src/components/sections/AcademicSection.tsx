import { useState } from 'react'
import { EDUCATION_DATA } from '../../data/portfolioData'
import { GraduationCap, Award, BookOpen, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

interface AcademicSectionProps {
  playClick: () => void
  isActive?: boolean
}

export function AcademicSection({ playClick, isActive = true }: AcademicSectionProps) {
  const [activeMobileNode, setActiveMobileNode] = useState<0 | 1>(0)

  const renderCardContent = (nodeIdx: 0 | 1, isMobileSingle: boolean = false) => {
    const isHigherEdu = nodeIdx === 0
    const item = EDUCATION_DATA[nodeIdx]
    const accentColor = isHigherEdu ? 'cyan' : 'pink'
    const Icon = isHigherEdu ? GraduationCap : Award

    return (
      <div 
        onClick={playClick}
        className={`cyber-glass rounded-2xl border-${accentColor}-500/30 bg-[#090c17]/92 p-4 sm:p-5 md:p-6 ${
          isHigherEdu
            ? 'shadow-[0_0_35px_rgba(0,240,255,0.18)] hover:shadow-[0_0_45px_rgba(0,240,255,0.3)]'
            : 'shadow-[0_0_35px_rgba(244,63,94,0.15)] hover:shadow-[0_0_45px_rgba(244,63,94,0.25)]'
        } transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
          isMobileSingle ? 'w-full' : ''
        }`}
      >
        {/* Top Accent Strip */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
            isHigherEdu
              ? 'from-cyan-500 via-blue-500 to-cyan-400'
              : 'from-pink-500 via-rose-500 to-pink-400'
          }`} 
        />

        <div>
          <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
            <span 
              className={`px-2.5 py-1 rounded bg-${accentColor}-500/10 border border-${accentColor}-500/30 text-[10px] font-tech text-${accentColor}-300 font-semibold flex items-center gap-1.5`}
            >
              <Icon className={`w-3.5 h-3.5 text-${accentColor}-400`} />
              <span>{isHigherEdu ? 'HIGHER EDUCATION CREDENTIAL' : 'VOCATIONAL SOFTWARE FOUNDATION'}</span>
            </span>
            <span className={`text-xs font-tech text-${accentColor}-400 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800`}>
              {item.period}
            </span>
          </div>

          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold font-display text-white group-hover:text-${accentColor}-300 transition-colors mb-1`}>
            {item.institution}
          </h3>
          <div className={`text-xs sm:text-sm font-tech text-${accentColor}-400 font-semibold mb-3 sm:mb-4 flex items-center gap-2`}>
            <span>{item.degree}</span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
              {isHigherEdu ? 'CIREBON, INDONESIA' : 'KOTA CIREBON'}
            </span>
          </div>

          <div className="text-[11px] sm:text-xs font-tech text-slate-400 uppercase tracking-wider mb-2 sm:mb-2.5 flex items-center gap-1.5">
            <BookOpen className={`w-3.5 h-3.5 text-${accentColor}-400`} />
            <span>{isHigherEdu ? 'CORE ACADEMIC & TECHNICAL FOCUS:' : 'FOUNDATIONAL CODING DISCIPLINE:'}</span>
          </div>
          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            {item.focus.map((focusItem, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-light leading-snug">
                <CheckCircle2 className={`w-3.5 h-3.5 text-${accentColor}-400 shrink-0 mt-0.5`} />
                <span>{focusItem}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-tech">
          <span className="text-slate-500">ACADEMIC STATUS:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {item.status}
          </span>
        </div>
      </div>
    )
  }

  return (
    <section 
      id="academic"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-5 sm:py-6 md:py-8"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-scanline opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-center">
        {/* Section Header */}
        <div
          className={`flex items-center justify-between mb-2.5 sm:mb-3 md:mb-5 transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[150ms]'
              : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
          }`}
        >
          <div>
            <div className="text-[11px] font-tech text-cyan-400 tracking-widest flex items-center gap-2">
              <span>// PROTOCOL 05</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">ACADEMIC MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              Education Credentials <span className="font-kanji text-cyan-400/80 text-xl font-normal">[学歴録]</span>
            </h2>
          </div>
          <div className="hidden sm:block text-right font-tech text-xs text-slate-400">
            <div>TRACK: FORMAL COMPUTER SCIENCE</div>
            <div className="text-cyan-300 font-semibold flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>2 ACCREDITED NODES ●</span>
            </div>
          </div>
        </div>

        {/* Mobile Node Selector Tabs (< md) */}
        <div 
          className={`flex md:hidden items-center gap-2 mb-3 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80 transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[250ms]'
              : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              playClick()
              setActiveMobileNode(0)
            }}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-tech font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMobileNode === 0
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>UNIVERSITAS CIC (D3)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClick()
              setActiveMobileNode(1)
            }}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-tech font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMobileNode === 1
                ? 'bg-pink-500/20 text-pink-300 border border-pink-400/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-pink-400" />
            <span>SMK RPL (FOUNDATION)</span>
          </button>
        </div>

        {/* Mobile View: Single Active Card */}
        <div 
          className={`block md:hidden transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[350ms]'
              : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
          }`}
        >
          {renderCardContent(activeMobileNode, true)}
        </div>

        {/* Desktop View: Dual Holographic Credential Cards Grid (>= md) */}
        <div 
          className={`hidden md:grid md:grid-cols-2 gap-4 md:gap-6 max-h-[73dvh] overflow-y-auto cyber-scrollbar pr-1 relative transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[300ms]'
              : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
          }`}
        >
          {renderCardContent(0)}
          {renderCardContent(1)}
        </div>

        {/* Footer Bridge Quote / PCB Trace */}
        <div 
          className={`mt-3 sm:mt-4 p-2 sm:p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center text-[11px] sm:text-xs font-tech text-slate-400 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[500ms]'
              : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SMK RPL FOUNDATION (2019)</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300 font-semibold">D3 INFORMATICS (2026)</span>
          <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
        </div>
      </div>
    </section>
  )
}
