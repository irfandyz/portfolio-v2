import { SERVICES_DATA } from '../../data/portfolioData'
import { Code2, ShoppingBag, Network, Database, ShieldAlert, Cpu, ArrowUpRight } from 'lucide-react'

interface ServicesSectionProps {
  playClick: () => void
  scrollToChamber: (index: number) => void
  isActive?: boolean
}

const SERVICE_ICONS = [Code2, ShoppingBag, Network, Database, ShieldAlert, Cpu]
const DELAY_CLASSES = [
  'delay-[200ms]',
  'delay-[280ms]',
  'delay-[360ms]',
  'delay-[440ms]',
  'delay-[520ms]',
  'delay-[600ms]',
]

export function ServicesSection({ playClick, scrollToChamber, isActive = true }: ServicesSectionProps) {
  const handleInquireService = () => {
    playClick()
    scrollToChamber(6) // Jump to Contact Chamber
  }

  return (
    <section 
      id="services"
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
              <span>// PROTOCOL 06</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              Professional Services <span className="font-kanji text-cyan-400/80 text-xl font-normal">[機能群]</span>
            </h2>
          </div>
          <button
            onClick={() => {
              playClick()
              scrollToChamber(6)
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-600/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-500 border border-pink-400/40 text-white text-xs font-tech font-bold cursor-pointer transition-all shadow-[0_0_15px_rgba(244,63,94,0.25)]"
          >
            <span>COMMISSION PROJECT</span>
            <span>→</span>
          </button>
        </div>

        {/* 6 Services Cyber Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-3 sm:gap-4 max-h-[80dvh] sm:max-h-[75dvh] overflow-y-auto cyber-scrollbar pr-1 sm:pr-2 py-1">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
            return (
              <div
                key={service.id}
                onClick={handleInquireService}
                className={`cyber-glass rounded-xl p-3.5 sm:p-5 border-cyan-500/20 hover:border-cyan-400/70 bg-[#090c17]/90 hover:bg-[#0d1222] transition-all duration-700 ease-out flex flex-col justify-between group cursor-pointer relative min-h-[165px] sm:min-h-[190px] h-auto shrink-0 ${
                  isActive
                    ? `opacity-100 translate-y-0 filter blur-0 ${DELAY_CLASSES[idx % DELAY_CLASSES.length]}`
                    : 'opacity-0 translate-y-8 filter blur-[3px] pointer-events-none'
                }`}
              >
                {/* Top Subtle Accent Strip on Hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-tech text-slate-500 group-hover:text-cyan-400 transition-colors">
                        {service.code}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {service.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] sm:text-[10px] font-tech text-cyan-400/80 group-hover:border-cyan-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
