import { ApiKeyItem, ChatMessage, InferenceParams, UsageMetric } from '../types';

const STORAGE_KEYS = {
  USER_GROQ_API_KEY: 'groq_clone_user_api_key',
  SAVED_API_KEYS: 'groq_clone_saved_keys',
  ACTIVE_PARAMS: 'groq_clone_active_params',
  CHAT_MESSAGES: 'groq_clone_chat_messages',
  USAGE_METRICS: 'groq_clone_usage_metrics',
  ACTIVE_MODEL: 'groq_clone_active_model',
};

export const defaultParams: InferenceParams = {
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.95,
  stream: true,
  stopSequences: [],
  jsonMode: false,
  systemPrompt: 'You are a helpful assistant powered by Groq\'s high-speed inference engine.',
  webSearchEnabled: false,
  reasoningEnabled: true,
  speedMultiplier: 1.0,
};

export const defaultInitialKeys: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'Production Server Key',
    keyPreview: 'gsk_9a...7f4a',
    createdAt: '2025-01-15',
    lastUsed: 'Just now',
    status: 'active'
  },
  {
    id: 'key-2',
    name: 'Dev Staging Environment',
    keyPreview: 'gsk_3b...12ce',
    createdAt: '2025-02-01',
    lastUsed: '2 hours ago',
    status: 'active'
  }
];

export const defaultInitialUsage: UsageMetric[] = [
  { date: 'Nov 13', promptTokens: 420000, completionTokens: 1100000, requests: 3820, avgLatencyMs: 98 },
  { date: 'Nov 14', promptTokens: 680000, completionTokens: 1840000, requests: 5910, avgLatencyMs: 92 },
  { date: 'Nov 15', promptTokens: 890000, completionTokens: 2450000, requests: 7420, avgLatencyMs: 88 },
  { date: 'Nov 16', promptTokens: 1120000, completionTokens: 3100000, requests: 9200, avgLatencyMs: 91 },
  { date: 'Nov 17', promptTokens: 980000, completionTokens: 2750000, requests: 8100, avgLatencyMs: 89 },
  { date: 'Nov 18', promptTokens: 1450000, completionTokens: 4200000, requests: 12400, avgLatencyMs: 84 },
  { date: 'Nov 19', promptTokens: 1620000, completionTokens: 4900000, requests: 14850, avgLatencyMs: 82 },
];

export const getStoredApiKey = (): string => {
  return localStorage.getItem(STORAGE_KEYS.USER_GROQ_API_KEY) || '';
};

export const setStoredApiKey = (key: string) => {
  if (key) {
    localStorage.setItem(STORAGE_KEYS.USER_GROQ_API_KEY, key);
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER_GROQ_API_KEY);
  }
};

export const getSavedKeys = (): ApiKeyItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_API_KEYS);
    return raw ? JSON.parse(raw) : defaultInitialKeys;
  } catch {
    return defaultInitialKeys;
  }
};

export const saveKeysList = (keys: ApiKeyItem[]) => {
  localStorage.setItem(STORAGE_KEYS.SAVED_API_KEYS, JSON.stringify(keys));
};

export const getStoredParams = (): InferenceParams => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PARAMS);
    return raw ? { ...defaultParams, ...JSON.parse(raw) } : defaultParams;
  } catch {
    return defaultParams;
  }
};

export const saveStoredParams = (params: InferenceParams) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_PARAMS, JSON.stringify(params));
};

export const getStoredUsage = (): UsageMetric[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USAGE_METRICS);
    return raw ? JSON.parse(raw) : defaultInitialUsage;
  } catch {
    return defaultInitialUsage;
  }
};

export const saveStoredUsage = (metrics: UsageMetric[]) => {
  localStorage.setItem(STORAGE_KEYS.USAGE_METRICS, JSON.stringify(metrics));
};
