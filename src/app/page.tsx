// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  GraduationCap,
  ArrowRight,
  Bot,
  ShieldCheck,
  BookOpen,
  School,
  User,
  HelpCircle
} from 'lucide-react';
import GuidebookModal from '@/components/ui/GuidebookModal';
import TutorialModal, { SpotlightStep } from '@/components/ui/TutorialModal';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useSplash } from '@/components/ui/SplashScreen';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { sound } from '@/lib/soundManager';

export default function MainMenuPage() {
  const router = useRouter();
  const splash = useSplash();

  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Kelas 4 SD');
  const [schoolName, setSchoolName] = useState('');
  const [hasProfile, setHasProfile] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Status Splashscreen & Animasi Transisi
  const [isEntering, setIsEntering] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navTarget, setNavTarget] = useState<'teacher' | 'play' | null>(null);
  const [splashProgress, setSplashProgress] = useState(30);

  // Ambil angka kelas murni (misal: 'Kelas 4 SD' -> 4)
  const currentGradeNumber = parseInt(studentClass.replace(/\D/g, ''), 10) || 4;

  // Efek transisi masuk halus saat halaman pertama dibuka / kembali dari rute lain
  useEffect(() => {
    const entryTimer = setTimeout(() => {
      setIsEntering(false);
    }, 600);
    return () => clearTimeout(entryTimer);
  }, []);

  // Fungsi pengiriman telemetri langsung ke Supabase
  const logTelemetryEvent = async (eventType: string, extraData: Record<string, any> = {}) => {
    if (!studentName.trim()) return;
    const profileId = `${schoolName.toLowerCase().replace(/\s+/g, '_')}_${studentName.toLowerCase().replace(/\s+/g, '_')}`;

    const payload = {
      student_id: profileId,
      student_name: studentName,
      student_class: studentClass,
      school_name: schoolName,
      grade_level: currentGradeNumber,
      event_type: eventType,
      event_data: {
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        ...extraData,
      },
    };

    // 1. Kirim langsung via Supabase Client
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('arka_telemetry').insert([payload]);
      } catch (err) {
        console.warn('Supabase client telemetry log error:', err);
      }
    }

    // 2. Cadangan: Kirim via endpoint API internal (/api/telemetry) jika tersedia
    try {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch (_) {}
  };

  // Navigasi dengan animasi splashscreen terpadu
  const handleNavigate = (path: string, targetType: 'teacher' | 'play' = 'play') => {
    sound.playClick();
    setNavTarget(targetType);
    setIsNavigating(true);
    setSplashProgress(30);

    // Jalankan provider useSplash jika tersedia di arsitektur aplikasi
    if (splash?.navigateWithSplash) {
      try {
        splash.navigateWithSplash(path);
      } catch (_) {}
    }

    setTimeout(() => {
      setSplashProgress(100);
    }, 150);

    setTimeout(() => {
      router.push(path);
    }, 850);
  };

  // Muat data profil lokal saat awal dibuka
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sName = localStorage.getItem('arka_student_name');
      const sClass = localStorage.getItem('arka_student_class');
      const sSchool = localStorage.getItem('arka_student_school');
      if (sName && sSchool) {
        setStudentName(sName);
        if (sClass) setStudentClass(sClass);
        setSchoolName(sSchool);
        setHasProfile(true);
      }
    }
  }, []);

  // Simpan data profil siswa & catat telemetri registrasi
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !schoolName.trim()) return;
    sound.playClick();

    if (typeof window !== 'undefined') {
      localStorage.setItem('arka_student_name', studentName);
      localStorage.setItem('arka_student_class', studentClass);
      localStorage.setItem('arka_grade', currentGradeNumber.toString());
      localStorage.setItem('arka_student_school', schoolName);
      if (!localStorage.getItem('arka_crystals')) localStorage.setItem('arka_crystals', '30');
    }

    // Sinkronkan data profil ke tabel Supabase
    if (isSupabaseConfigured && supabase) {
      const profileId = `${schoolName.toLowerCase().replace(/\s+/g, '_')}_${studentName.toLowerCase().replace(/\s+/g, '_')}`;
      try {
        await supabase.from('arka_student_profiles').upsert([
          {
            id: profileId,
            student_name: studentName,
            student_class: studentClass,
            school_name: schoolName,
            grade_level: currentGradeNumber,
            last_active: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.warn('Gagal sinkronisasi profil Supabase:', err);
      }
    }

    // Rekam event telemetri pembuatan/pembaruan profil
    await logTelemetryEvent('profile_saved', { action: 'register_or_update' });

    setHasProfile(true);
  };

  // Langkah Tutorial Spotlight
  const tutorialSteps: SpotlightStep[] = [
    {
      targetId: 'theme-toggle-box',
      title: '1. Pengaturan Mode Warna',
      instruction: 'Tekan tombol ini untuk mengganti mode warna antara Gelap dan Terang.',
      example: 'Gunakan mode gelap saat belajar di malam hari agar mata tidak silau.',
    },
    hasProfile
      ? {
          targetId: 'profile-active-card',
          title: '2. Profil & Kelas Belajar',
          instruction: 'Ini adalah kartu identitas siswa dan jenjang kelas SD yang sedang aktif.',
          example: 'Tekan "Ganti Profil" jika ingin memilih ulang kelas 1 sampai 6 SD.',
        }
      : {
          targetId: 'grade-select-box',
          title: '2. Pilih Jenjang Kelas (1–6 SD)',
          instruction: 'Pilih jenjang kelas SD kamu mulai dari kelas 1 sampai kelas 6 SD.',
          example: 'Pilih "Kelas 3 SD" agar teka-teki logika disesuaikan dengan tingkat usiamu.',
        },
    hasProfile
      ? {
          targetId: 'expedition-play-btn',
          title: '3. Masuk Mode Ekspedisi',
          instruction: 'Tekan tombol ini untuk langsung memulai 25 level pemecahan masalah bersama Arka.',
          example: 'Selesaikan misi labirin untuk mengumpulkan kristal energi logika.',
        }
      : {
          targetId: 'submit-profile-btn',
          title: '3. Simpan Profil',
          instruction: 'Tekan tombol ini untuk menyimpan identitas dan membuka wahana petualangan Arka.',
          example: 'Setelah disimpan, kamu langsung masuk ke menu ekspedisi 25 level.',
        },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden transition-colors duration-300">
      {/* OVERLAY SPLASHSCREEN TRANSISI */}
      {(isNavigating || isEntering) && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-slate-50/95 dark:bg-[#020617]/95 text-slate-900 dark:text-white backdrop-blur-md transition-all duration-300">
          {/* Latar Belakang Cahaya */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl opacity-30 ${
                navTarget === 'teacher' ? 'bg-indigo-600' : 'bg-blue-600'
              }`}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Animasi Ikon Berputar */}
            <div className="relative mb-6">
              <div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-500/40 animate-spin"
                style={{ animationDuration: '7s' }}
              />
              <div
                className="absolute -inset-1 rounded-full bg-blue-500/20 animate-ping"
                style={{ animationDuration: '2.5s' }}
              />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/25">
                {navTarget === 'teacher' ? (
                  <GraduationCap size={38} className="text-white" />
                ) : (
                  <Bot size={38} className="text-white" />
                )}
              </div>
            </div>

            {/* Label Sistem */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {navTarget === 'teacher' ? 'Portal Riset ARKA' : 'Petualangan Belajar ARKA'}
            </div>

            {/* Judul & Deskripsi */}
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
              {navTarget === 'teacher'
                ? 'Membuka Portal Guru...'
                : isEntering
                ? 'Selamat Datang di ARKA...'
                : 'Mempersiapkan Ekspedisi...'}
            </h2>
            <p className="text-xs font-semibold opacity-70 mb-6 max-w-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {navTarget === 'teacher'
                ? 'Menyiapkan analitik telemetri, metakognisi POE & statistik siswa.'
                : isEntering
                ? 'Memuat data profil penalaran & arsitektur pengetahuan.'
                : 'Menyiapkan tantangan komputasional dan labirin logika tingkat sekolah dasar.'}
            </p>

            {/* Progress Bar */}
            <div className="w-60 sm:w-72 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 p-[1px] relative mb-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${splashProgress}%` }}
              />
            </div>

            <span className="text-[10px] font-mono font-bold opacity-50 text-slate-500 dark:text-slate-400">
              {navTarget === 'teacher' ? 'Menghubungkan ke Portal Guru...' : 'Menyiapkan Antarmuka...'}
            </span>
          </div>
        </div>
      )}

      {/* Latar Belakang Ambience Kosmik */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col transition-all">
        {/* Bar Atas: Akses Portal Guru, Panduan & Pengalih Tema */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Platform Riset Arka
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Akses Cepat Guru Tanpa Wajib Registrasi Siswa */}
            <button
              onClick={() => handleNavigate('/teacher', 'teacher')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="Akses Portal Guru & Analitik"
            >
              <GraduationCap size={14} className="text-blue-500" />
              <span className="hidden sm:inline">Portal Guru</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsTourOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Panduan ?</span>
            </button>

            <div id="theme-toggle-box">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Header Identitas */}
        <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 border border-blue-400 text-white shadow-lg shadow-blue-500/30 mb-3 animate-pulse">
            <Bot size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            A.R.K.A.
          </h1>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">
            Adaptive Reasoning & Knowledge Architecture
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-md mx-auto leading-relaxed">
            Wahana riset berpikir komputasional dan penalaran algoritma siswa sekolah dasar berbasis perancah metakognisi <em>Predict-Observe-Explain (POE)</em>.
          </p>
        </div>

        {!hasProfile ? (
          /* FORM REGISTRASI SISWA KELAS 1-6 SD */
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-3.5">
            <div>
              <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <User size={13} className="text-blue-500 dark:text-blue-400" /> Nama Siswa
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Masukkan nama lengkap siswa..."
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <School size={13} className="text-emerald-500 dark:text-emerald-400" /> Asal Sekolah
                </label>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Contoh: SDN 1 Purwakarta"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none transition"
                />
              </div>

              {/* Pemilih Jenjang Kelas 1-6 SD */}
              <div id="grade-select-box">
                <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1 block">
                  Tingkat Kelas (SD)
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none transition cursor-pointer"
                >
                  <option value="Kelas 1 SD">Kelas 1 SD (Fase A)</option>
                  <option value="Kelas 2 SD">Kelas 2 SD (Fase A)</option>
                  <option value="Kelas 3 SD">Kelas 3 SD (Fase B)</option>
                  <option value="Kelas 4 SD">Kelas 4 SD (Fase B)</option>
                  <option value="Kelas 5 SD">Kelas 5 SD (Fase C)</option>
                  <option value="Kelas 6 SD">Kelas 6 SD (Fase C)</option>
                </select>
              </div>
            </div>

            <button
              id="submit-profile-btn"
              type="submit"
              className="mt-3 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <span>Simpan Profil & Lanjut ke Ekspedisi</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          /* MENU UTAMA SETELAH PROFIL TERSIMPAN */
          <div className="flex flex-col gap-3">
            <div
              id="profile-active-card"
              className="p-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl flex justify-between items-center mb-1"
            >
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 block">
                  Profil Penjelajah Aktif:
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {studentName} ({studentClass})
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{schoolName}</p>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setHasProfile(false);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold transition cursor-pointer"
              >
                Ganti Profil
              </button>
            </div>

            {/* Tombol Ekspedisi dengan Transisi Splash */}
            <button
              id="expedition-play-btn"
              onClick={async () => {
                sound.playSuccess();
                logTelemetryEvent('session_start', {
                  targetRoute: '/play',
                  grade: currentGradeNumber,
                });
                handleNavigate(`/play?grade=${currentGradeNumber}`, 'play');
              }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/30 hover:shadow-lg"
            >
              <Play size={16} fill="currentColor" />
              <span>Masuk Mode Ekspedisi ({studentClass})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsGuideOpen(true);
              }}
              className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl font-bold text-xs uppercase tracking-wider transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen size={16} />
              <span>Buku Panduan & Cerita Solaria</span>
            </button>

            {/* Tombol Dasbor Guru dengan Transisi Splash */}
            <button
              onClick={() => {
                handleNavigate('/teacher', 'teacher');
              }}
              className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-wider transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap size={16} />
              <span>Dasbor Guru & Analitik Riset</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Bebas Peringkat Publik • Aman Afektif & Teruji Empiris</span>
        </div>
      </div>

      {/* Modal Buku Panduan */}
      <GuidebookModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Spotlight Tour Tutorial Interaktif */}
      <TutorialModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        steps={tutorialSteps}
      />
    </div>
  );
}