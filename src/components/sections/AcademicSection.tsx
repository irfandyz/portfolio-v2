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
    const Icon = isHigherEdu ? GraduationCap : Award

    return (
      <div
        onClick={playClick}
        className={`shrine-glass kazari-corner kumiko-grid-bg rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
          isHigherEdu
            ? 'border-amber-400/35 shadow-[0_0_35px_rgba(251,191,36,0.14)] hover:shadow-[0_0_45px_rgba(251,191,36,0.25)]'
            : 'border-teal-400/35 shadow-[0_0_35px_rgba(45,212,191,0.14)] hover:shadow-[0_0_45px_rgba(45,212,191,0.25)]'
        } ${isMobileSingle ? 'w-full' : ''}`}
      >
        {/* Top Kakemono Scroll Roller Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
            isHigherEdu
              ? 'from-rose-600 via-amber-400 to-amber-200'
              : 'from-teal-500 via-teal-300 to-amber-300'
          }`}
        />

        <div>
          <div className="flex items-center justify-between mb-2.5 sm:mb-3.5 pt-1">
            <span
              className={`px-2.5 py-1 rounded border text-[10px] font-tech font-semibold flex items-center gap-1.5 ${
                isHigherEdu
                  ? 'bg-amber-500/10 border-amber-400/35 text-amber-200'
                  : 'bg-teal-500/10 border-teal-400/35 text-teal-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isHigherEdu ? 'text-amber-400' : 'text-teal-300'}`} />
              <span>{isHigherEdu ? 'HIGHER EDUCATION SCROLL' : 'VOCATIONAL FOUNDATION SCROLL'}</span>
            </span>
            <span
              className={`text-xs font-tech font-bold bg-[#0c1018]/90 px-2 py-0.5 rounded border border-amber-400/20 ${
                isHigherEdu ? 'text-amber-300' : 'text-teal-300'
              }`}
            >
              {item.period}
            </span>
          </div>

          <h3
            className={`text-lg sm:text-xl md:text-2xl font-bold font-display text-amber-50 transition-colors mb-1 ${
              isHigherEdu ? 'group-hover:text-amber-300' : 'group-hover:text-teal-300'
            }`}
          >
            {item.institution}
          </h3>
          <div
            className={`text-xs sm:text-sm font-tech font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
              isHigherEdu ? 'text-amber-300' : 'text-teal-300'
            }`}
          >
            <span>{item.degree}</span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
              {isHigherEdu ? 'CIREBON, INDONESIA' : 'KOTA CIREBON'}
            </span>
          </div>

          <div className="text-[11px] sm:text-xs font-tech text-slate-400 uppercase tracking-wider mb-2 sm:mb-2.5 flex items-center gap-1.5">
            <BookOpen className={`w-3.5 h-3.5 ${isHigherEdu ? 'text-amber-400' : 'text-teal-400'}`} />
            <span>{isHigherEdu ? 'CORE ACADEMIC & TECHNICAL FOCUS:' : 'FOUNDATIONAL CODING DISCIPLINE:'}</span>
          </div>
          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            {item.focus.map((focusItem, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-light leading-snug">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isHigherEdu ? 'text-amber-400' : 'text-teal-400'}`} />
                <span>{focusItem}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2.5 sm:pt-3 border-t border-amber-400/15 flex items-center justify-between text-xs font-tech">
          <span className="text-slate-500">ACADEMIC STATUS:</span>
          <div className="flex items-center gap-2">
            <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji text-[10px] font-bold">
              卒業
            </span>
            <span className="text-teal-300 font-semibold">{item.status}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="academic"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-5 sm:py-6 md:py-8"
    >
      <div className="absolute inset-0 cyber-scanline opacity-15 pointer-events-none" />

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
            <div className="text-[11px] font-tech text-amber-300 tracking-widest flex items-center gap-2 mb-1">
              <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji font-bold text-[10px]">
                伍
              </span>
              <span>// SANCTUARY 05</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">TAIKO-BASHI & KYŌZŌ ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-amber-50">
              Education Credentials <span className="font-kanji text-amber-300/85 text-xl font-normal">[経蔵 // 学歴録]</span>
            </h2>
          </div>
          <div className="hidden sm:block text-right font-tech text-xs text-slate-400">
            <div>TRACK: FORMAL COMPUTER SCIENCE</div>
            <div className="text-amber-300 font-semibold flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>2 KYŌZŌ SCROLLS ●</span>
            </div>
          </div>
        </div>

        {/* Mobile Scroll Selector Tabs (< md) */}
        <div
          className={`flex md:hidden items-center gap-2 mb-3 bg-[#0a0d14]/85 p-1.5 rounded-xl border border-amber-400/20 transition-all duration-700 ease-out ${
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
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                : 'text-slate-400 hover:text-amber-100 border border-transparent'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
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
                ? 'bg-teal-500/20 text-teal-200 border border-teal-400/60 shadow-[0_0_15px_rgba(45,212,191,0.25)]'
                : 'text-slate-400 hover:text-teal-100 border border-transparent'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>SMK RPL (FOUNDATION)</span>
          </button>
        </div>

        {/* Mobile View */}
        <div
          className={`block md:hidden transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[350ms]'
              : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
          }`}
        >
          {renderCardContent(activeMobileNode, true)}
        </div>

        {/* Desktop View */}
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

        {/* Footer Taiko-bashi Bridge Path */}
        <div
          className={`mt-3 sm:mt-4 p-2.5 rounded-xl bg-[#0a0d14]/85 border border-amber-400/20 text-center text-[11px] sm:text-xs font-tech text-slate-300 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 transition-all duration-700 ease-out ${
            isActive
              ? 'opacity-100 translate-y-0 filter blur-0 delay-[500ms]'
              : 'opacity-0 translate-y-6 filter blur-[3px] pointer-events-none'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-rose-300 font-semibold">太鼓橋 // TAIKO-BASHI BRIDGE:</span>
          <span className="text-teal-300">SMK RPL FOUNDATION (2019)</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 font-semibold">D3 INFORMATICS (2026)</span>
        </div>
      </div>
    </section>
  )
}
