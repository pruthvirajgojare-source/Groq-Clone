export interface GroqModel {
  id: string;
  name: string;
  developer: string;
  contextWindow: number;
  maxOutputTokens: number;
  tokensPerSecond: number;
  timeToFirstTokenMs: number;
  pricingPromptPerM: number;
  pricingCompletionPerM: number;
  description: string;
  badge?: string;
  capabilities: {
    toolCalling: boolean;
    jsonMode: boolean;
    reasoning?: boolean;
    vision?: boolean;
    audio?: boolean;
  };
  recommendedFor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoningContent?: string;
  timestamp: number;
  telemetry?: {
    tokensPerSecond: number;
    timeToFirstTokenSec: number;
    totalTokens: number;
    completionTokens: number;
    promptTokens: number;
    totalTimeSec: number;
    model: string;
    speedVsGpu: number;
  };
  webSearchSources?: {
    title: string;
    url: string;
    snippet: string;
  }[];
}

export interface InferenceParams {
  temperature: number;
  maxTokens: number;
  topP: number;
  stream: boolean;
  stopSequences: string[];
  jsonMode: boolean;
  systemPrompt: string;
  webSearchEnabled: boolean;
  reasoningEnabled: boolean;
  speedMultiplier: number; // 1 = Real speed, up to custom
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyPreview: string;
  fullKey?: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export interface UsageMetric {
  date: string;
  promptTokens: number;
  completionTokens: number;
  requests: number;
  avgLatencyMs: number;
}

export type ActiveTab = 'landing' | 'playground' | 'chat' | 'compare' | 'api-keys' | 'models' | 'usage' | 'docs';
