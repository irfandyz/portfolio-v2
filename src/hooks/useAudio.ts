import { useState, useEffect, useCallback, useRef } from 'react'

export function useAudio() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('cyber_audio_muted')
    return saved !== null ? JSON.parse(saved) : true // Default muted for respectful initial load
  })

  // Master Volume State (0.0 to 1.0)
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('cyber_audio_volume')
    return saved !== null ? Number(JSON.parse(saved)) : 0.75 // Default 75% volume
  })

  // Dual Track Playlist: track-1.mp3 & track-2.mp3
  const [trackIndex, setTrackIndex] = useState<number>(0)
  const trackIndexRef = useRef<number>(0)

  // Background Music Ref
  const bgmRef = useRef<HTMLAudioElement | null>(null)

  // Click Audio Pool for instantaneous zero-latency playback
  const clickPoolRef = useRef<HTMLAudioElement[]>([])
  const clickIdxRef = useRef<number>(0)

  // Web Audio Context for secondary procedural SFX (hologram beam, warp)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Switch to specific track in playlist
  const switchTrack = useCallback((index: number, autoPlayIfUnmuted: boolean = true) => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const tracks = ['sound/track-1.mp3', 'sound/track-2.mp3']
    const nextIdx = index % tracks.length

    trackIndexRef.current = nextIdx
    setTrackIndex(nextIdx)

    if (bgmRef.current) {
      bgmRef.current.pause()
      bgmRef.current.src = `${baseUrl}${tracks[nextIdx]}`
      bgmRef.current.currentTime = 0
      bgmRef.current.load()

      if (autoPlayIfUnmuted && !isMuted) {
        bgmRef.current.play().catch(() => {
          // Handled: browser autoplay restrictions
        })
      }
    }
  }, [isMuted])

  // Skip or go to next track
  const nextTrack = useCallback(() => {
    const nextIdx = (trackIndexRef.current + 1) % 2
    switchTrack(nextIdx, true)
  }, [switchTrack])

  // Initialize Audio Instances on client mount
  useEffect(() => {
    const savedVol = localStorage.getItem('cyber_audio_volume')
    const currentVol = savedVol !== null ? Number(JSON.parse(savedVol)) : 0.75
    const baseUrl = import.meta.env.BASE_URL || '/'

    // 1. Initialize BGM with track-1.mp3 (loop = false to enable automatic alternation)
    const bgm = new Audio(`${baseUrl}sound/track-1.mp3`)
    bgm.loop = false
    bgm.volume = currentVol
    bgmRef.current = bgm

    // Handle track completion: automatically rotate to next track!
    const handleEnded = () => {
      const nextIdx = (trackIndexRef.current + 1) % 2
      trackIndexRef.current = nextIdx
      setTrackIndex(nextIdx)
      bgm.src = `${baseUrl}${nextIdx === 0 ? 'sound/track-1.mp3' : 'sound/track-2.mp3'}`
      bgm.currentTime = 0
      bgm.load()
      bgm.play().catch(() => {})
    }

    bgm.addEventListener('ended', handleEnded)

    // 2. Initialize Click Pool (4 instances for overlapping rapid clicks)
    const pool: HTMLAudioElement[] = []
    for (let i = 0; i < 4; i++) {
      const click = new Audio(`${baseUrl}sound/click.mp3`)
      click.volume = Math.min(1, currentVol * 1.15)
      pool.push(click)
    }
    clickPoolRef.current = pool

    return () => {
      bgm.removeEventListener('ended', handleEnded)
      bgm.pause()
      bgm.src = ''
    }
  }, [])

  // Manage BGM play / pause according to mute state
  useEffect(() => {
    const bgm = bgmRef.current
    if (!bgm) return

    if (!isMuted) {
      bgm.play().catch(() => {
        // Handled: Browser autoplay policy requires user interaction first
      })
    } else {
      bgm.pause()
    }
  }, [isMuted])

  // Get Web Audio Context for procedural effects
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  // Set Master Volume
  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, Math.round(val * 100) / 100))
    setVolumeState(clamped)
    localStorage.setItem('cyber_audio_volume', JSON.stringify(clamped))

    if (bgmRef.current) {
      bgmRef.current.volume = clamped
    }
    if (clickPoolRef.current) {
      clickPoolRef.current.forEach((c) => {
        c.volume = Math.min(1, clamped * 1.15)
      })
    }
  }, [])

  // Toggle Mute with LocalStorage persistence and BGM trigger
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      localStorage.setItem('cyber_audio_muted', JSON.stringify(next))
      if (!next && bgmRef.current) {
        bgmRef.current.play().catch(() => {})
      } else if (next && bgmRef.current) {
        bgmRef.current.pause()
      }
      return next
    })
  }, [])

  // Force unmute and start BGM playback (e.g., from Theater Curtain Unveil)
  const unmuteAndPlay = useCallback(() => {
    setIsMuted(false)
    localStorage.setItem('cyber_audio_muted', JSON.stringify(false))
    if (bgmRef.current) {
      bgmRef.current.play().catch(() => {})
    }
  }, [])

  // Play Button Click SFX using the user's /sound/click.mp3
  const playClick = useCallback(() => {
    if (isMuted) return

    // Ensure BGM is playing if unmuted
    if (bgmRef.current && bgmRef.current.paused) {
      bgmRef.current.play().catch(() => {})
    }

    const pool = clickPoolRef.current
    if (pool.length > 0) {
      const audio = pool[clickIdxRef.current % pool.length]
      clickIdxRef.current++
      audio.currentTime = 0
      audio.play().catch(() => {
        // Fallback to Web Audio procedural if audio element is blocked
        const ctx = getAudioContext()
        if (ctx) {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(1200, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04)
          gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.04)
        }
      })
    }
  }, [isMuted, volume, getAudioContext])

  // Hologram Beam / Laser Materialize Sound (Synthesizer)
  const playHoloBeam = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(280, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.18)

      gain.gain.setValueAtTime(0.12 * volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.18)
    } catch {
      // Audio fallback
    }
  }, [isMuted, volume, getAudioContext])

  // Chamber Warp / Glitch Sound
  const playWarp = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(450, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.1 * volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.12)
    } catch {
      // Audio fallback
    }
  }, [isMuted, volume, getAudioContext])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return {
    isMuted,
    toggleMute,
    unmuteAndPlay,
    playClick,
    playHoloBeam,
    playWarp,
    volume,
    setVolume,
    trackIndex,
    nextTrack,
    switchTrack,
    trackTitle: trackIndex === 0 ? 'TRACK-01' : 'TRACK-02'
  }
}
