import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, InferenceParams } from '../../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { PromptPresets } from './PromptPresets';
import { Trash2, Zap, Layers, Sparkles } from 'lucide-react';

interface ChatViewProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
  streamingMessage: ChatMessageType | null;
  onSendMessage: (content: string) => void;
  onStopGeneration: () => void;
  onClearChat: () => void;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  params: InferenceParams;
  onChangeParams: (params: InferenceParams) => void;
  onOpenArena?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isStreaming,
  streamingMessage,
  onSendMessage,
  onStopGeneration,
  onClearChat,
  selectedModelId,
  onSelectModel,
  params,
  onChangeParams,
  onOpenArena
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSelectPreset = (prompt: string, modelId: string) => {
    onSelectModel(modelId);
    onSendMessage(prompt);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#0A0A0A] overflow-hidden">
      
      {/* Top Banner / Session Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E1E] bg-[#0E0E0E] text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-400">Mode:</span>
          <span className="font-semibold text-white">Interactive Playground</span>
          <span className="text-zinc-600">•</span>
          <span className="font-mono text-[#F55036]">SRAM Crossbar: 80 TB/s</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenArena && (
            <button
              onClick={onOpenArena}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#252525] border border-[#2D2D2D] text-zinc-300 hover:text-white transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Side-by-Side Arena</span>
            </button>
          )}

          {messages.length > 0 && (
            <button
              onClick={onClearChat}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-zinc-400 hover:text-red-400 hover:bg-[#1E1E1E] transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && !streamingMessage ? (
          <PromptPresets onSelectPrompt={handleSelectPreset} />
        ) : (
          <div className="pb-8">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRegenerate={() => {
                  if (message.role === 'assistant') {
                    const idx = messages.findIndex(m => m.id === message.id);
                    if (idx > 0 && messages[idx - 1].role === 'user') {
                      onSendMessage(messages[idx - 1].content);
                    }
                  }
                }}
              />
            ))}

            {/* Currently Streaming Message */}
            {streamingMessage && (
              <ChatMessage
                key="streaming"
                message={streamingMessage}
                isStreaming={true}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Chat Input Form */}
      <ChatInput
        onSendMessage={onSendMessage}
        onStopGeneration={onStopGeneration}
        isStreaming={isStreaming}
        selectedModelId={selectedModelId}
        onSelectModel={onSelectModel}
        webSearchEnabled={params.webSearchEnabled}
        onToggleWebSearch={() => onChangeParams({ ...params, webSearchEnabled: !params.webSearchEnabled })}
        reasoningEnabled={params.reasoningEnabled}
        onToggleReasoning={() => onChangeParams({ ...params, reasoningEnabled: !params.reasoningEnabled })}
      />
    </div>
  );
};
