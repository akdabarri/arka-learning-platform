// src/components/ui/HangarModal.tsx
'use client';

import React from 'react';
import { X, Sparkles, Check, Lock } from 'lucide-react';
import { RobotSkin } from '@/lib/types';
import { sound } from '@/lib/soundManager';

interface HangarModalProps {
  isOpen: boolean;
  onClose: () => void;
  crystals: number;
  activeSkin: RobotSkin;
  unlockedSkins: RobotSkin[];
  onSelectSkin: (skin: RobotSkin) => void;
  onBuySkin: (skin: RobotSkin, price: number) => void;
}

interface SkinItem {
  id: RobotSkin;
  name: string;
  desc: string;
  price: number;
  colorHex: string;
  badge: string;
}

const SKINS: SkinItem[] = [
  { id: 'BLUE', name: 'Original Solaria', desc: 'Warna standar penjelajah pulau', price: 0, colorHex: '#0284C7', badge: 'Standar' },
  { id: 'GOLD', name: 'Surya Cyber Gold', desc: 'Ditenagai lapisan fotonik surya murni', price: 45, colorHex: '#EAB308', badge: 'Mewah' },
  { id: 'EMERALD', name: 'Bio-Zamrud Hutan', desc: 'Kamuflase dedaunan mangrove', price: 60, colorHex: '#10B981', badge: 'Langka' },
  { id: 'PURPLE', name: 'Nebula Kosmik', desc: 'Teknologi kristal galaksi ungu', price: 90, colorHex: '#8B5CF6', badge: 'Legendaris' },
];

export default function HangarModal({
  isOpen,
  onClose,
  crystals,
  activeSkin,
  unlockedSkins,
  onSelectSkin,
  onBuySkin,
}: HangarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-slate-100 flex flex-col">
        {/* Header Hanggar */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Hanggar Kustomisasi ARKA
              <Sparkles size={20} className="text-amber-500" />
            </h2>
            <p className="text-xs text-slate-500 font-semibold">Ganti warna cat pelindung robot penjelajahmu</p>
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

        {/* Indikator Saldo Kristal */}
        <div className="my-4 p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl border border-amber-200/60 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900">Kristal Surya yang Dimiliki:</span>
          <div className="flex items-center gap-1.5 font-black text-sm text-amber-600">
            <span className="text-lg">💎</span>
            <span>{crystals} Kristal</span>
          </div>
        </div>

        {/* Pilihan Skin */}
        <div className="grid grid-cols-2 gap-3.5 my-2 overflow-y-auto max-h-[300px] p-1">
          {SKINS.map((s) => {
            const isUnlocked = unlockedSkins.includes(s.id);
            const isSelected = activeSkin === s.id;
            const canAfford = crystals >= s.price;

            return (
              <div
                key={s.id}
                className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className="w-8 h-8 rounded-xl shadow-xs border border-white"
                      style={{ backgroundColor: s.colorHex }}
                    />
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-xs font-black text-slate-800">{s.name}</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{s.desc}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                  {isSelected ? (
                    <button disabled className="w-full py-2 bg-blue-600 text-white rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1">
                      <Check size={14} /> Terpasang
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        onSelectSkin(s.id);
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[11px] font-bold transition active:scale-95 cursor-pointer"
                    >
                      Pasang Warna Ini
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          sound.playSuccess();
                          onBuySkin(s.id, s.price);
                        } else {
                          sound.playBump();
                        }
                      }}
                      disabled={!canAfford}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-xl text-[11px] font-black transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Lock size={12} /> Beli 💎 {s.price}
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