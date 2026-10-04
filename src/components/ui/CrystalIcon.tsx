// src/components/ui/CrystalIcon.tsx
import React from 'react';

interface CrystalIconProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'cyan';
}

export default function CrystalIcon({ className = '', size = 18, variant = 'cyan' }: CrystalIconProps) {
  const isCyan = variant === 'cyan';

  // Palet Warna Berlian Cyan vs Emas
  const topStop1 = isCyan ? '#E0F2FE' : '#FEF08A';
  const topStop2 = isCyan ? '#38BDF8' : '#EAB308';
  const leftStop1 = isCyan ? '#7DD3FC' : '#FACC15';
  const leftStop2 = isCyan ? '#0284C7' : '#CA8A04';
  const rightStop1 = isCyan ? '#0284C7' : '#EAB308';
  const rightStop2 = isCyan ? '#0369A1' : '#A16207';
  const centerStop1 = isCyan ? '#F0F9FF' : '#FEF9C3';
  const centerStop2 = isCyan ? '#0EA5E9' : '#F59E0B';
  const strokeColor = isCyan ? '#075985' : '#713F12';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={`gemTop_${variant}`} x1="12" y1="2" x2="12" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor={topStop1} />
          <stop offset="1" stopColor={topStop2} />
        </linearGradient>
        <linearGradient id={`gemLeft_${variant}`} x1="3" y1="8" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor={leftStop1} />
          <stop offset="1" stopColor={leftStop2} />
        </linearGradient>
        <linearGradient id={`gemRight_${variant}`} x1="21" y1="8" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor={rightStop1} />
          <stop offset="1" stopColor={rightStop2} />
        </linearGradient>
        <linearGradient id={`gemCenter_${variant}`} x1="12" y1="8" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor={centerStop1} />
          <stop offset="1" stopColor={centerStop2} />
        </linearGradient>
      </defs>

      {/* Mahkota Berlian */}
      <polygon points="6,8 12,2 18,8" fill={`url(#gemTop_${variant})`} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="2,8 6,8 12,2" fill={centerStop1} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="18,8 22,8 12,2" fill={rightStop2} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />

      {/* Tubuh Prisma Berlian */}
      <polygon points="2,8 6,8 12,22" fill={`url(#gemLeft_${variant})`} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="6,8 18,8 12,22" fill={`url(#gemCenter_${variant})`} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="18,8 22,8 12,22" fill={`url(#gemRight_${variant})`} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}