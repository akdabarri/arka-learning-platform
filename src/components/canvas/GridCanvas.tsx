// src/components/canvas/GridCanvas.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { GridPosition, Direction, LevelConfig, RobotSkin } from '@/lib/types';

interface GridCanvasProps {
  level: LevelConfig;
  robotPos: GridPosition;
  robotDir: Direction;
  isCelebrating?: boolean;
  skin?: RobotSkin;
  customHue?: number;
  hintPath?: GridPosition[];
}

export default function GridCanvas({
  level,
  robotPos,
  robotDir,
  isCelebrating = false,
  skin = 'BLUE',
  hintPath = [],
}: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.04;
      const tileSize = canvas.width / level.gridSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Gambar Ubin Grid Pulau
      for (let r = 0; r < level.gridSize; r++) {
        for (let c = 0; c < level.gridSize; c++) {
          const x = c * tileSize;
          const y = r * tileSize;
          const isAlt = (r + c) % 2 === 0;

          ctx.fillStyle = isAlt ? '#ECFDF5' : '#D1FAE5';
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, tileSize - 4, tileSize - 4, 10);
          ctx.fill();

          ctx.strokeStyle = '#A7F3D0';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // 2. Jalur Petunjuk BFS (Glow Oranye jika dibeli)
      if (hintPath && hintPath.length > 1) {
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        hintPath.forEach((pt, i) => {
          const px = pt.x * tileSize + tileSize / 2;
          const py = pt.y * tileSize + tileSize / 2;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        hintPath.forEach((pt) => {
          const px = pt.x * tileSize + tileSize / 2;
          const py = pt.y * tileSize + tileSize / 2;
          ctx.fillStyle = '#FBBF24';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 3. Batang Kayu / Bebatuan Rintangan (Perbaikan Argumen Ellipse: 7 Argumen)
      level.obstacles.forEach((obs) => {
        const ox = obs.x * tileSize;
        const oy = obs.y * tileSize;
        const pad = tileSize * 0.14;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.18)';
        ctx.beginPath();
        // 7 Argumen: x, y, radiusX, radiusY, rotation, startAngle, endAngle
        ctx.ellipse(ox + tileSize / 2, oy + tileSize - 6, tileSize * 0.38, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#854D0E';
        ctx.strokeStyle = '#3A1D06';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(ox + pad, oy + pad, tileSize - pad * 2, tileSize - pad * 2, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#5A2E07';
        ctx.beginPath();
        ctx.roundRect(ox + pad + 6, oy + pad + 6, tileSize - (pad + 6) * 2, 4, 2);
        ctx.fill();
      });

      // 4. Sasaran Misi
      const tx = level.targetPos.x * tileSize;
      const ty = level.targetPos.y * tileSize;
      const tCenterX = tx + tileSize / 2;
      const tCenterY = ty + tileSize / 2;
      const pulse = Math.sin(time * 2.5) * 3;

      if (level.targetType === 'BATTERY') {
        ctx.fillStyle = '#FEF08A';
        ctx.strokeStyle = '#854D0E';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(tCenterX - 14, tCenterY - 18 + pulse, 28, 36, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#EAB308';
        ctx.beginPath();
        ctx.moveTo(tCenterX + 1, tCenterY - 11 + pulse);
        ctx.lineTo(tCenterX - 6, tCenterY + 1 + pulse);
        ctx.lineTo(tCenterX, tCenterY + 1 + pulse);
        ctx.lineTo(tCenterX - 2, tCenterY + 11 + pulse);
        ctx.lineTo(tCenterX + 7, tCenterY - 1 + pulse);
        ctx.lineTo(tCenterX, tCenterY - 1 + pulse);
        ctx.closePath();
        ctx.fill();
      } else if (level.targetType === 'MANGROVE') {
        ctx.fillStyle = '#78350F';
        ctx.beginPath();
        // 7 Argumen: x, y, radiusX, radiusY, rotation, startAngle, endAngle
        ctx.ellipse(tCenterX, tCenterY + 12, 14, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#16A34A';
        ctx.strokeStyle = '#14532D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(tCenterX - 7, tCenterY - 5 + pulse, 8, 4.5, -Math.PI / 4, 0, Math.PI * 2);
        ctx.ellipse(tCenterX + 7, tCenterY - 6 + pulse, 8, 4.5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0369A1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(tCenterX - 14, tCenterY - 14 + pulse, 28, 28, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(tCenterX, tCenterY + pulse, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Karakter ARKA Orisinal
      const rx = robotPos.x * tileSize;
      const ry = robotPos.y * tileSize;
      const rCenterX = rx + tileSize / 2;
      const rCenterY = ry + tileSize / 2;

      let primaryColor = '#2563EB';
      let secondaryColor = '#1D4ED8';
      let accentColor = '#38BDF8';
      if (skin === 'GOLD') { primaryColor = '#EAB308'; secondaryColor = '#CA8A04'; accentColor = '#FEF08A'; }
      if (skin === 'EMERALD') { primaryColor = '#10B981'; secondaryColor = '#059669'; accentColor = '#A7F3D0'; }
      if (skin === 'PURPLE') { primaryColor = '#8B5CF6'; secondaryColor = '#6D28D9'; accentColor = '#DDD6FE'; }
      if (skin === 'RED') { primaryColor = '#EF4444'; secondaryColor = '#B91C1C'; accentColor = '#FECACA'; }

      const bob = Math.sin(time * 5) * (isCelebrating ? 4 : 1.5);

      // Bayangan Lembut ARKA (Perbaikan Argumen Ellipse: 7 Argumen)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.beginPath();
      ctx.ellipse(rCenterX, ry + tileSize - 8, tileSize * 0.36, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rantai Pendarat Bawah (Rover Treads)
      ctx.fillStyle = '#1E293B';
      const treadWidth = tileSize * 0.65;
      const treadHeight = tileSize * 0.16;
      ctx.beginPath();
      ctx.roundRect(rCenterX - treadWidth / 2, ry + tileSize - 18, treadWidth, treadHeight, 4);
      ctx.fill();

      ctx.fillStyle = '#475569';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(rCenterX - treadWidth / 2 + 5 + i * 11, ry + tileSize - 17, 4, 7);
      }

      // Sayap Panel Surya Mini
      ctx.fillStyle = secondaryColor;
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(rCenterX - tileSize * 0.38, rCenterY - 10 + bob, 8, 18, 3);
      ctx.roundRect(rCenterX + tileSize * 0.38 - 8, rCenterY - 10 + bob, 8, 18, 3);
      ctx.fill();
      ctx.stroke();

      // Badan Robot Utama
      ctx.fillStyle = primaryColor;
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2.5;
      const bodyW = tileSize * 0.58;
      const bodyH = tileSize * 0.52;
      ctx.beginPath();
      ctx.roundRect(rCenterX - bodyW / 2, rCenterY - bodyH / 2 - 2 + bob, bodyW, bodyH, 12);
      ctx.fill();
      ctx.stroke();

      // Layar Wajah LED Digital
      ctx.fillStyle = '#090D16';
      const screenW = bodyW * 0.74;
      const screenH = bodyH * 0.55;
      const screenX = rCenterX - screenW / 2;
      const screenY = rCenterY - bodyH / 2 + 5 + bob;
      ctx.beginPath();
      ctx.roundRect(screenX, screenY, screenW, screenH, 8);
      ctx.fill();

      // Animasi Kedip Mata Robot
      const isBlinking = Math.sin(time * 1.5) > 0.94;
      const eyeLookX = robotDir === 'RIGHT' ? 3 : robotDir === 'LEFT' ? -3 : 0;
      const eyeLookY = robotDir === 'DOWN' ? 2 : robotDir === 'UP' ? -2 : 0;

      ctx.fillStyle = accentColor;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;

      if (isCelebrating) {
        ctx.beginPath();
        ctx.arc(rCenterX - 7, screenY + screenH / 2 + 2, 4, Math.PI, 0);
        ctx.arc(rCenterX + 7, screenY + screenH / 2 + 2, 4, Math.PI, 0);
        ctx.stroke();
      } else if (isBlinking) {
        ctx.beginPath();
        ctx.moveTo(rCenterX - 11, screenY + screenH / 2);
        ctx.lineTo(rCenterX - 3, screenY + screenH / 2);
        ctx.moveTo(rCenterX + 3, screenY + screenH / 2);
        ctx.lineTo(rCenterX + 11, screenY + screenH / 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(rCenterX - 7 + eyeLookX, screenY + screenH / 2 + eyeLookY, 3.5, 0, Math.PI * 2);
        ctx.arc(rCenterX + 7 + eyeLookX, screenY + screenH / 2 + eyeLookY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reaktor Kristal Energi di Dada
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(rCenterX, rCenterY + bodyH / 2 - 8 + bob, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Antena Tunas Daun Surya
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rCenterX, rCenterY - bodyH / 2 - 2 + bob);
      ctx.lineTo(rCenterX, rCenterY - bodyH / 2 - 10 + bob);
      ctx.stroke();

      ctx.fillStyle = '#22C55E';
      ctx.beginPath();
      ctx.ellipse(rCenterX + 3, rCenterY - bodyH / 2 - 12 + bob, 4.5, 2.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [level, robotPos, robotDir, isCelebrating, skin, hintPath]);

  return (
    <div className="flex flex-col items-center w-full max-w-105">
      <div className="w-full p-2.5 bg-linear-to-b from-emerald-100 to-teal-50 rounded-3xl shadow-xl border-3 border-slate-900">
        <canvas
          ref={canvasRef}
          width={520}
          height={520}
          className="w-full aspect-square rounded-2xl shadow-inner block"
        />
      </div>
      <div className="mt-2.5 text-xs text-slate-700 font-black tracking-wide">
        Posisi ARKA: ({robotPos.x}, {robotPos.y}) • Arah: {robotDir}
      </div>
    </div>
  );
}