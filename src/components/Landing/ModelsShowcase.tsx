import React from 'react';
import { GROQ_MODELS } from '../../data/models';
import { Sparkles, ArrowRight, Zap, Check } from 'lucide-react';

interface ModelsShowcaseProps {
  onSelectModel: (modelId: string) => void;
}

export const ModelsShowcase: React.FC<ModelsShowcaseProps> = ({ onSelectModel }) => {
  return (
    <section className="py-20 border-b border-[#222222] bg-[#0E0E0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-xs font-mono text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Weights Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Leading Open Foundation Models
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Hosted on Groq LPUs with OpenAI-compatible API endpoints. Switch model in one line of code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GROQ_MODELS.map((model) => (
            <div
              key={model.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C1C1C] text-zinc-400 border border-[#2B2B2B]">
                    {model.developer}
                  </span>
                  {model.badge && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F55036]/20 text-[#F55036] font-semibold border border-[#F55036]/30">
                      {model.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#F55036] transition-colors">
                  {model.name}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {model.description}
                </p>

                {/* Specs list */}
                <div className="space-y-2 py-3 border-y border-[#202020] text-xs font-mono mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Speed:</span>
                    <span className="text-[#F55036] font-bold">{model.tokensPerSecond} T/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Latency (TTFT):</span>
                    <span className="text-zinc-300">{model.timeToFirstTokenMs}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Context Window:</span>
                    <span className="text-zinc-300">{(model.contextWindow / 1024).toFixed(0)}k tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Input Price:</span>
                    <span className="text-emerald-400 font-semibold">${model.pricingPromptPerM.toFixed(2)} / 1M</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectModel(model.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#F55036] text-zinc-200 hover:text-white font-display font-semibold text-xs transition-colors border border-[#2D2D2D] hover:border-[#F55036]"
              >
                <span>Launch in Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
