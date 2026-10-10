import { EDUCATION_DATA } from '../../data/portfolioData'
import { GraduationCap, Award, BookOpen, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

interface AcademicSectionProps {
  playClick: () => void
  isActive?: boolean
}

export function AcademicSection({ playClick, isActive = true }: AcademicSectionProps) {
  return (
    <section 
      id="academic"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-6 md:py-8"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-scanline opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-center">
        {/* Section Header */}
        <div
          className={`flex items-center justify-between mb-3 md:mb-5 transition-all duration-700 ease-out ${
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

        {/* Dual Holographic Credential Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[73dvh] overflow-y-auto cyber-scrollbar pr-1 relative">
          {/* Card 1: Higher Education (Universitas CIC) */}
          <div 
            onClick={playClick}
            className={`cyber-glass rounded-2xl border-cyan-500/30 bg-[#090c17]/92 p-5 md:p-6 shadow-[0_0_35px_rgba(0,240,255,0.18)] hover:shadow-[0_0_45px_rgba(0,240,255,0.3)] transition-all duration-700 ease-out flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[300ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            {/* Top Cyan Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400" />

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-tech text-cyan-300 font-semibold flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HIGHER EDUCATION CREDENTIAL</span>
                </span>
                <span className="text-xs font-tech text-cyan-400 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {EDUCATION_DATA[0].period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-1">
                {EDUCATION_DATA[0].institution}
              </h3>
              <div className="text-sm font-tech text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                <span>{EDUCATION_DATA[0].degree}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-normal">CIREBON, INDONESIA</span>
              </div>

              <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>CORE ACADEMIC & TECHNICAL FOCUS:</span>
              </div>
              <div className="space-y-2 mb-6">
                {EDUCATION_DATA[0].focus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-tech">
              <span className="text-slate-500">ACADEMIC STATUS:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {EDUCATION_DATA[0].status}
              </span>
            </div>
          </div>

          {/* Card 2: Vocational Foundation (SMK Al-Irsyad) */}
          <div 
            onClick={playClick}
            className={`cyber-glass rounded-2xl border-pink-500/30 bg-[#090c17]/92 p-5 md:p-6 shadow-[0_0_35px_rgba(244,63,94,0.15)] hover:shadow-[0_0_45px_rgba(244,63,94,0.25)] transition-all duration-700 ease-out flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[450ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            {/* Top Pink Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400" />

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/30 text-[10px] font-tech text-pink-300 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-pink-400" />
                  <span>VOCATIONAL SOFTWARE FOUNDATION</span>
                </span>
                <span className="text-xs font-tech text-pink-400 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {EDUCATION_DATA[1].period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-pink-300 transition-colors mb-1">
                {EDUCATION_DATA[1].institution}
              </h3>
              <div className="text-sm font-tech text-pink-400 font-semibold mb-4 flex items-center gap-2">
                <span>{EDUCATION_DATA[1].degree}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-normal">KOTA CIREBON</span>
              </div>

              <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                <span>FOUNDATIONAL CODING DISCIPLINE:</span>
              </div>
              <div className="space-y-2 mb-6">
                {EDUCATION_DATA[1].focus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-tech">
              <span className="text-slate-500">ACADEMIC STATUS:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {EDUCATION_DATA[1].status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bridge Quote / PCB Trace */}
        <div className="mt-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center text-xs font-tech text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SMK RPL FOUNDATION (2019)</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300 font-semibold">D3 INFORMATICS (2026)</span>
          <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-pink-300 font-semibold">ENTERPRISE FULL-STACK ARCHITECT</span>
        </div>
      </div>
    </section>
  )
}
