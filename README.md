
```markdown
<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,6,11,20&height=240&section=header&text=A.R.K.A.&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Adaptive%20Reasoning%20%26%20Knowledge%20Architecture&descAlignY=58&descSize=20" alt="ARKA Header Banner" width="100%" />

  <p align="center">
    <strong>Platform Gamifikasi Edukasi Berpikir Komputasional & Pemetaan Metakognisi Siswa Sekolah Dasar</strong><br />
    <em>Dioptimalkan untuk Kurikulum Merdeka (Fase A, B, dan C) Berbasis Perancah Predict-Observe-Explain (POE)</em>
  </p>

  <p align="center">
    <a href="https://arkagame.web.id" target="_blank">
      <img src="https://img.shields.io/badge/Production_Domain-arkagame.web.id-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Domain" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Pedagogi-Predict--Observe--Explain_(POE)-purple?style=flat-square" alt="Pedagogi POE" />
    <img src="https://img.shields.io/badge/Jenjang_Sasaran-Kelas_1--6_SD-amber?style=flat-square" alt="Jenjang SD" />
    <img src="https://img.shields.io/badge/Total_Level-25_Tantangan_Sektor-blue?style=flat-square" alt="25 Levels" />
    <img src="https://img.shields.io/badge/Algoritma_Bantuan-A*_Pathfinding-teal?style=flat-square" alt="A* Pathfinding" />
    <img src="https://img.shields.io/badge/Kenyamanan_Afektif-Bebas_Peringkat_Publik-emerald?style=flat-square" alt="Afektif" />
    <img src="https://img.shields.io/badge/Lisensi-MIT-green?style=flat-square" alt="Lisensi" />
  </p>

</div>

---

## 📑 Daftar Isi Komprehensif
1. [Prinsip Filosofis & Latar Belakang Riset](#1-prinsip-filosofis--latar-belakang-riset)
2. [Kerangka Pedagogis & Metakognisi POE](#2-kerangka-pedagogis--metakognisi-poe)
   - [Model 4 Kuadran Nalar Metakognisi](#model-4-kuadran-nalar-metakognisi)
   - [Matematika Kalkulasi Radar 5 Dimensi Berpikir Komputasional](#matematika-kalkulasi-radar-5-dimensi-berpikir-komputasional)
3. [Struktur Petualangan 25 Level Solaria](#3-struktur-petualangan-25-level-solaria)
4. [Mekanika & Fitur Gameplay Utama](#4-mekanika--fitur-gameplay-utama)
   - [Palet Balok Perintah Visual](#palet-balok-perintah-visual)
   - [Algoritma A* Pathfinding (Bantuan Kristal Surya)](#algoritma-a-pathfinding-bantuan-kristal-surya)
   - [Hanggar Kostum Robot & Kustomisasi Slider Hue 0°–360°](#hanggar-kostum-robot--kustomisasi-slider-hue-0360)
   - [Sistem Transisi & Splashscreen Sinematik](#sistem-transisi--splashscreen-sinematik)
5. [Portal Riset & Analisis Guru (Dashboard)](#5-portal-riset--analisis-guru-dashboard)
6. [Arsitektur Teknis & Tumpukan Teknologi](#6-arsitektur-teknis--tumpukan-teknologi)
7. [Skema Basis Data Supabase (DDL SQL)](#7-skema-basis-data-supabase-ddl-sql)
8. [Panduan Instalasi & Eksekusi Lokal](#8-panduan-instalasi--eksekusi-lokal)
9. [Konfigurasi Deployment & Domain Vercel](#9-konfigurasi-deployment--domain-vercel)
10. [Struktur File Repositori](#10-struktur-file-repositori)
11. [Peneliti, Kontributor & Lisensi](#11-peneliti-kontributor--lisensi)

---

## 1. Prinsip Filosofis & Latar Belakang Riset

**A.R.K.A. (Adaptive Reasoning & Knowledge Architecture)** dikembangkan sebagai respons empiris terhadap tantangan pembelajaran komputasi pada jenjang pendidikan dasar di Indonesia. Sering kali media belajar *coding* anak hanya berfokus pada hasil akhir (apakah karakter sampai atau tidak), tanpa mengukur proses kognitif, kehati-hatian merencanakan, serta kesadaran metakognitif siswa saat melakukan kesalahan (*debugging*).

### Pilar Nilai Utama:
* **Human-Centered & Child-Safe**: Antarmuka responsif tanpa iklan, tanpa pelacakan pihak ketiga yang invasif, dan dirancang ramah anak.
* **Bebas Rivalitas Toksik (*Leaderboard-Free*)**: Menghilangkan papan skor publik (*public ranking*) demi melindungi ranah afektif siswa berkemampuan belajar lambat (*slow learners*), sehingga anak berani mencoba tanpa rasa takut dipermalukan.
* **Perancah Konstruktivisme (Scaffolding)**: Mengedukasi pola pikir komputasional bertahap—mulai dari sekuensial linear, pemahaman orientasi spasial relatif (kiri/kanan terhadap arah hadap robot), mekanika lompatan, hingga abstraksi loop pengulangan.

---

## 2. Kerangka Pedagogis & Metakognisi POE

Inti arsitektur evaluasi ARKA mengadopsi model pembelajaran **Predict-Observe-Explain (POE)** (*White & Gunstone, 1992*) yang dipadukan dengan teori metakognisi (*Flavell, 1979*):


```

