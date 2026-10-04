// src/components/ui/LevelMapModal.tsx
'use client';

import React from 'react';
import { X, Lock, CheckCircle2, Star, Play } from 'lucide-react';
import { LEVELS } from '@/lib/levelsData';
import { sound } from '@/lib/soundManager';

interface LevelMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelId: number;
  levelStars: { [levelId: number]: number };
  onSelectLevel: (levelIndex: number) => void;
}

export default function LevelMapModal({
  isOpen,
  onClose,
  currentLevelId,
  levelStars,
  onSelectLevel,
}: LevelMapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-slate-100 flex flex-col">
        {/* Header Peta */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Peta Ekspedisi Solaria</h2>
            <p className="text-xs text-slate-500 font-semibold">Pilih stasiun riset yang ingin kamu jelajahi</p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Daftar 5 Level */}
        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[360px] p-1">
          {LEVELS.map((lvl, idx) => {
            const stars = levelStars[lvl.id] || 0;
            // Level terbuka jika level sebelumnya sudah punya minimal 1 bintang, atau level 1
            const isUnlocked = idx === 0 || (levelStars[LEVELS[idx - 1].id] || 0) > 0;
            const isCurrent = lvl.id === currentLevelId;

            return (
              <div
                key={lvl.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : isUnlocked
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-100 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-md'
                        : isUnlocked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? lvl.id : <Lock size={16} />}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800">{lvl.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Target: {lvl.targetDescription}</p>
                    {/* Bintang Level */}
                    {isUnlocked && (
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            size={13}
                            className={starIdx <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {isUnlocked && (
                    <button
                      onClick={() => {
                        sound.playStep();
                        onSelectLevel(idx);
                        onClose();
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play size={12} fill="currentColor" /> Main
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}