// src/lib/types.ts
export type CommandType = 'MOVE_FORWARD' | 'TURN_RIGHT' | 'TURN_LEFT' | 'JUMP_FORWARD' | 'REPEAT_2X';
export type TargetType = 'BATTERY' | 'MANGROVE' | 'WATER_PUMP' | 'SOLAR_CORE';
export type RobotSkin = 
  | 'BLUE' 
  | 'EMERALD' 
  | 'RUBY' 
  | 'PURPLE' 
  | 'GOLD' 
  | 'CYAN' 
  | 'RAINBOW' 
  | 'CUSTOM' 
  | string;

export interface CommandBlock {
  id: string;
  type: CommandType;
  label: string;
  color: string;
}

export interface GridPosition {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface LevelConfig {
  id: number;
  zone: string;
  zoneId?: number | string;
  title: string;
  gridSize: number;
  startPos: GridPosition;
  startDirection: Direction;
  targetPos: GridPosition;
  targetType: TargetType;
  targetDescription: string;
  obstacles: GridPosition[];
  availableBlocks: CommandType[];
  storyPrompt: string;
  optimalBlocks: number;
}

export interface StudentProfile {
  studentName: string;
  studentClass: string;
  schoolName: string;
  crystals: number;
  activeSkin: RobotSkin;
  unlockedSkins: RobotSkin[];
  levelStars: { [lvl: number]: number };
  currentLevel: number;
}

export interface TelemetryRecord {
  id: string;
  studentName: string;
  studentClass: string;
  schoolName: string;
  levelId: number;
  attempts: number;
  blockCount: number;
  optimalBlocks: number;
  efficiencyRatio: number;
  predictionAccuracy: boolean;
  hintsUsed: boolean;
  durationSeconds: number;
  timestamp: string;
}