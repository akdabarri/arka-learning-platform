// src/components/ui/HangarModal.tsx
'use client';

import React from 'react';
import { X, Check, Lock, Sparkles, Sliders, Palette } from 'lucide-react';
import CrystalIcon from '@/components/ui/CrystalIcon';
import { RobotSkin } from '@/lib/types';
import { sound } from '@/lib/soundManager';

interface HangarModalProps {
  isOpen: boolean;
  onClose: () => void;
  crystals: number;
  activeSkin: RobotSkin;
  unlockedSkins: RobotSkin[];
  customHue?: number;
  onUpdateCustomHue?: (hue: number) => void;
  onSelectSkin: (skin: RobotSkin) => void;
  onBuySkin: (skin: RobotSkin, price: number) => void;
}

interface SkinDef {
  id: RobotSkin;
  name: string;
  description: string;
  price: number;
  badge?: string;
  colorPreview: string;
  isSpecial?: boolean;
}

const AVAILABLE_SKINS: SkinDef[] = [
  {
    id: 'BLUE',
    name: 'Arka Penjelajah',
    description: 'Warna standar insinyur robotik Solaria.',
    price: 0,
    colorPreview: '#2563EB',
  },
  {
    id: 'EMERALD',
    name: 'Zamrud Surya',
    description: 'Dilapisi kristal energi flora Solaria.',
    price: 25,
    colorPreview: '#10B981',
  },
  {
    id: 'RUBY',
    name: 'Vulkanik Mecha',
    description: 'Baja merah tangguh tahan lahar rintangan.',
    price: 35,
    colorPreview: '#EF4444',
  },
  {
    id: 'PURPLE',
    name: 'Quantum Amethyst',
    description: 'Modul penalaran frekuensi tinggi.',
    price: 50,
    colorPreview: '#9333EA',
  },
  {
    id: 'GOLD',
    name: 'Cyber Gold',
    description: 'Paduan emas murni simbol ketepatan logika.',
    price: 75,
    colorPreview: '#F59E0B',
  },
  {
    id: 'CYAN',
    name: 'Plasma Neon',
    description: 'Binar plasma foton berkecepatan tinggi.',
    price: 85,
    colorPreview: '#06B6D4',
  },
  {
    id: 'RAINBOW',
    name: 'Prisma Pelangi RGB',
    description: 'Spektrum 7 warna cahaya yang terus berganti secara dinamis.',
    price: 120,
    badge: 'ANIMASI EFEK',
    colorPreview: 'linear-gradient(135deg, #f87171, #fbbf24, #34d399, #60a5fa, #c084fc)',
    isSpecial: true,
  },
  {
    id: 'CUSTOM',
    name: 'Arka Maestro DIY (VIP)',
    description: 'Skin paling eksklusif! Atur sendiri warna robot sesukamu dengan Color Slider.',
    price: 180,
    badge: 'KUSTOM BEBAS 360°',
    colorPreview: 'conic-gradient(from 180deg, red, yellow, lime, aqua, blue, magenta, red)',
    isSpecial: true,
  },
];

const PRESET_HUES = [
  { label: 'Merah', hue: 0 },
  { label: 'Oranye', hue: 30 },
  { label: 'Kuning', hue: 55 },
  { label: 'Lime', hue: 95 },
  { label: 'Tosca', hue: 170 },
  { label: 'Cyan', hue: 195 },
  { label: 'Biru', hue: 220 },
  { label: 'Ungu', hue: 275 },
  { label: 'Magenta', hue: 305 },
  { label: 'Pink', hue: 335 },
];

export default function HangarModal({
  isOpen,
  onClose,
  crystals,
  activeSkin,
  unlockedSkins,
  customHue = 180,
  onUpdateCustomHue,
  onSelectSkin,
  onBuySkin,
}: HangarModalProps) {
  if (!isOpen) return null;

  const isCustomUnlocked = unlockedSkins.includes('CUSTOM');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Palette size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Hanggar Kostum Robot ARKA
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Pilih atau beli kostum robot menggunakan Kristal Surya.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Saldo Kristal */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-100 dark:bg-sky-950/70 border border-sky-300 dark:border-sky-800 rounded-xl text-xs font-black text-sky-800 dark:text-sky-300">
              <CrystalIcon variant="cyan" size={15} />
              <span>{crystals}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Panel Kustomisasi Khusus Jika Skin CUSTOM Terpilih */}
        {activeSkin === 'CUSTOM' && isCustomUnlocked && (
          <div className="mb-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border-2 border-purple-500/40 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-purple-500" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Panel Kustomisasi Warna DIY (Hue: {customHue}°)
                </span>
              </div>
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-colors duration-150"
                style={{ backgroundColor: `hsl(${customHue}, 90%, 55%)` }}
              />
            </div>

            {/* Slider Spektrum Pelangi */}
            <input
              type="range"
              min="0"
              max="360"
              value={customHue}
              onChange={(e) => onUpdateCustomHue && onUpdateCustomHue(parseInt(e.target.value, 10))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer outline-none shadow-inner mb-3"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
              }}
            />

            {/* Pilihan Cepat Preset Warna */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-bold opacity-60 mr-1">Preset:</span>
              {PRESET_HUES.map((p) => (
                <button
                  key={p.hue}
                  onClick={() => onUpdateCustomHue && onUpdateCustomHue(p.hue)}
                  style={{ backgroundColor: `hsl(${p.hue}, 85%, 55%)` }}
                  className="w-6 h-6 rounded-lg border border-black/20 hover:scale-110 active:scale-95 transition shadow-xs cursor-pointer"
                  title={p.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Daftar Kartu Skin */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_SKINS.map((skin) => {
            const isUnlocked = unlockedSkins.includes(skin.id);
            const isSelected = activeSkin === skin.id;
            const canAfford = crystals >= skin.price;

            return (
              <div
                key={skin.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {/* Lingkaran Avatar Warna */}
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center overflow-hidden"
                        style={{
                          background:
                            skin.id === 'CUSTOM'
                              ? `hsl(${customHue}, 90%, 55%)`
                              : skin.colorPreview,
                        }}
                      >
                        {skin.id === 'RAINBOW' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        )}
                        <span className="text-white drop-shadow-md font-black text-xs">
                          {skin.id === 'CUSTOM' ? 'DIY' : 'ARKA'}
                        </span>
                      </div>
                      {skin.badge && (
                        <span className="absolute -top-1.5 -right-2 bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                          {skin.badge}
                        </span>
                      )}
                    </div>

                    {/* Status Kepemilikan */}
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-black text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60 px-2.5 py-1 rounded-xl">
                        <Check size={13} /> Dipakai
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg">
                        Tersedia
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400">
                        <CrystalIcon variant="cyan" size={14} />
                        <span>{skin.price}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    {skin.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {skin.description}
                  </p>
                </div>

                {/* Tombol Aksi */}
                <div>
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectSkin(skin.id);
                      }}
                      disabled={isSelected}
                      className={`w-full py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white opacity-90'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {isSelected ? 'Sedang Digunakan' : 'Gunakan Skin'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          sound.playSuccess();
                          onBuySkin(skin.id, skin.price);
                        } else {
                          sound.playBump();
                          alert('Kristal Surya tidak mencukupi untuk membeli skin ini.');
                        }
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md active:scale-98'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <Lock size={13} />
                      <span>Buka ({skin.price} Kristal)</span>
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