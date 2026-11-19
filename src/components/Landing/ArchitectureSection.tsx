import React from 'react';
import { Cpu, MemoryStick, Layers, Zap, Check } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="py-20 border-b border-[#222222] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-xs font-mono text-zinc-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#F55036]" />
            <span>Silicon Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            How Groq LPU™ Solved the Memory Wall
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            In LLM generation, compute cores sit idle while waiting for weights to travel from DRAM. Groq redesigned the processor specifically for autoregressive tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Legacy GPU Architecture Box */}
          <div className="p-8 rounded-2xl bg-[#111111] border border-[#242424] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-lg text-zinc-300">
                  Traditional GPU Cluster (H100 / A100)
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Memory Bound
                </span>
              </div>

              {/* Graphic Diagram */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0B0B0B] border border-[#1E1E1E] font-mono text-xs mb-6">
                <div className="p-2.5 rounded bg-zinc-800/60 border border-zinc-700/60 text-center text-zinc-300">
                  Streaming Multiprocessors (Compute Cores)
                </div>
                <div className="flex items-center justify-center text-red-400 font-bold text-[11px] py-1 animate-pulse">
                  ⬇ 3.35 TB/s External Memory Wall (Bottleneck) ⬇
                </div>
                <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-center text-zinc-400">
                  External HBM3 Memory DRAM Modules
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span>90% of time spent waiting for weights to travel over external memory bus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span>High latency jitter due to runtime speculative caching and branch mispredictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span>Costly batching required to maximize utilization, spiking single-user latency</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Groq LPU Architecture Box */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#F55036]/50 shadow-lg shadow-[#F55036]/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#F55036] text-white text-[11px] font-mono font-bold rounded-bl-lg">
              PATENTED LPU™ SILICON
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  Groq Tensor Streaming Processor (TSP)
                </h3>
              </div>

              {/* Graphic Diagram */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0E0E0E] border border-[#2D2D2D] font-mono text-xs mb-6">
                <div className="p-2.5 rounded bg-[#F55036]/15 border border-[#F55036]/40 text-center text-white font-semibold">
                  SRAM-Integrated Matrix Execution Units
                </div>
                <div className="flex items-center justify-center text-[#22C55E] font-bold text-[11px] py-1">
                  ⚡ 80 TB/s Direct Crossbar On-Chip Interconnect ⚡
                </div>
                <div className="p-2.5 rounded bg-[#1A1A1A] border border-[#333333] text-center text-zinc-200">
                  Zero External DRAM • 100% On-Chip Static Memory
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span><strong>Zero memory stalls:</strong> Weights stored on-die with 80 TB/s internal bandwidth</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span><strong>Deterministic compiler:</strong> Hardware execution scheduled cycle-by-cycle at compile time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span><strong>Batch size = 1 peak performance:</strong> Sub-second responses for individual real-time users</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
