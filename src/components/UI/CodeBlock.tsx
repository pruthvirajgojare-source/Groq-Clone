import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg border border-[#2E2E2E] bg-[#111111] overflow-hidden font-mono text-sm shadow-md">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#252525] bg-[#161616] text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#333333]"></span>
          <span className="font-semibold text-zinc-300">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#202020] hover:bg-[#2A2A2A] text-zinc-300 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[#22C55E] text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed text-[#EDEDED] font-mono">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
