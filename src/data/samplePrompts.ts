export interface PromptPreset {
  id: string;
  title: string;
  tag: string;
  prompt: string;
  model: string;
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: '1',
    title: 'High-Speed Code Generation',
    tag: 'Coding',
    prompt: 'Write a high-performance concurrent rate limiter in TypeScript using a token bucket algorithm with full unit test examples.',
    model: 'llama-3.1-8b-instant'
  },
  {
    id: '2',
    title: 'Mathematical Reasoning & Proof',
    tag: 'Reasoning',
    prompt: 'Prove whether the set of irrational numbers is closed under addition, and explain the topological implications on the real line.',
    model: 'deepseek-r1-distill-llama-70b'
  },
  {
    id: '3',
    title: 'API Schema & Structured JSON',
    tag: 'JSON Mode',
    prompt: 'Generate an OpenAPI 3.1 JSON specification for an autonomous drone delivery fleet management service with webhooks.',
    model: 'llama-3.3-70b-versatile'
  },
  {
    id: '4',
    title: 'LPU vs GPU Architecture Breakdown',
    tag: 'Architecture',
    prompt: 'Explain the fundamental microarchitecture differences between Groq\'s Tensor Streaming Processor (TSP) LPU and traditional GPU HBM memory bandwidth architectures.',
    model: 'llama-3.3-70b-versatile'
  },
  {
    id: '5',
    title: 'Microservices Refactor Plan',
    tag: 'Engineering',
    prompt: 'Provide a phased blueprint for decomposing a monolithic PostgreSQL-backed e-commerce checkout flow into event-driven Kafka microservices.',
    model: 'mixtral-8x7b-32768'
  }
];

export const SYSTEM_PROMPT_PRESETS = [
  {
    name: 'Helpful Assistant',
    content: 'You are a helpful, direct, and concise AI assistant running on Groq\'s ultra-low latency LPU infrastructure. Provide rapid, accurate, and insightful answers.'
  },
  {
    name: 'Senior Software Architect',
    content: 'You are a Senior Principal Software Architect. Write production-grade, memory-efficient, clean code with TypeScript types, error handling, and complexity analysis (Big-O).'
  },
  {
    name: 'Strict JSON Engine',
    content: 'You are an automated backend extractor. Output ONLY valid, parseable JSON conforming strictly to user requests without markdown ticks or extraneous commentary.'
  },
  {
    name: 'Concise Bullet Points',
    content: 'You are an executive summary assistant. Respond in tight, dense bullet points prioritizing key data points, trade-offs, and metrics.'
  }
];
