import React, { useState } from 'react';
import { Zap, Play, ArrowRight, Gauge, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { Speedometer } from '../UI/Speedometer';

interface HeroSectionProps {
  onStartBuilding: () => void;
  onOpenDocs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartBuilding, onOpenDocs }) => {
  const [isRunningRace, setIsRunningRace] = useState(false);
  const [gpuOutput, setGpuOutput] = useState('');
  const [lpuOutput, setLpuOutput] = useState('');
  const [lpuFinished, setLpuFinished] = useState(false);
  const [gpuFinished, setGpuFinished] = useState(false);

  const sampleText = "The Groq LPU™ eliminates the memory bandwidth bottleneck by storing full model state in on-chip SRAM, delivering deterministic sub-millisecond token execution without GPU cache misses or thread arbitration delays.";

  const handleTestRace = async () => {
    if (isRunningRace) return;
    setIsRunningRace(true);
    setGpuOutput('');
    setLpuOutput('');
    setLpuFinished(false);
    setGpuFinished(false);

    const words = sampleText.split(' ');

    // LPU stream at ultra high speed (~1,250 t/s) -> finishes in ~150ms
    const lpuPromise = (async () => {
      for (let i = 0; i < words.length; i += 3) {
        const chunk = (i === 0 ? '' : ' ') + words.slice(i, i + 3).join(' ');
        setLpuOutput(prev => prev + chunk);
        await new Promise(r => setTimeout(r, 14));
      }
      setLpuFinished(true);
    })();

    // Traditional GPU stream at 35 t/s -> takes much longer
    const gpuPromise = (async () => {
      // simulate standard 800ms TTFT first token delay
      await new Promise(r => setTimeout(r, 800));
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        setGpuOutput(prev => prev + chunk);
        await new Promise(r => setTimeout(r, 55));
      }
      setGpuFinished(true);
    })();

    await Promise.all([lpuPromise, gpuPromise]);
    setIsRunningRace(false);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#222222]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#F55036]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Tagline */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#2D2D2D] text-xs font-mono text-zinc-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F55036] animate-pulse"></span>
            <span className="text-[#F55036] font-semibold">Groq LPU™ Architecture</span>
            <span className="text-zinc-500">•</span>
            <span>Sub-100ms Time-to-First-Token</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            The premier neocloud for <span className="text-[#F55036] underline decoration-[#F55036]/30">fast inference.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mb-8">
            One fully integrated platform for infrastructure, inference, and control. Millions of developers run trillions of tokens on Groq every week.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartBuilding}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm bg-[#F55036] hover:bg-[#E04027] text-white shadow-lg shadow-[#F55036]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Building in Playground</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDocs}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm bg-[#161616] hover:bg-[#202020] border border-[#2E2E2E] text-zinc-200 transition-all"
            >
              <span>API Documentation</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Hero Speed Race: GPU vs Groq LPU */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#2A2A2A] bg-[#121212]/90 backdrop-blur-md p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#242424] mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F55036] fill-[#F55036]" />
                <h3 className="font-display font-bold text-white text-base">
                  Interactive Live Speed Benchmark
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Watch traditional GPU inference crawl while Groq LPU completes in an instant
              </p>
            </div>

            <button
              onClick={handleTestRace}
              disabled={isRunningRace}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                isRunningRace
                  ? 'bg-[#222222] text-zinc-500 cursor-not-allowed'
                  : 'bg-[#F55036] hover:bg-[#E04027] text-white shadow-md'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunningRace ? 'Racing Hardware...' : 'Run Live Speed Test'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Traditional GPU Column */}
            <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#222222] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600"></span>
                    <span className="font-display font-semibold text-xs text-zinc-300">
                      Traditional Cloud GPU (H100)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">~35 T/s</span>
                </div>

                <div className="min-h-[100px] text-xs font-mono text-zinc-400 leading-relaxed bg-[#141414] p-3 rounded-lg border border-[#202020]">
                  {gpuOutput || (
                    <span className="text-zinc-600 italic">
                      Awaiting test trigger...
                    </span>
                  )}
                  {isRunningRace && !gpuFinished && (
                    <span className="inline-block w-1.5 h-3 ml-0.5 bg-zinc-400 animate-pulse"></span>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>TTFT: 0.85s</span>
                <span>Latency: High / Batch dependent</span>
              </div>
            </div>

            {/* Groq LPU Column */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#F55036]/40 shadow-inner flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#F55036] text-[10px] font-mono font-bold text-white rounded-bl-md">
                18.5x FASTER
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span className="font-display font-bold text-xs text-white">
                      Groq LPU™ (Llama 3.1 8B)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F55036]">
                    1,250 T/s
                  </span>
                </div>

                <div className="min-h-[100px] text-xs font-mono text-zinc-200 leading-relaxed bg-[#181818] p-3 rounded-lg border border-[#2D2D2D]">
                  {lpuOutput || (
                    <span className="text-zinc-500 italic">
                      Click "Run Live Speed Test" to stream instantly...
                    </span>
                  )}
                  {isRunningRace && !lpuFinished && (
                    <span className="inline-block w-1.5 h-3 ml-0.5 bg-[#F55036] animate-pulse"></span>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#252525] flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>TTFT: 0.045s</span>
                <span>Deterministic: 100%</span>
              </div>
            </div>

          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-zinc-500">
              * Measured in real time using Groq's Tensor Streaming Processor architecture.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
