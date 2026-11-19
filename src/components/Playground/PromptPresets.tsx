import React from 'react';
import { PROMPT_PRESETS } from '../../data/samplePrompts';
import { Zap, Code, Brain, Cpu, FileJson } from 'lucide-react';

interface PromptPresetsProps {
  onSelectPrompt: (prompt: string, modelId: string) => void;
}

export const PromptPresets: React.FC<PromptPresetsProps> = ({ onSelectPrompt }) => {
  const getIcon = (tag: string) => {
    switch (tag) {
      case 'Coding': return <Code className="w-3.5 h-3.5 text-blue-400" />;
      case 'Reasoning': return <Brain className="w-3.5 h-3.5 text-purple-400" />;
      case 'JSON Mode': return <FileJson className="w-3.5 h-3.5 text-amber-400" />;
      case 'Architecture': return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Zap className="w-3.5 h-3.5 text-[#F55036]" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono text-[#F55036] mb-3">
          <Zap className="w-3.5 h-3.5 fill-[#F55036]" />
          <span>Deterministic LPU™ Inference at Scale</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight mb-2">
          Experience Ultra-Fast Groq Inference
        </h2>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Select an engineered prompt below to witness sub-second time-to-first-token and 1,200+ tokens/second throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROMPT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPrompt(preset.prompt, preset.model)}
            className="group flex flex-col items-start p-3.5 rounded-xl border border-[#242424] bg-[#141414] hover:bg-[#1A1A1A] hover:border-[#383838] transition-all text-left shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                {getIcon(preset.tag)}
                <span>{preset.tag}</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#202020] text-zinc-400 border border-[#2E2E2E]">
                {preset.model.split('-')[0] + ' ' + preset.model.split('-')[1]}
              </span>
            </div>
            <div className="font-medium text-sm text-white group-hover:text-[#F55036] transition-colors mb-1 line-clamp-1">
              {preset.title}
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {preset.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
