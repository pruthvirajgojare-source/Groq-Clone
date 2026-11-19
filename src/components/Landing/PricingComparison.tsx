import React from 'react';
import { DollarSign, Check, Zap, TrendingDown } from 'lucide-react';

export const PricingComparison: React.FC = () => {
  return (
    <section className="py-20 border-b border-[#222222] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-xs font-mono text-emerald-400 mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Economic Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Up to 80% Lower Inference Cost
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Because Groq LPUs operate without external memory stalls and compile statically, compute density is dramatically higher, yielding unmatched economics.
          </p>
        </div>

        {/* Pricing comparison table */}
        <div className="rounded-2xl border border-[#262626] bg-[#121212] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#252525] bg-[#161616] font-mono text-zinc-400">
                  <th className="p-4">Platform / Provider</th>
                  <th className="p-4">Model Class</th>
                  <th className="p-4">Tokens / Second</th>
                  <th className="p-4">Time to First Token</th>
                  <th className="p-4">Cost per 1M Input Tokens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020] font-mono">
                
                {/* Groq Llama 3.1 8B */}
                <tr className="bg-[#F55036]/5 text-white font-semibold">
                  <td className="p-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F55036]"></span>
                    <span>Groq LPU™ Cloud</span>
                  </td>
                  <td className="p-4">Llama 3.1 8B Instant</td>
                  <td className="p-4 text-[#F55036] font-bold">1,250 T/s</td>
                  <td className="p-4 text-emerald-400">45ms</td>
                  <td className="p-4 text-emerald-400">$0.05</td>
                </tr>

                {/* Groq Llama 3.3 70B */}
                <tr className="bg-[#F55036]/10 text-white font-semibold">
                  <td className="p-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F55036]"></span>
                    <span>Groq LPU™ Cloud</span>
                  </td>
                  <td className="p-4">Llama 3.3 70B Versatile</td>
                  <td className="p-4 text-[#F55036] font-bold">395 T/s</td>
                  <td className="p-4 text-emerald-400">95ms</td>
                  <td className="p-4 text-emerald-400">$0.59</td>
                </tr>

                {/* Legacy GPU Cloud */}
                <tr className="text-zinc-400">
                  <td className="p-4">Standard GPU Cloud (A100/H100)</td>
                  <td className="p-4">Llama 3.1 8B</td>
                  <td className="p-4">~75 T/s</td>
                  <td className="p-4 text-zinc-500">450ms</td>
                  <td className="p-4">$0.20</td>
                </tr>

                {/* Legacy Proprietary API */}
                <tr className="text-zinc-400">
                  <td className="p-4">Proprietary Closed Provider</td>
                  <td className="p-4">GPT-4o class</td>
                  <td className="p-4">~80 T/s</td>
                  <td className="p-4 text-zinc-500">800ms</td>
                  <td className="p-4 text-red-400">$2.50 – $5.00</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-[#242424]">
            <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-semibold text-sm text-white">Zero Cold Starts</h4>
              <p className="text-xs text-zinc-400 mt-1">Always-on LPU clusters ready to respond in microseconds without scaling stalls.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-[#242424]">
            <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-semibold text-sm text-white">Full OpenAI SDK Parity</h4>
              <p className="text-xs text-zinc-400 mt-1">Swap your existing base URL to Groq and drop latency by 10x immediately.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-[#242424]">
            <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-semibold text-sm text-white">Enterprise SLAs</h4>
              <p className="text-xs text-zinc-400 mt-1">99.99% availability backed by deterministic hardware performance guarantees.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
