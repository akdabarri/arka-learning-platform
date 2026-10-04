// src/components/ui/ZoneHubModal.tsx
'use client';

import React from 'react';
import { X, Compass } from 'lucide-react';
import { sound } from '@/lib/soundManager';

interface ZoneHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelStars: { [lvl: number]: number };
  onSelectLevel: (levelIndex: number) => void;
  isDark?: boolean;
}

const ZONES = [
  { id: 1, name: 'Fase 1: Pesisir Solaria', sub: 'Navigasi Dasar & Belokan Presisi', range: [1, 5], badge: 'Zona Pemula' },
  { id: 2, name: 'Fase 2: Rawa Mangrove', sub: 'Labirin Rintangan Padat & Celah Sempit', range: [6, 10], badge: 'Zona Rawa' },
  { id: 3, name: 'Fase 3: Lembah Geiser', sub: 'Manuver Bertingkat & Balok Lompat', range: [11, 15], badge: 'Zona Vulkanik' },
  { id: 4, name: 'Fase 4: Reaktor Surya', sub: 'Algoritma Looping & Pengulangan Efisien', range: [16, 20], badge: 'Zona Reaktor' },
  { id: 5, name: 'Fase 5: Puncak Observatorium', sub: 'Ujian Pemecahan Masalah Tingkat Lanjut', range: [21, 25], badge: 'Zona Puncak' },
];

export default function ZoneHubModal({ isOpen, onClose, levelStars, onSelectLevel, isDark = false }: ZoneHubModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className={`relative max-w-3xl w-full rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header Peta Sektor */}
        <div className={`flex justify-between items-center pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div>
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-blue-500" />
              <h2 className="text-lg font-black tracking-tight uppercase">Peta Ekspedisi Sektoral Solaria</h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">Pilih zona penelitian untuk memandu penjelajahan ARKA</p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
            }`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Daftar 5 Fase Zona */}
        <div className="overflow-y-auto py-4 flex flex-col gap-3.5 pr-1">
          {ZONES.map((zone) => {
            const [startLvl, endLvl] = zone.range;
            let zoneStars = 0;
            for (let i = startLvl; i <= endLvl; i++) {
              zoneStars += levelStars[i] || 0;
            }
            const maxZoneStars = (endLvl - startLvl + 1) * 3;
            const isUnlocked = zone.id === 1 || (levelStars[startLvl - 1] || 0) > 0;

            return (
              <div
                key={zone.id}
                className={`p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-slate-50/80 hover:bg-blue-50/40 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      Sektor Level {startLvl} - {endLvl}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Progres: {zoneStars}/{maxZoneStars} Bintang
                    </span>
                  </div>
                  <h3 className="text-base font-black">{zone.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{zone.sub}</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {Array.from({ length: endLvl - startLvl + 1 }, (_, idx) => {
                    const lvlNum = startLvl + idx;
                    const stars = levelStars[lvlNum] || 0;
                    const lvlUnlocked = lvlNum === 1 || (levelStars[lvlNum - 1] || 0) > 0;

                    return (
                      <button
                        key={lvlNum}
                        onClick={() => {
                          if (lvlUnlocked) {
                            sound.playStep();
                            onSelectLevel(lvlNum - 1);
                            onClose();
                          }
                        }}
                        disabled={!lvlUnlocked}
                        className={`flex-1 md:flex-none w-10 h-10 rounded-xl font-black text-xs border flex flex-col items-center justify-center transition cursor-pointer ${
                          stars > 0
                            ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                            : lvlUnlocked
                            ? isDark
                              ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            : 'opacity-30 cursor-not-allowed bg-slate-200 dark:bg-slate-800'
                        }`}
                      >
                        <span>{lvlNum}</span>
                        {stars > 0 && <span className="text-[8px] text-amber-300 font-mono">★{stars}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}