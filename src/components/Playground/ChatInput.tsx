import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Square,
  Globe,
  Brain,
  Mic,
  ChevronDown,
  Sparkles,
  Paperclip,
  Check
} from 'lucide-react';
import { GROQ_MODELS } from '../../data/models';
import { GroqModel } from '../../types';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStopGeneration?: () => void;
  isStreaming: boolean;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
  reasoningEnabled: boolean;
  onToggleReasoning: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStopGeneration,
  isStreaming,
  selectedModelId,
  onSelectModel,
  webSearchEnabled,
  onToggleWebSearch,
  reasoningEnabled,
  onToggleReasoning
}) => {
  const [input, setInput] = useState('');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isAudioTranscribing, setIsAudioTranscribing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModel = GROQ_MODELS.find(m => m.id === selectedModelId) || GROQ_MODELS[0];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleAudioSimulate = () => {
    setIsAudioTranscribing(true);
    setTimeout(() => {
      setInput('Transcribe and summarize this audio note: "Meeting with infra team regarding deploying 1,000 Groq LPU nodes across us-east region for sub-50ms latency."');
      setIsAudioTranscribing(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      <div className="relative rounded-2xl border border-[#2E2E2E] bg-[#141414] focus-within:border-[#F55036]/80 focus-within:ring-1 focus-within:ring-[#F55036]/50 shadow-lg transition-all">
        
        {/* Top bar inside input: Model Selector & Modality Toggles */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1 border-b border-[#222222]/80 text-xs">
          
          {/* Model Selector Dropdown Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#1C1C1C] hover:bg-[#252525] border border-[#2F2F2F] text-zinc-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#F55036]"></span>
              <span className="font-medium">{currentModel.name}</span>
              <span className="font-mono text-[10px] text-zinc-400">
                {currentModel.tokensPerSecond} T/s
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {/* Dropdown Menu */}
            {isModelDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-80 rounded-xl bg-[#171717] border border-[#2D2D2D] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Select Groq LPU™ Model
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {GROQ_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onSelectModel(model.id);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full flex items-start justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedModelId === model.id
                          ? 'bg-[#252525] text-white border border-[#3A3A3A]'
                          : 'hover:bg-[#202020] text-zinc-300'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                          <span>{model.name}</span>
                          {model.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F55036]/20 text-[#F55036] border border-[#F55036]/30">
                              {model.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                          {model.recommendedFor}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-xs font-semibold text-[#F55036]">
                          {model.tokensPerSecond} T/s
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {model.timeToFirstTokenMs}ms TTFT
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Toggles: Web Search, Deep Reasoning, Whisper */}
          <div className="flex items-center gap-1">
            
            {/* Web Search Toggle */}
            <button
              onClick={onToggleWebSearch}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                webSearchEnabled
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                  : 'text-zinc-400 hover:text-white hover:bg-[#1E1E1E]'
              }`}
              title="Search the web with live grounding"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Search</span>
            </button>

            {/* Deep Reasoning Toggle */}
            <button
              onClick={onToggleReasoning}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                reasoningEnabled
                  ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
                  : 'text-zinc-400 hover:text-white hover:bg-[#1E1E1E]'
              }`}
              title="Toggle DeepSeek R1 Step-by-Step Reasoning"
            >
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Reasoning</span>
            </button>

            {/* Audio / Whisper Demo */}
            <button
              onClick={handleAudioSimulate}
              disabled={isAudioTranscribing}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-zinc-400 hover:text-white hover:bg-[#1E1E1E] transition-colors"
              title="Transcribe speech with Whisper Large v3"
            >
              <Mic className={`w-3.5 h-3.5 ${isAudioTranscribing ? 'text-[#F55036] animate-pulse' : ''}`} />
              <span className="hidden sm:inline text-[11px]">
                {isAudioTranscribing ? 'Transcribing...' : 'Audio'}
              </span>
            </button>

          </div>
        </div>

        {/* Text Area */}
        <div className="px-4 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${currentModel.name} anything... (Enter to send, Shift+Enter for newline)`}
            rows={1}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none leading-relaxed"
          />
        </div>

        {/* Bottom bar inside input: Footer info & Send / Stop Button */}
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1 text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>LLM responses generated in milliseconds</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono">
              ~{Math.round(input.length / 4)} tokens
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isStreaming ? (
              <button
                onClick={onStopGeneration}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                title="Stop streaming"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs">Stop</span>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-2 rounded-lg font-medium transition-all ${
                  input.trim()
                    ? 'bg-[#F55036] hover:bg-[#E04027] text-white shadow-md shadow-[#F55036]/20'
                    : 'bg-[#222222] text-zinc-600 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
