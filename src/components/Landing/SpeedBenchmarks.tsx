import React, { useState } from 'react';
import { GROQ_MODELS } from '../../data/models';
import { Speedometer } from '../UI/Speedometer';
import { Zap, Activity, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const SpeedBenchmarks: React.FC<{ onSelectModelForPlayground: (id: string) => void }> = ({
  onSelectModelForPlayground
}) => {
  const [selectedBenchmarkModel, setSelectedBenchmarkModel] = useState(GROQ_MODELS[1].id);

  const activeModel = GROQ_MODELS.find(m => m.id === selectedBenchmarkModel) || GROQ_MODELS[1];

  return (
    <section className="py-20 border-b border-[#222222] bg-[#0E0E0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs font-mono text-[#F55036] mb-3">
              <Zap className="w-3.5 h-3.5 fill-[#F55036]" />
              <span>Verified Hardware Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Speed You Can Feel in Milliseconds.
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Traditional cloud GPUs hit the memory bandwidth wall. Groq LPU processes tokens in pure SRAM at up to 18x the speed of legacy infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {GROQ_MODELS.map(model => (
              <button
                key={model.id}
                onClick={() => setSelectedBenchmarkModel(model.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedBenchmarkModel === model.id
                    ? 'bg-[#F55036] text-white font-semibold'
                    : 'bg-[#181818] border border-[#292929] text-zinc-400 hover:text-white'
                }`}
              >
                {model.name.split(' ')[0]} {model.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Speedometer Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Speed Gauge */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Sustained Generation Speed
            </span>
            <div className="my-4">
              <Speedometer tokensPerSec={activeModel.tokensPerSecond} size="lg" />
            </div>
            <div className="text-xs text-zinc-400 max-w-xs mt-2 font-mono">
              Model: <span className="text-white font-semibold">{activeModel.name}</span>
            </div>
            <button
              onClick={() => onSelectModelForPlayground(activeModel.id)}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#F55036] hover:text-[#FF7A60] transition-colors"
            >
              <span>Test in Playground</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metric Comparison Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-display font-semibold text-xs text-zinc-300">Time-to-First-Token (TTFT)</span>
              </div>
              <div className="text-3xl font-display font-bold text-white font-mono">
                {activeModel.timeToFirstTokenMs}ms
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Users experience near instantaneous interaction without buffering latency.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Activity className="w-4 h-4" />
                <span className="font-display font-semibold text-xs text-zinc-300">On-Chip SRAM Bandwidth</span>
              </div>
              <div className="text-3xl font-display font-bold text-white font-mono">
                80 TB/s
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                20x faster memory bandwidth than the fastest HBM3e GPU memory bus.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-display font-semibold text-xs text-zinc-300">Deterministic Execution</span>
              </div>
              <div className="text-3xl font-display font-bold text-white font-mono">
                100%
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Exact cycle-accurate execution with zero latency jitter across requests.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141414] border border-[#242424]">
              <div className="flex items-center gap-2 text-[#F55036] mb-2">
                <Zap className="w-4 h-4" />
                <span className="font-display font-semibold text-xs text-zinc-300">Token Pricing (Prompt)</span>
              </div>
              <div className="text-3xl font-display font-bold text-white font-mono">
                ${activeModel.pricingPromptPerM.toFixed(2)}
                <span className="text-xs font-normal text-zinc-400"> / 1M</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                High-efficiency silicon translates directly to industry-lowest API costs.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