┌─────────────────────────────────────────────────────────────────────────────┐
│                             SIKLUS POE ARKA                                │
└─────────────────────────────────────────────────────────────────────────────┘
│
▼
[ 1. PREDICT ]  ──▶ Siswa menyusun balok perintah algoritma, kemudian WAJIB
membuat tebakan metakognitif: "Apakah rangkaian balok ini
akan berhasil mencapai sasaran tanpa celaka?"
│
▼
[ 2. OBSERVE ]  ──▶ Eksekusi simulasi dijalankan per langkah (650ms/step).
Siswa mengamati gerak robot secara langsung di kisi pulau,
mencocokkan visualisasi mental dengan fakta eksekusi.
│
▼
[ 3. EXPLAIN ]  ──▶ Pasca-simulasi, sistem memunculkan dialog refleksi:
- Jika Berhasil: Konfirmasi apakah keberhasilan disadari.
- Jika Gagal: Menunjukkan letak spesifik koordinat tabrakan
atau batas pulau agar siswa merumuskan hipotesis baru.

```

### Model 4 Kuadran Nalar Metakognisi

Sistem telemetri mengklasifikasikan setiap sesi siswa ke dalam matriks status nalar:

| Kuadran | Prediksi Awal | Hasil Nyata | Percobaan (*Attempts*) | Kategori Pedagogis | Tindak Lanjut Guru |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **True Mastery** | Akurat (Yakin Berhasil) | Sukses | Percobaan ke-1 | Kemahiran Sejati & Reflektif | Diberikan tantangan optimalisasi balok |
| **Reflective Struggle** | Akurat (Menebak Kurang Pas) | Butuh Debugging | Percobaan > 1 | Ketekunan Berpikir Positif | Diapresiasi atas daya juang perbaikan logikanya |
| **Serendipity** | Ragu / Salah Prediksi | Sukses | Percobaan ke-1 | Keberuntungan Tak Disengaja | Ditantang menjelaskan mengapa kodenya bisa jalan |
| **Overconfidence** | Sangat Yakin Berhasil | Gagal Tabrak | Percobaan > 1 | Ilusi Kompetensi (*Overconfident*) | Dibimbing membaca peta kisi dan koordinat halangan |

### Matematika Kalkulasi Radar 5 Dimensi Berpikir Komputasional

Dasbor pengajar memproses telemetri mentah menjadi **5 Indikator Baku (Skala 0–100%)**:

$$\text{Dekomposisi} = \min\left(100, \, \left(\frac{1}{N} \sum_{i=1}^{N} \text{EfficiencyRatio}_i\right) \times 85\right)$$

$$\text{Penalaran Spasial} = \frac{\sum [ \text{Attempts}_i \le 2 ]}{N} \times 100\%$$

$$\text{Efisiensi Kode (Parsimony)} = \frac{\sum [ \text{BlockCount}_i \le \text{OptimalBlocks}_i ]}{N} \times 100\%$$

$$\text{Metakognisi POE} = \frac{\sum [ \text{PredictionAccuracy}_i = \text{true} ]}{N} \times 100\%$$

$$\text{Kemandirian (Persistence)} = \left(1 - \frac{\sum [ \text{HintsUsed}_i = \text{true} ]}{N}\right) \times 100\%$$

---

## 3. Struktur Petualangan 25 Level Solaria

Setiap level dirancang secara matematis dengan ukuran kisi, orientasi hadap, rintangan batu karang, serta batas balok optimal (*parsimony budget*):


```

