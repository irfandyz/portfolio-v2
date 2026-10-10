# 🌌 Master Blueprint & Architecture Plan: Cyber-Japan 3D Portfolio
**Owner:** Irfandy Aziz — Full-Stack Developer / IT Developer  
**Concept:** Cyber-Japan / Neo-Tokyo Terminal • 3D Hologram Chamber • Fullscreen Scroll-Snap  
**Version:** 1.0.0  

---

## 1. Executive Summary & Evaluasi Konsep

### Konsep Scroll-Snap (1 Screen = 1 Section)
Pilihan menggunakan **Scroll-Snap Fullscreen (100dvh)** adalah keputusan arsitektur yang **sangat tepat** untuk tema ini, karena:
1. **Atmosfer Sinematik (*Theatrical & Immersive*):** Setiap perpindahan layar terasa seperti beralih antar-modul antarmuka (*deck interface*), bukan sekadar membaca halaman artikel biasa.
2. **Kamera 3D & Hologram Tetap Presisi:** Pada layar Showcase Proyek, proyektor hologram berada tepat di tengah tanpa risiko terpotong oleh scrolling yang tidak beraturan (*clipping*).
3. **Penyajian Data Berbobot:** Konten dari setiap bagian (Profil, Proyek, Pengalaman, Layanan, Kontak) terfokus 100% pada pandangan pengunjung.
4. **Mobile & Screen-Height Safety Rule:** Pada layar smartphone atau layar ringkas, section yang padat konten dilengkapi dengan `overflow-y: auto` internal dengan scrollbar neon kustom, sehingga konten tidak akan pernah terpotong (*clipped*).

---

## 2. Navigasi Global & HUD Overlay

