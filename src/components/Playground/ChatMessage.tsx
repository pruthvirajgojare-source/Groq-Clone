import React, { useState } from 'react';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Brain,
  Globe,
  RotateCw,
  Sparkles,
  User,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';
import { TelemetryBar } from './TelemetryBar';
import { CodeBlock } from '../UI/CodeBlock';

interface ChatMessageProps {
  message: ChatMessageType;
  onRegenerate?: () => void;
  isStreaming?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onRegenerate,
  isStreaming = false
}) => {
  const [copied, setCopied] = useState(false);
  const [isReasoningOpen, setIsReasoningOpen] = useState(true);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to parse content into markdown segments: code blocks vs text
  const renderFormattedContent = (text: string) => {
    const parts = [];
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trimEnd()
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <CodeBlock
            key={index}
            language={part.language}
            code={part.content}
          />
        );
      }

      // Format text paragraphs, headers, bold, bullet points
      const lines = part.content.split('\n');
      return (
        <div key={index} className="space-y-2 my-1 text-[14.5px] leading-relaxed text-zinc-200">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={lIdx} className="h-2"></div>;

            // Headers
            if (trimmed.startsWith('#### ')) {
              return <h5 key={lIdx} className="font-display font-semibold text-zinc-100 text-sm mt-3 mb-1">{trimmed.slice(5)}</h5>;
            }
            if (trimmed.startsWith('### ')) {
              return <h4 key={lIdx} className="font-display font-semibold text-white text-base mt-4 mb-1.5">{trimmed.slice(4)}</h4>;
            }
            if (trimmed.startsWith('## ')) {
              return <h3 key={lIdx} className="font-display font-bold text-white text-lg mt-5 mb-2">{trimmed.slice(3)}</h3>;
            }

            // Bullet items
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F55036] mt-2 flex-shrink-0"></span>
                  <span>{formatInlineMarkdown(trimmed.slice(2))}</span>
                </div>
              );
            }

            // Numbered items
            const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
            if (numberedMatch) {
              return (
                <div key={lIdx} className="flex items-start gap-2.5 ml-2">
                  <span className="font-mono text-xs font-semibold text-[#F55036] mt-1 flex-shrink-0">{numberedMatch[1]}.</span>
                  <span>{formatInlineMarkdown(numberedMatch[2])}</span>
                </div>
              );
            }

            // Blockquote
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={lIdx} className="border-l-2 border-[#F55036] pl-3 py-1 my-2 text-zinc-400 italic bg-[#161616] rounded-r">
                  {formatInlineMarkdown(trimmed.slice(2))}
                </blockquote>
              );
            }

            // Table check
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
              // Minimal table row rendering
              const cells = trimmed.split('|').slice(1, -1);
              if (cells.some(c => c.trim().startsWith('---') || c.trim().startsWith(':---'))) {
                return null; // table separator
              }
              return (
                <div key={lIdx} className="grid grid-cols-3 gap-2 py-1 px-2 border-b border-[#282828] text-xs font-mono bg-[#161616] rounded">
                  {cells.map((cell, cIdx) => (
                    <span key={cIdx} className={cIdx === 0 ? "font-semibold text-zinc-300" : "text-zinc-400"}>
                      {cell.trim()}
                    </span>
                  ))}
                </div>
              );
            }

            return <p key={lIdx}>{formatInlineMarkdown(line)}</p>;
          })}
        </div>
      );
    });
  };

  // Helper for inline bold, code backticks
  const formatInlineMarkdown = (text: string) => {
    const parts = [];
    const inlineRegex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = inlineRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 rounded bg-[#202020] text-[#F55036] text-[13px] font-mono border border-[#333333]">
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-semibold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }
      lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div
      className={`group w-full py-5 px-4 md:px-6 transition-colors border-b border-[#1E1E1E] ${
        isUser ? 'bg-[#0E0E0E]' : 'bg-[#121212]/70'
      }`}
    >
      <div className="max-w-4xl mx-auto flex gap-4">
        
        {/* Avatar */}
        <div className="flex-shrink-0 pt-0.5">
          {isUser ? (
            <div className="w-7 h-7 rounded-md bg-[#252525] border border-[#333333] flex items-center justify-center text-zinc-300">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-md bg-[#F55036] flex items-center justify-center text-white shadow-sm shadow-[#F55036]/20 font-bold text-xs">
              ⚡
            </div>
          )}
        </div>

        {/* Message Body */}
        <div className="flex-1 min-w-0">
          
          {/* Header Role info & Actions */}
          <div className="flex items-center justify-between mb-1.5 select-none">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm text-white">
                {isUser ? 'You' : 'Groq LPU'}
              </span>
              {!isUser && message.telemetry?.model && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] text-zinc-400">
                  {message.telemetry.model}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#202020] transition-colors"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {!isUser && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#202020] transition-colors"
                  title="Regenerate"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Web Search Sources Pill (if available) */}
          {message.webSearchSources && message.webSearchSources.length > 0 && (
            <div className="my-2 p-2.5 rounded-lg border border-[#242424] bg-[#161616] text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400 font-medium mb-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Web Sources Referenced</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {message.webSearchSources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-[#202020] hover:bg-[#262626] text-zinc-300 hover:text-white border border-[#2D2D2D] text-[11px] transition-colors"
                  >
                    <span>{src.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* DeepSeek R1 Reasoning / Thinking Process Block */}
          {message.reasoningContent && (
            <div className="my-3 rounded-lg border border-[#2A2A2A] bg-[#141414] overflow-hidden">
              <button
                onClick={() => setIsReasoningOpen(!isReasoningOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-mono text-zinc-300 bg-[#181818] hover:bg-[#1E1E1E] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold text-zinc-200">
                    Thinking Process (DeepSeek R1)
                  </span>
                  {isStreaming && (
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                  )}
                </div>
                {isReasoningOpen ? <ChevronDown className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {isReasoningOpen && (
                <div className="p-3.5 text-xs font-mono text-zinc-400 leading-relaxed bg-[#111111] border-t border-[#222222] whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {message.reasoningContent}
                </div>
              )}
            </div>
          )}

          {/* Main Message Content */}
          <div className="prose prose-invert max-w-none">
            {renderFormattedContent(message.content)}
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-[#F55036] animate-pulse"></span>
            )}
          </div>

          {/* Real-Time Speed & Telemetry */}
          {message.telemetry && (
            <TelemetryBar telemetry={message.telemetry} />
          )}

        </div>
      </div>
    </div>
  );
};
