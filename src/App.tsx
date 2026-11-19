import React, { useState, useRef } from 'react';
import { ActiveTab, ChatMessage, InferenceParams } from './types';
import { DEFAULT_MODEL_ID } from './data/models';
import { getStoredApiKey, getStoredParams, saveStoredParams } from './services/storage';
import { streamGroqCompletion } from './services/groqApi';

// Components
import { Navbar } from './components/Navbar';
import { ChatView } from './components/Playground/ChatView';
import { ArenaView } from './components/Playground/ArenaView';
import { SettingsDrawer } from './components/Playground/SettingsDrawer';
import { CodeDrawer } from './components/Playground/CodeDrawer';
import { ApiKeysView } from './components/Console/ApiKeysView';
import { UsageView } from './components/Console/UsageView';
import { ModelsCatalogView } from './components/Console/ModelsCatalogView';
import { DocsView } from './components/Console/DocsView';

// Landing Page Components
import { HeroSection } from './components/Landing/HeroSection';
import { SpeedBenchmarks } from './components/Landing/SpeedBenchmarks';
import { ArchitectureSection } from './components/Landing/ArchitectureSection';
import { ModelsShowcase } from './components/Landing/ModelsShowcase';
import { PricingComparison } from './components/Landing/PricingComparison';
import { Footer } from './components/Landing/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('playground');
  const [selectedModelId, setSelectedModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [params, setParams] = useState<InferenceParams>(getStoredParams());
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(!!getStoredApiKey());

  // Conversation State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(null);

  // UI Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isCodeDrawerOpen, setIsCodeDrawerOpen] = useState<boolean>(false);

  // Stream Abort Controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleUpdateParams = (newParams: InferenceParams) => {
    setParams(newParams);
    saveStoredParams(newParams);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    const tempAssistantMessage: ChatMessage = {
      id: `assistant-stream-${Date.now()}`,
      role: 'assistant',
      content: '',
      reasoningContent: '',
      timestamp: Date.now(),
      telemetry: {
        tokensPerSecond: 0,
        timeToFirstTokenSec: 0,
        totalTokens: 0,
        completionTokens: 0,
        promptTokens: 0,
        totalTimeSec: 0,
        model: selectedModelId,
        speedVsGpu: 1,
      }
    };
    setStreamingMessage(tempAssistantMessage);

    abortControllerRef.current = new AbortController();

    try {
      await streamGroqCompletion({
        messages: newMessages,
        modelId: selectedModelId,
        params,
        abortSignal: abortControllerRef.current.signal,
        callbacks: {
          onChunk: (chunk) => {
            setStreamingMessage((prev) => {
              if (!prev) return null;
              return { ...prev, content: prev.content + chunk };
            });
          },
          onReasoningChunk: (chunk) => {
            setStreamingMessage((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                reasoningContent: (prev.reasoningContent || '') + chunk,
              };
            });
          },
          onMetricsUpdate: (telemetry) => {
            setStreamingMessage((prev) => {
              if (!prev) return null;
              return { ...prev, telemetry };
            });
          },
          onComplete: (finalMessage) => {
            setMessages((prev) => [...prev, finalMessage]);
            setStreamingMessage(null);
            setIsStreaming(false);
          },
          onError: (err) => {
            console.error('Groq Stream Error:', err);
            setIsStreaming(false);
            setStreamingMessage(null);
          }
        }
      });
    } catch (e) {
      console.error(e);
      setIsStreaming(false);
      setStreamingMessage(null);
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (streamingMessage) {
      setMessages((prev) => [...prev, streamingMessage]);
      setStreamingMessage(null);
    }
    setIsStreaming(false);
  };

  const handleClearChat = () => {
    if (isStreaming) handleStopGeneration();
    setMessages([]);
    setStreamingMessage(null);
  };

  const handleSelectModelFromLanding = (modelId: string) => {
    setSelectedModelId(modelId);
    setActiveTab('playground');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EEEEEE] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenKeyModal={() => setActiveTab('api-keys')}
        onOpenCodeDrawer={() => setIsCodeDrawerOpen(true)}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        hasCustomKey={hasCustomKey}
        isSettingsOpen={isSettingsOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* View: Playground */}
        {(activeTab === 'playground' || activeTab === 'chat') && (
          <div className="flex-1 flex overflow-hidden">
            <ChatView
              messages={messages}
              isStreaming={isStreaming}
              streamingMessage={streamingMessage}
              onSendMessage={handleSendMessage}
              onStopGeneration={handleStopGeneration}
              onClearChat={handleClearChat}
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
              params={params}
              onChangeParams={handleUpdateParams}
              onOpenArena={() => setActiveTab('compare')}
            />

            {/* Right Settings Drawer */}
            <SettingsDrawer
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              params={params}
              onChangeParams={handleUpdateParams}
            />
          </div>
        )}

        {/* View: Model Arena / Comparison */}
        {activeTab === 'compare' && (
          <ArenaView params={params} />
        )}

        {/* View: Models Catalog */}
        {activeTab === 'models' && (
          <ModelsCatalogView
            onTestInPlayground={(modelId) => {
              setSelectedModelId(modelId);
              setActiveTab('playground');
            }}
          />
        )}

        {/* View: API Keys */}
        {activeTab === 'api-keys' && (
          <ApiKeysView
            onKeyUpdated={() => setHasCustomKey(!!getStoredApiKey())}
          />
        )}

        {/* View: Usage & Analytics */}
        {activeTab === 'usage' && (
          <UsageView />
        )}

        {/* View: Documentation */}
        {activeTab === 'docs' && (
          <DocsView />
        )}

        {/* View: Groq Landing Page */}
        {activeTab === 'landing' && (
          <div className="flex-1 overflow-y-auto">
            <HeroSection
              onStartBuilding={() => setActiveTab('playground')}
              onOpenDocs={() => setActiveTab('docs')}
            />
            <SpeedBenchmarks
              onSelectModelForPlayground={handleSelectModelFromLanding}
            />
            <ArchitectureSection />
            <ModelsShowcase
              onSelectModel={handleSelectModelFromLanding}
            />
            <PricingComparison />
            <Footer onNavigate={setActiveTab} />
          </div>
        )}

      </main>

      {/* View Code Slide-Out Modal */}
      <CodeDrawer
        isOpen={isCodeDrawerOpen}
        onClose={() => setIsCodeDrawerOpen(false)}
        messages={messages}
        modelId={selectedModelId}
        params={params}
      />

    </div>
  );
};

export default App;
