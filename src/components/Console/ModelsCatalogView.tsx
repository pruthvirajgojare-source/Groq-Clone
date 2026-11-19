import React from 'react';
import { GROQ_MODELS } from '../../data/models';
import { Sparkles, ArrowRight, Zap, Check, Cpu, Clock, DollarSign } from 'lucide-react';

export const ModelsCatalogView: React.FC<{ onTestInPlayground: (modelId: string) => void }> = ({
  onTestInPlayground
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6 max-w-6xl mx-auto w-full">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#222222] mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h1 className="font-display font-bold text-2xl text-white">Models Catalog</h1>
        </div>
        <p className="text-xs text-zinc-400">
          State-of-the-art open weights models hosted natively on Groq Language Processing Units.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GROQ_MODELS.map((model) => (
          <div
            key={model.id}
            className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C1C1C] text-zinc-400 border border-[#2B2B2B]">
                      {model.developer}
                    </span>
                    {model.badge && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F55036]/20 text-[#F55036] font-semibold border border-[#F55036]/30">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {model.name}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-[#F55036]">
                    {model.tokensPerSecond}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">tokens/sec</div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                {model.description}
              </p>

              {/* Capabilities pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {model.capabilities.toolCalling && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1B1B1B] text-zinc-300 border border-[#2B2B2B]">
                    Tool Calling
                  </span>
                )}
                {model.capabilities.jsonMode && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1B1B1B] text-zinc-300 border border-[#2B2B2B]">
                    JSON Mode
                  </span>
                )}
                {model.capabilities.reasoning && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-800/40">
                    Deep Reasoning
                  </span>
                )}
                {model.capabilities.audio && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40">
                    Audio Transcription
                  </span>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0E0E0E] border border-[#202020] text-xs font-mono mb-6">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Context Window</span>
                  <span className="text-white font-semibold">{(model.contextWindow / 1024).toFixed(0)}k</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Latency (TTFT)</span>
                  <span className="text-amber-400 font-semibold">{model.timeToFirstTokenMs}ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Input / 1M</span>
                  <span className="text-emerald-400 font-semibold">${model.pricingPromptPerM.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onTestInPlayground(model.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#F55036] text-white font-display font-semibold text-xs transition-colors border border-[#2D2D2D] hover:border-[#F55036]"
            >
              <span>Test in Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
