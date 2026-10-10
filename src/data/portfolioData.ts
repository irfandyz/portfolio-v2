export interface ProjectItem {
  id: string
  code: string
  title: string
  shortTitle: string
  client: string
  year: string
  category: 'Full Stack' | 'Backend' | 'Frontend'
  status: string
  summary: string
  highlights: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  imageMockup: string
}

export interface CareerItem {
  id: string
  company: string
  role: string
  period: string
  duration: string
  status: 'COMPLETED INTERNSHIP' | 'FULL-STACK ROLE'
  contributions: string[]
  techStack: string[]
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  period: string
  focus: string[]
  status: string
}

export interface ServiceItem {
  id: string
  code: string
  title: string
  description: string
  skills: string[]
}

const BASE = import.meta.env.BASE_URL || '/'

export const OPERATOR_PROFILE = {
  name: 'Irfandy Aziz',
  role: 'Full-stack Developer / IT Developer',
  kanjiTitle: '電脳開発者 // フルスタック',
  avatar: `${BASE}profile.png`,
  status: 'AVAILABLE FOR HIRE',
  location: 'Cirebon, Indonesia',
  contacts: {
    email: 'irfandyzize@gmail.com',
    emailAlt: 'irfandy.aziz.dev@gmail.com',
    whatsapp: '+62 896-8718-6597',
    whatsappUrl: 'https://wa.me/6289687186597',
    github: 'https://github.com/irfandyz',
    githubHandle: 'github.com/irfandyz',
    linkedin: 'https://www.linkedin.com/in/irfandy-aziz',
    linkedinHandle: 'linkedin.com/in/irfandy-aziz',
    instagram: 'https://instagram.com/iruu.diy',
    instagramHandle: '@iruu.diy',
    portfolioWeb: 'https://irfandyaziz.com'
  },
  skills: {
    backend: ['PHP', 'Laravel Framework', 'CodeIgniter', 'Node.js (Express)', 'RESTful APIs', 'GraphQL', 'Clean Architecture', 'RBAC Security'],
    frontend: ['Vue.js 3 (Composition API)', 'React', 'Three.js / R3F', 'Flutter (Mobile)', 'Tailwind CSS', 'JavaScript (ES6+)', 'Vite', 'GSAP'],
    databaseDevOps: ['MySQL', 'PostgreSQL', 'MongoDB', 'Linux VPS Server', 'Git / GitHub', 'System Deployment & Config'],
    softSkills: ['Problem Solving & Analytical Thinking', 'Cross-functional Communication', 'Continuous Learning & Adaptability', 'Time & Project Management']
  }
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'tms',
    code: 'PRJ-01 // TMS-LOGISTICS',
    title: 'Transportation Management System (TMS)',
    shortTitle: 'TMS Logistics',
    client: 'PT. Arkadaya Hakato Persada',
    year: '2025',
    category: 'Full Stack',
    status: '',
    summary: 'Command center logistik dan armada terintegrasi dengan modul fleet management, auto-dispatching algoritma rute, pelacakan GPS real-time, electronic Proof of Delivery (e-POD), dan dasbor KPI siap audit.',
    highlights: [
      'Real-Time GPS Fleet Tracking & Geofencing',
      'Auto-Dispatching Route Optimization Engine',
      'Electronic Proof of Delivery (e-POD) Workflow',
      'Audit-Ready KPI Reporting & Compliance Dashboard'
    ],
    techStack: ['Laravel', 'Vue.js 3', 'Tailwind CSS', 'MySQL', 'GPS Telemetry'],
    imageMockup: `${BASE}projects/tms.png`,
    githubUrl: 'https://github.com/irfandyz'
  },
  {
    id: 'navaneva-erp',
    code: 'PRJ-02 // NAVANEVA-ERP',
    title: 'Navaneva ERP (SCM & Finance)',
    shortTitle: 'Navaneva ERP',
    client: 'Enterprise Systems',
    year: '2026',
    category: 'Full Stack',
    status: '',
    summary: 'Sistem ERP berbasis web terintegrasi yang berfokus pada Supply Chain Management (SCM) dan manajemen keuangan korporat, mencakup pengadaan barang (procurement), inventori multi-gudang, penagihan, serta pelaporan cash flow dan laba rugi real-time.',
    highlights: [
      'Supply Chain Management (SCM) & Automated Vendor Procurement',
      'Corporate Finance, Multi-Currency Invoicing & Real-Time Financial Ledgers',
      'Multi-Warehouse Inventory Tracking with Automated Stock Reconciliation',
      'Decoupled Architecture: High-Performance React SPA & Scalable Laravel Backend'
    ],
    techStack: ['React', 'Laravel', 'REST API', 'PostgreSQL', 'Tailwind CSS', 'SCM & Finance'],
    imageMockup: `${BASE}projects/navaneva.png`,
    githubUrl: 'https://github.com/irfandyz'
  },
  {
    id: 'si-app',
    code: 'PRJ-03 // SI-MEDIA-ECOSYSTEM',
    title: 'Sekolah Iklan App (SI APP)',
    shortTitle: 'SI App',
    client: 'Sekolah Iklan Indonesia',
    year: '2023',
    category: 'Backend',
    status: '',
    summary: 'Platform media sosial dan ekosistem periklanan digital untuk pelaku usaha/UMKM dengan fitur penargetan audiens dan dasbor analitik ROAS interaktif.',
    highlights: [
      'Dynamic Audience Targeting & Ad Engine',
      'Interactive ROAS Analytics & Conversion Dashboard',
      'High-throughput RESTful Backend Endpoints',
      'Cross-platform Flutter Mobile Integration'
    ],
    techStack: ['Laravel', 'Node.js', 'MySQL', 'Flutter', 'Bootstrap', 'REST API'],
    imageMockup: `${BASE}projects/si_app.webp`,
    githubUrl: 'https://github.com/irfandyz'
  },
  {
    id: 'hrms',
    code: 'PRJ-04 // HRMS',
    title: 'Human Resource Management System (HRMS)',
    shortTitle: 'HRMS',
    client: 'Enterprise Systems',
    year: '2022',
    category: 'Backend',
    status: '',
    summary: 'Sistem automasi data karyawan terpusat dengan absensi digital/fingerprint real-time, manajemen cuti terintegrasi, dan kalkulasi payroll otomatis.',
    highlights: [
      'Biometric Fingerprint Hardware Sync & Automation',
      'Automated Payroll Engine with Tax/Deduction Calculation',
      'Hierarchical Leave Approval Workflow',
      'Secure Employee Self-Service Portal'
    ],
    techStack: ['Node.js', 'Express.js', 'MySQL', 'REST API', 'Cron Engine'],
    imageMockup: `${BASE}projects/hris.png`,
    githubUrl: 'https://github.com/irfandyz'
  },
  {
    id: 'school-admin',
    code: 'PRJ-05 // EDU-INFRA-SYS',
    title: 'Infrastruktur & Administrasi Sekolah Terpadu',
    shortTitle: 'Edu Infra',
    client: 'Yayasan Pendidikan',
    year: '2023',
    category: 'Full Stack',
    status: '',
    summary: 'Sistem manajemen sekolah mencakup absensi digital siswa/guru, transparansi pengelolaan dana bantuan operasional (BOS & BOPD), serta pelaporan keuangan otomatis.',
    highlights: [
      'Transparansi Alokasi Dana BOS & BOPD Siap Audit',
      'Automated Financial PDF & Excel Export Engines',
      'Multi-role Portal: Yayasan, Guru, Siswa, Orang Tua',
      'Modul SPP, Koperasi, dan Penilaian Akademik'
    ],
    techStack: ['Laravel', 'MySQL', 'Bootstrap', 'DOMPDF', 'REST API'],
    imageMockup: `${BASE}projects/infrastructure.png`,
    githubUrl: 'https://github.com/irfandyz'
  },
  {
    id: 'mandiri-cipta',
    code: 'PRJ-06 // EXPORT-SHOWCASE',
    title: 'Website Profil CV. Mandiri Cipta Adikarya',
    shortTitle: 'MCA Profile',
    client: 'CV. Mandiri Cipta Adikarya',
    year: '2024',
    category: 'Full Stack',
    status: '',
    summary: 'Website korporat dan etalase digital produk rotan berkualitas tinggi untuk ekspansi pasar ekspor internasional.',
    highlights: [
      'High-performance Product Catalog Showcase',
      'Multi-currency & International Inquiry Gateways',
      'SEO Optimized for Global Export Search Rank',
      'Interactive Media Gallery'
    ],
    techStack: ['Laravel', 'MySQL', 'Bootstrap', 'SEO Metadata'],
    imageMockup: `${BASE}projects/mandiri_cipta_adikarya.png`,
  },
  {
    id: 'portfolio-v2',
    code: 'PRJ-07 // CYBER-DECK-V2',
    title: 'Personal Portfolio Cyber 3D Deck',
    shortTitle: 'Cyber Deck 3D',
    client: 'Self Project',
    year: '2026',
    category: 'Frontend',
    status: '',
    summary: 'Showcase karya interaktif 3D Cyber-Japan dengan Three.js, React Three Fiber, post-processing bloom, dan fullscreen scroll snap.',
    highlights: [
      'Interactive 3D Holographic Projector with Laser Transitions',
      'Fullscreen 100dvh Scroll-Snap Chamber Layout',
      'Procedural Web Audio API Sound Effects',
      'Zero-clutter Dual-Zone Career Chrono-Console'
    ],
    techStack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'TypeScript'],
    imageMockup: `${BASE}projects/portfolio.png`,
    githubUrl: 'https://github.com/irfandyz'
  }
]

