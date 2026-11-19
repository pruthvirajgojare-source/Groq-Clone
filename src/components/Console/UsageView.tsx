import React from 'react';
import { getStoredUsage } from '../../services/storage';
import { BarChart3, TrendingUp, Clock, Cpu, Zap, DollarSign } from 'lucide-react';

export const UsageView: React.FC = () => {
  const usageData = getStoredUsage();

  const totalPromptTokens = usageData.reduce((acc, curr) => acc + curr.promptTokens, 0);
  const totalCompletionTokens = usageData.reduce((acc, curr) => acc + curr.completionTokens, 0);
  const totalTokens = totalPromptTokens + totalCompletionTokens;
  const totalRequests = usageData.reduce((acc, curr) => acc + curr.requests, 0);
  const avgLatency = Math.round(usageData.reduce((acc, curr) => acc + curr.avgLatencyMs, 0) / usageData.length);
  const estimatedCost = (totalPromptTokens / 1_000_000 * 0.05 + totalCompletionTokens / 1_000_000 * 0.08).toFixed(2);
  const gpuCostComparison = ((totalTokens / 1_000_000) * 2.50).toFixed(2);

  // Find max tokens for relative bar scaling
  const maxTokensDay = Math.max(...usageData.map(d => d.promptTokens + d.completionTokens));

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#222222] mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          <h1 className="font-display font-bold text-2xl text-white">Usage & Telemetry</h1>
        </div>
        <p className="text-xs text-zinc-400">
          Real-time metrics tracking token throughput, request counts, and hardware latency across Groq LPU clusters.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Total Tokens Processed</span>
          </div>
          <div className="text-2xl font-display font-bold text-white font-mono">
            {(totalTokens / 1_000_000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            Prompt: {(totalPromptTokens / 1_000_000).toFixed(1)}M • Completion: {(totalCompletionTokens / 1_000_000).toFixed(1)}M
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Average LPU Latency</span>
          </div>
          <div className="text-2xl font-display font-bold text-white font-mono">
            {avgLatency}ms
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>99.9% deterministic SLA</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
            <Zap className="w-4 h-4 text-[#F55036]" />
            <span>Total API Requests</span>
          </div>
          <div className="text-2xl font-display font-bold text-white font-mono">
            {totalRequests.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            Zero queue congestion
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Estimated Groq Cost</span>
          </div>
          <div className="text-2xl font-display font-bold text-emerald-400 font-mono">
            ${estimatedCost}
          </div>
          <div className="text-[11px] text-zinc-400 font-mono mt-1">
            Saved ~${(Number(gpuCostComparison) - Number(estimatedCost)).toFixed(0)} vs GPU
          </div>
        </div>

      </div>

      {/* Daily Consumption Chart (Interactive CSS Bars) */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-sm text-white">Daily Token Generation Volume</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Sustained throughput on Groq LPU clusters over past 7 days</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#F55036]"></span>
              <span className="text-zinc-300">Completion Tokens</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#2D2D2D]"></span>
              <span className="text-zinc-400">Prompt Tokens</span>
            </div>
          </div>
        </div>

        {/* Bar chart visualization */}
        <div className="h-48 flex items-end gap-3 sm:gap-6 pt-4 border-b border-[#222222]">
          {usageData.map((day, idx) => {
            const dayTotal = day.promptTokens + day.completionTokens;
            const completionHeightPercent = (day.completionTokens / maxTokensDay) * 100;
            const promptHeightPercent = (day.promptTokens / maxTokensDay) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-[#1C1C1C] text-zinc-200 px-2 py-1 rounded border border-[#333333] shadow-md pointer-events-none mb-1 text-center whitespace-nowrap">
                  <div>{(dayTotal / 1000).toFixed(0)}k tokens</div>
                  <div className="text-zinc-400">{day.requests} reqs</div>
                </div>

                <div className="w-full max-w-[48px] flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${completionHeightPercent}%` }}
                    className="w-full bg-[#F55036] rounded-t-sm transition-all group-hover:bg-[#FF6A50]"
                  />
                  <div
                    style={{ height: `${promptHeightPercent}%` }}
                    className="w-full bg-[#2E2E2E] rounded-b-sm transition-all group-hover:bg-[#3D3D3D]"
                  />
                </div>

                <span className="text-[11px] font-mono text-zinc-400">{day.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
          <h3 className="font-display font-semibold text-sm text-white mb-4">Volume by Model</h3>
          <div className="space-y-3 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-zinc-300">Llama 3.1 8B Instant (1,250 T/s)</span>
                <span className="text-white font-semibold">68%</span>
              </div>
              <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
                <div className="bg-[#F55036] h-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-zinc-300">Llama 3.3 70B Versatile</span>
                <span className="text-white font-semibold">22%</span>
              </div>
              <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-zinc-300">DeepSeek R1 Distill 70B</span>
                <span className="text-white font-semibold">10%</span>
              </div>
              <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-sm text-white mb-2">Need Custom Capacity?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Groq Enterprise offers dedicated LPU racks with guaranteed token reservations, private VPC peering, and custom weights compilation.
            </p>
          </div>
          <a
            href="https://groq.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-center py-2.5 px-4 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-white text-xs font-semibold transition-colors"
          >
            Contact Groq Sales
          </a>
        </div>
      </div>

    </div>
  );
};
