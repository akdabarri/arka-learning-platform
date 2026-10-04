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
  <img src="https://img.shields.io/badge/Jenjang_Sasaran-Kelas_1--6_SD-orange?style=flat-square" alt="Jenjang SD" />
  <img src="https://img.shields.io/badge/Total_Level-25_Tantangan-blue?style=flat-square" alt="25 Levels" />
  <img src="https://img.shields.io/badge/Algoritma_Bantuan-A*_Pathfinding-teal?style=flat-square" alt="A* Pathfinding" />
  <img src="https://img.shields.io/badge/Kenyamanan_Afektif-Bebas_Peringkat_Publik-2ea44f?style=flat-square" alt="Afektif" />
  <img src="https://img.shields.io/badge/Lisensi-MIT-green?style=flat-square" alt="Lisensi" />
</p>

</div>

---

# 📑 Daftar Isi

1. [Prinsip Filosofis & Latar Belakang Riset](#1-prinsip-filosofis--latar-belakang-riset)
2. [Kerangka Pedagogis & Metakognisi POE](#2-kerangka-pedagogis--metakognisi-poe)
   - [Model 4 Kuadran Nalar Metakognisi](#model-4-kuadran-nalar-metakognisi)
   - [Matematika Kalkulasi Radar 5 Dimensi Berpikir Komputasional](#matematika-kalkulasi-radar-5-dimensi-berpikir-komputasional)
3. [Struktur Petualangan 25 Level Solaria](#3-struktur-petualangan-25-level-solaria)
4. [Mekanika & Fitur Gameplay Utama](#4-mekanika--fitur-gameplay-utama)
   - [Palet Balok Perintah Visual](#palet-balok-perintah-visual)
   - [Algoritma A* Pathfinding](#algoritma-a-pathfinding-bantuan-kristal-surya)
   - [Hanggar Kostum Robot & Kustomisasi](#hanggar-kostum-robot--kustomisasi-slider-hue-0360)
   - [Sistem Transisi & Splashscreen Sinematik](#sistem-transisi--splashscreen-sinematik)
5. [Portal Riset & Analisis Guru](#5-portal-riset--analisis-guru-dashboard)
6. [Arsitektur Teknis & Tumpukan Teknologi](#6-arsitektur-teknis--tumpukan-teknologi)
7. [Skema Basis Data Supabase](#7-skema-basis-data-supabase-ddl-sql)
8. [Panduan Instalasi & Eksekusi Lokal](#8-panduan-instalasi--eksekusi-lokal)
9. [Konfigurasi Deployment & Domain Vercel](#9-konfigurasi-deployment--domain-vercel)
10. [Struktur File Repositori](#10-struktur-file-repositori)
11. [Peneliti, Kontributor & Lisensi](#11-peneliti-kontributor--lisensi)

---

## 1. Prinsip Filosofis & Latar Belakang Riset

**A.R.K.A. (Adaptive Reasoning & Knowledge Architecture)** dikembangkan sebagai respons empiris terhadap tantangan pembelajaran komputasi pada jenjang pendidikan dasar di Indonesia.

Media belajar *coding* untuk anak sering kali berorientasi pada hasil akhir, misalnya apakah karakter berhasil mencapai tujuan atau tidak, tanpa mengukur proses kognitif, kehati-hatian dalam merencanakan, serta kesadaran metakognitif siswa ketika menghadapi kesalahan (*debugging*).

### Pilar Nilai Utama

- **Human-Centered & Child-Safe**  
  Antarmuka responsif tanpa iklan, tanpa pelacakan pihak ketiga yang invasif, dan dirancang dengan mempertimbangkan karakteristik pengguna anak.

- **Bebas Rivalitas Toksik (*Leaderboard-Free*)**  
  Menghilangkan papan skor publik (*public ranking*) untuk mengurangi tekanan sosial dan memberikan ruang yang lebih aman bagi siswa dengan kemampuan belajar yang beragam.

- **Perancah Konstruktivisme (*Scaffolding*)**  
  Pola pikir komputasional dikembangkan secara bertahap, mulai dari sekuensial linear, orientasi spasial relatif, mekanika lompatan, hingga abstraksi pengulangan melalui *loop*.

---

## 2. Kerangka Pedagogis & Metakognisi POE

Inti arsitektur evaluasi A.R.K.A. mengadopsi model pembelajaran **Predict-Observe-Explain (POE)** dari White & Gunstone (1992) yang dipadukan dengan konsep metakognisi dari Flavell (1979).

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SIKLUS POE ARKA                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PREDICT                                                                  │
│                                                                             │
│ Siswa menyusun balok perintah algoritma, kemudian membuat prediksi          │
│ metakognitif: "Apakah rangkaian balok ini akan berhasil mencapai sasaran    │
│ tanpa mengalami tabrakan?"                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. OBSERVE                                                                  │
│                                                                             │
│ Eksekusi simulasi dijalankan secara bertahap (650 ms/step). Siswa           │
│ mengamati gerak robot secara langsung pada kisi pulau dan membandingkan     │
│ visualisasi mental dengan hasil eksekusi aktual.                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. EXPLAIN                                                                  │
│                                                                             │
│ Setelah simulasi, sistem memunculkan dialog refleksi.                       │
│                                                                             │
│ Jika berhasil: siswa mengonfirmasi apakah keberhasilan telah diprediksi.    │
│ Jika gagal: sistem menunjukkan lokasi tabrakan atau batas pulau agar        │
│ siswa dapat merumuskan hipotesis dan strategi perbaikan.                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Model 4 Kuadran Nalar Metakognisi

Sistem telemetri mengklasifikasikan setiap sesi siswa ke dalam matriks status nalar berikut:

| Kuadran | Prediksi Awal | Hasil Nyata | Percobaan | Kategori Pedagogis | Tindak Lanjut Guru |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **True Mastery** | Akurat | Sukses | Ke-1 | Kemahiran sejati & reflektif | Diberikan tantangan optimalisasi balok |
| **Reflective Struggle** | Kurang tepat | Berhasil setelah debugging | > 1 | Ketekunan berpikir positif | Diapresiasi atas proses perbaikan logika |
| **Serendipity** | Ragu / salah prediksi | Sukses | Ke-1 | Keberhasilan tidak disengaja | Ditantang menjelaskan mengapa algoritma berhasil |
| **Overconfidence** | Sangat yakin | Gagal | > 1 | Ilusi kompetensi | Dibimbing membaca peta kisi dan koordinat hambatan |

### Matematika Kalkulasi Radar 5 Dimensi Berpikir Komputasional

Dasbor pengajar memproses telemetri mentah menjadi **lima indikator baku pada skala 0–100%**.

#### 1. Dekomposisi

$$
\text{Dekomposisi}
=
\min
\left(
100,
\left(
\frac{1}{N}
\sum_{i=1}^{N}
\text{EfficiencyRatio}_i
\right)
\times 85
\right)
$$

#### 2. Penalaran Spasial

$$
\text{Penalaran Spasial}
=
\frac{
\sum [\text{Attempts}_i \leq 2]
}{
N
}
\times 100\%
$$

#### 3. Efisiensi Kode (*Parsimony*)

$$
\text{Efisiensi Kode}
=
\frac{
\sum [\text{BlockCount}_i \leq \text{OptimalBlocks}_i]
}{
N
}
\times 100\%
$$

#### 4. Metakognisi POE

$$
\text{Metakognisi POE}
=
\frac{
\sum [\text{PredictionAccuracy}_i = \text{true}]
}{
N
}
\times 100\%
$$

#### 5. Kemandirian (*Persistence*)

$$
\text{Kemandirian}
=
\left(
1 -
\frac{
\sum [\text{HintsUsed}_i = \text{true}]
}{
N
}
\right)
\times 100\%
$$

---

## 3. Struktur Petualangan 25 Level Solaria

Setiap level dirancang berdasarkan ukuran kisi, orientasi awal robot, rintangan, target, serta batas jumlah balok optimal (*parsimony budget*).

```text
[Zona 1: Pesisir Pantura]
Level 1–5
Sekuensial Linear & Belok
            │
            ▼
[Zona 2: Hutan Karang]
Level 6–10
Geometri Sudut & Labirin
            │
            ▼
[Zona 3: Tebing Kristal]
Level 11–15
Mekanika Lompatan 2 Petak
            │
            ▼
[Zona 4: Dataran Geotermal]
Level 16–20
Abstraksi Loop Pengulangan
            │
            ▼
[Zona 5: Inti Reaktor Surya]
Level 21–25
Sintesis Kompleks Mandiri
```

| Zona | Level | Target Misi | Grid | Posisi Awal & Hadap | Rintangan | Balok Optimal | Balok Tersedia |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **1** | **1** | Baterai Tenaga | 4 × 4 | (0,3) • Atas | 0 | **3** | Maju |
| **1** | **2** | Tunas Mangrove | 4 × 4 | (0,3) • Atas | 1 | **4** | Maju, Kanan |
| **1** | **3** | Pompa Air Surya | 4 × 4 | (1,3) • Atas | 2 | **5** | Maju, Kanan, Kiri |
| **1** | **4** | Baterai Cadangan | 5 × 5 | (3,3) • Kiri | 3 | **6** | Maju, Kanan, Kiri |
| **1** | **5** | Inti Sel Surya | 5 × 5 | (0,4) • Kanan | 4 | **7** | Maju, Kanan, Kiri |
| **2** | **6** | Tunas Mangrove | 5 × 5 | (0,4) • Atas | 5 | **6** | Maju, Kanan, Kiri |
| **2** | **7** | Pompa Geotermal | 5 × 5 | (4,4) • Atas | 6 | **7** | Maju, Kanan, Kiri |
| **2** | **8** | Baterai Kapasitor | 6 × 6 | (1,5) • Atas | 7 | **8** | Maju, Kanan, Kiri |
| **2** | **9** | Hutan Bakau Pesisir | 6 × 6 | (0,3) • Kanan | 8 | **8** | Maju, Kanan, Kiri |
| **2** | **10** | Reaktor Kristal Hijau | 6 × 6 | (0,5) • Atas | 9 | **9** | Maju, Kanan, Kiri |
| **3** | **11** | Baterai Dataran Tinggi | 5 × 5 | (0,4) • Atas | 4 | **5** | Maju, Kanan, Kiri, Lompat |
| **3** | **12** | Pompa Saluran Tebing | 6 × 6 | (1,5) • Kanan | 6 | **6** | Maju, Kanan, Kiri, Lompat |
| **3** | **13** | Bibit Mangrove Jurang | 6 × 6 | (2,0) • Bawah | 7 | **7** | Maju, Kanan, Kiri, Lompat |
| **3** | **14** | Baterai Puncak Batu | 6 × 6 | (0,4) • Atas | 8 | **7** | Maju, Kanan, Kiri, Lompat |
| **3** | **15** | Pembangkit Foton Ungu | 6 × 6 | (0,5) • Kanan | 9 | **8** | Maju, Kanan, Kiri, Lompat |
| **4** | **16** | Baterai Lembah Uap | 6 × 6 | (0,5) • Kanan | 5 | **5** | Maju, Kanan, Kiri, Loop 2× |
| **4** | **17** | Pompa Sirkulasi Panas | 6 × 6 | (1,5) • Atas | 7 | **6** | Maju, Kanan, Kiri, Loop 2× |
| **4** | **18** | Reboisasi Magma Dingin | 6 × 6 | (0,4) • Atas | 8 | **7** | Maju, Kanan, Kiri, Loop 2× |
| **4** | **19** | Mangrove Belerang | 7 × 7 | (1,6) • Kanan | 9 | **7** | Maju, Kanan, Kiri, Loop 2× |
| **4** | **20** | Generator Surya Utama | 7 × 7 | (0,6) • Atas | 10 | **8** | Maju, Kanan, Kiri, Loop 2× |
| **5** | **21** | Kapasitor Inti Sektor | 7 × 7 | (0,6) • Atas | 10 | **7** | Semua Balok Terbuka |
| **5** | **22** | Pompa Pendingin Inti | 7 × 7 | (6,6) • Kiri | 12 | **8** | Semua Balok Terbuka |
| **5** | **23** | Mangrove Biosfer Kaca | 7 × 7 | (0,4) • Kanan | 13 | **8** | Semua Balok Terbuka |
| **5** | **24** | Baterai Kuantum Puncak | 8 × 8 | (1,7) • Atas | 14 | **9** | Semua Balok Terbuka |
| **5** | **25** | Inti Abadi Solaria | 8 × 8 | (0,7) • Atas | 16 | **10** | Semua Balok Terbuka |

---

## 4. Mekanika & Fitur Gameplay Utama

### Palet Balok Perintah Visual

Setiap balok mewakili instruksi fundamental dalam pemrograman:

- ⬆️ **Maju 1 Langkah (`MOVE_FORWARD`)**  
  Menggerakkan Arka satu petak sesuai arah hadap.

- ↪️ **Putar Kanan 90° (`TURN_RIGHT`)**  
  Mengubah arah searah jarum jam:
  `UP → RIGHT → DOWN → LEFT`.

- ↩️ **Putar Kiri 90° (`TURN_LEFT`)**  
  Mengubah arah berlawanan jarum jam:
  `UP → LEFT → DOWN → RIGHT`.

- ⚡ **Lompat 2 Petak (`JUMP_FORWARD`)**  
  Melompati satu petak rintangan atau jurang menuju petak kedua di depannya.

- 🔁 **Loop Pengulangan 2× (`REPEAT_2X`)**  
  Memperkenalkan konsep dasar *loop* dengan mengulangi instruksi maju sebanyak dua kali untuk meningkatkan efisiensi program.

### Algoritma A* Pathfinding

Ketika siswa mengalami kebuntuan (*impasse*), mereka dapat menukarkan **10 Kristal Surya** untuk memproyeksikan lintasan terpendek (*shortest path*) pada kanvas permainan.

Algoritma A* menggunakan fungsi:

$$
f(n) = g(n) + h(n)
$$

dengan:

- $g(n)$ = jarak aktual dari titik awal menuju node $n$.
- $h(n)$ = estimasi jarak Manhattan menuju target.

$$
h(n)
=
|x_n - x_{\text{target}}|
+
|y_n - y_{\text{target}}|
$$

### Hanggar Kostum Robot & Kustomisasi Slider Hue 0°–360°

Sistem kustomisasi memberikan stimulasi gamifikasi positif tanpa mekanisme *pay-to-win*:

- 🔵 **Arka Penjelajah** — Standar, gratis
- 🟢 **Zamrud Surya** — 25 Kristal
- 🔴 **Vulkanik Mecha** — 35 Kristal
- 🟣 **Quantum Amethyst** — 50 Kristal
- 🟡 **Cyber Gold** — 75 Kristal
- 🔷 **Plasma Neon** — 85 Kristal
- 🌈 **Prisma Pelangi RGB** — 120 Kristal
- 🎨 **Arka Maestro DIY** — 180 Kristal

**Arka Maestro DIY** dilengkapi kontrol interaktif **Hue Slider 0°–360°**, *color swatch preview*, dan *preset quick-pick*.

### Sistem Transisi & Splashscreen Sinematik

Navigasi antarhalaman seperti Beranda, Guru, dan Bermain dilengkapi overlay transisi terintegrasi yang mencakup:

- Indikator *spinning dashed halo* dan cincin *ping*.
- *Progress bar* dengan animasi gradasi.
- Pesan kontekstual.
- Sinkronisasi audio prosedural melalui Web Audio API.

---

## 5. Portal Riset & Analisis Guru (Dashboard)

Halaman `/teacher` dirancang untuk guru kelas, guru BK, dan peneliti akademik.

### Fitur Utama

- 🛡️ **Akses Mandiri Pengajar**  
  Pengajar dapat mengakses data melalui tombol pada bilah atas tanpa menggunakan profil siswa.

- 🔍 **Multi-Filter**  
  Data dapat difilter berdasarkan:
  - Nama sekolah
  - Jenjang kelas
  - Nama siswa

- 📈 **Visualisasi Interaktif**
  - **Radar Chart 5 Dimensi** untuk memetakan profil keterampilan komputasional.
  - **Donut Chart POE** untuk distribusi empat kuadran metakognisi.
  - **Histogram 25 Level** untuk mengidentifikasi level dengan tingkat kesulitan tertinggi.

- 💾 **Ekspor Data CSV**  
  Data telemetri dapat diekspor untuk analisis lebih lanjut menggunakan SPSS, R, atau Python Pandas.

---

## 6. Arsitektur Teknis & Tumpukan Teknologi

```text
┌────────────────────────────────────────────────────────────┐
│                      CLIENT / BROWSER                       │
│                                                            │
│  Next.js 15 App Router • React • Tailwind CSS              │
│  Canvas Grid Engine • Web Audio Synthesizer                │
└──────────────────────────────┬─────────────────────────────┘
                               │
                               │ HTTPS / REST / WSS
                               ▼
┌────────────────────────────────────────────────────────────┐
│                    BACKEND & STORAGE                        │
│                                                            │
│  Supabase Cloud Platform                                   │
│  PostgreSQL Engine                                         │
│                                                            │
│  • Telemetry & student profile tables                      │
│  • Next.js API Route (/telemetry) as fallback endpoint     │
└──────────────────────────────┬─────────────────────────────┘
                               │
                               │ CI / CD
                               ▼
┌────────────────────────────────────────────────────────────┐
│                   EDGE INFRASTRUCTURE                       │
│                                                            │
│  Vercel Edge Network                                       │
│  SSL / HTTPS                                               │
│  Custom Domain: arkagame.web.id                            │
└────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 App Router |
| UI Library | React |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.x |
| Database | PostgreSQL |
| Backend Platform | Supabase |
| Deployment | Vercel |
| Domain | arkagame.web.id |
| Audio | Web Audio API |
| Pathfinding | A* |
| Data Export | CSV |

---

## 7. Skema Basis Data Supabase (DDL SQL)

Jalankan perintah berikut melalui **SQL Editor** pada dashboard Supabase.

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
  created_at timestamp with time zone
    default timezone('utc'::text, now()) not null
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
  last_active timestamp with time zone
    default timezone('utc'::text, now()) not null
);

-- 4. Indeks Kinerja Pencarian
create index if not exists idx_telemetry_school_class
on public.arka_telemetry(school_name, student_class);

create index if not exists idx_telemetry_level
on public.arka_telemetry(level_id);

create index if not exists idx_telemetry_created
on public.arka_telemetry(created_at desc);

-- 5. Row Level Security
alter table public.arka_telemetry enable row level security;
alter table public.arka_student_profiles enable row level security;

create policy "Izinkan Baca Publik Telemetri"
on public.arka_telemetry
for select
using (true);

create policy "Izinkan Tulis Publik Telemetri"
on public.arka_telemetry
for insert
with check (true);

create policy "Izinkan Baca Profil Siswa"
on public.arka_student_profiles
for select
using (true);

create policy "Izinkan Tulis Profil Siswa"
on public.arka_student_profiles
for all
using (true);
```

> **Catatan keamanan:** kebijakan RLS di atas memberikan akses publik yang sangat luas. Untuk deployment penelitian nyata yang menangani data siswa, kebijakan tersebut sebaiknya diperketat menggunakan autentikasi, role-based access control, dan prinsip *least privilege*.

---

## 8. Panduan Instalasi & Eksekusi Lokal

### Prasyarat

- **Node.js:** `>= 18.18.0`
- **npm:** `>= 9.x`
- Direkomendasikan menggunakan Node.js LTS 20.x atau versi LTS yang kompatibel dengan proyek.

### 1. Kloning Repositori

```bash
git clone https://github.com/USERNAME_ANDA/arka-game.git
cd arka-game
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` pada root proyek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://proyek-anda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Jangan commit `.env.local` ke repositori publik.**

Pastikan `.gitignore` mencakup:

```gitignore
.env
.env.local
.env.*.local
```

### 4. Menjalankan Development Server

```bash
npm run dev
```

Kemudian buka:

```text
http://localhost:3000
```

### 5. Production Build

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm start
```

---

## 9. Konfigurasi Deployment & Domain Vercel

Aplikasi dikonfigurasi untuk deployment menggunakan **Vercel** dengan domain:

**https://arkagame.web.id**

### Konfigurasi DNS

| Tipe Record | Host | Target | Keterangan |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `216.198.79.1` | Mengarahkan domain utama ke Vercel |
| **CNAME** | `www` | `2aa29f5fa06b966d.vercel-dns-017.com` | Mengarahkan subdomain `www` ke Vercel |

### Deployment

Secara umum, proses deployment dapat dilakukan melalui:

```text
GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
Production Build
       │
       ▼
arkagame.web.id
```

---

## 10. Struktur File Repositori

```text
arka-game/
├── public/
│   └── ...                             # Favicon, ikon PWA, dan aset media
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── telemetry/
│   │   │       └── route.ts            # REST API pencatatan telemetri
│   │   │
│   │   ├── play/
│   │   │   └── page.tsx                # Gameplay utama & siklus POE
│   │   │
│   │   ├── teacher/
│   │   │   └── page.tsx                # Dashboard analitik & ekspor CSV
│   │   │
│   │   ├── layout.tsx                  # Root layout & metadata
│   │   └── page.tsx                    # Landing page
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   └── GridCanvas.tsx          # Grid, robot & pathfinding
│   │   │
│   │   ├── charts/
│   │   │   └── RadarChart.tsx          # Radar chart 5 dimensi
│   │   │
│   │   ├── poe/
│   │   │   └── POEModal.tsx            # Dialog Predict-Observe-Explain
│   │   │
│   │   └── ui/
│   │       ├── CrystalIcon.tsx         # Ikon kristal Solaria
│   │       ├── GuidebookModal.tsx      # Buku pedoman naratif
│   │       ├── HangarModal.tsx         # Toko skin & kustomisasi
│   │       ├── ThemeToggle.tsx         # Mode gelap & terang
│   │       ├── TutorialModal.tsx       # Tutorial interaktif
│   │       └── ZoneHubModal.tsx        # Navigasi 25 level
│   │
│   └── lib/
│       ├── levelsData.ts               # Data 25 level
│       ├── pathfinding.ts              # Algoritma A*
│       ├── soundManager.ts             # Web Audio API
│       ├── supabase.ts                 # Supabase client
│       └── types.ts                    # TypeScript interfaces
│
├── .env.example                        # Template environment variables
├── next.config.ts                      # Konfigurasi Next.js
├── tailwind.config.ts                  # Konfigurasi Tailwind
├── tsconfig.json                       # Konfigurasi TypeScript
└── package.json                        # Dependensi & scripts
```

---

## 11. Peneliti, Kontributor & Lisensi

Proyek media pembelajaran ini dikembangkan untuk tujuan penelitian, inovasi pedagogi komputasi, dan pengembangan media pembelajaran anak di Indonesia.

### Pengembang

- **Pengembang Utama:** Muhamad Akda Fathul Barri
- **Institusi / Riset:** Riset Pendidikan Berpikir Komputasional Sekolah Dasar
- **Platform:** A.R.K.A. — Adaptive Reasoning & Knowledge Architecture
- **Lisensi:** [MIT License](LICENSE)

---

<div align="center">

### A.R.K.A.

**Adaptive Reasoning & Knowledge Architecture**

*Learning computational thinking through reasoning, prediction, observation, and reflection.*

<br />

[Production Website](https://arkagame.web.id)

</div>