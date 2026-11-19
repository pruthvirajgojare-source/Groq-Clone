import { GroqModel } from '../types';

export const GROQ_MODELS: GroqModel[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B Versatile',
    developer: 'Meta',
    contextWindow: 131072,
    maxOutputTokens: 8192,
    tokensPerSecond: 395,
    timeToFirstTokenMs: 95,
    pricingPromptPerM: 0.59,
    pricingCompletionPerM: 0.79,
    description: 'Meta\'s latest flagship model with industry-leading intelligence across reasoning, coding, and multilingual tasks.',
    badge: 'Popular',
    capabilities: {
      toolCalling: true,
      jsonMode: true,
      reasoning: true,
    },
    recommendedFor: 'Complex reasoning, multi-turn coding, and nuanced agent tasks'
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B Instant',
    developer: 'Meta',
    contextWindow: 131072,
    maxOutputTokens: 8192,
    tokensPerSecond: 1250,
    timeToFirstTokenMs: 45,
    pricingPromptPerM: 0.05,
    pricingCompletionPerM: 0.08,
    description: 'Blazing-fast inference at over 1,200 tokens per second. Ideal for high-throughput, low-latency applications.',
    badge: 'Lightning Fast',
    capabilities: {
      toolCalling: true,
      jsonMode: true,
    },
    recommendedFor: 'Sub-second real-time chat, summarization, and autocomplete'
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Distill Llama 70B',
    developer: 'DeepSeek / Meta',
    contextWindow: 131072,
    maxOutputTokens: 8192,
    tokensPerSecond: 340,
    timeToFirstTokenMs: 120,
    pricingPromptPerM: 0.75,
    pricingCompletionPerM: 0.99,
    description: 'Specialized reasoning engine distilled from DeepSeek R1 onto Llama-3.3-70B. Features deep step-by-step thinking traces.',
    badge: 'Reasoning',
    capabilities: {
      toolCalling: false,
      jsonMode: true,
      reasoning: true,
    },
    recommendedFor: 'STEM problems, advanced logic, math, and code architecture proofs'
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B (MoE)',
    developer: 'Mistral AI',
    contextWindow: 32768,
    maxOutputTokens: 4096,
    tokensPerSecond: 580,
    timeToFirstTokenMs: 70,
    pricingPromptPerM: 0.24,
    pricingCompletionPerM: 0.24,
    description: 'Sparse mixture-of-experts model matching top-tier models with exceptional throughput on Groq LPUs.',
    capabilities: {
      toolCalling: true,
      jsonMode: true,
    },
    recommendedFor: 'Balanced coding, multilingual translation, and reasoning'
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B Instruct',
    developer: 'Google',
    contextWindow: 8192,
    maxOutputTokens: 4096,
    tokensPerSecond: 840,
    timeToFirstTokenMs: 50,
    pricingPromptPerM: 0.20,
    pricingCompletionPerM: 0.20,
    description: 'Google’s high-efficiency lightweight model delivering outstanding accuracy in a compact footprint.',
    capabilities: {
      toolCalling: false,
      jsonMode: true,
    },
    recommendedFor: 'Fast question answering and concise summarization'
  },
  {
    id: 'whisper-large-v3',
    name: 'Whisper Large v3',
    developer: 'OpenAI / Groq',
    contextWindow: 448,
    maxOutputTokens: 448,
    tokensPerSecond: 1600,
    timeToFirstTokenMs: 80,
    pricingPromptPerM: 0.111,
    pricingCompletionPerM: 0.111,
    description: 'Ultra-fast speech-to-text audio transcription and translation powered by Groq LPU acceleration.',
    badge: 'Audio',
    capabilities: {
      toolCalling: false,
      jsonMode: true,
      audio: true,
    },
    recommendedFor: 'Real-time audio transcription and multilingual voice agents'
  }
];

export const DEFAULT_MODEL_ID = 'llama-3.3-70b-versatile';
