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

import { useState } from 'react'
import { CyberCursor } from './components/ui/CyberCursor'
import { GateIntroPrompt } from './components/ui/GateIntroPrompt'

export function App() {
  const { isMuted, toggleMute, unmuteAndPlay, playClick, playHoloBeam, playWarp, volume, setVolume, trackTitle, nextTrack } = useAudio()
  const { activeChamber, containerRef, scrollToChamber } = useScrollSnap()

  const [isEntered, setIsEntered] = useState<boolean>(false)
  const [isWarping, setIsWarping] = useState<boolean>(false)

  const handleEnter = () => {
    if (isEntered || isWarping) return
    setIsWarping(true)
    playClick()
    playWarp()
    playHoloBeam()
    unmuteAndPlay()

    // 1.1s walking through gate + 1.6s shrine slowly approaching = 2.7s total cinematic entrance
    setTimeout(() => {
      setIsWarping(false)
      setIsEntered(true)
    }, 2700)
  }

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#07080d] text-slate-100 font-sans select-none">
      {/* 3D Gate Entrance Prompt (Active before entering) */}
      {!isEntered && (
        <GateIntroPrompt
          onEnter={handleEnter}
          isWarping={isWarping}
        />
      )}

      {/* Sci-Fi Crosshair Cursor on Desktop */}
      <CyberCursor />

      {/* Unified Continuous 3D World (Fixed across all Chambers) */}
      <GlobalCyberScene3D
        activeChamber={activeChamber}
        isEntered={isEntered}
        isWarping={isWarping}
      />

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

      {/* Side Vertical Radar Navigation (Revealed when entered) */}
      <div className={`transition-opacity duration-1000 ${isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <SideRadar
          activeChamber={activeChamber}
          scrollToChamber={scrollToChamber}
          playClick={playClick}
        />
      </div>

      {/* Main Fullscreen Scroll-Snap Container (100dvh 7 Chambers) */}
      <main
        ref={containerRef}
        className={`h-[100dvh] w-full snap-y snap-mandatory scroll-smooth relative z-10 focus:outline-none ${
          isEntered ? 'overflow-y-scroll' : 'overflow-hidden pointer-events-none'
        }`}
        tabIndex={0}
      >
        {/* Chamber 01: Hero // Inner Cyber Shrine Sanctuary */}
        <HeroSection
          playClick={playClick}
          scrollToChamber={scrollToChamber}
          isEntered={isEntered}
        />

        {/* Chamber 02: Operator Dossier // Identity & Tech Matrix */}
        <DossierSection
          playClick={playClick}
          isActive={isEntered && activeChamber === 1}
        />

        {/* Chamber 03: Showcase // Central Hologram Chamber */}
        <ShowcaseSection
          playClick={playClick}
          playHoloBeam={playHoloBeam}
          isActive={isEntered && activeChamber === 2}
        />

        {/* Chamber 04: Career Logs // Chrono-Console */}
        <CareerSection
          playClick={playClick}
          playHoloBeam={playHoloBeam}
          isActive={isEntered && activeChamber === 3}
        />

        {/* Chamber 05: Academic Matrix // Education Credentials */}
        <AcademicSection
          playClick={playClick}
          isActive={isEntered && activeChamber === 4}
        />

        {/* Chamber 06: Capabilities // Professional Services */}
        <ServicesSection
          playClick={playClick}
          scrollToChamber={scrollToChamber}
          isActive={isEntered && activeChamber === 5}
        />

        {/* Chamber 07: Direct Uplink // Contact */}
        <ContactSection
          playClick={playClick}
          playHoloBeam={playHoloBeam}
          isActive={isEntered && activeChamber === 6}
        />
      </main>
    </div>
  )
}

export default App
