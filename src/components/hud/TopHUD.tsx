import { useState } from 'react'
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles } from 'lucide-react'
import { CHAMBERS } from '../../hooks/useScrollSnap'

interface TopHUDProps {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
  activeChamber: number
  scrollToChamber: (index: number) => void
}

export function TopHUD({
  isMuted,
  toggleMute,
  playClick,
  activeChamber,
  scrollToChamber
}: TopHUDProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between border-b border-cyan-500/15 bg-[#07080d]/80 backdrop-blur-md">
        {/* Brand / Operator Callout */}
        <div
          onClick={() => {
            playClick()
            scrollToChamber(0)
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-sm md:text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                IRFANDY AZIZ
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-tech hidden sm:inline-block">
                DEV // 01
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-kanji tracking-wider flex items-center gap-1.5">
              <span>電脳開発者</span>
              <span className="text-cyan-500/40">•</span>
              <span className="font-tech text-cyan-400/80">FULL-STACK SYSTEM ARCHITECT</span>
            </div>
          </div>
        </div>

        {/* Center: System Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-tech text-slate-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold tracking-wide">SYSTEM: ONLINE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">STATUS:</span>
          <span className="text-cyan-300 font-medium">AVAILABLE FOR HIRE</span>
        </div>

        {/* Right Actions: Audio Toggle & Quick Nav */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Button */}
          <button
            onClick={() => {
              toggleMute()
              playClick()
            }}
            title={isMuted ? 'Aktifkan Efek Suara Sci-Fi' : 'Senyapkan Suara'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-tech transition-all cursor-pointer ${!isMuted
                ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500'
              }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">SFX: MUTED</span>
              </>
            )}
          </button>

          {/* Direct Transmit CTA Button */}
          <button
            onClick={() => {
              playClick()
              scrollToChamber(6) // Jump to Uplink / Contact
            }}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-md bg-gradient-to-r from-pink-600/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-500 border border-pink-400/40 text-xs font-semibold text-white tracking-wide shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>TRANSMIT</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-2 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080d]/95 backdrop-blur-xl pt-20 px-6 lg:hidden flex flex-col justify-between pb-8">
          <div className="space-y-2">
            <div className="text-xs font-tech text-cyan-400/80 mb-3 tracking-widest">
              // TELEMETRY NAVIGATION
            </div>
            {CHAMBERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  playClick()
                  scrollToChamber(idx)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border font-tech text-sm flex items-center justify-between transition-all ${activeChamber === idx
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-cyan-400/60">// {ch.code}</span>
                  <span className="font-semibold">{ch.label}</span>
                </div>
                <span className="font-kanji text-xs text-slate-500">{ch.kanji}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-tech text-slate-400 space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>STATUS:</span>
              <span className="text-emerald-400">AVAILABLE FOR HIRE ●</span>
            </div>
            <div className="text-[11px] text-slate-500">
              IRFANDY AZIZ • CIREBON
            </div>
          </div>
        </div>
      )}
    </>
  )
}
