import React from 'react';
import { X, RotateCcw, Sliders, Info, FileCode2 } from 'lucide-react';
import { InferenceParams } from '../../types';
import { SYSTEM_PROMPT_PRESETS } from '../../data/samplePrompts';
import { defaultParams } from '../../services/storage';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  params: InferenceParams;
  onChangeParams: (newParams: InferenceParams) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  params,
  onChangeParams
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onChangeParams({ ...defaultParams });
  };

  return (
    <div className="w-80 border-l border-[#242424] bg-[#111111] flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto z-30 select-none">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#222222] bg-[#141414]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#F55036]" />
          <h3 className="font-display font-semibold text-sm text-white">Parameters</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#202020] transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#202020] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 text-xs">
        
        {/* System Prompt Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-semibold text-zinc-200">System Prompt</label>
            <span className="text-[10px] text-zinc-500 font-mono">
              {params.systemPrompt.length} chars
            </span>
          </div>

          <textarea
            value={params.systemPrompt}
            onChange={(e) => onChangeParams({ ...params, systemPrompt: e.target.value })}
            placeholder="You are a helpful assistant..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-[#161616] border border-[#282828] text-zinc-200 placeholder-zinc-500 focus:border-[#F55036] outline-none text-xs leading-relaxed resize-none font-mono"
          />

          {/* Quick presets */}
          <div className="mt-2">
            <span className="text-[10px] text-zinc-400 block mb-1">Preset Instructions:</span>
            <div className="flex flex-wrap gap-1">
              {SYSTEM_PROMPT_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => onChangeParams({ ...params, systemPrompt: preset.content })}
                  className="px-2 py-0.5 rounded bg-[#1C1C1C] hover:bg-[#252525] text-zinc-300 border border-[#2B2B2B] text-[10px] transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#222222]"></div>

        {/* Temperature */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-200">Temperature</span>
              <span title="Higher values make output more random, lower values more deterministic">
                <Info className="w-3 h-3 text-zinc-500" />
              </span>
            </div>
            <span className="font-mono text-zinc-400 font-semibold">{params.temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={params.temperature}
            onChange={(e) => onChangeParams({ ...params, temperature: parseFloat(e.target.value) })}
            className="w-full accent-[#F55036] bg-[#222222] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>Precise (0.0)</span>
            <span>Creative (2.0)</span>
          </div>
        </div>

        {/* Max Completion Tokens */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-200">Max Tokens</span>
              <span title="The maximum number of tokens to generate">
                <Info className="w-3 h-3 text-zinc-500" />
              </span>
            </div>
            <span className="font-mono text-zinc-400 font-semibold">{params.maxTokens}</span>
          </div>
          <input
            type="range"
            min="128"
            max="8192"
            step="128"
            value={params.maxTokens}
            onChange={(e) => onChangeParams({ ...params, maxTokens: parseInt(e.target.value) })}
            className="w-full accent-[#F55036] bg-[#222222] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>128</span>
            <span>8,192</span>
          </div>
        </div>

        {/* Top P (Nucleus Sampling) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-200">Top P</span>
              <span title="Nucleus sampling cutoff">
                <Info className="w-3 h-3 text-zinc-500" />
              </span>
            </div>
            <span className="font-mono text-zinc-400 font-semibold">{params.topP.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={params.topP}
            onChange={(e) => onChangeParams({ ...params, topP: parseFloat(e.target.value) })}
            className="w-full accent-[#F55036] bg-[#222222] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="border-t border-[#222222]"></div>

        {/* Structured JSON Mode Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#181818] border border-[#252525]">
          <div>
            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>JSON Mode</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Enforce valid JSON output schema
            </div>
          </div>
          <input
            type="checkbox"
            checked={params.jsonMode}
            onChange={(e) => onChangeParams({ ...params, jsonMode: e.target.checked })}
            className="w-4 h-4 accent-[#F55036] rounded cursor-pointer"
          />
        </div>

        {/* Streaming Output Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#181818] border border-[#252525]">
          <div>
            <div className="font-semibold text-zinc-200">Stream Output</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Stream tokens sequentially as generated
            </div>
          </div>
          <input
            type="checkbox"
            checked={params.stream}
            onChange={(e) => onChangeParams({ ...params, stream: e.target.checked })}
            className="w-4 h-4 accent-[#F55036] rounded cursor-pointer"
          />
        </div>

        {/* Speed Multiplier / Hardware Simulator */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-zinc-200">LPU Speed Dial</span>
            <span className="font-mono text-[#F55036] font-semibold">{params.speedMultiplier}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.2"
            value={params.speedMultiplier}
            onChange={(e) => onChangeParams({ ...params, speedMultiplier: parseFloat(e.target.value) })}
            className="w-full accent-[#F55036] bg-[#222222] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
            <span>Slow GPU (0.2x)</span>
            <span>Real LPU (1.0x)</span>
            <span>Overclock (2.0x)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
