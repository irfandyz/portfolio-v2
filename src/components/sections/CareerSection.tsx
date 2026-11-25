import { useState } from 'react'
import { CAREER_DATA, type CareerItem } from '../../data/portfolioData'
import { Briefcase, Calendar, CheckCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react'

interface CareerSectionProps {
  playClick: () => void
  playHoloBeam: () => void
  isActive?: boolean
}

const TORII_GATE_NAMES = ['壱之鳥居', '弐之鳥居', '参之鳥居', '肆之鳥居']

export function CareerSection({ playClick, playHoloBeam, isActive = true }: CareerSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(3)
  const [isDecoding, setIsDecoding] = useState<boolean>(false)

  const activeCareer: CareerItem = CAREER_DATA[selectedIdx]

  const handleSelectCareer = (idx: number) => {
    if (idx === selectedIdx || isDecoding) return
    playHoloBeam()
    setIsDecoding(true)
    setTimeout(() => {
      setSelectedIdx(idx)
      setIsDecoding(false)
    }, 220)
  }

  return (
    <section
      id="career"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-6 md:py-8"
    >
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
            <div className="text-[11px] font-tech text-amber-300 tracking-widest flex items-center gap-2 mb-1">
              <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji font-bold text-[10px]">
                肆
              </span>
              <span>// SANCTUARY 04</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">SENBON TORII CHRONICLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-amber-50">
              Career Experience <span className="font-kanji text-amber-300/85 text-xl font-normal">[千本鳥居 // 経歴録]</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-tech text-slate-400">
            <span>TOTAL TIMELINE:</span>
            <span className="text-amber-300 font-semibold">2019 — 2026 (4 GATES)</span>
          </div>
        </div>

        {/* Dual-Zone Container */}
        <div className="flex flex-col gap-3.5 max-h-[72dvh] flex-1">
          {/* Top-Center Main Chronicle Stage */}
          <div
            className={`relative shrine-glass kazari-corner kumiko-grid-bg rounded-2xl border-amber-400/30 p-5 md:p-6 shadow-[0_0_40px_rgba(225,29,72,0.12)] flex-1 overflow-y-auto cyber-scrollbar flex flex-col justify-between transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[300ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 shrine-accent-bar" />

            <div
              className={`transition-all duration-300 space-y-4 ${
                isDecoding ? 'opacity-0 scale-[0.98] blur-xs' : 'opacity-100 scale-100 blur-0'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-amber-400/15 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-tech text-amber-300 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji text-[10px] font-bold">
                      {TORII_GATE_NAMES[selectedIdx] || `GATE 0${selectedIdx + 1}`}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-teal-300 font-semibold">{activeCareer.status}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-amber-50">
                    {activeCareer.company}
                  </h3>
                  <div className="text-sm font-tech text-amber-300 font-semibold mt-0.5">
                    {activeCareer.role}
                  </div>
                </div>

                <div className="text-left sm:text-right font-tech text-xs bg-[#0c1018]/90 px-3.5 py-2 rounded-lg border border-amber-400/20 shadow-sm">
                  <div className="flex items-center gap-1.5 text-amber-100">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span className="font-semibold">{activeCareer.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold mt-1">
                    <Clock className="w-3 h-3" />
                    <span>DURASI: {activeCareer.duration}</span>
                  </div>
                </div>
              </div>

              {/* Contributions */}
              <div>
                <div className="text-xs font-tech text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>KONTRIBUSI SISTEM & TANGGUNG JAWAB UTAMA:</span>
                </div>
                <div className="space-y-2.5">
                  {activeCareer.contributions.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>// TECHNOLOGIES & TOOLS DEPLOYED:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCareer.techStack.map((tech) => (
                    <button
                      key={tech}
                      onClick={playClick}
                      className="px-2.5 py-1 rounded bg-[#0c1018] border border-amber-400/25 text-xs font-tech text-amber-200 shadow-sm hover:border-rose-400 hover:bg-rose-950/30 transition-all cursor-pointer"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between text-[10px] font-tech text-slate-500 pt-3 border-t border-amber-400/15">
              <span>SENBON TORII // CHRONICLE ARCHIVE</span>
              <span className="text-amber-300/90 font-semibold">● ACTIVE GATE: {activeCareer.company.toUpperCase()}</span>
              <span>SYNCHRONIZED: 60 FPS</span>
            </div>
          </div>

          {/* Bottom Senbon Torii Selector Dock */}
          <div
            className={`space-y-1.5 transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[450ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-tech text-amber-300/80 tracking-widest uppercase">
              <span>// PILIH GERBANG KARIER (KLIK UNTUK MEMBUKA RINCIAN):</span>
              <span className="text-slate-500 hidden sm:inline">SHU-IRO GATE SWITCH ●</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {CAREER_DATA.map((career, idx) => {
                const isSelected = selectedIdx === idx
                return (
                  <button
                    key={career.id}
                    onClick={() => {
                      playClick()
                      handleSelectCareer(idx)
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'shrine-glass-active border-amber-400 text-white shadow-[0_0_22px_rgba(225,29,72,0.3)] scale-[1.01]'
                        : 'bg-[#0a0d14]/85 border-amber-400/15 text-slate-400 hover:border-rose-400/45 hover:text-amber-100'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-teal-300" />
                    )}

                    <div className="flex items-center justify-between text-[10px] font-tech mb-1">
                      <span className={isSelected ? 'text-amber-300 font-bold' : 'text-slate-500'}>
                        {career.period.split('–')[0]?.trim()}
                      </span>
                      <span className="font-kanji text-[10px] text-rose-300/85">
                        {TORII_GATE_NAMES[idx]}
                      </span>
                    </div>

                    <div className="font-bold text-xs sm:text-sm truncate text-amber-50 group-hover:text-amber-200 transition-colors">
                      {career.company.replace('PT. ', '').replace('CV. ', '')}
                    </div>

                    <div className="text-[10px] text-slate-400 truncate font-tech mt-0.5">
                      {career.role.replace('Internship - ', '')}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
