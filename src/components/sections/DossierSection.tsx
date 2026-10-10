import { useState } from 'react'
import { OPERATOR_PROFILE } from '../../data/portfolioData'
import { Server, Layout, Database, ShieldCheck, Cpu, Copy, Check } from 'lucide-react'

interface DossierSectionProps {
  playClick: () => void
  isActive?: boolean
}

export function DossierSection({ playClick, isActive = true }: DossierSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    playClick()
    navigator.clipboard.writeText(OPERATOR_PROFILE.contacts.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <section
      id="dossier"
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
            <div className="text-[11px] font-tech text-cyan-400 tracking-widest flex items-center gap-2">
              <span>// PROTOCOL 02</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">OPERATOR DOSSIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              Identity & Tech Matrix <span className="font-kanji text-cyan-400/80 text-xl font-normal">[操縦者]</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout (100dvh scroll-safe) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4 overflow-y-auto max-h-[78dvh] pr-1 cyber-scrollbar">
          {/* Card 1: Operator ID Photo & Bio (Spans 2 rows on large screen) */}
          <div
            className={`cyber-glass rounded-xl p-4 md:p-5 flex flex-col justify-between border-cyan-500/25 md:col-span-1 lg:col-span-1 lg:row-span-2 bg-[#090c17]/90 relative group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[250ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            {/* Top Cyan Glowing Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

            <div>
              {/* Photo Frame with Cyber Brackets */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.3)] group-hover:border-cyan-300 transition-all duration-500">
                <img
                  src={OPERATOR_PROFILE.avatar}
                  alt={OPERATOR_PROFILE.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Corner Brackets */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />
              </div>

              <div className="text-center">
                <h3 className="font-bold text-base text-white">{OPERATOR_PROFILE.name}</h3>
                <div className="text-xs text-cyan-400 font-tech font-semibold mt-0.5">{OPERATOR_PROFILE.role}</div>
                <div className="text-[11px] text-slate-400 font-kanji mt-0.5">{OPERATOR_PROFILE.kanjiTitle}</div>
              </div>

              {/* Quick Specs */}
              <div className="mt-3 py-2 px-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] font-tech text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>EXP LEVEL:</span>
                  <span className="text-cyan-300 font-semibold">2019 — 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-slate-200">CIREBON</span>
                </div>
              </div>
            </div>

            {/* Quick Email Copy Button */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={handleCopyEmail}
                className="w-full py-1.5 px-2.5 rounded-md bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-[11px] font-tech text-cyan-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">EMAIL COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>COPY EMAIL ADDR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Backend Architecture Core (Spans 2 cols) */}
          <div
            className={`cyber-glass rounded-xl p-4 md:p-5 border-cyan-500/20 md:col-span-2 bg-[#090c17]/90 flex flex-col justify-between group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[350ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-tech font-bold text-sm">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>BACKEND & API ARCHITECTURE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-tech">
                  ADVANCED PROFICIENCY 95%
                </span>
              </div>

              {/* Progress telemetry bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mb-3 overflow-hidden">
                <div className="w-[95%] h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </div>

              <p className="text-xs text-slate-300 mb-3.5 leading-relaxed font-light">
                Spesialis dalam rekayasa backend berkecepatan tinggi, perancangan skema RESTful API terstandarisasi, dan penerapan arsitektur bersih (*Clean Architecture*) serta kontrol akses peran (RBAC).
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {OPERATOR_PROFILE.skills.backend.map((skill) => (
                <button
                  key={skill}
                  onClick={playClick}
                  className="px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-tech text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Frontend & Creative Interface */}
          <div
            className={`cyber-glass rounded-xl p-4 md:p-5 border-cyan-500/20 md:col-span-1 bg-[#090c17]/90 flex flex-col justify-between group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[450ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-pink-300 font-tech font-bold text-sm">
                  <Layout className="w-4 h-4 text-pink-400" />
                  <span>FRONTEND UI</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-tech">
                  90%
                </span>
              </div>

              {/* Progress telemetry bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mb-3 overflow-hidden">
                <div className="w-[90%] h-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed font-light">
                Pengalaman ekstensif Vue 3 (Composition API), React, Three.js 3D web, dan Tailwind CSS.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {OPERATOR_PROFILE.skills.frontend.map((skill) => (
                <button
                  key={skill}
                  onClick={playClick}
                  className="px-2 py-0.5 rounded bg-pink-950/40 border border-pink-500/30 text-[11px] font-tech text-pink-300 hover:border-pink-400 hover:bg-pink-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 4: Database & DevOps Infrastructure (Spans 2 cols) */}
          <div
            className={`cyber-glass rounded-xl p-4 md:p-5 border-cyan-500/20 md:col-span-2 bg-[#090c17]/90 flex flex-col justify-between group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[550ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-tech font-bold text-sm">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>DATABASE & INFRASTRUCTURE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-tech">
                  HIGH OPTIMIZATION 90%
                </span>
              </div>

              {/* Progress telemetry bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mb-3 overflow-hidden">
                <div className="w-[90%] h-full bg-gradient-to-r from-amber-500 to-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed font-light">
                Pengelolaan database relasional & NoSQL, query profiling, konfigurasi server Linux VPS, deployment, dan version control.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {OPERATOR_PROFILE.skills.databaseDevOps.map((skill) => (
                <button
                  key={skill}
                  onClick={playClick}
                  className="px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-[11px] font-tech text-amber-300 hover:border-amber-400 hover:bg-amber-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 5: Soft Skills & Philosophy */}
          <div
            className={`cyber-glass rounded-xl p-4 md:p-5 border-cyan-500/20 md:col-span-1 lg:col-span-1 bg-[#090c17]/90 flex flex-col justify-between group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[650ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-emerald-300 font-tech font-bold text-sm mb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PRINCIPLES & METHODOLOGY</span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed font-light">
                Pemecahan masalah analitis, kolaborasi tim lintas disiplin, dan adaptasi cepat terhadap ekosistem teknologi baru.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {OPERATOR_PROFILE.skills.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-tech text-emerald-300 hover:border-emerald-400 transition-colors"
                >
                  <Cpu className="w-3 h-3 inline mr-1 text-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
