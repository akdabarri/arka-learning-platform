// src/app/play/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GridCanvas from '@/components/canvas/GridCanvas';
import POEModal from '@/components/poe/POEModal';
import HangarModal from '@/components/ui/HangarModal';
import ZoneHubModal from '@/components/ui/ZoneHubModal';
import GuidebookModal from '@/components/ui/GuidebookModal';
import TutorialModal, { SpotlightStep } from '@/components/ui/TutorialModal';
import ThemeToggle from '@/components/ui/ThemeToggle';
import CrystalIcon from '@/components/ui/CrystalIcon';
import { LEVELS } from '@/lib/levelsData';
import { CommandBlock, CommandType, Direction, GridPosition, RobotSkin, TelemetryRecord } from '@/lib/types';
import { findShortestPath } from '@/lib/pathfinding';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  Play, 
  RotateCcw, 
  Trash2, 
  ArrowUp, 
  CornerUpRight, 
  CornerUpLeft, 
  Compass, 
  Zap, 
  Repeat, 
  Home, 
  BookOpen, 
  GripVertical,
  Shirt,
  HelpCircle,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/soundManager';

export default function PlayPage() {
  const router = useRouter();

  // Status Splashscreen Transisi Selaras ARKA
  const [isEntering, setIsEntering] = useState(true);
  const [isNavigatingHome, setIsNavigatingHome] = useState(false);
  const [splashProgress, setSplashProgress] = useState(25);

  const [studentName, setStudentName] = useState('Insinyur Cilik');
  const [studentClass, setStudentClass] = useState('Kelas 4 SD');
  const [schoolName, setSchoolName] = useState('SDN Umum');

  const [crystals, setCrystals] = useState(30);
  const [activeSkin, setActiveSkin] = useState<RobotSkin>('BLUE');
  const [unlockedSkins, setUnlockedSkins] = useState<RobotSkin[]>(['BLUE']);
  const [customHue, setCustomHue] = useState<number>(180);
  const [levelStars, setLevelStars] = useState<{ [lvl: number]: number }>({});
  const [currentLevelId, setCurrentLevelId] = useState(1);

  // Status Tema dengan Sinkronisasi Aktif
  const [isDark, setIsDark] = useState(true);

  // Modals
  const [isHangarOpen, setIsHangarOpen] = useState(false);
  const [isZoneHubOpen, setIsZoneHubOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Petunjuk
  const [hintActive, setHintActive] = useState(false);
  const [hintPath, setHintPath] = useState<GridPosition[]>([]);

  // Riset & Telemetri
  const [attemptCount, setAttemptCount] = useState(1);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());

  const getProfileKey = (school: string, sClass: string, sName: string) => {
    return `arka_acc_${school.toLowerCase().replace(/\s+/g, '_')}_${sClass.toLowerCase().replace(/\s+/g, '_')}_${sName.toLowerCase().replace(/\s+/g, '_')}`;
  };

  // Sinkronisasi Mode Gelap/Terang
  const syncThemeState = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arka_theme') || localStorage.getItem('arka-theme') || 'dark';
      const darkActive = saved === 'dark';
      setIsDark(darkActive);
      if (darkActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    syncThemeState();
    window.addEventListener('theme_changed', syncThemeState);
    window.addEventListener('storage', syncThemeState);

    // Deteksi jika class pada tag <html> berubah secara langsung
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('theme_changed', syncThemeState);
      window.removeEventListener('storage', syncThemeState);
      observer.disconnect();
    };
  }, []);

  // Splashscreen Masuk (Home -> Play)
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

  // Navigasi Kembali ke Home dengan Splashscreen Selaras (Play -> Home)
  const handleGoHome = () => {
    sound.playClick();
    setIsNavigatingHome(true);
    setSplashProgress(30);

    setTimeout(() => {
      setSplashProgress(100);
    }, 150);

    setTimeout(() => {
      router.push('/');
    }, 850);
  };

  // Inisialisasi Akun & Route Guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sName = localStorage.getItem('arka_student_name');
      const sSchool = localStorage.getItem('arka_student_school');
      const sClass = localStorage.getItem('arka_student_class') || 'Kelas 4 SD';

      if (!sName || !sSchool) {
        router.replace('/');
        return;
      }

      setStudentName(sName);
      setStudentClass(sClass);
      setSchoolName(sSchool);

      const accKey = getProfileKey(sSchool, sClass, sName);
      const savedAcc = localStorage.getItem(accKey);

      if (savedAcc) {
        const acc = JSON.parse(savedAcc);
        setCrystals(acc.crystals ?? 30);
        setActiveSkin(acc.activeSkin ?? 'BLUE');
        setUnlockedSkins(acc.unlockedSkins ?? ['BLUE']);
        setCustomHue(acc.customHue ?? 180);
        setLevelStars(acc.levelStars ?? {});
        const lastLvl = acc.currentLevel ?? 1;
        setCurrentLevelId(lastLvl);
        setLevelIndex(Math.max(0, Math.min(LEVELS.length - 1, lastLvl - 1)));
      } else {
        const newAcc = { 
          crystals: 30, 
          activeSkin: 'BLUE', 
          unlockedSkins: ['BLUE'], 
          customHue: 180, 
          levelStars: {}, 
          currentLevel: 1 
        };
        localStorage.setItem(accKey, JSON.stringify(newAcc));
        setCrystals(30);
        setActiveSkin('BLUE');
        setUnlockedSkins(['BLUE']);
        setCustomHue(180);
        setLevelStars({});
        setCurrentLevelId(1);
        setLevelIndex(0);

        const tutKey = `arka_tutorial_play_seen_${accKey}`;
        if (!localStorage.getItem(tutKey)) {
          setTimeout(() => {
            setIsTutorialOpen(true);
            localStorage.setItem(tutKey, 'true');
          }, 800);
        }
      }
    }
    setSessionStartTime(Date.now());
  }, [router]);

  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex] || LEVELS[0];

  const [robotPos, setRobotPos] = useState<GridPosition>(currentLevel.startPos);
  const [robotDir, setRobotDir] = useState<Direction>(currentLevel.startDirection);
  const [isRunning, setIsRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null);

  const [program, setProgram] = useState<CommandBlock[]>([]);
  const [poeState, setPoeState] = useState<'IDLE' | 'PREDICT' | 'EXPLAIN_SUCCESS' | 'EXPLAIN_FAIL'>('IDLE');
  const [failReason, setFailReason] = useState<string>('');
  const [lastPrediction, setLastPrediction] = useState<'YES' | 'NO' | null>(null);

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const playTutorialSteps: SpotlightStep[] = [
    {
      targetId: 'canvas-arena-section',
      title: '1. Arena Kisi Pulau Solaria',
      instruction: 'Perhatikan posisi awal robot Arka dan lokasi kristal target yang harus dicapai.',
      example: 'Arahkan Arka menuju kristal energi kuning tanpa menabrak batu rintangan atau jatuh ke luar kisi.',
    },
    {
      targetId: 'command-blocks-section',
      title: '2. Pilihan Balok Perintah',
      instruction: 'Klik balok perintah untuk menambahkan instruksi gerakan ke alur program Arka.',
      example: 'Klik tombol "Maju" untuk melangkah ke depan, atau "Kanan" untuk berputar 90 derajat searah jarum jam.',
    },
    {
      targetId: 'program-workspace-section',
      title: '3. Area Urutan Algoritma',
      instruction: 'Periksa urutan eksekusi langkahmu. Kamu bisa menahan dan menyeret balok (drag & drop) untuk menata ulang urutannya.',
      example: 'Jika kamu ingin Arka belok sebelum melangkah, seret balok "Kanan" ke posisi nomor 1.',
    },
    {
      targetId: 'run-simulation-btn',
      title: '4. Uji Coba Logika & Prediksi (POE)',
      instruction: 'Tekan tombol hijau ini saat alur balokmu sudah siap untuk menguji apakah logikamu tepat.',
      example: 'Sebelum Arka berjalan, tebak terlebih dahulu (Predict) apakah alur ini akan berhasil sampai ke tujuan.',
    },
    {
      targetId: 'hint-path-btn',
      title: '5. Bantuan Jalur Terpendek',
      instruction: 'Gunakan 10 Kristal Surya untuk melihat garis jalur tercepat jika kamu kesulitan memecahkan rute labirin.',
      example: 'Garis biru akan menyala di atas pulau sebagai petunjuk arah rute paling optimal.',
    },
  ];

  const saveProgress = async (
    newCrystals: number, 
    newSkin: RobotSkin, 
    newUnlocked: RobotSkin[], 
    newStars: { [lvl: number]: number }, 
    nextLvl: number,
    newHue?: number
  ) => {
    const finalHue = newHue !== undefined ? newHue : customHue;
    setCrystals(newCrystals);
    setActiveSkin(newSkin);
    setUnlockedSkins(newUnlocked);
    setLevelStars(newStars);
    setCurrentLevelId(nextLvl);
    if (newHue !== undefined) setCustomHue(newHue);

    const accKey = getProfileKey(schoolName, studentClass, studentName);
    const accData = {
      crystals: newCrystals,
      activeSkin: newSkin,
      unlockedSkins: newUnlocked,
      customHue: finalHue,
      levelStars: newStars,
      currentLevel: nextLvl,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(accKey, JSON.stringify(accData));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('arka_student_profiles').upsert([
          {
            id: `${schoolName.toLowerCase().replace(/\s+/g, '_')}_${studentName.toLowerCase().replace(/\s+/g, '_')}`,
            student_name: studentName,
            student_class: studentClass,
            school_name: schoolName,
            crystals: newCrystals,
            active_skin: newSkin,
            unlocked_skins: newUnlocked,
            level_stars: newStars,
            current_level: nextLvl,
            last_active: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.warn('Gagal simpan ke Supabase:', err);
      }
    }
  };

  const addBlock = (type: CommandType, label: string, color: string) => {
    if (isRunning) return;
    sound.playClick();
    setProgram([...program, { id: Math.random().toString(), type, label, color }]);
  };

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetIdx: number) => {
    if (draggedIdx === null || draggedIdx === targetIdx || isRunning) return;
    sound.playClick();
    const updated = [...program];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIdx, 0, movedItem);
    setProgram(updated);
    setDraggedIdx(null);
  };

  const removeBlock = (index: number) => {
    if (isRunning) return;
    sound.playClick();
    setProgram(program.filter((_, i) => i !== index));
  };

  const activateShortestPathHint = () => {
    if (hintActive) return;
    if (crystals < 10) {
      sound.playBump();
      alert('Kristal Surya tidak cukup. Kamu butuh 10 kristal.');
      return;
    }
    sound.playSuccess();
    const path = findShortestPath(currentLevel.gridSize, currentLevel.startPos, currentLevel.targetPos, currentLevel.obstacles);
    setHintPath(path);
    setHintActive(true);
    saveProgress(crystals - 10, activeSkin, unlockedSkins, levelStars, currentLevel.id);
  };

  const resetSimulation = () => {
    sound.playClick();
    setRobotPos(currentLevel.startPos);
    setRobotDir(currentLevel.startDirection);
    setIsRunning(false);
    setIsCelebrating(false);
    setActiveBlockIndex(null);
    setPoeState('IDLE');
  };

  const evaluateSuccess = async (success: boolean) => {
    const duration = Math.round((Date.now() - sessionStartTime) / 1000);

    if (!success) {
      sound.playBump();
      setAttemptCount((prev) => prev + 1);
      setFailReason(`ARKA terhenti sebelum mencapai ${currentLevel.targetDescription}.`);
      setPoeState('EXPLAIN_FAIL');
      return;
    }

    sound.playSuccess();
    setIsCelebrating(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    let starsEarned = 1;
    const isPredictionAccurate = lastPrediction === 'YES';
    if (isPredictionAccurate) starsEarned += 1;
    if (program.length <= currentLevel.optimalBlocks) starsEarned += 1;

    const oldStars = levelStars[currentLevel.id] || 0;
    const gainedStars = Math.max(0, starsEarned - oldStars);
    const earnedCrystals = gainedStars * 15;

    const updatedStars = { ...levelStars, [currentLevel.id]: Math.max(oldStars, starsEarned) };
    const nextLevelTarget = Math.min(25, currentLevel.id + 1);
    saveProgress(crystals + earnedCrystals, activeSkin, unlockedSkins, updatedStars, nextLevelTarget);

    const logRecord: TelemetryRecord = {
      id: Math.random().toString(),
      studentName,
      studentClass,
      schoolName,
      levelId: currentLevel.id,
      attempts: attemptCount,
      blockCount: program.length,
      optimalBlocks: currentLevel.optimalBlocks,
      efficiencyRatio: Number((currentLevel.optimalBlocks / program.length).toFixed(2)),
      predictionAccuracy: isPredictionAccurate,
      hintsUsed: hintActive,
      durationSeconds: duration,
      timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('arka_telemetry_logs') || '[]');
      localStorage.setItem('arka_telemetry_logs', JSON.stringify([...existingLogs, logRecord]));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('arka_telemetry').insert([
          {
            student_name: studentName,
            student_class: studentClass,
            school_name: schoolName,
            level_id: currentLevel.id,
            attempts: attemptCount,
            block_count: program.length,
            optimal_blocks: currentLevel.optimalBlocks,
            efficiency_ratio: Number((currentLevel.optimalBlocks / program.length).toFixed(2)),
            prediction_accuracy: isPredictionAccurate,
            hints_used: hintActive,
            duration_seconds: duration,
          },
        ]);
      } catch (err) {
        console.warn('Gagal kirim telemetri:', err);
      }
    }

    setTimeout(() => {
      setPoeState('EXPLAIN_SUCCESS');
    }, 700);
  };

  const executeSimulation = async () => {
    setPoeState('IDLE');
    setIsRunning(true);

    let curX = currentLevel.startPos.x;
    let curY = currentLevel.startPos.y;
    let curDir = currentLevel.startDirection;
    const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

    const flattenedProgram: CommandBlock[] = [];
    for (const b of program) {
      if (b.type === 'REPEAT_2X') {
        flattenedProgram.push({ id: Math.random().toString(), type: 'MOVE_FORWARD', label: 'Maju Loop 1', color: b.color });
        flattenedProgram.push({ id: Math.random().toString(), type: 'MOVE_FORWARD', label: 'Maju Loop 2', color: b.color });
      } else {
        flattenedProgram.push(b);
      }
    }

    for (let i = 0; i < flattenedProgram.length; i++) {
      setActiveBlockIndex(i);
      const block = flattenedProgram[i];
      await new Promise((r) => setTimeout(r, 650));

      if (block.type === 'TURN_RIGHT') {
        sound.playTurn();
        const nextIdx = (directions.indexOf(curDir) + 1) % 4;
        curDir = directions[nextIdx];
        setRobotDir(curDir);
      } else if (block.type === 'TURN_LEFT') {
        sound.playTurn();
        const nextIdx = (directions.indexOf(curDir) + 3) % 4;
        curDir = directions[nextIdx];
        setRobotDir(curDir);
      } else if (block.type === 'MOVE_FORWARD' || block.type === 'JUMP_FORWARD') {
        sound.playStep();
        const stepDist = block.type === 'JUMP_FORWARD' ? 2 : 1;
        let nX = curX;
        let nY = curY;
        if (curDir === 'UP') nY -= stepDist;
        if (curDir === 'DOWN') nY += stepDist;
        if (curDir === 'LEFT') nX -= stepDist;
        if (curDir === 'RIGHT') nX += stepDist;

        if (nX >= 0 && nX < currentLevel.gridSize && nY >= 0 && nY < currentLevel.gridSize) {
          const hit = currentLevel.obstacles.some((o) => o.x === nX && o.y === nY);
          if (hit) {
            sound.playBump();
            setFailReason(`ARKA menabrak rintangan di (${nX}, ${nY}).`);
            setPoeState('EXPLAIN_FAIL');
            setIsRunning(false);
            setActiveBlockIndex(null);
            return;
          }
          curX = nX;
          curY = nY;
          setRobotPos({ x: curX, y: curY });
        } else {
          sound.playBump();
          setFailReason('ARKA keluar dari batas pulau.');
          setPoeState('EXPLAIN_FAIL');
          setIsRunning(false);
          setActiveBlockIndex(null);
          return;
        }
      }
    }

    setActiveBlockIndex(null);
    setIsRunning(false);
    evaluateSuccess(curX === currentLevel.targetPos.x && curY === currentLevel.targetPos.y);
  };

  const handleNextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      switchLevel(levelIndex + 1);
    } else {
      alert('Selamat! Kamu telah menyelesaikan seluruh 25 Level Ekspedisi Solaria!');
    }
  };

  const switchLevel = (idx: number) => {
    setLevelIndex(idx);
    setProgram([]);
    setRobotPos(LEVELS[idx].startPos);
    setRobotDir(LEVELS[idx].startDirection);
    setIsCelebrating(false);
    setPoeState('IDLE');
    setHintActive(false);
    setHintPath([]);
    setAttemptCount(1);
    setSessionStartTime(Date.now());
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 flex flex-col font-sans transition-colors duration-200 relative ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* OVERLAY SPLASHSCREEN TRANSISI SELARAS DENGAN BERANDA & GURU */}
      {(isEntering || isNavigatingHome) && (
        <div
          style={{
            backgroundColor: isDark ? '#020617' : '#F8FAFC',
            color: isDark ? '#FFFFFF' : '#0F172A',
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-all duration-300 backdrop-blur-md"
        >
          {/* Latar Belakang Cahaya Kosmik */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl opacity-30 ${
                isNavigatingHome ? 'bg-indigo-600' : 'bg-blue-600'
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
                {isNavigatingHome ? (
                  <Home size={38} className="text-white" />
                ) : (
                  <Bot size={38} className="text-white" />
                )}
              </div>
            </div>

            {/* Label Sistem */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {isNavigatingHome ? 'Navigasi Game ARKA' : 'Petualangan Belajar ARKA'}
            </div>

            {/* Teks Judul & Keterangan */}
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
              {isNavigatingHome
                ? 'Kembali ke Beranda...'
                : `Memuat Level ${currentLevel.id}...`}
            </h2>
            <p className="text-xs font-semibold opacity-70 mb-6 max-w-xs leading-relaxed">
              {isNavigatingHome
                ? 'Menyimpan progres kristal surya dan kembali ke menu utama.'
                : 'Menyiapkan arena kisi pulau, balok algoritma & modul penalaran POE.'}
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
              {isNavigatingHome ? 'Membuka Menu Utama...' : 'Menyiapkan Arena Solaria...'}
            </span>
          </div>
        </div>
      )}

      {/* Top Header Bergaya Komik */}
      <header className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 px-5 py-3.5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#1e293b] ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3">
          {/* Tombol Home */}
          <button
            onClick={handleGoHome}
            title="Kembali ke Menu Utama"
            className={`w-10 h-10 rounded-2xl border-2 border-slate-900 flex items-center justify-center transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 text-slate-800'
            }`}
          >
            <Home size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight">A.R.K.A.</h1>
              <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full border border-slate-900">
                Level {currentLevel.id}/25
              </span>
            </div>
            <p className="text-[11px] font-bold opacity-60">
              Insinyur: <strong>{studentName}</strong> • {schoolName} ({studentClass})
            </p>
          </div>
        </div>

        {/* Kontrol Gamifikasi Atas */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Saldo Kristal Cyan */}
          <div className={`flex items-center gap-1.5 border-2 border-slate-900 px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-[2px_2px_0px_#0f172a] ${
            isDark ? 'bg-slate-800 border-slate-700 text-sky-300' : 'bg-sky-50 text-sky-900'
          }`}>
            <CrystalIcon variant="cyan" size={17} />
            <span>{crystals}</span>
          </div>

          {/* Tombol Toggle Tema */}
          <ThemeToggle />

          {/* Tutorial Spotlight */}
          <button
            onClick={() => {
              sound.playClick();
              setIsTutorialOpen(true);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 border-2 border-slate-900 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer shadow-[2px_2px_0px_#0f172a] ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-300' : 'bg-amber-50 text-amber-800'
            }`}
          >
            <HelpCircle size={14} /> Tutorial
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsGuideOpen(true);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 border-2 border-slate-900 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-[2px_2px_0px_#0f172a] ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white text-slate-800'
            }`}
          >
            <BookOpen size={14} /> Panduan
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsZoneHubOpen(true);
            }}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-900 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer shadow-[2px_2px_0px_#0f172a]"
          >
            <Compass size={14} /> Peta Sektor
          </button>

          {/* Tombol Hanggar dengan Indikator Warna Aktif */}
          <button
            onClick={() => {
              sound.playClick();
              setIsHangarOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white border-2 border-slate-900 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer shadow-[2px_2px_0px_#0f172a]"
          >
            <Shirt size={14} />
            <span>Hanggar</span>
            {activeSkin === 'CUSTOM' && (
              <span
                className="w-2.5 h-2.5 rounded-full border border-white"
                style={{ backgroundColor: `hsl(${customHue}, 90%, 55%)` }}
              />
            )}
          </button>
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
        {/* Sisi Kiri: Arena Canvas Responsif */}
        <div
          id="canvas-arena-section"
          className={`lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#0f172a] w-full transition-all ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'
          }`}
        >
          <div className={`w-full border-2 border-slate-900 px-3.5 py-2.5 rounded-2xl text-xs font-bold mb-4 text-center ${
            isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 text-slate-800'
          }`}>
            {currentLevel.storyPrompt}
          </div>

          <GridCanvas
            level={currentLevel}
            robotPos={robotPos}
            robotDir={robotDir}
            isCelebrating={isCelebrating}
            skin={activeSkin}
            customHue={customHue}
            hintPath={hintActive ? hintPath : []}
          />

          <div className="mt-4 w-full flex justify-center">
            <button
              id="hint-path-btn"
              onClick={activateShortestPathHint}
              disabled={hintActive}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black border-2 border-slate-900 transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                hintActive
                  ? 'bg-sky-100 text-sky-900 border-dashed opacity-70'
                  : 'bg-sky-100 hover:bg-sky-200 text-sky-950 shadow-[3px_3px_0px_#0f172a]'
              }`}
            >
              <CrystalIcon variant="cyan" size={16} />
              <span>{hintActive ? 'Jalur Terpendek Aktif' : 'Beli Jalur Terpendek (10 Kristal)'}</span>
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Panel Balok Pelangi Drag & Drop */}
        <div className={`lg:col-span-7 flex flex-col p-5 rounded-3xl border-2 border-slate-900 shadow-[5px_5px_0px_#0f172a] w-full ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'
        }`}>
          <div id="command-blocks-section" className="mb-4">
            <h2 className="text-xs font-black opacity-50 uppercase tracking-wider mb-2.5">
              Pilihan Balok Perintah
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => addBlock('MOVE_FORWARD', 'Maju 1 Langkah', 'bg-blue-600')}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
              >
                <ArrowUp size={14} /> Maju
              </button>
              <button
                onClick={() => addBlock('TURN_RIGHT', 'Putar Kanan 90°', 'bg-purple-600')}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
              >
                <CornerUpRight size={14} /> Kanan
              </button>
              <button
                onClick={() => addBlock('TURN_LEFT', 'Putar Kiri 90°', 'bg-pink-600')}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
              >
                <CornerUpLeft size={14} /> Kiri
              </button>
              <button
                onClick={() => addBlock('JUMP_FORWARD', 'Lompat 2 Petak', 'bg-amber-500')}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
              >
                <Zap size={14} /> Lompat
              </button>
              <button
                onClick={() => addBlock('REPEAT_2X', 'Ulangi Maju 2x', 'bg-teal-600')}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
              >
                <Repeat size={14} /> Loop 2x
              </button>
            </div>
          </div>

          {/* Area Urutan Balok */}
          <div id="program-workspace-section" className="flex-1 flex flex-col mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xs font-black opacity-60 uppercase tracking-wider">
                Urutan Balok ({program.length} Balok • Optimal: {currentLevel.optimalBlocks} Balok)
              </h2>
              {program.length > 0 && !isRunning && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setProgram([]);
                  }}
                  className="text-xs text-rose-500 hover:text-rose-600 font-bold transition cursor-pointer"
                >
                  Kosongkan
                </button>
              )}
            </div>

            <div className={`flex-1 min-h-55 max-h-70 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 flex flex-col gap-2 overflow-y-auto ${
              isDark ? 'bg-slate-950/60' : 'bg-slate-50'
            }`}>
              {program.length === 0 ? (
                <div className="text-center opacity-50 text-xs my-auto font-medium">
                  Belum ada balok. Klik perintah di atas. Anda dapat <strong>menyeret balok</strong> untuk menata urutan!
                </div>
              ) : (
                program.map((blk, idx) => {
                  const isActive = activeBlockIndex === idx;
                  return (
                    <div
                      key={blk.id}
                      draggable={!isRunning}
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(idx)}
                      className={`flex justify-between items-center px-3.5 py-2.5 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all cursor-grab active:cursor-grabbing select-none ${
                        isActive
                          ? 'bg-yellow-400 text-slate-950 scale-102 ring-4 ring-yellow-400/50'
                          : `${blk.color} text-white`
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-white/40 cursor-grab" />
                        <span className="w-5 h-5 rounded-full bg-black/25 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{blk.label}</span>
                      </div>

                      <button
                        onClick={() => removeBlock(idx)}
                        disabled={isRunning}
                        title="Hapus Balok"
                        className="p-1 hover:bg-black/30 rounded text-rose-200 transition cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Tombol Kontrol Bawah */}
          <div className="flex gap-2.5">
            <button
              onClick={resetSimulation}
              disabled={isRunning}
              className={`flex items-center justify-center gap-1.5 px-5 py-3.5 border-2 border-slate-900 rounded-2xl text-xs font-bold shadow-[2px_2px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              <RotateCcw size={15} /> Atur Ulang
            </button>

            <button
              id="run-simulation-btn"
              onClick={() => {
                sound.playClick();
                if (program.length === 0) return;
                setPoeState('PREDICT');
              }}
              disabled={isRunning || program.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-black border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition disabled:opacity-50 cursor-pointer"
            >
              <Play size={18} fill="currentColor" /> Uji Coba Logika ARKA
            </button>
          </div>
        </div>
      </div>

      {/* Modals POE & Fitur Gamifikasi */}
      {poeState !== 'IDLE' && (
        <POEModal
          type={poeState}
          targetName={currentLevel.targetDescription}
          failReason={failReason}
          onConfirmPrediction={(pred) => {
            setLastPrediction(pred);
            executeSimulation();
          }}
          onNextLevel={handleNextLevel}
          onRetry={resetSimulation}
        />
      )}

      {/* Spotlight Tutorial Interaktif */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        steps={playTutorialSteps}
      />

      <GuidebookModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      <ZoneHubModal
        isOpen={isZoneHubOpen}
        onClose={() => setIsZoneHubOpen(false)}
        levelStars={levelStars}
        onSelectLevel={switchLevel}
      />

      {/* Modal Hanggar dengan Dukungan Custom Hue & Rainbow */}
      <HangarModal
        isOpen={isHangarOpen}
        onClose={() => setIsHangarOpen(false)}
        crystals={crystals}
        activeSkin={activeSkin}
        unlockedSkins={unlockedSkins}
        customHue={customHue}
        onUpdateCustomHue={(hue) => {
          setCustomHue(hue);
          saveProgress(crystals, activeSkin, unlockedSkins, levelStars, currentLevel.id, hue);
        }}
        onSelectSkin={(skin) => saveProgress(crystals, skin, unlockedSkins, levelStars, currentLevel.id)}
        onBuySkin={(skin, price) => {
          const newCrystals = crystals - price;
          const newUnlocked = [...unlockedSkins, skin];
          saveProgress(newCrystals, skin, newUnlocked, levelStars, currentLevel.id);
        }}
      />
    </div>
  );
}