'use client';

import { useEffect, useState } from 'react';

export function GaitPatternViz() {
  const [offset, setOffset] = useState(0);

  // Generate demo data points for a gait pattern
  const generatePoints = (offset: number) => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = i * 5;
      // Create a walking pattern with two waves (heel strike and toe-off)
      const y1 = Math.sin(i * 0.1 + offset) * 20 + Math.sin(i * 0.2) * 10;
      const y2 = Math.sin(i * 0.1 + offset + Math.PI) * 20 + Math.sin(i * 0.2 + Math.PI) * 10;
      points.push({ x, y1: y1 + 50, y2: y2 + 150 });
    }
    return points;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const points = generatePoints(offset);

  return (
    <div className="relative w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="absolute top-4 left-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-blue" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Left Foot</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-teal" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Right Foot</span>
        </div>
      </div>
      <svg
        className="w-full h-full"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        aria-label="Gait Pattern Visualization"
      >
        {/* Grid lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`grid-y-${i * 20}`}
            x1="0"
            y1={i * 20}
            x2="500"
            y2={i * 20}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-200 dark:text-gray-700"
          />
        ))}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={`grid-x-${i * 20}`}
            x1={i * 20}
            y1="0"
            x2={i * 20}
            y2="200"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-200 dark:text-gray-700"
          />
        ))}

        {/* Gait pattern lines */}
        <path
          d={`M ${points.map(p => `${p.x},${p.y1}`).join(' L ')}`}
          fill="none"
          stroke="url(#gradient-1)"
          strokeWidth="2"
          className="drop-shadow-md"
        />
        <path
          d={`M ${points.map(p => `${p.x},${p.y2}`).join(' L ')}`}
          fill="none"
          stroke="url(#gradient-2)"
          strokeWidth="2"
          className="drop-shadow-md"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1B8FAD" />
            <stop offset="100%" stopColor="#43A695" />
          </linearGradient>
          <linearGradient id="gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#43A695" />
            <stop offset="100%" stopColor="#1B8FAD" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Time</span>
        <span>Gait Cycle Analysis</span>
      </div>
    </div>
  );
} 