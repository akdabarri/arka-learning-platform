'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  Clock, 
  Zap, 
  FileSpreadsheet, 
  Search, 
  RefreshCw, 
  BarChart2, 
  Filter, 
  Compass, 
  PieChart as PieIcon,
  Sun,
  Moon,
  Home,
  GraduationCap
} from 'lucide-react';
import RadarChart from '@/components/charts/RadarChart';
import { TelemetryRecord } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { sound } from '@/lib/soundManager';

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<TelemetryRecord[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('ALL');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [searchStudent, setSearchStudent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Status Transisi Splashscreen
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [splashProgress, setSplashProgress] = useState(25);

  // Status Tema Mandiri
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = (localStorage.getItem('arka_theme') as 'dark' | 'light') || 'dark';
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Splashscreen Masuk (Home -> Teacher)
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setSplashProgress(100);
    }, 200);

    const closeSplashTimer = setTimeout(() => {
      setIsEntering(false);
    }, 850);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(closeSplashTimer);
    };
  }, []);

  const toggleTheme = () => {
    sound.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('arka_theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Navigasi Kembali dengan Splashscreen (Teacher -> Home)
  const handleBackToHome = () => {
    sound.playClick();
    setIsExiting(true);
    setSplashProgress(30);

    setTimeout(() => {
      setSplashProgress(100);
    }, 150);

    setTimeout(() => {
      router.push('/');
    }, 900);
  };

  // Pengambilan Data Telemetri Langsung dari Database Supabase
  const fetchTelemetry = async () => {
    setIsLoading(true);
    let loadedLogs: TelemetryRecord[] = [];

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('arka_telemetry')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          loadedLogs = data.map((d: any) => ({
            id: d.id,
            studentName: d.student_name,
            studentClass: d.student_class,
            schoolName: d.school_name || 'SDN Umum',
            levelId: d.level_id,
            attempts: d.attempts,
            blockCount: d.block_count,
            optimalBlocks: d.optimal_blocks,
            efficiencyRatio: Number(d.efficiency_ratio),
            predictionAccuracy: d.prediction_accuracy,
            hintsUsed: d.hints_used,
            durationSeconds: d.duration_seconds,
            timestamp: d.created_at,
          }));
          setLogs(loadedLogs);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Gagal menghubungi Supabase, beralih ke rekaman cadangan:', err);
      }
    }

    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('arka_telemetry_logs');
      if (local) loadedLogs = JSON.parse(local);
    }

    setLogs(loadedLogs);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const schoolsList = Array.from(new Set(logs.map((l) => l.schoolName))).filter(Boolean);
  const classesList = Array.from(new Set(logs.map((l) => l.studentClass))).filter(Boolean);

  const filteredLogs = logs.filter((l) => {
    const matchSchool = selectedSchool === 'ALL' || l.schoolName === selectedSchool;
    const matchClass = selectedClass === 'ALL' || l.studentClass === selectedClass;
    const matchSearch =
      l.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      l.schoolName.toLowerCase().includes(searchStudent.toLowerCase());
    return matchSchool && matchClass && matchSearch;
  });

  const totalSessions = filteredLogs.length;
  const uniqueStudents = new Set(filteredLogs.map((l) => `${l.schoolName}_${l.studentName}`)).size;
  const avgEfficiency = totalSessions > 0
    ? (filteredLogs.reduce((acc, curr) => acc + curr.efficiencyRatio, 0) / totalSessions).toFixed(2)
    : '0';
  const predictionAccuracyRate = totalSessions > 0
    ? ((filteredLogs.filter((l) => l.predictionAccuracy).length / totalSessions) * 100).toFixed(1)
    : '0';

  // Matriks POE
  const trueMastery = filteredLogs.filter((l) => l.predictionAccuracy && l.attempts === 1).length;
  const illusionOfCompetence = filteredLogs.filter((l) => !l.predictionAccuracy && l.attempts > 1).length;
  const serendipity = filteredLogs.filter((l) => !l.predictionAccuracy && l.attempts === 1).length;
  const reflectiveStruggle = filteredLogs.filter((l) => l.predictionAccuracy && l.attempts > 1).length;

  // Radar Data
  const decompositionScore = totalSessions > 0 ? Math.min(100, Math.round(Number(avgEfficiency) * 85)) : 0;
  const spatialScore = totalSessions > 0 ? Math.min(100, Math.round(filteredLogs.filter(l => l.attempts <= 2).length / totalSessions * 100)) : 0;
  const parsimonyScore = totalSessions > 0 ? Math.min(100, Math.round(filteredLogs.filter(l => l.blockCount <= l.optimalBlocks).length / totalSessions * 100)) : 0;
  const metacognitionScore = totalSessions > 0 ? Math.round(Number(predictionAccuracyRate)) : 0;
  const persistenceScore = totalSessions > 0 ? Math.min(100, Math.round((1 - (filteredLogs.filter(l => l.hintsUsed).length / totalSessions)) * 100)) : 0;

  const radarData = [
    { label: 'Dekomposisi', value: decompositionScore },
    { label: 'Penalaran Spasial', value: spatialScore },
    { label: 'Efisiensi Kode', value: parsimonyScore },
    { label: 'Metakognisi POE', value: metacognitionScore },
    { label: 'Kemandirian', value: persistenceScore },
  ];

  // Histogram
  const levelCounts: { [lvl: number]: number } = {};
  for (let i = 1; i <= 25; i++) levelCounts[i] = 0;
  filteredLogs.forEach((l) => {
    if (levelCounts[l.levelId] !== undefined) levelCounts[l.levelId]++;
  });
  const maxBarValue = Math.max(...Object.values(levelCounts), 5);

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        backgroundColor: isDark ? '#020617' : '#F8FAFC',
        color: isDark ? '#F1F5F9' : '#0F172A',
      }}
      className="min-h-screen p-4 sm:p-6 font-sans transition-colors duration-200 relative"
    >
      {/* OVERLAY SPLASHSCREEN */}
      {(isEntering || isExiting) && (
        <div
          style={{
            backgroundColor: isDark ? '#020617' : '#F8FAFC',
            color: isDark ? '#FFFFFF' : '#0F172A',
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-all duration-300 backdrop-blur-md"
        >
          {/* Efek Cahaya Latar */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl opacity-30 ${
                isExiting ? 'bg-indigo-600' : 'bg-blue-600'
              }`}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Animasi Ikon */}
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
                {isExiting ? (
                  <Home size={38} className="text-white" />
                ) : (
                  <GraduationCap size={38} className="text-white" />
                )}
              </div>
            </div>

            {/* Label Sistem */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {isExiting ? 'Navigasi Game ARKA' : 'Portal Riset ARKA'}
            </div>

            {/* Teks Judul & Keterangan */}
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
              {isExiting ? 'Kembali ke Beranda...' : 'Memuat Portal Guru...'}
            </h2>
            <p className="text-xs font-semibold opacity-70 mb-6 max-w-xs leading-relaxed">
              {isExiting
                ? 'Menyimpan sesi guru dan kembali ke menu petualangan belajar.'
                : 'Menyinkronkan telemetri pembelajaran, metakognisi POE & statistik siswa.'}
            </p>

            {/* Indikator Progress Bar */}
            <div
              style={{
                backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
                borderColor: isDark ? '#334155' : '#CBD5E1',
              }}
              className="w-60 sm:w-72 h-2 rounded-full overflow-hidden border p-[1px] relative mb-3"
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${splashProgress}%` }}
              />
            </div>

            <span className="text-[10px] font-mono font-bold opacity-50">
              {isExiting ? 'Membuka Menu Utama...' : 'Memvalidasi Database...'}
            </span>
          </div>
        </div>
      )}

      {/* Header Dasbor */}
      <header
        style={{
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 p-5 rounded-3xl border shadow-sm"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToHome}
            style={{
              backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
              borderColor: isDark ? '#334155' : '#CBD5E1',
            }}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition cursor-pointer hover:opacity-80 active:scale-95"
            title="Kembali ke Beranda"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tight">Portal Riset & Analisis Guru</h1>
            <p className="text-xs font-bold opacity-70">
              Status Database: {isSupabaseConfigured ? 'Terhubung ke Supabase Cloud (Live)' : 'Mode Lokal'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Pengalih Mode */}
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#CBD5E1',
              color: isDark ? '#FACC15' : '#0284C7',
            }}
            className="p-2.5 rounded-2xl border transition active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
            title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={fetchTelemetry}
            style={{
              backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
              borderColor: isDark ? '#334155' : '#CBD5E1',
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 border rounded-2xl text-xs font-black transition cursor-pointer hover:opacity-80"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Segarkan
          </button>

          <button
            onClick={() => {
              sound.playSuccess();
              if (filteredLogs.length === 0) return alert('Tidak ada data.');
              const headers = ['ID,Siswa,Kelas,Sekolah,Level,Percobaan,Balok,Balok Optimal,Rasio,Akurasi POE,Petunjuk,Detik,Waktu\n'];
              const rows = filteredLogs.map((l) => 
                `"${l.id}","${l.studentName}","${l.studentClass}","${l.schoolName}",${l.levelId},${l.attempts},${l.blockCount},${l.optimalBlocks},${l.efficiencyRatio},${l.predictionAccuracy ? 1 : 0},${l.hintsUsed ? 1 : 0},${l.durationSeconds},"${l.timestamp}"\n`
              );
              const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `ARKA_Riset_${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black transition cursor-pointer shadow-md active:scale-95"
          >
            <FileSpreadsheet size={15} /> Ekspor CSV
          </button>
        </div>
      </header>

      {/* Filter Wilayah */}
      <div
        style={{
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        }}
        className="p-4 rounded-3xl border mb-6 flex flex-wrap items-center gap-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold opacity-60">
          <Filter size={14} /> Filter:
        </div>

        <select
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          style={{
            backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
            borderColor: isDark ? '#334155' : '#CBD5E1',
            color: isDark ? '#FFFFFF' : '#0F172A',
          }}
          className="px-3 py-2 border rounded-xl text-xs font-bold outline-none cursor-pointer"
        >
          <option value="ALL">Semua Sekolah ({schoolsList.length})</option>
          {schoolsList.map((sch) => (
            <option key={sch} value={sch}>{sch}</option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{
            backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
            borderColor: isDark ? '#334155' : '#CBD5E1',
            color: isDark ? '#FFFFFF' : '#0F172A',
          }}
          className="px-3 py-2 border rounded-xl text-xs font-bold outline-none cursor-pointer"
        >
          <option value="ALL">Semua Tingkat Kelas</option>
          {classesList.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <div
          style={{
            backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
            borderColor: isDark ? '#334155' : '#CBD5E1',
          }}
          className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 border rounded-xl"
        >
          <Search size={14} className="opacity-40" />
          <input
            type="text"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="Cari nama siswa..."
            style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            className="w-full bg-transparent text-xs font-bold outline-none"
          />
        </div>
      </div>

      {/* 4 Kartu KPI Ringkasan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        {[
          { label: 'Total Siswa Terdata', val: `${uniqueStudents} Siswa`, color: isDark ? '#38BDF8' : '#0284C7' },
          { label: 'Akurasi Prediksi POE', val: `${predictionAccuracyRate}%`, color: isDark ? '#34D399' : '#059669' },
          { label: 'Rata-Rata Efisiensi', val: avgEfficiency, color: isDark ? '#C084FC' : '#7C3AED' },
          { label: 'Total Sesi Tercatat', val: `${totalSessions} Sesi`, color: isDark ? '#60A5FA' : '#2563EB' },
        ].map((kpi, i) => (
          <div
            key={i}
            style={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
            }}
            className="p-4 rounded-3xl border shadow-xs"
          >
            <p className="text-[10px] font-bold uppercase opacity-50">{kpi.label}</p>
            <h2 style={{ color: kpi.color }} className="text-2xl font-black mt-1">{kpi.val}</h2>
          </div>
        ))}
      </div>

      {/* Panel Radar Chart + Donut POE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6 items-stretch">
        <div
          style={{
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          }}
          className="lg:col-span-7 p-6 rounded-3xl border shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-blue-500" />
                <h2 className="text-xs font-black uppercase tracking-wider">
                  Radar Profil 5 Dimensi Berpikir Komputasional
                </h2>
              </div>
            </div>
            <p className="text-[11px] font-medium opacity-60 mb-4">
              Pemetaan validitas: dekomposisi langkah, ketajaman spasial, efisiensi kode, metakognisi, dan persistensi tanpa petunjuk.
            </p>
          </div>

          <div className="py-2 flex items-center justify-center">
            <RadarChart data={radarData} size={330} isDark={isDark} />
          </div>

          <div
            style={{ borderColor: isDark ? '#1E293B' : '#F1F5F9' }}
            className="grid grid-cols-5 gap-1 pt-3 border-t text-center"
          >
            {radarData.map((d, i) => (
              <div key={i}>
                <span className="text-[9px] font-bold opacity-50 block">{d.label}</span>
                <span className="text-xs font-black text-blue-500">{Math.round(d.value)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          }}
          className="lg:col-span-5 p-6 rounded-3xl border shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieIcon size={18} className="text-emerald-500" />
              <h2 className="text-xs font-black uppercase tracking-wider">
                Distribusi Validitas Nalar POE
              </h2>
            </div>
            <p className="text-[11px] font-medium opacity-60 mb-4">
              Proporsi tebakan awal terhadap hasil simulasi nyata siswa.
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <svg width="180" height="180" viewBox="0 0 180 180" className="select-none">
              <circle cx="90" cy="90" r="65" fill="none" stroke={isDark ? '#1E293B' : '#E2E8F0'} strokeWidth="18" />
              {totalSessions > 0 && (
                <>
                  <circle
                    cx="90" cy="90" r="65" fill="none" stroke="#10B981" strokeWidth="18"
                    strokeDasharray={`${(trueMastery / totalSessions) * 408} 408`}
                    strokeDashoffset="0"
                    transform="rotate(-90 90 90)"
                  />
                  <circle
                    cx="90" cy="90" r="65" fill="none" stroke="#F59E0B" strokeWidth="18"
                    strokeDasharray={`${(reflectiveStruggle / totalSessions) * 408} 408`}
                    strokeDashoffset={`-${(trueMastery / totalSessions) * 408}`}
                    transform="rotate(-90 90 90)"
                  />
                  <circle
                    cx="90" cy="90" r="65" fill="none" stroke="#3B82F6" strokeWidth="18"
                    strokeDasharray={`${(serendipity / totalSessions) * 408} 408`}
                    strokeDashoffset={`-${((trueMastery + reflectiveStruggle) / totalSessions) * 408}`}
                    transform="rotate(-90 90 90)"
                  />
                  <circle
                    cx="90" cy="90" r="65" fill="none" stroke="#EF4444" strokeWidth="18"
                    strokeDasharray={`${(illusionOfCompetence / totalSessions) * 408} 408`}
                    strokeDashoffset={`-${((trueMastery + reflectiveStruggle + serendipity) / totalSessions) * 408}`}
                    transform="rotate(-90 90 90)"
                  />
                </>
              )}
              <text x="90" y="85" textAnchor="middle" fill={isDark ? '#FFFFFF' : '#0F172A'} fontSize="22" fontWeight="900">
                {totalSessions}
              </text>
              <text x="90" y="103" textAnchor="middle" fill={isDark ? '#94A3B8' : '#64748B'} fontSize="10" fontWeight="bold">
                Total Sesi
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold pt-2">
            {[
              { label: 'True Mastery', count: trueMastery, bgDark: '#064E3B', textDark: '#6EE7B7', bgLight: '#ECFDF5', textLight: '#047857' },
              { label: 'Reflective Struggle', count: reflectiveStruggle, bgDark: '#78350F', textDark: '#FCD34D', bgLight: '#FFFBEB', textLight: '#B45309' },
              { label: 'Serendipity', count: serendipity, bgDark: '#1E3A8A', textDark: '#93C5FD', bgLight: '#EFF6FF', textLight: '#1D4ED8' },
              { label: 'Overconfidence', count: illusionOfCompetence, bgDark: '#881337', textDark: '#FDA4AF', bgLight: '#FFF1F2', textLight: '#BE123C' },
            ].map((box, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: isDark ? box.bgDark : box.bgLight,
                  color: isDark ? box.textDark : box.textLight,
                }}
                className="p-2.5 rounded-2xl"
              >
                <span className="text-[10px] uppercase font-black block">{box.label}</span>
                <span className="text-base font-black">{box.count} Sesi</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Histogram Level 1-25 */}
      <div
        style={{
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        }}
        className="p-5 rounded-3xl border shadow-sm mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={18} className="text-blue-500" />
          <h2 className="text-xs font-black uppercase tracking-wider">
            Distribusi Penyelesaian Tantangan per Level (Level 1 sampai 25)
          </h2>
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 900 220" className="w-full h-52 min-w-[700px] select-none">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = 170 - ratio * 130;
              const val = Math.round(ratio * maxBarValue);
              return (
                <g key={ratio}>
                  <line x1="40" y1={y} x2="880" y2={y} stroke={isDark ? '#334155' : '#E2E8F0'} strokeDasharray="3 3" />
                  <text x="32" y={y + 4} textAnchor="end" fill="#64748B" fontSize="10" fontWeight="bold">
                    {val}
                  </text>
                </g>
              );
            })}

            {Object.entries(levelCounts).map(([lvlStr, count], idx) => {
              const lvl = parseInt(lvlStr, 10);
              const barWidth = 24;
              const x = 50 + idx * 33;
              const barHeight = (count / maxBarValue) * 130;
              const y = 170 - barHeight;

              return (
                <g key={lvl} className="group cursor-pointer">
                  <rect x={x} y="40" width={barWidth} height="130" rx="4" fill={isDark ? '#0F172A' : '#F1F5F9'} />
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(barHeight, count > 0 ? 4 : 0)}
                    rx="4"
                    fill={count > 0 ? '#2563EB' : 'transparent'}
                  />
                  {count > 0 && (
                    <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="bold">
                      {count}
                    </text>
                  )}
                  <text x={x + barWidth / 2} y="190" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                    {lvl}
                  </text>
                </g>
              );
            })}
            <line x1="40" y1="170" x2="880" y2="170" stroke={isDark ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Tabel Data Telemetri Siswa */}
      <div
        style={{
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        }}
        className="p-5 rounded-3xl border shadow-sm overflow-hidden"
      >
        <h2 className="text-xs font-black uppercase tracking-wider mb-4">
          Riwayat Detail Siswa ({filteredLogs.length} Sesi Terfilter)
        </h2>

        {filteredLogs.length === 0 ? (
          <div className="text-center opacity-50 text-xs py-8 font-medium">
            Tidak ada rekaman data aktivitas siswa.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[380px]">
            <table className="w-full text-left text-xs font-medium">
              <thead
                style={{
                  backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                  borderColor: isDark ? '#334155' : '#E2E8F0',
                }}
                className="border-b sticky top-0"
              >
                <tr>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3">Asal Sekolah</th>
                  <th className="p-3">Kelas</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Percobaan</th>
                  <th className="p-3">Balok (Optimal)</th>
                  <th className="p-3">Prediksi POE</th>
                  <th className="p-3">Waktu Main</th>
                </tr>
              </thead>
              <tbody style={{ borderColor: isDark ? '#1E293B' : '#F1F5F9' }} className="divide-y">
                {filteredLogs.map((l) => (
                  <tr key={l.id} className="transition opacity-90 hover:opacity-100">
                    <td className="p-3 font-bold">{l.studentName}</td>
                    <td className="p-3 opacity-70">{l.schoolName}</td>
                    <td className="p-3 opacity-70">{l.studentClass}</td>
                    <td className="p-3 font-bold text-blue-500">Level {l.levelId}</td>
                    <td className="p-3">{l.attempts}x</td>
                    <td className="p-3 font-mono">{l.blockCount} ({l.optimalBlocks})</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        l.predictionAccuracy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {l.predictionAccuracy ? 'Akurat' : 'Meleset'}
                      </span>
                    </td>
                    <td className="p-3 font-mono opacity-50">
                      {new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}