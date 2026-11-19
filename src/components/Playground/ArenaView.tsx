import React, { useState } from 'react';
import { GROQ_MODELS } from '../../data/models';
import { ChatMessage, InferenceParams } from '../../types';
import { streamGroqCompletion } from '../../services/groqApi';
import { Speedometer } from '../UI/Speedometer';
import { TelemetryBar } from './TelemetryBar';
import { Zap, Play, RotateCcw, ChevronDown, CheckCircle2, Trophy } from 'lucide-react';

interface ArenaViewProps {
  params: InferenceParams;
}

export const ArenaView: React.FC<ArenaViewProps> = ({ params }) => {
  const [modelA, setModelA] = useState('llama-3.1-8b-instant');
  const [modelB, setModelB] = useState('llama-3.3-70b-versatile');
  const [prompt, setPrompt] = useState('Write a high-performance HTTP reverse proxy in Rust with connection pooling.');

  const [isRunning, setIsRunning] = useState(false);
  const [outputA, setOutputA] = useState('');
  const [outputB, setOutputB] = useState('');
  const [telemetryA, setTelemetryA] = useState<ChatMessage['telemetry']>();
  const [telemetryB, setTelemetryB] = useState<ChatMessage['telemetry']>();
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);

  const modelAObj = GROQ_MODELS.find(m => m.id === modelA) || GROQ_MODELS[1];
  const modelBObj = GROQ_MODELS.find(m => m.id === modelB) || GROQ_MODELS[0];

  const handleStartRace = async () => {
    if (!prompt.trim() || isRunning) return;

    setIsRunning(true);
    setOutputA('');
    setOutputB('');
    setTelemetryA(undefined);
    setTelemetryB(undefined);
    setWinner(null);

    const userMessage: ChatMessage = {
      id: 'arena-prompt',
      role: 'user',
      content: prompt,
      timestamp: Date.now()
    };

    let finishedA = false;
    let finishedB = false;

    // Run Model A
    const runA = streamGroqCompletion({
      messages: [userMessage],
      modelId: modelA,
      params,
      callbacks: {
        onChunk: (chunk) => setOutputA(prev => prev + chunk),
        onMetricsUpdate: (tel) => setTelemetryA(tel),
        onComplete: (msg) => {
          setOutputA(msg.content);
          setTelemetryA(msg.telemetry);
          finishedA = true;
          if (!finishedB) setWinner('A');
        },
        onError: (err) => console.error(err)
      }
    });

    // Run Model B
    const runB = streamGroqCompletion({
      messages: [userMessage],
      modelId: modelB,
      params,
      callbacks: {
        onChunk: (chunk) => setOutputB(prev => prev + chunk),
        onMetricsUpdate: (tel) => setTelemetryB(tel),
        onComplete: (msg) => {
          setOutputB(msg.content);
          setTelemetryB(msg.telemetry);
          finishedB = true;
          if (!finishedA) setWinner('B');
        },
        onError: (err) => console.error(err)
      }
    });

    await Promise.all([runA, runB]);
    setIsRunning(false);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#0A0A0A] overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#222222] bg-[#0E0E0E]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F55036] fill-[#F55036]" />
          <h2 className="font-display font-bold text-white text-base">Model Arena (Live LPU Race)</h2>
          <span className="text-xs text-zinc-400 font-mono hidden md:inline">
            Compare latency, tokens/sec, and deterministic throughput in real-time
          </span>
        </div>

        {winner && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-semibold animate-in fade-in">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {winner === 'A' ? modelAObj.name : modelBObj.name} reached first token & completed faster!
            </span>
          </div>
        )}
      </div>

      {/* Split Comparison Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222222] overflow-y-auto">
        
        {/* Column A */}
        <div className="flex flex-col p-4 bg-[#0E0E0E]/40 overflow-hidden">
          {/* Header A */}
          <div className="flex items-center justify-between pb-3 border-b border-[#202020] mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#F55036] text-white font-mono font-bold text-xs">
                Model A
              </span>
              <select
                value={modelA}
                onChange={(e) => setModelA(e.target.value)}
                disabled={isRunning}
                className="bg-[#181818] border border-[#2D2D2D] text-white text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none cursor-pointer"
              >
                {GROQ_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.tokensPerSecond} T/s)
                  </option>
                ))}
              </select>
            </div>

            <Speedometer tokensPerSec={telemetryA?.tokensPerSecond || modelAObj.tokensPerSecond} size="sm" />
          </div>

          {/* Stream Output A */}
          <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-[#121212] border border-[#222222] font-mono text-xs leading-relaxed text-zinc-200 whitespace-pre-wrap">
            {outputA || (
              <span className="text-zinc-600 italic">
                {isRunning ? 'Streaming from Groq LPU...' : 'Click "Start Race" below to evaluate output.'}
              </span>
            )}
          </div>

          {/* Telemetry A */}
          {telemetryA && <TelemetryBar telemetry={telemetryA} />}
        </div>

        {/* Column B */}
        <div className="flex flex-col p-4 bg-[#0E0E0E]/40 overflow-hidden">
          {/* Header B */}
          <div className="flex items-center justify-between pb-3 border-b border-[#202020] mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-600 text-white font-mono font-bold text-xs">
                Model B
              </span>
              <select
                value={modelB}
                onChange={(e) => setModelB(e.target.value)}
                disabled={isRunning}
                className="bg-[#181818] border border-[#2D2D2D] text-white text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none cursor-pointer"
              >
                {GROQ_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.tokensPerSecond} T/s)
                  </option>
                ))}
              </select>
            </div>

            <Speedometer tokensPerSec={telemetryB?.tokensPerSecond || modelBObj.tokensPerSecond} size="sm" />
          </div>

          {/* Stream Output B */}
          <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-[#121212] border border-[#222222] font-mono text-xs leading-relaxed text-zinc-200 whitespace-pre-wrap">
            {outputB || (
              <span className="text-zinc-600 italic">
                {isRunning ? 'Streaming from Groq LPU...' : 'Click "Start Race" below to evaluate output.'}
              </span>
            )}
          </div>

          {/* Telemetry B */}
          {telemetryB && <TelemetryBar telemetry={telemetryB} />}
        </div>

      </div>

      {/* Bottom Arena Controls Bar */}
      <div className="p-4 border-t border-[#222222] bg-[#111111]">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isRunning}
            placeholder="Enter test prompt to run simultaneously on both models..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#181818] border border-[#2E2E2E] text-sm text-white placeholder-zinc-500 focus:border-[#F55036] outline-none font-sans"
          />
          <button
            onClick={handleStartRace}
            disabled={isRunning || !prompt.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all shadow-md ${
              isRunning || !prompt.trim()
                ? 'bg-[#222222] text-zinc-500 cursor-not-allowed'
                : 'bg-[#F55036] hover:bg-[#E04027] text-white shadow-[#F55036]/20'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Racing...' : 'Start Race'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
