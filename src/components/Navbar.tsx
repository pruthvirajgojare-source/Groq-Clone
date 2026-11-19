import React from 'react';
import {
  Zap,
  Key,
  Code2,
  SlidersHorizontal,
  ExternalLink,
  Layers,
  Sparkles,
  BarChart3,
  BookOpen,
  Home,
  Bot
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenKeyModal: () => void;
  onOpenCodeDrawer?: () => void;
  onToggleSettings?: () => void;
  hasCustomKey: boolean;
  isSettingsOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenKeyModal,
  onOpenCodeDrawer,
  onToggleSettings,
  hasCustomKey,
  isSettingsOpen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#242424] bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        
        {/* Left: Groq Brand Logo & Main Navigation */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => setActiveTab('playground')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            {/* Groq Iconic Logo Mark */}
            <div className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tighter text-white">
              <span className="tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                groq
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F55036] animate-pulse-fast"></span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1C] text-zinc-400 border border-[#2B2B2B]">
              LPU™ Cloud
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'playground' || activeTab === 'chat'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Bot className="w-4 h-4 text-[#F55036]" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'compare'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Arena / Compare</span>
            </button>

            <button
              onClick={() => setActiveTab('models')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'models'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Models</span>
            </button>

            <button
              onClick={() => setActiveTab('api-keys')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'api-keys'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Key className="w-4 h-4 text-emerald-400" />
              <span>API Keys</span>
            </button>

            <button
              onClick={() => setActiveTab('usage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'usage'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>Usage</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'docs'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Docs</span>
            </button>

            <button
              onClick={() => setActiveTab('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'landing'
                  ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2F2F2F]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Home className="w-4 h-4 text-zinc-400" />
              <span>Groq.com</span>
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-[#252525] text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>LPU Cluster: 100% (1,250 T/s)</span>
          </div>

          {/* Real API Key Button / Status */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              hasCustomKey
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-[#161616] border-[#2A2A2A] text-zinc-300 hover:text-white hover:bg-[#202020]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasCustomKey ? 'Groq Key: Connected' : 'API Key Setup'}
            </span>
            <span className="sm:hidden">Key</span>
          </button>

          {/* View Code Button (Active in Playground & Compare) */}
          {(activeTab === 'playground' || activeTab === 'compare') && onOpenCodeDrawer && (
            <button
              onClick={onOpenCodeDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#161616] border border-[#2A2A2A] text-zinc-300 hover:text-white hover:bg-[#202020] transition-colors"
              title="View API Code"
            >
              <Code2 className="w-3.5 h-3.5 text-[#F55036]" />
              <span className="hidden sm:inline">View Code</span>
            </button>
          )}

          {/* Settings Drawer Toggle (Active in Playground) */}
          {activeTab === 'playground' && onToggleSettings && (
            <button
              onClick={onToggleSettings}
              className={`p-1.5 rounded-md border text-xs font-medium transition-colors ${
                isSettingsOpen
                  ? 'bg-[#F55036]/15 border-[#F55036]/40 text-[#F55036]'
                  : 'bg-[#161616] border-[#2A2A2A] text-zinc-400 hover:text-white hover:bg-[#202020]'
              }`}
              title="Inference Parameters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Primary Action Button */}
          <a
            href="https://console.groq.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#F55036] hover:bg-[#E04027] text-white shadow-sm transition-all"
          >
            <span>GroqCloud</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </header>
  );
};
