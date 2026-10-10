# 🗺️ Implementation Roadmap: Cyber-Japan 3D Portfolio
**Project:** Irfandy Aziz — Cyber-Japan 3D Personal Portfolio  
**Aligned with:** [PLANNING.md](file:///c:/Data/Coding/portfoliov2/PLANNING.md) & [portfolio.md](file:///c:/Data/Coding/portfoliov2/portfolio.md)  
**Status:** Ready to Execute  
**Version:** 1.0.0  

---

## 📌 Gambaran Alur Pengerjaan (Timeline Diagram)

```
[ PHASE 0: SETUP & SCAFFOLDING ]
                │
                ▼
[ PHASE 1: GLOBAL HUD & SCROLL-SNAP SYSTEM ]
                │
                ▼
[ PHASE 2: 3D CYBER HERO STAGE (CHAMBER 01) ]
                │
                ▼
[ PHASE 3: OPERATOR DOSSIER & TECH MATRIX (CHAMBER 02) ]
                │
                ▼
[ PHASE 4: CENTRAL HOLOGRAM PROJECTOR (CHAMBER 03) ]
                │
                ▼
[ PHASE 5: CAREER CHRONO-CONSOLE (CHAMBER 04) ]
                │
                ▼
[ PHASE 6: ACADEMIC CREDENTIALS MATRIX (CHAMBER 05) ]
                │
                ▼
[ PHASE 7: CAPABILITIES & DIRECT UPLINK (CHAMBERS 06 & 07) ]
                │
                ▼
[ PHASE 8: AUDIO FX, POLISH & PERFORMANCE 60 FPS ]
```

---

## 🚀 Rincian Fase Pengerjaan

### 🟢 FASE 0: Inisialisasi Proyek & Pondasi Sistem (*Scaffolding*) — [SELESAI ✅]
- [x] Inisialisasi project **Vite + React + TypeScript** di root directory.
- [x] Instalasi paket styling & motion:
  - `tailwindcss`, `@tailwindcss/vite`
  - `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`
- [x] Instalasi paket 3D & Graphics:
  - `three`, `@types/three`
  - `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- [x] Setup Design Tokens di `index.css`:
  - **Color Palette:** Deep Void (`#07080d`), Cyber Cyan (`#00f0ff`), Hot Magenta (`#ff0055`), Tokyo Amber (`#ffe600`), Neon Emerald (`#00ff88`).
  - **Typography:** *Space Grotesk* (Headers), *JetBrains Mono* (Code/Data), *Syne* (Display), *Noto Sans JP* (Kanji).
  - **Utility Effects:** Scanlines, glowing borders, chamfered corner cuts, glassmorphism.
- [x] Favicon Cyber Torii & SEO metadata di `index.html`.
- [x] Struktur data terpusat dari `portfolio.md` di `src/data/portfolioData.ts`.
- [x] Engine audio prosedural Web Audio API di `src/hooks/useAudio.ts`.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 1: Global HUD & Fullscreen Scroll-Snap Engine — [SELESAI ✅]
- [x] Membangun layout container **Scroll-Snap** dengan tinggi `100dvh` untuk 7 Chambers di [src/App.tsx](file:///c:/Data/Coding/portfoliov2/src/App.tsx).
- [x] Menambahkan navigasi keyboard (`Arrow Up / Down`, `Page Up / Down`, `Home / End`) untuk berpindah section secara mulus di [src/hooks/useScrollSnap.ts](file:///c:/Data/Coding/portfoliov2/src/hooks/useScrollSnap.ts).
- [x] Membangun komponen **Top HUD Header** ([src/components/hud/TopHUD.tsx](file:///c:/Data/Coding/portfoliov2/src/components/hud/TopHUD.tsx)):
  - Logo Kanji & Nama: `IRFANDY AZIZ // 電脳開発者`
  - Status indicator: `● SYSTEM: ONLINE | AVAILABLE FOR HIRE`
  - Audio switch: Toggle SFX Ambient & Click (Mute default).
  - Mobile quick menu drawer.
- [x] Membangun komponen **Side Radar Pagination** di sisi kanan ([src/components/hud/SideRadar.tsx](file:///c:/Data/Coding/portfoliov2/src/components/hud/SideRadar.tsx)):
  - Indikator neon vertikal `// 01` hingga `// 07`.
  - Animasi aktif mengikuti chamber yang sedang tampil di layar.
  - Fitur klik pada indikator untuk melompat langsung ke chamber terkait dengan efek suara.
- [x] Menyiapkan service audio prosedural (*Web Audio API*) untuk efek suara klik taktis sci-fi di [src/hooks/useAudio.ts](file:///c:/Data/Coding/portfoliov2/src/hooks/useAudio.ts).
- [x] Membangun komponen **Bottom Telemetry** ([src/components/hud/BottomTelemetry.tsx](file:///c:/Data/Coding/portfoliov2/src/components/hud/BottomTelemetry.tsx)) dengan jam real-time WIB (UTC+7), indikator FPS, dan navigation hints.
- [x] Dev server berjalan aktif di `http://localhost:5173/`.

---

### 🟢 FASE 2: 3D Cyber Hero Stage (Chamber 01) — [SELESAI ✅]
- [x] Membangun kanvas 3D **React Three Fiber (R3F)** untuk latar Hero di [src/components/3d/HeroScene3D.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/HeroScene3D.tsx).
- [x] Membuat model geometri 3D:
  - **Cybernetic Torii Gate:** Pilar wireframe neon cyan & magenta yang megah di [src/components/3d/ToriiGate3D.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/ToriiGate3D.tsx).
  - **Cyber Guardian Kitsune Statues (電脳狛狐):** Sepasang patung rubah penjaga siber di kiri & kanan gerbang ([CyberKitsune3D.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/CyberKitsune3D.tsx)), lengkap dengan pedestal futuristik, mata laser, ekor melengkung dinamis, dan bola pusaka spirit (*Hoshi-no-tama*).
  - **Infinite Floor Grid:** Grid lantai perspektif neon yang bergerak dinamis di [src/components/3d/InfiniteCyberGrid.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/InfiniteCyberGrid.tsx).
- [x] Menambahkan **Post-Processing Shaders**:
  - `Bloom` (Pendaran neon glow dramatis 1.5 intensity).
  - `Vignette` sinematik untuk kedalaman visual.
- [x] Menambahkan interaktivitas **Mouse Gyro-Parallax**: Kamera dan objek 3D bergerak halus merespons kursor mouse.
- [x] Typografi Hero lengkap di [src/components/sections/HeroSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/HeroSection.tsx) dengan watermark kanji `電脳東京建築` dan tombol CTA interaktif.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 3: Operator Dossier & Tech Matrix (Chamber 02) — [SELESAI ✅]
- [x] Membangun layout **Bento Grid Sci-Fi** di 1 layar penuh pada [src/components/sections/DossierSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/DossierSection.tsx).
- [x] **Card 1 (Operator Profile ID):**
  - Frame avatar cyberpunk menggunakan foto asli (`/profile.png`), nama lengkap, spesialisasi *Clean Code & Scalable Architecture*, status *Available*, dan tombol salin email instan.
- [x] **Card 2 (Backend & Architecture Core):**
  - PHP, Laravel, CodeIgniter, Node.js, RESTful API, Clean Architecture, RBAC.
  - Visual telemetri progress bar keahlian *95% Advanced Proficiency*.
- [x] **Card 3 (Frontend & Creative Interface):**
  - Vue.js 3, React, Three.js / R3F, Tailwind CSS, GSAP dengan progress bar *90%*.
- [x] **Card 4 (Database & DevOps Infrastructure):**
  - MySQL, PostgreSQL, MongoDB, Linux VPS Configuration, Git dengan progress bar *88%*.
- [x] **Card 5 (Core Philosophy & Soft Skills):**
  - *Clean Code, Scalability, & User-Centric Experience*.
  - Problem Solving, Analytical Thinking, Team Collaboration.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 4: Central Hologram Projector Chamber (Chamber 03) — [SELESAI ✅]
- [x] Membangun panggung **3D Central Hologram Projector**:
  - Model 3D **Projector Pedestal Ring** di lantai dengan cincin pendar laser vertikal di [src/components/3d/HologramPedestal3D.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/HologramPedestal3D.tsx).
  - Komponen **Curved Holographic Screen** di tengah layar dengan tekstur scanline & frame sudut siber di [src/components/sections/ShowcaseSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/ShowcaseSection.tsx).
- [x] Mengintegrasikan 6 Proyek Unggulan dengan mockup aset nyata dari `/projects/`:
  1. **TMS (Transportation Management System)** — `/projects/tms.png` *(Full-Stack)*
  2. **Sekolah Iklan App (SI APP)** — `/projects/si_app.webp` *(Backend - Laravel & Flutter)*
  3. **HRMS (Human Resource Management System)** — `/projects/hris.png` *(Backend - Node.js & Biometrics)*
  4. **Aplikasi Infrastruktur & Administrasi Sekolah** — `/projects/infrastructure.png` *(Full-Stack)*
  5. **Website Profil CV. Mandiri Cipta Adikarya** — `/projects/mandiri_cipta_adikarya.png` *(Full-Stack)*
  6. **Website Portfolio Pribadi** — `/projects/portfolio.png` *(Frontend)*
- [x] Membangun kontrol navigasi:
  - Tombol samping `[ ◀ PREV_SYS ]` dan `[ NEXT_SYS ▶ ]`.
  - Thumbnail dock mini di bawah untuk memilih proyek secara langsung.
- [x] Memprogram animasi transisi:
  - **Fase De-materialize:** Glitch laser & dekonstruksi hologram saat tombol ditekan.
  - **Fase Materialize:** Berkas laser proyektor 3D berdenyut menyusun kembali data proyek berikutnya.
  - Efek suara desis laser hologram (*Web Audio API*) saat transisi terjadi.
- [x] Menambahkan modal **System Blueprint Dossier** ([src/components/ui/ProjectBlueprintModal.tsx](file:///c:/Data/Coding/portfoliov2/src/components/ui/ProjectBlueprintModal.tsx)) untuk membaca rincian spesifikasi arsitektur lengkap saat tombol `[ VIEW BLUEPRINT ]` ditekan.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 5: Career Chrono-Console (Chamber 04) — [SELESAI ✅]
- [x] Membangun layout **Dual-Zone Cyber Console** di [src/components/sections/CareerSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/CareerSection.tsx):
  - **Zona Atas-Tengah (65% Layar):** Monitor rincian karier yang lapang, jelas, dan bebas teks menumpuk.
  - **Zona Bawah (35% Layar):** Selector Dock dengan 4 kaset data mini horizontal.
- [x] Mengisi data 4 Riwayat Karier lengkap:
  1. `2019 – 2020:` **CV. Orbit Indonesia Persada** *(Junior Web Developer)*
  2. `2021 – 2022:` **PT. Java Genius All Technology** *(Full-Stack Developer)*
  3. `2022 – 2025:` **Rittercoding** *(Full-Stack Developer • 3 Tahun)*
  4. `2025 – 2026:` **PT. Uniteda Arkato** *(IT Engineer - TMS)*
- [x] Memprogram interaktivitas:
  - Efek suara klik taktis (*Web Audio API*) saat kartu di dock bawah diklik.
  - Garis laser pulsa menyala di kartu aktif dock bawah.
  - Animasi transisi data (*glitch decode wipe*) pada monitor atas.
  - Tombol chip teknologi interaktif dengan trigger audio.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 6: Academic Matrix Credentials (Chamber 05) — [SELESAI ✅]
- [x] Membangun layout **Dual Holographic Credential Cards** di [src/components/sections/AcademicSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/AcademicSection.tsx):
  - Dua kartu kembar simetris berdampingan di tengah layar (Kiri & Kanan).
- [x] **Kartu Kiri (Higher Education):**
  - **Universitas Catur Insan Cendekia** *(2023 – 2026)* — D3 Manajemen Informatika.
  - Poin keilmuan: Perancangan Sistem Informasi, Basis Data Relasional, Analisis Bisnis IT, Arsitektur Aplikasi.
- [x] **Kartu Kanan (Vocational Foundation):**
  - **SMK Informatika Al-Irsyad Al-Islamiyyah Kota Cirebon** *(2019 – 2021)* — Rekayasa Perangkat Lunak.
  - Poin keilmuan: Algoritma & logika pemrograman, pemrograman web, dasar OOP & database.
- [x] Menambahkan grafis sirkuit PCB trace neon dan bridge timeline kontinuitas belajar dengan feedback audio.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 7: Capabilities & Direct Transmission (Chambers 06 & 07) — [SELESAI ✅]
- [x] **Chamber 06 (Capabilities & Services):**
  - Menampilkan 6 Layanan Profesional dalam format Cyber Bento Box di [src/components/sections/ServicesSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/ServicesSection.tsx):
    1. *Custom Web Application Development*
    2. *E-Commerce & Digital Systems*
    3. *API Development & Integration*
    4. *Database Architecture & Optimization*
    5. *Maintenance & Technical Security Support*
    6. *Technical Consultation & Code Review*
  - Kartu bento interaktif yang dapat diklik langsung untuk melompat ke kontak.
- [x] **Chamber 07 (Direct Transmission / Contact):**
  - Form pengiriman pesan interaktif bergaya terminal paket di [src/components/sections/ContactSection.tsx](file:///c:/Data/Coding/portfoliov2/src/components/sections/ContactSection.tsx).
  - Akses frekuensi langsung dengan pre-filled template:
    - **WhatsApp:** `+62 896-8718-6597` (Direct link dengan pesan pengantar)
    - **Email:** `irfandyzize@gmail.com`
    - **GitHub:** `github.com/irfandyz`
    - **LinkedIn:** `linkedin.com/in/irfandy-aziz`
    - **Instagram:** `@iruu.diy`
  - Jam digital real-time `WIB (UTC+7)` & status terminal online.
- [x] Build check lulus 100% tanpa error (`npm run build`).

---

### 🟢 FASE 8: Polish, Responsive Mobile & Optimasi Performa 60 FPS — [SELESAI ✅]
- [x] Optimasi rendering Three.js (DPR limiting 1.0–1.5, memory disposal, shader lightweight) berjalan stabil 60 FPS.
- [x] Adaptasi tampilan Mobile:
  - Responsive padding, font scaling, dan scrolling internal aman tanpa overflow.
  - Mobile quick menu drawer di Top HUD.
- [x] **Cyber Audio Engine ([useAudio.ts](file:///c:/Data/Coding/portfoliov2/src/hooks/useAudio.ts) & [AudioBubble.tsx](file:///c:/Data/Coding/portfoliov2/src/components/ui/AudioBubble.tsx)):**
  - Mengintegrasikan BGM resmi `/sound/bgm.mp3` secara looping dengan volume ambient seimbang (`0.22`).
  - Mengintegrasikan efek suara klik taktis `/sound/click.mp3` dengan sistem multi-instance audio pool untuk memastikan respon instan (zero latency) pada setiap tombol.
  - Floating Audio Bubble di pojok kanan atas dengan animasi visualizer equalizer saat aktif.
  - State mute/unmute tersimpan otomatis di localStorage.
- [x] **Unified Continuous 3D World ([GlobalCyberScene3D.tsx](file:///c:/Data/Coding/portfoliov2/src/components/3d/GlobalCyberScene3D.tsx)):**
  - Menggabungkan seluruh chamber ke dalam 1 Kanvas WebGL tunggal yang menyambung secara kontinu tanpa background flat.
  - 7 Landmark siber dinamis: Torii Gate (Hero), Data Citadel Monoliths (Dossier), Hologram Pedestal Laser Rings (Showcase), Chrono-Stream Warp Rails (Career), Neural Lattice Circuit Bridge (Academic), Modular Geometric Crystals (Capabilities), dan Uplink Laser Beacon (Contact).
  - Kamera lerp dinamis + mouse gyro-parallax yang halus di semua chamber.
- [x] Production build test sukses tanpa warning fatal (`npm run build`).

---

## 🏁 Kriteria Keberhasilan (*Definition of Done*)
1. ✅ Seluruh 7 Chamber scroll-snap beroperasi mulus di resolusi desktop dan mobile.
2. ✅ 3D Scene Hero dan Proyektor Hologram berjalan lancar di 60 FPS dengan efek bloom menyala.
3. ✅ Tidak ada teks yang menumpuk atau terpotong di Career Logs dan Academic Matrix.
4. ✅ Seluruh riwayat pengalaman, pendidikan, dan proyek dari `portfolio.md` tertampil akurat.
5. ✅ Form kontak & direct link WhatsApp berfungsi langsung saat diklik.