[Zona 1: Pesisir Pantura]  ──▶  [Zona 2: Hutan Karang]  ──▶  [Zona 3: Tebing Kristal]
Level 1 s.d. 5                 Level 6 s.d. 10               Level 11 s.d. 15
(Sekuensial Linear & Belok)    (Geometri Sudut & Labirin)      (Mekanika Lompatan 2 Petak)
│
▼
[Zona 5: Inti Reaktor Surya] ◀── [Zona 4: Dataran Geotermal] ─────────────┘
Level 21 s.d. 25                 Level 16 s.d. 20
(Sintesis Kompleks Mandiri)       (Abstraksi Loop Pengulangan)

```

| Zona | Level | Target Misi | Kisi (*Grid*) | Posisi Awal & Hadap | Rintangan | Balok Optimal | Balok Tersedia |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **1** | **1** | Baterai Tenaga | $4 \times 4$ | $(0,3)$ • Hadap Atas | 0 | **3** | Maju |
| **1** | **2** | Tunas Mangrove | $4 \times 4$ | $(0,3)$ • Hadap Atas | 1 | **4** | Maju, Kanan |
| **1** | **3** | Pompa Air Surya | $4 \times 4$ | $(1,3)$ • Hadap Atas | 2 | **5** | Maju, Kanan, Kiri |
| **1** | **4** | Baterai Cadangan | $5 \times 5$ | $(3,3)$ • Hadap Kiri | 3 | **6** | Maju, Kanan, Kiri |
| **1** | **5** | Inti Sel Surya | $5 \times 5$ | $(0,4)$ • Hadap Kanan | 4 | **7** | Maju, Kanan, Kiri |
| **2** | **6** | Tunas Mangrove | $5 \times 5$ | $(0,4)$ • Hadap Atas | 5 | **6** | Maju, Kanan, Kiri |
| **2** | **7** | Pompa Geotermal | $5 \times 5$ | $(4,4)$ • Hadap Atas | 6 | **7** | Maju, Kanan, Kiri |
| **2** | **8** | Baterai Kapasitor | $6 \times 6$ | $(1,5)$ • Hadap Atas | 7 | **8** | Maju, Kanan, Kiri |
| **2** | **9** | Hutan Bakau Pesisir | $6 \times 6$ | $(0,3)$ • Hadap Kanan | 8 | **8** | Maju, Kanan, Kiri |
| **2** | **10** | Reaktor Kristal Hijau | $6 \times 6$ | $(0,5)$ • Hadap Atas | 9 | **9** | Maju, Kanan, Kiri |
| **3** | **11** | Baterai Dataran Tinggi | $5 \times 5$ | $(0,4)$ • Hadap Atas | 4 | **5** | Maju, Kanan, Kiri, **Lompat** |
| **3** | **12** | Pompa Saluran Tebing | $6 \times 6$ | $(1,5)$ • Hadap Kanan | 6 | **6** | Maju, Kanan, Kiri, **Lompat** |
| **3** | **13** | Bibit Mangrove Jurang | $6 \times 6$ | $(2,0)$ • Hadap Bawah | 7 | **7** | Maju, Kanan, Kiri, **Lompat** |
| **3** | **14** | Baterai Puncak Batu | $6 \times 6$ | $(0,4)$ • Hadap Atas | 8 | **7** | Maju, Kanan, Kiri, **Lompat** |
| **3** | **15** | Pembangkit Foton Ungu | $6 \times 6$ | $(0,5)$ • Hadap Kanan | 9 | **8** | Maju, Kanan, Kiri, **Lompat** |
| **4** | **16** | Baterai Lembah Uap | $6 \times 6$ | $(0,5)$ • Hadap Kanan | 5 | **5** | Maju, Kanan, Kiri, **Loop 2x** |
| **4** | **17** | Pompa Sirkulasi Panas | $6 \times 6$ | $(1,5)$ • Hadap Atas | 7 | **6** | Maju, Kanan, Kiri, **Loop 2x** |
| **4** | **18** | Reboisasi Magma Dingin| $6 \times 6$ | $(0,4)$ • Hadap Atas | 8 | **7** | Maju, Kanan, Kiri, **Loop 2x** |
| **4** | **19** | Mangrove Belerang | $7 \times 7$ | $(1,6)$ • Hadap Kanan | 9 | **7** | Maju, Kanan, Kiri, **Loop 2x** |
| **4** | **20** | Generator Surya Utama | $7 \times 7$ | $(0,6)$ • Hadap Atas | 10 | **8** | Maju, Kanan, Kiri, **Loop 2x** |
| **5** | **21** | Kapasitor Inti Sektor | $7 \times 7$ | $(0,6)$ • Hadap Atas | 10 | **7** | Semua Balok Terbuka |
| **5** | **22** | Pompa Pendingin Inti | $7 \times 7$ | $(6,6)$ • Hadap Kiri | 12 | **8** | Semua Balok Terbuka |
| **5** | **23** | Mangrove Biosfer Kaca | $7 \times 7$ | $(0,4)$ • Hadap Kanan | 13 | **8** | Semua Balok Terbuka |
| **5** | **24** | Baterai Kuantum Puncak | $8 \times 8$ | $(1,7)$ • Hadap Atas | 14 | **9** | Semua Balok Terbuka |
| **5** | **25** | Inti Abadi Solaria | $8 \times 8$ | $(0,7)$ • Hadap Atas | 16 | **10**| Semua Balok Terbuka |

---

## 4. Mekanika & Fitur Gameplay Utama

### Palet Balok Perintah Visual
Setiap balok mewakili instruksi kode pemrograman fundamental:
* ⬆️ **Maju 1 Langkah (`MOVE_FORWARD`)**: Menggerakkan Arka satu satuan petak sesuai arah hadap.
* ↪️ **Putar Kanan 90° (`TURN_RIGHT`)**: Mengubah arah mata angin searah jarum jam ($\text{UP} \rightarrow \text{RIGHT} \rightarrow \text{DOWN} \rightarrow \text{LEFT}$).
* ↩️ **Putar Kiri 90° (`TURN_LEFT`)**: Mengubah arah mata angin berlawanan jarum jam ($\text{UP} \rightarrow \text{LEFT} \rightarrow \text{DOWN} \rightarrow \text{RIGHT}$).
* ⚡ **Lompat 2 Petak (`JUMP_FORWARD`)**: Melompati satu petak rintangan/jurang langsung menuju petak kedua di depannya.
* 🔁 **Loop Pengulangan 2x (`REPEAT_2X`)**: Konsep dasar loop yang secara otomatis menduplikasi instruksi maju sebanyak 2 kali demi efisiensi baris program (*code parsimony*).

### Algoritma A* Pathfinding (Bantuan Kristal Surya)
Bila siswa mengalami kebuntuan (*impasse*), mereka dapat menukarkan **10 Kristal Surya** untuk memproyeksikan lintasan navigasi terpendek (*shortest path*) di atas kanvas pulau. Algoritma ini mengevaluasi fungsi biaya heuristik:

$$f(n) = g(n) + h(n)$$

di mana $g(n)$ adalah jarak langkah aktual dari titik awal, dan $h(n)$ adalah jarak Manhattan menuju kristal target:

$$h(n) = \vert{}x_n - x_{\text{target}}\vert{} + \vert{}y_n - y_{\text{target}}\vert{}$$

### Hanggar Kostum Robot & Kustomisasi Slider Hue 0°–360°
Memberikan stimulasi gamifikasi positif tanpa unsur *pay-to-win*:
* 🔵 **Arka Penjelajah** (Standar - Gratis)
* 🟢 **Zamrud Surya** (25 Kristal)
* 🔴 **Vulkanik Mecha** (35 Kristal)
* 🟣 **Quantum Amethyst** (50 Kristal)
* 🟡 **Cyber Gold** (75 Kristal)
* 🔷 **Plasma Neon** (85 Kristal)
* 🌈 **Prisma Pelangi RGB** (120 Kristal): Skin beranimasi dinamis yang memancarkan spektrum pelangi berputar secara kontinu.
* 🎨 **Arka Maestro DIY (VIP - 180 Kristal - Paling Mahal)**: Dilengkapi kontrol interaktif **Slider Spektrum Hue 0°–360°**, *color swatch preview*, dan tombol *preset quick-pick* warna bebas.

### Sistem Transisi & Splashscreen Sinematik
Seluruh navigasi antar-halaman (Beranda $\leftrightarrow$ Guru $\leftrightarrow$ Bermain) dilengkapi overlay transisi terintegrasi:
* Indikator *spinning dashed halo* dan cincin *ping*.
* Batang kemajuan (*progress bar*) beranimasi gradasi halus dari 25% ke 100%.
* Pesan kontekstual dan sinkronisasi audio prosedural (*Web Audio API*).

---

## 5. Portal Riset & Analisis Guru (Dashboard)

Halaman `/teacher` dirancang untuk guru kelas, guru BK, dan peneliti akademisi:
* 🛡️ **Bebas Akses Mandiri**: Pengajar dapat langsung memantau data dari tombol bilah atas beranda tanpa harus mendaftar sebagai profil siswa.
* 🔍 **Multi-Filter Komprehensif**: Menyaring data berdasarkan nama sekolah, jenjang kelas SD, atau pencarian nama siswa tertentu.
* 📈 **Visualisasi Interaktif**:
  * **Radar Chart 5 Dimensi**: Pemetaan profil keterampilan komputasi.
  * **Donut Chart POE**: Distribusi persentase 4 kuadran metakognisi.
  * **Histogram Batang 25 Level**: Menemukan pada level berapa siswa paling sering mengalami kesulitan.
* 💾 **Ekspor Data Sekali Klik (.CSV)**: Mengunduh data lengkap beserta stempel waktu lokal untuk analisis statistika lanjut (SPSS, RStudio, Python Pandas).

---

## 6. Arsitektur Teknis & Tumpukan Teknologi


```

