'use client';

import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('arka-theme');
    if (saved === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('arka-theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('arka-theme', 'dark');
    }
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggle}
      aria-label="Ganti Tema"
      className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === 'dark' ? (
        <>
          <span className="text-amber-400">☀️</span>
          <span>Terang</span>
        </>
      ) : (
        <>
          <span className="text-indigo-400">🌙</span>
          <span>Gelap</span>
        </>
      )}
    </button>
  );
}