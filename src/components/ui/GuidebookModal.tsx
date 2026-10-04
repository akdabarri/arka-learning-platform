// src/components/ui/GuidebookModal.tsx
'use client';

import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { sound } from '@/lib/soundManager';

interface GuidebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export default function GuidebookModal({ isOpen, onClose, isDark = false }: GuidebookModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className={`rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border flex flex-col max-h-[85vh] overflow-hidden transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Buku Panduan Insinyur Solaria</h2>
              <p className="text-xs text-slate-400 font-bold">Cara Bermain, Menalar, & Membantu ARKA</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="overflow-y-auto pr-2 py-4 flex flex-col gap-3.5 text-xs font-semibold leading-relaxed">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-blue-950/40 border-blue-900 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-950'}`}>
            <h3 className="text-sm font-black mb-1">Misi Pemulihan Kepulauan Solaria</h3>
            <p>
              Setelah badai besar, pulau Solaria kehilangan aliran energi. Kamu bertugas sebagai <strong>Insinyur Cilik</strong> yang menyusun balok perintah logika untuk memandu robot <strong>ARKA</strong> mengumpulkan Kapsul Baterai dan menyiram Bibit Mangrove.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-emerald-950/40 border-emerald-900 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
            <h3 className="text-sm font-black mb-2">Arti Warna Balok Perintah</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-100'}`}>
                <span className="font-black text-blue-500">Maju:</span> Robot melangkah 1 petak ke depan.
              </div>
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-100'}`}>
                <span className="font-black text-purple-500">Kanan:</span> Berputar 90° searah jarum jam.
              </div>
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-100'}`}>
                <span className="font-black text-pink-500">Kiri:</span> Berputar 90° berlawanan arah.
              </div>
              <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-100'}`}>
                <span className="font-black text-amber-500">Lompat:</span> Melompati 2 petak melewati rintangan.
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-amber-950/40 border-amber-900 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
            <h3 className="text-sm font-black mb-1.5">Rahasia Meraih 3 Bintang Emas</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Bintang 1:</strong> Berhasil membawa ARKA tiba tepat di sasaran.</li>
              <li><strong>Bintang 2:</strong> Prediksi awalmu terbukti akurat saat fase tebakan.</li>
              <li><strong>Bintang 3:</strong> Menggunakan jumlah balok yang efisien.</li>
            </ul>
          </div>
        </div>

        <div className={`pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <button
            onClick={() => {
              sound.playSuccess();
              onClose();
            }}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
          >
            Saya Siap Memulai Petualangan!
          </button>
        </div>
      </div>
    </div>
  );
}