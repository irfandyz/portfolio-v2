import { useState } from 'react'
import { OPERATOR_PROFILE } from '../../data/portfolioData'
import { Mail, Phone, Send, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react'

interface ContactSectionProps {
  playClick: () => void
  playHoloBeam: () => void
}

export function ContactSection({ playClick, playHoloBeam }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playHoloBeam()
    setIsTransmitting(true)

    setTimeout(() => {
      setIsTransmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 5000)
    }, 800)
  }

  // Pre-filled WhatsApp transmission URL
  const waCustomUrl = `https://wa.me/6289687186597?text=${encodeURIComponent(
    'Halo Irfandy Aziz, saya telah melihat portfolio Anda dan ingin mendiskusikan peluang kerja sama / proyek pengembangan aplikasi web.'
  )}`

  return (
    <section 
      id="contact"
      className="relative w-full h-[100dvh] flex items-center justify-center snap-start snap-always overflow-hidden px-4 md:px-12 py-6 md:py-8"
    >
      {/* Background scanline subtle */}
      <div className="absolute inset-0 cyber-scanline opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 md:mb-5">
          <div>
            <div className="text-[11px] font-tech text-cyan-400 tracking-widest flex items-center gap-2">
              <span>// PROTOCOL 07</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">DIRECT UPLINK TRANSMISSION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              Connect With Operator <span className="font-kanji text-cyan-400/80 text-xl font-normal">[通信路]</span>
            </h2>
          </div>
          <div className="hidden sm:block text-right font-tech text-xs text-slate-400">
            <div>CHROMA: 256-BIT ENCRYPTION</div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>COMM CHANNEL READY ●</span>
            </div>
          </div>
        </div>

        {/* Contact Terminal Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 max-h-[73dvh] overflow-y-auto cyber-scrollbar pr-1">
          {/* Left: Quick Frequencies (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="cyber-glass rounded-xl p-4 md:p-5 border-cyan-500/20 bg-[#090c17]/90 space-y-3 relative overflow-hidden">
              <div className="text-xs font-tech text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>DIRECT ACCESS FREQUENCIES:</span>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href={waCustomUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-tech font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      WhatsApp Instant Chat
                    </div>
                    <div className="text-[11px] text-slate-400 font-tech">
                      {OPERATOR_PROFILE.contacts.whatsapp}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-tech group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              {/* Email Link */}
              <a
                href={`mailto:${OPERATOR_PROFILE.contacts.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                onClick={playClick}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-tech font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      Direct Email Address
                    </div>
                    <div className="text-[11px] text-slate-400 font-tech">
                      {OPERATOR_PROFILE.contacts.email}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-cyan-400 font-tech group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={OPERATOR_PROFILE.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex flex-col items-center justify-center gap-1.5 transition-all group text-center"
                >
                  <svg className="w-4 h-4 text-cyan-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="text-[10px] font-tech font-semibold">GitHub</span>
                </a>

                <a
                  href={OPERATOR_PROFILE.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex flex-col items-center justify-center gap-1.5 transition-all group text-center"
                >
                  <svg className="w-4 h-4 text-cyan-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z"/>
                  </svg>
                  <span className="text-[10px] font-tech font-semibold">LinkedIn</span>
                </a>

                <a
                  href={OPERATOR_PROFILE.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-400/60 text-slate-300 hover:text-pink-300 flex flex-col items-center justify-center gap-1.5 transition-all group text-center"
                >
                  <svg className="w-4 h-4 text-pink-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-[10px] font-tech font-semibold">Instagram</span>
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] font-tech text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>LOCATION: {OPERATOR_PROFILE.location}</span>
              </span>
              <span className="text-cyan-400 font-semibold">UTC+7 (WIB)</span>
            </div>
          </div>

          {/* Right: Message Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="cyber-glass rounded-xl p-4 md:p-6 border-cyan-500/20 bg-[#090c17]/92 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <span className="text-xs font-tech text-pink-400 font-semibold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  <span>// TRANSMIT MESSAGE PACKET TO IRFANDY AZIZ</span>
                </span>
                <span className="text-[10px] font-tech text-slate-500">FORMAT: UTF-8</span>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/70 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] animate-pulse">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-tech">TRANSMISSION CONFIRMED</h4>
                  <p className="text-xs text-slate-300 max-w-sm font-light leading-relaxed">
                    Paket pesan Anda telah diterima di terminal komunikasi. Irfandy Aziz akan segera membalas transmisi ini melalui email / kontak Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-tech text-slate-400 mb-1">
                      OPERATOR_CALLSIGN / NAMA LENGKAP:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Irfan / PT. Partner Logistik"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-xs font-tech text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech text-slate-400 mb-1">
                      COMMUNICATION_FREQUENCY / ALAMAT EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-xs font-tech text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech text-slate-400 mb-1">
                      DATA_PAYLOAD / PESAN PROYEK:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan kebutuhan aplikasi web, arsitektur backend, atau pertanyaan Anda..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-xs font-tech text-slate-100 placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-pink-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-bold text-xs font-tech flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isTransmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>ENCRYPTING & TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT PACKET TO IRFANDY AZIZ</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