Antarmuka HUD melayang (*fixed HUD layer*) di atas kanvas 3D yang selalu aktif di semua section:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [⬡ IRFANDY.AZIZ // 電脳]         [● SYSTEM: ONLINE]     [SFX: ON] [MENU]│
│                                                                        │
│                                                                   //01 │
│                                                                    ─── │
│                      [ VIEWPORT 100dvh CONTENT ]                  //02 │
│                                                                    ─── │
│                                                                   //03 │
│                                                                    ─── │
│                                                                   //04 │
│                                                                        │
│ [STATUS: 60 FPS]                          [SCROLL OR USE ARROW KEYS ▼] │
└────────────────────────────────────────────────────────────────────────┘
```

* **Top HUD Header:**
  * Logo & Typografi: `IRFANDY AZIZ // 電脳開発者` (Cyber Developer)
  * System Badge: Status `● AVAILABLE FOR HIRE`
  * Audio Synthesizer Toggle: Musik latar ambient / klik sci-fi (Default: Mute)
* **Right HUD Pagination (Side Radar):**
  * Indikator section bernomor (`// 01` s/d `// 07`) dengan garis pendar neon yang menandai posisi section saat ini. Dapat diklik untuk lompat langsung ke section terkait.
* **Bottom HUD Telemetry:**
  * Indikator FPS/Performa, tombol scroll hint animasi ke bawah, dan shortcut keyboard info (`[↑] [↓] NAVIGATE`).

---

## 3. Peta Section (7 Fullscreen Snap Chambers)

### Chamber 01 — HERO // CYBER-SHIBUYA GATEWAY
* **Visual 3D:** 
  * Gerbang Torii Siber 3D melayang (*Floating Cybernetic Torii*) bertekstur wireframe neon cyan & hot magenta.
  * Lantai grid retro-cyber dengan kabut kedalaman (*depth fog*).
  * Partikel data stream berputar mengikuti gerakan mouse (*gyro parallax*).
* **Konten Teks & Call-to-Action:**
  * Headline: `IRFANDY AZIZ`
  * Sub-headline: `FULL-STACK DEVELOPER & ENTERPRISE SYSTEM ARCHITECT`
  * Kanji Watermark vertikal: `東京 // 電脳開発`
  * Action Buttons: `[ INITIATE SHOWCASE ▼ ]` (lompat ke project) dan `[ DIRECT TRANSMISSION ]` (lompat ke kontak).

---

### Chamber 02 — DOSSIER // OPERATOR PROFILE & TECH MATRIX
* **Konsep:** Bento Grid Sci-Fi Dossier (Kartu ID Operasional).
* **Blok Konten:**
  * **Card A (Operator Identity):** Foto profil asli (`/profile.png`) berbalut frame cyberpunk HUD, nama lengkap, spesialisasi (*Clean Code, Scalability, & User-Centric Experience*), dan status ketersediaan.
  * **Card B (Academic & Formal Credentials):**
    * **Universitas Catur Insan Cendekia** *(2023 – 2026)* — D3 Manajemen Informatika
    * **SMK Informatika Al-Irsyad Al-Islamiyyah Kota Cirebon** *(2019 – 2021)* — Rekayasa Perangkat Lunak (RPL)
  * **Card C (Backend & Architecture Core):** PHP (Laravel, CodeIgniter), Node.js (Express), RESTful APIs, Clean Architecture, RBAC.
  * **Card D (Frontend & Creative Interface):** Vue.js 3 (Composition API), React, Three.js / R3F, Tailwind CSS, GSAP.
  * **Card E (Database & DevOps Infrastructure):** MySQL, PostgreSQL, MongoDB, Linux VPS Configuration, Git.
  * **Card F (Soft Skills):** Problem Solving, Analytical Thinking, Team Leadership.

---

### Chamber 03 — SHOWCASE // HOLOGRAPHIC PROJECT CHAMBER
* **Konsep:** **Central 3D Hologram Projector** yang menampilkan proyek-proyek unggulan secara bergantian.
* **Komponen:**
  * **3D Projector Ring (Pedestal):** Cincin mekanikal 3D di lantai yang memancarkan pilar cahaya vertikal ke atas.
  * **Holographic Screen:** Layar hologram melengkung 3D di tengah layar yang menampilkan:
    * Mockup visual nyata dari `/projects/` dengan efek garis scanline dan flicker hologram:
      - TMS: `/projects/tms.png`
      - Sekolah Iklan: `/projects/si_app.webp`
      - HRMS: `/projects/hris.png`
      - Administrasi Sekolah: `/projects/infrastructure.png`
      - CV. Mandiri Cipta: `/projects/mandiri_cipta_adikarya.png`
      - Personal Portfolio: `/projects/portfolio.png`
    * Metadata: Kode Sistem (`PRJ-01 // TMS-LOGISTICS`, `PRJ-02 // HRMS-CORE`, dsb.), status `● PRODUCTION / AUDIT-READY`.
    * Fitur Utama (*Architectural Highlights*):
      * **TMS:** GPS Tracking Real-Time, Fleet Dispatch Algorithm, e-POD.
      * **HRMS:** Biometric Fingerprint Sync, Automated Payroll Engine.
      * **SI APP:** Digital Ad Ecosystem, ROAS Dashboard, Flutter/Laravel.
      * **Sistem Sekolah:** Transparansi Dana BOS/BOPD, Laporan Otomatis.
      * **CV Mandiri Cipta:** Corporate Profile & Ekspor Rattan.
    * Tech Stack Badges.
    * Tombol Interaksi: `[ VIEW SYSTEM BLUEPRINT ]` & `[ LIVE TRANSMISSION ↗ ]`.
  * **Transisi Hologram:**
    * Tombol kontrol `[ ◀ PREV_SYSTEM ]` dan `[ NEXT_SYSTEM ▶ ]`.
    * Saat diklik: Proyek aktif mengalami **glitch laser & de-materialize** menjadi partikel cahaya, pedestal berdenyut, lalu proyek berikutnya **terproyeksikan (materialize)** lapis demi lapis dalam 0.4 detik yang mulus.
    * Dilengkapi thumbnail selector mini di bawah untuk navigasi instan.

---

### Chamber 04 — CAREER LOGS // CHRONO-CONSOLE
* **Konsep Tata Letak:** **Dual-Zone Cyber Console (Atas-Tengah: Monitor Rincian Utama, Bawah: Career Selector Dock)**.
* **Zona Atas-Tengah (Main Reading Stage — 65% Layar):**
  * Layar data lapang & terpusat khusus untuk menampilkan rincian karier yang sedang aktif tanpa risiko teks menumpuk.
  * Menampilkan: Nama Instansi, Jabatan Resmi, Periode & Durasi Kerja, Poin-poin Kontribusi Sistem, serta Tech Stack Badges.
  * Dilengkapi transisi animasi data (*Data Decode / Glitch Slide*) saat data berganti.
* **Zona Bawah (Career Selector Dock / Data Cartridges — 35% Layar):**
  * Deretan 4 kartu mini geometris horizontal di bagian bawah:
    1. **2019 – 2020:** CV. Orbit Indonesia Persada *(Junior Web Dev)*
    2. **2021 – 2022:** PT. Java Genius All Technology *(Full-Stack Dev)*
    3. **2022 – 2025:** Rittercoding *(Full-Stack Dev - 3 Tahun)*
    4. **2025 – 2026:** PT. Uniteda Arkato *(IT Engineer - TMS)*
* **Interaktivitas & Efek Khusus:**
  * **Audio FX:** Efek suara klik taktis (*tactical sci-fi switch*) saat kartu di bawah ditekan (tersedia toggle mute).
  * **Animasi Pulsa Laser:** Berkas cahaya neon melesat dari kartu mini yang dipilih menuju panel atas.
  * **Status Aktif:** Kartu yang dipilih berpendar dengan garis tepi neon cyan dan indikator status `● ONLINE`.

---

### Chamber 05 — ACADEMIC MATRIX // EDUCATION CREDENTIALS
* **Konsep:** **Dual Holographic Credential Cards** (Dua Kartu Kredensial Berdampingan Kiri & Kanan di 1 Layar Penuh).
* **Blok Konten:**
  * **Kartu Kiri (Higher Education):**
    * **Universitas Catur Insan Cendekia** *(2023 – 2026)*
    * **Jenjang:** D3 Manajemen Informatika
    * **Fokus Keilmuan:** Perancangan Sistem Informasi, Manajemen Basis Data Relasional, Analisis Sistem Bisnis, dan Arsitektur Aplikasi.
    * Status: *Tingkat Akhir / Lulus ●*
  * **Kartu Kanan (Vocational Foundation):**
    * **SMK Informatika Al-Irsyad Al-Islamiyyah Kota Cirebon** *(2019 – 2021)*
    * **Konsentrasi:** Rekayasa Perangkat Lunak (RPL)
    * **Fondasi Teknis:** Algoritma dasar, pemrograman web awal, dasar Object-Oriented Programming (OOP), dan pemodelan database.
    * Status: *Lulus (Graduated) ●*
* **Visual & Interaksi:** Efek garis sirkuit neon PCB yang menghubungkan kedua kartu, melambangkan perjalanan dari fondasi kejuruan menuju kematangan IT perguruan tinggi.

---

### Chamber 06 — CAPABILITIES // PROFESSIONAL SERVICES
* **Konsep:** 6 Modul Layanan dalam format Cyber Bento Box:
  1. **Custom Web Application Development** *(Enterprise & Scalable)*
  2. **E-Commerce Solutions** *(Integrated Payment & Inventory)*
  3. **API Development & Integration** *(RESTful, GraphQL, Third-party)*
  4. **Database Architecture & Optimization** *(Indexing, Performance Query)*
  5. **Maintenance & Security Technical Support** *(Bug fixing, Auditing)*
  6. **Technical Architecture Consultation** *(Tech Stack, Code Review)*
* Setiap kartu dilengkapi ikon hologram dan preview kapabilitas saat di-hover.

---

### Chamber 07 — UPLINK // DIRECT TRANSMISSION (CONTACT)
* **Konsep:** Cyberpunk Comm Terminal.
* **Fitur:**
  * **Transmission Form:** Input Name, Email, dan Message dengan gaya baris perintah terminal.
  * **Direct Frequency Links:**
    * WhatsApp: `+62 896-8718-6597` (Direct chat link)
    * Email: `irfandyzize@gmail.com`
    * GitHub: `github.com/irfandyz`
    * LinkedIn: `linkedin.com/in/irfandy-aziz`
    * Instagram: `@iruu.diy`
  * Footer: Copyright, Location: `Bandung / Remote, Indonesia`, Timezone Real-Time Clock `WIB (UTC+7)`.

---

## 4. Spesifikasi Arsitektur Teknologi (*Tech Stack*)

| Layer | Teknologi yang Digunakan | Peran |
| :--- | :--- | :--- |
| **Framework** | **React (Vite) + TypeScript** | Performa render kilat, modularitas komponen tinggi |
| **3D Engine** | **Three.js + React Three Fiber (R3F) + Drei** | Pengelolaan kanvas 3D deklaratif, performa 60 FPS |
| **Post-Processing** | **@react-three/postprocessing** | Efek Bloom (neon pendar), Chromatic Aberration, Scanlines |
| **Styling** | **Tailwind CSS + Custom CSS Variables** | Desain Cyberpunk, palette neon HSL, utility classes |
| **Motion & Snap** | **CSS Scroll-Snap + Framer Motion** | Transisi per-layar yang presisi, responsif pada keyboard/mouse |
| **Icons & Assets** | **Lucide React + Procedural Shaders** | Ikon clean dan modern bergaya tech |

---

## 5. Rencana Tahapan Eksekusi (*Implementation Phases*)

```
[ Fase 1: Setup Proyek & Dependencies ]
                 │
                 ▼
[ Fase 2: Kanvas 3D Three.js & Post-Processing ]
                 │
                 ▼
[ Fase 3: Sistem Scroll-Snap & Layout HUD Navigasi ]
                 │
                 ▼
[ Fase 4: Central Hologram Chamber & Animasi Transisi ]
                 │
                 ▼
[ Fase 5: Pengisian Konten Lengkap Dossier, Timeline, Services, Kontak ]
                 │
                 ▼
[ Fase 6: Polish Visual, SFX, Mobile Optimization, QA 60 FPS ]
```

* **Fase 1:** Inisialisasi Vite + React + TypeScript + Tailwind CSS + Three.js dependencies di workspace.
* **Fase 2:** Pembuatan komponen 3D dasar (Torii Gate / Cyber Mesh + Lighting + Bloom Shader).
* **Fase 3:** Setup layout scroll-snap 6 chamber dengan navigasi pagination indikator di samping.
* **Fase 4:** Pembangunan Hologram Chamber raksasa dengan logika switch `NEXT / PREV` dan shader glitch/dematerialize.
* **Fase 5:** Integrasi seluruh data dari `portfolio.md`.
* **Fase 6:** Pengujian performa, responsivitas mobile, dan uji coba interaktif di browser.
