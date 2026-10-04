// src/components/charts/RadarChart.tsx
'use client';

import React from 'react';

interface RadarDimension {
  label: string;
  value: number; // 0 sampai 100
}

interface RadarChartProps {
  data: RadarDimension[];
  size?: number;
  isDark?: boolean;
}

export default function RadarChart({ data, size = 320, isDark = true }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 45;
  const totalAxes = data.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Hitung Titik Poligon Data Siswa
  const polygonPoints = data.map((d, i) => {
    const r = (d.value / 100) * radius;
    const angle = i * angleSlice - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Tingkatan Jaring Konsentris (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <linearGradient id="radarAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Jaring Laba-laba Poligon Konsentris */}
        {levels.map((lvl) => {
          const levelPoints = data.map((_, i) => {
            const r = lvl * radius;
            const angle = i * angleSlice - Math.PI / 2;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={lvl}
              points={levelPoints}
              fill="none"
              stroke={isDark ? '#334155' : '#CBD5E1'}
              strokeWidth="1.2"
              strokeDasharray={lvl === 1.0 ? '0' : '3 3'}
            />
          );
        })}

        {/* 2. Garis Jari-Jari Poros dari Pusat */}
        {data.map((d, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          // Posisi Label Teks Sedikit di Luar Lingkaran
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <g key={i}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isDark ? '#475569' : '#94A3B8'}
                strokeWidth="1"
              />
              <text
                x={lx}
                y={ly + 4}
                textAnchor={Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                fill={isDark ? '#94A3B8' : '#475569'}
                fontSize="10"
                fontWeight="bold"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* 3. Area Poligon Data Kompetensi Siswa */}
        <polygon
          points={polygonPoints}
          fill="url(#radarAreaGradient)"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 4. Titik Lingkaran di Tiap Ujung Sumbu */}
        {data.map((d, i) => {
          const r = (d.value / 100) * radius;
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fill={isDark ? '#60A5FA' : '#1D4ED8'}
                fontSize="10"
                fontWeight="900"
              >
                {Math.round(d.value)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}