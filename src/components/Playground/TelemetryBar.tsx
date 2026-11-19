import React from 'react';
import { Zap, Clock, Cpu, Gauge, TrendingUp } from 'lucide-react';
import { ChatMessage } from '../../types';

interface TelemetryBarProps {
  telemetry: ChatMessage['telemetry'];
  showSpeedometer?: boolean;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  telemetry,
  showSpeedometer = false
}) => {
  if (!telemetry) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-[#222222] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs font-mono text-zinc-400 select-none">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        
        {/* Speed / Tokens per second */}
        <div className="flex items-center gap-1.5 font-bold text-white bg-[#1A1A1A] border border-[#2E2E2E] px-2 py-0.5 rounded-full">
          <Zap className="w-3.5 h-3.5 text-[#F55036] fill-[#F55036]" />
          <span className="text-[#F55036]">{telemetry.tokensPerSecond.toLocaleString()}</span>
          <span className="text-zinc-400 font-normal">T/s</span>
        </div>

        {/* Time to First Token (TTFT) */}
        <div className="flex items-center gap-1 text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{telemetry.timeToFirstTokenSec}s</span>
          <span className="text-zinc-500 text-[10px]">TTFT</span>
        </div>

        {/* Total Completion / Tokens */}
        <div className="flex items-center gap-1 text-zinc-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>{telemetry.totalTokens}</span>
          <span className="text-zinc-500 text-[10px]">tokens</span>
        </div>

        {/* Total Duration */}
        <div className="flex items-center gap-1 text-zinc-400">
          <span>{telemetry.totalTimeSec}s</span>
          <span className="text-zinc-500 text-[10px]">total</span>
        </div>

        {/* Speed vs Traditional GPU Multiplier */}
        {telemetry.speedVsGpu && telemetry.speedVsGpu > 1 && (
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 text-[11px]">
            <TrendingUp className="w-3 h-3" />
            <span>{telemetry.speedVsGpu}x faster than GPU</span>
          </div>
        )}
      </div>

      <div className="text-[11px] text-zinc-500 font-sans">
        Groq LPU™ Inference Engine
      </div>
    </div>
  );
};