┌────────────────────────────────────────────────────────┐
│                   KLIEN / BROWSER                      │
│   Next.js 15 App Router • React • Tailwind CSS         │
│   Canvas Grid Engine • Web Audio Synthesizer           │
└───────────────────────────────────┬────────────────────┘
│ HTTPS / REST / WSS
▼
┌────────────────────────────────────────────────────────┐
│                   BACKEND & STORAGE                    │
│   Supabase Cloud Platform (PostgreSQL Engine)          │
│   • Tabel arsitektur telemetri & profil siswa          │
│   • Endpoint Fallback: Next.js API Route (/telemetry) │
└───────────────────────────────────┬────────────────────┘
│ CI / CD Git Hook
▼
┌────────────────────────────────────────────────────────┐
│                  EDGE INFRASTRUCTURE                   │
│   Vercel Anycast Edge Network • SSL Let's Encrypt      │
│   Domain Kustom: arkagame.web.id                       │
└────────────────────────────────────────────────────────┘

```

---

## 7. Skema Basis Data Supabase (DDL SQL)

Jalankan perintah SQL berikut di **SQL Editor** pada dasbor Supabase Anda:

```sql
-- 1. Ekstensi UUID
create extension if not exists "uuid-ossp";

-- 2. Tabel Telemetri Aktivitas Level & POE
create table if not exists public.arka_telemetry (
  id uuid default gen_random_uuid() primary key,
  student_name text not null,
  student_class text not null,
  school_name text not null,
  level_id integer not null,
  attempts integer not null default 1,
  block_count integer not null,
  optimal_blocks integer not null,
  efficiency_ratio numeric(4,2) not null,
  prediction_accuracy boolean not null,
  hints_used boolean not null default false,
  duration_seconds integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabel Profil Akun & Progres Gamifikasi Siswa
create table if not exists public.arka_student_profiles (
  id text primary key,
  student_name text not null,
  student_class text not null,
  school_name text not null,
  grade_level integer default 4,
  crystals integer default 30,
  active_skin text default 'BLUE',
  unlocked_skins jsonb default '["BLUE"]'::jsonb,
  level_stars jsonb default '{}'::jsonb,
  current_level integer default 1,
  last_active timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Indeks Kinerja Pencarian
create index if not exists idx_telemetry_school_class on public.arka_telemetry(school_name, student_class);
create index if not exists idx_telemetry_level on public.arka_telemetry(level_id);
create index if not exists idx_telemetry_created on public.arka_telemetry(created_at desc);

-- 5. Kebijakan Keamanan (Row Level Security - RLS)
alter table public.arka_telemetry enable row level security;
alter table public.arka_student_profiles enable row level security;

create policy "Izinkan Baca Publik Telemetri" on public.arka_telemetry for select using (true);
create policy "Izinkan Tulis Publik Telemetri" on public.arka_telemetry for insert with check (true);

create policy "Izinkan Baca Profil Siswa" on public.arka_student_profiles for select using (true);
create policy "Izinkan Tulis Profil Siswa" on public.arka_student_profiles for all using (true);

```

---

## 8. Panduan Instalasi & Eksekusi Lokal

### Prasyarat Perangkat Lunak

* **Node.js**: Versi `>= 18.18.0` (Direkomendasikan versi LTS 20.x)
* **npm**: Versi `>= 9.x`

### Langkah-Langkah:

1. **Kloning Repositori**:
```bash
git clone [https://github.com/USERNAME_ANDA/arka-game.git](https://github.com/USERNAME_ANDA/arka-game.git)
cd arka-game

```


2. **Pemasangan Paket Dependensi**:
```bash
npm install

```


3. **Pengaturan Variabel Lingkungan**:
Buat file `.env.local` pada akar proyek:
```env
NEXT_PUBLIC_SUPABASE_URL=[https://proyek-anda.supabase.co](https://proyek-anda.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```


4. **Menjalankan Server Pengembangan**:
```bash
npm run dev

```


Akses aplikasi di peramban: `http://localhost:3000`.
5. **Pengujian Kompilasi Produksi (Production Build)**:
```bash
npm run build

```



---

## 9. Konfigurasi Deployment & Domain Vercel

Aplikasi ini telah dikonfigurasi untuk deployment instan di platform **Vercel** dengan domain resmi **`arkagame.web.id`**:

### Rangkuman Konfigurasi DNS Domain:

| Tipe Record | Nama / Host | Nilai Target (*Value / Points to*) | Keterangan |
| --- | --- | --- | --- |
| **A** | `@` | `216.198.79.1` | Mengarahkan domain utama `arkagame.web.id` ke server Vercel |
| **CNAME** | `www` | `2aa29f5fa06b966d.vercel-dns-017.com` | Mengarahkan `www.arkagame.web.id` dengan *auto-redirect* |

---

## 10. Struktur File Repositori

```text
arka-game/
├── public/                             # Favicon, ikon PWA, dan aset media publik
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── telemetry/route.ts      # Handler REST API pencatatan data ke Supabase
│   │   ├── play/page.tsx               # Engine gameplay utama, arena kisi & siklus POE
│   │   ├── teacher/page.tsx            # Dasbor analitik, radar chart 5 dimensi & ekspor CSV
│   │   ├── layout.tsx                  # Root layout, metadata SEO & provider tema
│   │   └── page.tsx                    # Landing page beranda, registrasi & pemilihan kelas
│   ├── components/
│   │   ├── canvas/
│   │   │   └── GridCanvas.tsx          # Render interaktif kisi pulau, sprite robot & pathfinding
│   │   ├── charts/
│   │   │   └── RadarChart.tsx          # Visualisasi SVG radar 5 dimensi berpikir komputasional
│   │   ├── poe/
│   │   │   └── POEModal.tsx            # Dialog interaktif Predict-Observe-Explain
│   │   └── ui/
│   │       ├── CrystalIcon.tsx         # Ikon vektor kristal surya Solaria
│   │       ├── GuidebookModal.tsx      # Modal buku pedoman naratif siswa
│   │       ├── HangarModal.tsx         # Toko skin robot, animasi pelangi & slider hue 360°
│   │       ├── ThemeToggle.tsx         # Saklar mode gelap & terang dengan listener global
│   │       ├── TutorialModal.tsx       # Spotlight tour tutorial interaktif langkah demi langkah
│   │       └── ZoneHubModal.tsx        # Peta sektor navigasi 25 level permainan
│   └── lib/
│       ├── levelsData.ts               # Basis data 25 level pulau, posisi rintangan & target
│       ├── pathfinding.ts              # Algoritma A* penemu rute terpendek di atas kisi
│       ├── soundManager.ts             # Sintesis audio prosedural Web Audio API
│       ├── supabase.ts                 # Klien inisialisasi basis data cloud Supabase
│       └── types.ts                    # Deklarasi antarmuka TypeScript terpusat
├── .env.example                        # Template variabel lingkungan
├── next.config.ts                      # Konfigurasi Next.js Compiler & Image Optimization
├── tailwind.config.ts                  # Konfigurasi tema warna, font & token gaya
├── tsconfig.json                       # Konfigurasi compiler TypeScript
└── package.json                        # Manifes dependensi & skrip eksekusi proyek

```

---

## 11. Peneliti, Kontributor & Lisensi

Proyek media pembelajaran ini dikembangkan untuk tujuan penelitian, inovasi pedagogi komputasi, dan pengabdian pendidikan anak di Indonesia.

* **Pengembang Utama**: Muhamad Akda Fathul Barri
* **Institusi / Riset**: Riset Pendidikan Berpikir Komputasional Sekolah Dasar
* **Lisensi**: Didistribusikan di bawah lisensi terbuka [MIT License](https://www.google.com/search?q=LICENSE).