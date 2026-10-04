// src/components/ui/SplashScreen.tsx
'use client';

import React, { createContext, useContext } from 'react';

interface SplashContextType {
  navigateWithSplash?: (url: string) => void;
  goBackWithSplash?: () => void;
}

const SplashContext = createContext<SplashContextType>({});
export const useSplash = () => useContext(SplashContext);

export default function SplashScreen({
  message = 'Menghubungkan ke Stasiun Solaria...',
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500">
      <div className="relative flex flex-col items-center px-4 text-center">
        {/* Maskot Arka Animasi Pantul */}
        <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-2xl shadow-indigo-500/40 animate-bounce">
          <span className="text-4xl font-black text-white drop-shadow">A</span>
          <div className="absolute -inset-1 rounded-3xl bg-indigo-400 opacity-30 blur-lg animate-pulse" />
        </div>

        <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-cyan-200">
          LOGISPHERE: ARKA
        </h1>
        <p className="mt-2 text-xs font-semibold text-slate-300 tracking-wide animate-pulse">
          {message}
        </p>

        {/* Loading Bar Animasi */}
        <div className="mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}