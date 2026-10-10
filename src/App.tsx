import { useAudio } from './hooks/useAudio'
import { useScrollSnap } from './hooks/useScrollSnap'
import { SideRadar } from './components/hud/SideRadar'
import { AudioBubble } from './components/ui/AudioBubble'
import { GlobalCyberScene3D } from './components/3d/GlobalCyberScene3D'
import { HeroSection } from './components/sections/HeroSection'
import { DossierSection } from './components/sections/DossierSection'
import { ShowcaseSection } from './components/sections/ShowcaseSection'
import { CareerSection } from './components/sections/CareerSection'
import { AcademicSection } from './components/sections/AcademicSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ContactSection } from './components/sections/ContactSection'

import { CyberCursor } from './components/ui/CyberCursor'
import { TheaterCurtain } from './components/ui/TheaterCurtain'

export function App() {
  const { isMuted, toggleMute, unmuteAndPlay, playClick, playHoloBeam, volume, setVolume, trackTitle, nextTrack } = useAudio()
  const { activeChamber, containerRef, scrollToChamber } = useScrollSnap()

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#07080d] text-slate-100 font-sans select-none">
      {/* Theatrical Grand Entrance Crimson Curtain */}
      <TheaterCurtain
        onOpen={unmuteAndPlay}
        playClick={playClick}
        playHoloBeam={playHoloBeam}
      />

      {/* Sci-Fi Crosshair Cursor on Desktop */}
      <CyberCursor />

      {/* Unified Continuous 3D World (Fixed across all 7 Chambers) */}
      <GlobalCyberScene3D activeChamber={activeChamber} />

      {/* Background Cyber Ambient CRT Scanline Grid */}
      <div className="fixed inset-0 cyber-scanline pointer-events-none z-20 opacity-35" />

      {/* Floating Audio SFX Bubble (Top Right) */}
      <AudioBubble
        isMuted={isMuted}
        toggleMute={toggleMute}
        playClick={playClick}
        volume={volume}
        setVolume={setVolume}
        trackTitle={trackTitle}
        nextTrack={nextTrack}
      />

      {/* Side Vertical Radar Navigation */}
      <SideRadar
        activeChamber={activeChamber}
        scrollToChamber={scrollToChamber}
        playClick={playClick}
      />

      {/* Main Fullscreen Scroll-Snap Container (100dvh 7 Chambers) */}
      <main
        ref={containerRef}
        className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10 focus:outline-none"
        tabIndex={0}
      >
        {/* Chamber 01: Hero // Cyber Gateway */}
        <HeroSection playClick={playClick} scrollToChamber={scrollToChamber} />

        {/* Chamber 02: Operator Dossier // Identity & Tech Matrix */}
        <DossierSection playClick={playClick} />

        {/* Chamber 03: Showcase // Central Hologram Chamber */}
        <ShowcaseSection playClick={playClick} playHoloBeam={playHoloBeam} />

        {/* Chamber 04: Career Logs // Chrono-Console */}
        <CareerSection playClick={playClick} playHoloBeam={playHoloBeam} />

        {/* Chamber 05: Academic Matrix // Education Credentials */}
        <AcademicSection playClick={playClick} />

        {/* Chamber 06: Capabilities // Professional Services */}
        <ServicesSection playClick={playClick} scrollToChamber={scrollToChamber} />

        {/* Chamber 07: Direct Uplink // Contact */}
        <ContactSection playClick={playClick} playHoloBeam={playHoloBeam} />
      </main>
    </div>
  )
}

export default App
