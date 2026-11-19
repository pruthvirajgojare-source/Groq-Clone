import React from 'react';
import { Github, Twitter, Disc as Discord, Zap } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: any) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#222222] bg-[#0A0A0A] py-12 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div>
            <div className="flex items-center gap-1.5 font-display text-xl font-bold tracking-tighter text-white mb-3">
              <span>groq</span>
              <span className="w-2 h-2 rounded-full bg-[#F55036]"></span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
              Fast AI inference powered by the Language Processing Unit (LPU™).
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Platform</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('playground')} className="hover:text-white transition-colors">Playground</button></li>
              <li><button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">Model Arena</button></li>
              <li><button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">Model Directory</button></li>
              <li><button onClick={() => onNavigate('api-keys')} className="hover:text-white transition-colors">API Keys</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Developers</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('docs')} className="hover:text-white transition-colors">Documentation</button></li>
              <li><button onClick={() => onNavigate('usage')} className="hover:text-white transition-colors">Usage & Analytics</button></li>
              <li><a href="https://console.groq.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GroqCloud Console</a></li>
              <li><a href="https://groq.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Official groq.com</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Hardware</h5>
            <ul className="space-y-2">
              <li><span className="text-zinc-300">Tensor Streaming Processor</span></li>
              <li><span className="text-zinc-300">Deterministic Execution</span></li>
              <li><span className="text-zinc-300">80 TB/s SRAM Crossbar</span></li>
              <li><span className="text-[#22C55E]">● Status: 100% Operational</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Groq Clone. All rights reserved. Groq and LPU are trademarks of Groq, Inc.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Built for Sub-Millisecond Speed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
