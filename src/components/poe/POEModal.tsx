// src/components/poe/POEModal.tsx
'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/soundManager';

interface POEModalProps {
  type: 'PREDICT' | 'EXPLAIN_SUCCESS' | 'EXPLAIN_FAIL';
  targetName?: string;
  failReason?: string;
  onConfirmPrediction?: (answer: 'YES' | 'NO') => void;
  onNextLevel?: () => void;
  onRetry?: () => void;
}

export default function POEModal({
  type,
  targetName = "target misi",
  failReason,
  onConfirmPrediction,
  onNextLevel,
  onRetry,
}: POEModalProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<'YES' | 'NO' | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);

  if (type === 'PREDICT') {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-blue-100 animate-fadeIn">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <HelpCircle size={28} />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            Fase Prediksi Insinyur Cilik 🧠
          </h3>
          <p className="text-xs text-slate-600 mt-1 mb-5 leading-relaxed">
            Sebelum mesin ARKA melangkah, amati grid di samping. Menurut analisismu, apakah susunan balok ini akan berhasil mengantarkan ARKA tepat ke <strong>{targetName}</strong>?
          </p>

          <div className="flex flex-col gap-2.5 mb-6">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedPrediction('YES');
              }}
              className={`p-3.5 rounded-2xl border-2 text-xs font-bold text-left transition flex items-center justify-between ${
                selectedPrediction === 'YES'
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-100 bg-slate-50 text-slate-700'
              }`}
            >
              <span>🚀 <strong>Ya, pasti sampai!</strong> Perhitungan langkah sudah pas.</span>
              {selectedPrediction === 'YES' && <CheckCircle2 size={18} className="text-blue-600" />}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedPrediction('NO');
              }}
              className={`p-3.5 rounded-2xl border-2 text-xs font-bold text-left transition flex items-center justify-between ${
                selectedPrediction === 'NO'
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-100 bg-slate-50 text-slate-700'
              }`}
            >
              <span>🤔 <strong>Belum yakin.</strong> Sepertinya ada belokan atau rintangan.</span>
              {selectedPrediction === 'NO' && <CheckCircle2 size={18} className="text-blue-600" />}
            </button>
          </div>

          <button
            onClick={() => {
              if (selectedPrediction && onConfirmPrediction) {
                sound.playStep();
                onConfirmPrediction(selectedPrediction);
              }
            }}
            disabled={!selectedPrediction}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-500/25 transition active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Mulai Uji Coba Simulasi!</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'EXPLAIN_SUCCESS') {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-emerald-100 animate-fadeIn">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            Misi Berhasil! Sasaran Terpenuhi 🎉
          </h3>
          <p className="text-xs text-slate-600 mt-1 mb-5 leading-relaxed">
            Hebat! ARKA berhasil mencapai <strong>{targetName}</strong>. Sekarang renungkan strategi komputasimu:
          </p>

          <div className="flex flex-col gap-2 mb-6">
            <button
              onClick={() => {
                sound.playClick();
                setReflectionAnswer('A');
              }}
              className={`p-3 rounded-2xl border-2 text-xs font-bold text-left transition ${
                reflectionAnswer === 'A'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-100 bg-slate-50 text-slate-700'
              }`}
            >
              ✅ Saya menggunakan pola berurutan (sekuensial lurus lalu rotasi arah).
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setReflectionAnswer('B');
              }}
              className={`p-3 rounded-2xl border-2 text-xs font-bold text-left transition ${
                reflectionAnswer === 'B'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-100 bg-slate-50 text-slate-700'
              }`}
            >
              🧭 Saya mengamati rintangan terlebih dahulu sebelum menentukan belokan.
            </button>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              if (onNextLevel) onNextLevel();
            }}
            disabled={!reflectionAnswer}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-500/25 transition active:scale-98"
          >
            Lanjut ke Misi Berikutnya 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-100 animate-fadeIn">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-lg font-black text-slate-800 tracking-tight">
          ARKA Membutuhkan Bantuanmu 🤖
        </h3>
        <p className="text-xs text-slate-600 mt-2 mb-6 leading-relaxed">
          {failReason || `ARKA belum berhasil mencapai ${targetName}. Jangan berkecil hati, mari kita bedah balok kodenya kembali!`}
        </p>

        <button
          onClick={() => {
            sound.playClick();
            if (onRetry) onRetry();
          }}
          className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg transition active:scale-98"
        >
          Perbaiki Alur Logika 🛠️
        </button>
      </div>
    </div>
  );
}