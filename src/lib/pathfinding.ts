// src/lib/pathfinding.ts
import { GridPosition, Direction } from './types';

// Algoritma Breadth-First Search (BFS) untuk menemukan rute terpendek
export function findShortestPath(
  gridSize: number,
  start: GridPosition,
  target: GridPosition,
  obstacles: GridPosition[]
): GridPosition[] {
  const queue: { pos: GridPosition; path: GridPosition[] }[] = [{ pos: start, path: [start] }];
  const visited = new Set<string>();
  visited.add(`${start.x},${start.y}`);

  const obstacleSet = new Set(obstacles.map((o) => `${o.x},${o.y}`));
  const moves = [
    { x: 0, y: -1 }, // UP
    { x: 1, y: 0 },  // RIGHT
    { x: 0, y: 1 },  // DOWN
    { x: -1, y: 0 }, // LEFT
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.pos.x === target.x && current.pos.y === target.y) {
      return current.path;
    }

    for (const m of moves) {
      const nx = current.pos.x + m.x;
      const ny = current.pos.y + m.y;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        !obstacleSet.has(key) &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({
          pos: { x: nx, y: ny },
          path: [...current.path, { x: nx, y: ny }],
        });
      }
    }
  }

  return []; // Tidak ada jalur yang memungkinkan
}