export const CAREER_DATA: CareerItem[] = [
  {
    id: 'orbit',
    company: 'CV. Orbit Indonesia Persada',
    role: 'Internship - Junior Web Developer',
    period: '2019 – 2020',
    duration: '1 Tahun',
    status: 'COMPLETED INTERNSHIP',
    contributions: [
      'Sosialisasi dan implementasi aplikasi berbasis web ke klien secara langsung.',
      'Pengembangan fitur CRUD modular menggunakan PHP dan framework Laravel.',
      'Mendukung pemeliharaan bug dasar dan pengujian integrasi antarmuka pengguna.'
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Git']
  },
  {
    id: 'java-genius',
    company: 'PT. Java Genius All Technology',
    role: 'Full-stack Developer',
    period: 'Sep 2021 – Sep 2022',
    duration: '1 Tahun',
    status: 'FULL-STACK ROLE',
    contributions: [
      'Membangun aplikasi modular dan terintegrasi lintas industri (Sistem Sekolah, SPP, Laundry, Koperasi, Penilaian, Absensi).',
      'Merancang sistem HRIS/HRMS terpusat (Payroll otomatis, cuti, onboarding, absensi).',
      'Mengembangkan sistem koperasi dan microfinance dengan tracking transaksi real-time.',
      'Membangun portal karyawan (Employee Portal) dengan Role-Based Access Control (RBAC).'
    ],
    techStack: ['Laravel', 'Vue.js', 'MySQL', 'RESTful API', 'HRIS/HRMS Architecture']
  },
  {
    id: 'rittercoding',
    company: 'Rittercoding',
    role: 'Full-stack Developer',
    period: 'Sep 2022 – Agu 2025',
    duration: '3 Tahun',
    status: 'FULL-STACK ROLE',
    contributions: [
      'Memegang tanggung jawab ekstensif dalam rekayasa backend & perancangan arsitektur sistem skala menengah-besar.',
      'Pengembangan dan standarisasi RESTful APIs berkecepatan tinggi berbasis PHP & Laravel framework.',
      'Optimasi query database relational, skema indexing, dan penanganan beban konkurensi data.',
      'Implementasi Clean Architecture dan integrasi layanan pihak ketiga (third-party services).'
    ],
    techStack: ['PHP', 'Laravel Framework', 'Clean Architecture', 'MySQL', 'REST API', 'Linux VPS']
  },
  {
    id: 'arkato',
    company: 'PT. Arkadaya Hakato Persada',
    role: 'Internship - IT Engineer',
    period: 'Agu 2025 – Jun 2026',
    duration: '11 Bulan',
    status: 'COMPLETED INTERNSHIP',
    contributions: [
      'Berperan aktif dalam pengembangan aplikasi operasional utama perusahaan TMS (Transport Management System).',
      'Menyediakan IT Support tingkat lanjut untuk menjaga ketersediaan dan keandalan sistem logistik operasional.',
      'Melakukan pemecahan masalah (troubleshooting) jaringan, workstation, dan sinkronisasi data sistem armada.'
    ],
    techStack: ['Laravel', 'Vue.js', 'MySQL', 'TMS System', 'Network & IT Support']
  }
]

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'cic',
    institution: 'Universitas Catur Insan Cendekia',
    degree: 'D3 Manajemen Informatika',
    period: '2023 – 2026',
    status: 'Tingkat Akhir / Lulus ●',
    focus: [
      'Perancangan & Arsitektur Sistem Informasi Korporat',
      'Manajemen & Rekayasa Basis Data Relasional Tingkat Lanjut',
      'Analisis Proses Bisnis IT & Requirement Engineering',
      'Pengembangan Aplikasi Berorientasi Objek & Modular'
    ]
  },
  {
    id: 'al-irsyad',
    institution: 'SMK Informatika Al-Irsyad Al-Islamiyyah Kota Cirebon',
    degree: 'Rekayasa Perangkat Lunak (RPL)',
    period: '2019 – 2021',
    status: 'Lulus (Graduated) ●',
    focus: [
      'Fondasi Logika Pemrograman & Algoritma Komputasi',
      'Pemrograman Web Dasar & Lanjutan (HTML, CSS, JS, PHP)',
      'Konsep Object-Oriented Programming (OOP) & Clean Code',
      'Pemodelan Database Relasional & Normalisasi ERD'
    ]
  }
]

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-web',
    code: 'MOD-01',
    title: 'Custom Web Application Development',
    description: 'Membangun aplikasi web kustom skala kecil hingga enterprise dengan arsitektur tangguh, clean code, dan performa tinggi.',
    skills: ['Laravel', 'Vue.js 3', 'React', 'Modular Architecture', 'RBAC']
  },
  {
    id: 'ecommerce',
    code: 'MOD-02',
    title: 'E-Commerce & Digital Systems',
    description: 'Solusi toko online & platform digital terintegrasi payment gateway otomatis, manajemen inventaris stok, dan dasbor analitik real-time.',
    skills: ['Payment Gateways', 'Inventory Logic', 'Order Tracking', 'Analytics']
  },
  {
    id: 'api-dev',
    code: 'MOD-03',
    title: 'API Development & Integration',
    description: 'Pembuatan RESTful & GraphQL API yang aman, berkecepatan tinggi, terstandarisasi OpenAPI/Swagger, serta integrasi layanan pihak ketiga.',
    skills: ['RESTful API', 'GraphQL', 'JWT Authentication', 'Third-Party Integration']
  },
  {
    id: 'db-opt',
    code: 'MOD-04',
    title: 'Database Architecture & Optimization',
    description: 'Perancangan skema relasional yang teruji, migrasi data mulus, indexing strategi, dan optimasi performa query kompleks.',
    skills: ['MySQL', 'PostgreSQL', 'Query Profiling', 'Database Indexing']
  },
  {
    id: 'maintenance',
    code: 'MOD-05',
    title: 'Maintenance & Technical Security Support',
    description: 'Pemeliharaan sistem rutin, penanganan bug kritis, pembaruan keamanan, hardening server, serta pemantauan downtime.',
    skills: ['Bug Fixing', 'Linux Server Maintenance', 'Security Hardening', 'Audit Log']
  },
  {
    id: 'consultation',
    code: 'MOD-06',
    title: 'Technical Consultation & Code Review',
    description: 'Konsultasi pemilihan tech stack, evaluasi arsitektur perangkat lunak, code review, dan strategi skalabilitas masa depan.',
    skills: ['Architecture Review', 'Code Quality Audit', 'Scalability Strategy']
  }
]
