// src/components/ui/TutorialModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export interface SpotlightStep {
  targetId: string;
  title: string;
  instruction: string; // 1 Instruksi
  example: string;     // 1 Contoh
}

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps?: SpotlightStep[];
  isDark?: boolean;
}

const defaultSteps: SpotlightStep[] = [
  {
    targetId: 'theme-toggle-box',
    title: 'Pengaturan Tampilan',
    instruction: 'Tekan tombol ini untuk beralih mode Terang atau Gelap.',
    example: 'Gunakan mode gelap di malam hari agar mata nyaman.',
  },
  {
    targetId: 'grade-select-box',
    title: 'Jenjang Kelas',
    instruction: 'Pilih tingkatan kelas SD kamu dari kelas 1 sampai 6.',
    example: 'Pilih Kelas 4 SD agar soal logika sesuai kurikulum.',
  },
];

export default function TutorialModal({
  isOpen,
  onClose,
  steps = defaultSteps,
  isDark = true,
}: TutorialModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [cardPos, setCardPos] = useState<{ top: number; left: number }>({ top: 40, left: 40 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset saat modal dibuka/tutup
  useEffect(() => {
    if (!isOpen) {
      setCurrentIdx(0);
      setRect(null);
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Kalkulasi Posisi Spotlight & Penempatan Kartu Pintar (Anti-Stuck)
  useEffect(() => {
    if (!isOpen || steps.length === 0) return;

    const updateLayout = () => {
      const step = steps[currentIdx];
      if (!step) return;

      const el = document.getElementById(step.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const targetRect = el.getBoundingClientRect();
        setRect(targetRect);

        // Dimensi kartu perkiraan
        const cardWidth = 340;
        const cardHeight = isMinimized ? 60 : 250;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let computedTop = targetRect.bottom + 14;
        let computedLeft = targetRect.left;

        // Jika target berada di sisi kiri dan memanjang tinggi (seperti arena canvas di foto Anda)
        // Pindahkan kartu ke sisi kanan target agar tidak jatuh ke bawah layar!
        if (targetRect.left < windowWidth * 0.45 && targetRect.height > windowHeight * 0.5) {
          computedLeft = targetRect.right + 20;
          computedTop = targetRect.top + 20;
        }

        // Jika kartu melebihi batas bawah layar, geser naik ke atas
        if (computedTop + cardHeight > windowHeight - 20) {
          computedTop = Math.max(20, targetRect.top - cardHeight - 14);
          if (computedTop < 20) {
            computedTop = windowHeight - cardHeight - 24; // Kunci di dasar layar
          }
        }

        // Jika kartu melebihi batas kanan layar, geser ke kiri
        if (computedLeft + cardWidth > windowWidth - 20) {
          computedLeft = windowWidth - cardWidth - 20;
        }

        // Kunci batas aman minimal
        computedLeft = Math.max(16, computedLeft);
        computedTop = Math.max(16, computedTop);

        setCardPos({ top: computedTop, left: computedLeft });
      } else {
        setRect(null);
        // Fallback jika elemen tidak ditemukan
        setCardPos({ top: 80, left: Math.max(16, (window.innerWidth - 340) / 2) });
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    window.addEventListener('scroll', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('scroll', updateLayout);
    };
  }, [isOpen, currentIdx, steps, isMinimized]);

  if (!isOpen || steps.length === 0) return null;

  const step = steps[currentIdx];
  const isLast = currentIdx === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-[999] pointer-events-auto overflow-hidden">
      {/* 1. Masker Spotlight Gelap dengan SVG Cutout */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none">
        <defs>
          <mask id="arka-spotlight-cutout">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.left - 8}
                y={rect.top - 8}
                width={rect.width + 16}
                height={rect.height + 16}
                rx="18"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(3, 7, 18, 0.78)"
          mask="url(#arka-spotlight-cutout)"
        />
      </svg>

      {/* 2. Garis Cincin Menyala di Sekeliling Target */}
      {rect && (
        <div
          className="pointer-events-none absolute rounded-2xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
          style={{
            top: rect.top - 8,
            left: rect.left - 8,
            width: rect.width + 16,
            height: rect.height + 16,
          }}
        />
      )}

      {/* 3. Kartu Tutorial Fleksibel (Bisa Dikecilkan / Diminimalkan) */}
      <div
        ref={cardRef}
        className={`absolute z-10 w-84 max-w-[92vw] rounded-2xl border border-slate-700 bg-slate-900/95 text-white shadow-2xl backdrop-blur-md transition-all duration-200 flex flex-col ${
          isMinimized ? 'p-3' : 'p-4 max-h-[85vh]'
        }`}
        style={{
          top: cardPos.top,
          left: cardPos.left,
        }}
      >
        {/* Header Kartu: Judul Langkah + Tombol Kecilkan + Tutup */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Langkah {currentIdx + 1} / {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Tombol Kecilkan / Perbesar */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title={isMinimized ? 'Perbesar Panduan' : 'Kecilkan Panduan'}
            >
              {isMinimized ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            </button>

            {/* Tombol Tutup Silang */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Tutup Panduan"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* MODE MINIMIZE (Bilah Kecil Ringkas Agar Tidak Menutupi Layar) */}
        {isMinimized ? (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs font-bold truncate max-w-[180px] text-slate-200">
              {step?.title}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-2 py-1 text-[11px] rounded bg-slate-800 disabled:opacity-30"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="px-2.5 py-1 text-[11px] font-bold rounded bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                {isLast ? 'Selesai' : 'Lanjut →'}
              </button>
            </div>
          </div>
        ) : (
          /* MODE LENGKAP (1 Instruksi + 1 Contoh) */
          <>
            <div className="overflow-y-auto pr-1 my-2 flex-1">
              <h3 className="text-sm font-bold text-slate-100">{step?.title}</h3>

              {/* 1 Instruksi */}
              <div className="mt-2">
                <span className="text-[10px] font-semibold uppercase text-slate-400 block">
                  Instruksi:
                </span>
                <p className="mt-0.5 text-xs text-slate-200 leading-relaxed">
                  {step?.instruction}
                </p>
              </div>

              {/* 1 Contoh Konkret */}
              <div className="mt-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/50 p-2.5">
                <span className="text-[10px] font-bold text-indigo-300 block">
                  💡 Contoh:
                </span>
                <p className="mt-0.5 text-xs text-indigo-100 leading-relaxed">
                  {step?.example}
                </p>
              </div>
            </div>

            {/* Tombol Navigasi Bawah (Selalu Terlihat & Tidak Terpotong) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 transition cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Mundur</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                <span>{isLast ? 'Selesai Mengerti ✓' : 'Lanjut'}</span>
                {!isLast && <ArrowRight size={13} />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}