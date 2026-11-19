import React from 'react';

interface SpeedometerProps {
  tokensPerSec: number;
  maxSpeed?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const Speedometer: React.FC<SpeedometerProps> = ({
  tokensPerSec,
  maxSpeed = 1500,
  size = 'md'
}) => {
  const clampedSpeed = Math.min(Math.max(tokensPerSec, 0), maxSpeed);
  // Calculate angle between -90deg and 90deg (180 deg arc)
  const angle = -90 + (clampedSpeed / maxSpeed) * 180;

  const dimensions = {
    sm: { width: 90, height: 50, radius: 36, stroke: 6, textSize: 'text-xs', valSize: 'text-sm' },
    md: { width: 140, height: 78, radius: 56, stroke: 9, textSize: 'text-xs', valSize: 'text-lg' },
    lg: { width: 200, height: 110, radius: 80, stroke: 12, textSize: 'text-sm', valSize: 'text-2xl' }
  }[size];

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="speedoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="30%" stopColor="#22C55E" />
              <stop offset="70%" stopColor="#F55036" />
              <stop offset="100%" stopColor="#FF7A60" />
            </linearGradient>
            <filter id="glowNeedle" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F55036" floodOpacity="0.7"/>
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d={`M ${dimensions.width / 2 - dimensions.radius} ${dimensions.height} A ${dimensions.radius} ${dimensions.radius} 0 0 1 ${dimensions.width / 2 + dimensions.radius} ${dimensions.height}`}
            fill="none"
            stroke="#262626"
            strokeWidth={dimensions.stroke}
            strokeLinecap="round"
          />

          {/* Speed Arc */}
          <path
            d={`M ${dimensions.width / 2 - dimensions.radius} ${dimensions.height} A ${dimensions.radius} ${dimensions.radius} 0 0 1 ${dimensions.width / 2 + dimensions.radius} ${dimensions.height}`}
            fill="none"
            stroke="url(#speedoGradient)"
            strokeWidth={dimensions.stroke}
            strokeDasharray={`${(clampedSpeed / maxSpeed) * Math.PI * dimensions.radius} 1000`}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          {/* Needle Center Pivot */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height}
            r={dimensions.stroke * 0.9}
            fill="#F55036"
          />

          {/* Needle Pointer */}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: `${dimensions.width / 2}px ${dimensions.height}px`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            <line
              x1={dimensions.width / 2}
              y1={dimensions.height}
              x2={dimensions.width / 2}
              y2={dimensions.height - dimensions.radius + 4}
              stroke="#F55036"
              strokeWidth={3}
              strokeLinecap="round"
              filter="url(#glowNeedle)"
            />
          </g>
        </svg>
      </div>

      <div className="flex items-baseline gap-1 mt-1 font-mono font-bold text-white tracking-tight">
        <span className={`${dimensions.valSize} text-[#F55036]`}>
          {tokensPerSec.toLocaleString()}
        </span>
        <span className={`${dimensions.textSize} text-zinc-400 font-normal`}>T/s</span>
      </div>
    </div>
  );
};
