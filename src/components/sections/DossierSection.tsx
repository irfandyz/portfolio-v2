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
            <div className="text-[11px] font-tech text-amber-300 tracking-widest flex items-center gap-2 mb-1">
              <span className="hanko-seal px-1.5 py-0.5 rounded font-kanji font-bold text-[10px]">
                弐
              </span>
              <span>// SANCTUARY 02</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">EMA-DEN & CHŌZUYA PAVILION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-amber-50">
              Identity & Tech Matrix <span className="font-kanji text-amber-300/85 text-xl font-normal">[絵馬殿 // 操縦者]</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout (100dvh scroll-safe) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4 overflow-y-auto max-h-[78dvh] pr-1 cyber-scrollbar">
          {/* Card 1: Operator Ofuda/Ema Identity Plaque (Spans 2 rows on large screen) */}
          <div
            className={`shrine-glass kazari-corner kumiko-grid-bg rounded-xl p-4 md:p-5 flex flex-col justify-between border-amber-400/30 md:col-span-1 lg:col-span-1 lg:row-span-2 relative overflow-hidden group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[250ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            {/* Top Imperial Vermilion-to-Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 shrine-accent-bar" />

            <div>
              {/* Verified Hanko Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-tech text-amber-300/75 tracking-widest">OFUDA // ID-01</span>
                <span className="hanko-seal px-1.5 py-0.5 rounded text-[10px] font-kanji font-bold">
                  適格
                </span>
              </div>

              {/* Photo Frame with Gold & Vermilion Brackets */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.22)] group-hover:border-rose-400/80 transition-all duration-500">
                <img
                  src={OPERATOR_PROFILE.avatar}
                  alt={OPERATOR_PROFILE.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-400" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-400" />
              </div>

              <div className="text-center">
                <h3 className="font-bold text-base text-amber-50">{OPERATOR_PROFILE.name}</h3>
                <div className="text-xs text-amber-300 font-tech font-semibold mt-0.5">{OPERATOR_PROFILE.role}</div>
                <div className="text-[11px] text-rose-300/80 font-kanji mt-0.5">{OPERATOR_PROFILE.kanjiTitle}</div>
              </div>

              {/* Quick Specs */}
              <div className="mt-3 py-2 px-2.5 rounded-lg bg-[#080a10]/85 border border-amber-400/15 text-[10px] font-tech text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>EXP LEVEL:</span>
                  <span className="text-amber-300 font-semibold">2019 — 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-slate-200">CIREBON, ID</span>
                </div>
              </div>
            </div>

            {/* Quick Email Copy Button */}
            <div className="mt-3 pt-3 border-t border-amber-400/15 flex items-center justify-between">
              <button
                onClick={handleCopyEmail}
                className="w-full py-1.5 px-2.5 rounded-md bg-teal-950/40 hover:bg-teal-900/50 border border-teal-400/35 text-[11px] font-tech text-teal-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-amber-200 font-bold">EMAIL COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-300" />
                    <span>COPY EMAIL ADDR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Backend Architecture Core — Shu-iro Vermilion Theme (Spans 2 cols) */}
          <div
            className={`shrine-glass kazari-corner kumiko-grid-bg rounded-xl p-4 md:p-5 border-rose-500/25 md:col-span-2 flex flex-col justify-between relative overflow-hidden group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[350ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 shrine-accent-bar opacity-75" />
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-tech font-bold text-sm">
                  <Server className="w-4 h-4 text-rose-400" />
                  <span>BACKEND & API ARCHITECTURE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-200 border border-rose-500/35 font-tech">
                  ADVANCED PROFICIENCY 95%
                </span>
              </div>

              <div className="w-full h-1 bg-slate-800/90 rounded-full mb-3 overflow-hidden">
                <div className="w-[95%] h-full bg-gradient-to-r from-rose-600 via-rose-400 to-amber-400 shadow-[0_0_10px_rgba(225,29,72,0.75)]" />
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
                  className="px-2.5 py-1 rounded-md bg-rose-950/35 border border-rose-500/30 text-[11px] font-tech text-rose-200 hover:border-amber-400/60 hover:bg-rose-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Frontend & Creative Interface — Kitsunebi Spirit Jade Theme */}
          <div
            className={`shrine-glass kazari-corner kumiko-grid-bg rounded-xl p-4 md:p-5 border-teal-400/25 md:col-span-1 flex flex-col justify-between relative overflow-hidden group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[450ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 shrine-accent-bar opacity-75" />
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-teal-300 font-tech font-bold text-sm">
                  <Layout className="w-4 h-4 text-teal-400" />
                  <span>FRONTEND UI</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-200 border border-teal-400/35 font-tech">
                  90%
                </span>
              </div>

              <div className="w-full h-1 bg-slate-800/90 rounded-full mb-3 overflow-hidden">
                <div className="w-[90%] h-full bg-gradient-to-r from-teal-500 to-amber-300 shadow-[0_0_10px_rgba(45,212,191,0.7)]" />
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
                  className="px-2 py-0.5 rounded bg-teal-950/35 border border-teal-400/30 text-[11px] font-tech text-teal-200 hover:border-teal-300 hover:bg-teal-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 4: Database & DevOps Infrastructure — Kinpaku Gold Theme (Spans 2 cols) */}
          <div
            className={`shrine-glass kazari-corner kumiko-grid-bg rounded-xl p-4 md:p-5 border-amber-400/25 md:col-span-2 flex flex-col justify-between relative overflow-hidden group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[550ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 shrine-accent-bar opacity-75" />
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-tech font-bold text-sm">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>DATABASE & INFRASTRUCTURE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-200 border border-amber-400/35 font-tech">
                  HIGH OPTIMIZATION 90%
                </span>
              </div>

              <div className="w-full h-1 bg-slate-800/90 rounded-full mb-3 overflow-hidden">
                <div className="w-[90%] h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
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
                  className="px-2.5 py-1 rounded-md bg-amber-950/35 border border-amber-400/30 text-[11px] font-tech text-amber-200 hover:border-amber-300 hover:bg-amber-900/30 transition-all cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card 5: Soft Skills & Philosophy — Yozakura & Pearl Theme */}
          <div
            className={`shrine-glass kazari-corner kumiko-grid-bg rounded-xl p-4 md:p-5 border-rose-400/20 md:col-span-1 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 translate-y-0 filter blur-0 delay-[650ms]'
                : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 shrine-accent-bar opacity-75" />
            <div>
              <div className="flex items-center gap-2 text-amber-100 font-tech font-bold text-sm mb-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
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
                  className="px-2.5 py-1 rounded-md bg-rose-950/25 border border-rose-400/25 text-[11px] font-tech text-amber-100 hover:border-amber-400/45 transition-colors"
                >
                  <Cpu className="w-3 h-3 inline mr-1 text-rose-300" />
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
