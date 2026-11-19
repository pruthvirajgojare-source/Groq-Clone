import { GROQ_MODELS } from '../data/models';
import { ChatMessage, InferenceParams } from '../types';
import { getStoredApiKey } from './storage';

export interface StreamCallback {
  onChunk: (chunk: string) => void;
  onReasoningChunk?: (chunk: string) => void;
  onMetricsUpdate?: (telemetry: ChatMessage['telemetry']) => void;
  onComplete: (fullMessage: ChatMessage) => void;
  onError: (error: string) => void;
}

// Generates intelligent, contextual simulation responses when real Groq API key isn't provided
function generateIntelligentSimulation(
  prompt: string,
  modelId: string,
  params: InferenceParams
): { content: string; reasoning?: string } {
  const lower = prompt.toLowerCase();
  const isReasoningModel = modelId.includes('deepseek-r1') || params.reasoningEnabled;

  let reasoning = '';
  let content = '';

  if (params.jsonMode) {
    content = JSON.stringify(
      {
        status: "success",
        timestamp: new Date().toISOString(),
        model_inference: {
          engine: "Groq LPU (Language Processing Unit)",
          model: modelId,
          deterministic_latency_ms: 12.4,
          throughput_tokens_per_sec: modelId.includes('8b') ? 1280 : 395
        },
        payload: {
          query_analyzed: prompt,
          entities_extracted: ["Groq", "LPU", "Tensor Streaming Processor", "Low Latency"],
          structured_results: [
            { id: "res_001", type: "inference_benchmark", value: "Sub-100ms TTFT" },
            { id: "res_002", type: "architecture_type", value: "Memory Bandwidth Independent" },
            { id: "res_003", type: "efficiency_score", value: 99.4 }
          ]
        }
      },
      null,
      2
    );
    return { content };
  }

  if (isReasoningModel) {
    reasoning = `1. Analyze the core requirements of the prompt: "${prompt}".
2. Identify architectural paradigms and trade-offs.
3. Formulate the deterministic low-latency path:
   - In traditional GPU clusters, memory bandwidth (HBM3) creates the "memory wall", restricting token generation to ~30-50 tokens/sec for large 70B parameters.
   - Groq's Tensor Streaming Processor (TSP) stores weights and activations directly in on-chip SRAM with 80 TB/s crossbar memory bandwidth, executing instructions statically scheduled at compile time.
4. Structure the response with clear headers, code samples where appropriate, and quantitative benchmark statistics.
5. Verify edge cases, syntax correctness, and finalize execution output.`;
  }

  if (lower.includes('rate limit') || lower.includes('token bucket') || lower.includes('code') || lower.includes('typescript')) {
    content = `Here is a production-grade, concurrency-safe **Token Bucket Rate Limiter** implemented in TypeScript with microsecond precision:

\`\`\`typescript
export interface RateLimiterOptions {
  capacity: number;       // Maximum burst capacity
  refillRate: number;     // Tokens added per second
}

export class TokenBucketRateLimiter {
  private capacity: number;
  private refillRate: number;
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(options: RateLimiterOptions) {
    this.capacity = options.capacity;
    this.refillRate = options.refillRate;
    this.tokens = options.capacity;
    this.lastRefillTimestamp = performance.now();
  }

  /**
   * Attempts to consume tokens from the bucket.
   * Returns true if allowed, false if rate limit exceeded.
   */
  public tryConsume(tokensRequested: number = 1): boolean {
    this.refill();

    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = performance.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    
    if (elapsedSeconds <= 0) return;

    const newTokens = elapsedSeconds * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + newTokens);
    this.lastRefillTimestamp = now;
  }

  public getAvailableTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }
}
\`\`\`

### Complexity & Performance Analysis
* **Time Complexity:** \`O(1)\` constant time per request evaluation.
* **Space Complexity:** \`O(1)\` static memory overhead per client bucket.
* **Jitter & Drift:** Uses monotonic \`performance.now()\` timestamps to prevent clock skew degradation.`;
  } else if (lower.includes('lpu') || lower.includes('gpu') || lower.includes('groq') || lower.includes('difference') || lower.includes('architecture')) {
    content = `### Groq LPU™ vs Traditional GPU: The Microarchitectural Difference

Groq’s **Language Processing Unit (LPU™)** was engineered from scratch specifically for sequential, autoregressive Large Language Model inference, bypassing the core bottlenecks that hinder conventional GPU clusters.

| Metric / Dimension | Traditional Cloud GPU (e.g., H100) | Groq LPU™ (Tensor Streaming Processor) |
| :--- | :--- | :--- |
| **Primary Bottleneck** | Memory Bandwidth (HBM3 "Memory Wall") | Zero Memory Bottleneck (Pure On-Chip SRAM) |
| **Execution Model** | Dynamic, speculative scheduling | 100% Deterministic static compiler scheduling |
| **SRAM Bandwidth** | ~3.35 TB/s (External HBM) | **80 TB/s** continuous on-chip crossbar |
| **Inference Latency** | Non-deterministic, batch-dependent | **Strictly deterministic sub-millisecond** |
| **Llama 3.1 8B Throughput** | ~70 – 120 tokens/sec | **1,250+ tokens/sec** |
| **Llama 3.3 70B Throughput** | ~25 – 45 tokens/sec | **395+ tokens/sec** |

#### Why Traditional GPUs Struggle with LLM Generation
LLM generation is inherently **memory-bound, not compute-bound**. For every single token generated, the model must read all 70 billion parameters from memory. When memory bandwidth is limited, GPU compute cores sit idle 90% of the time waiting for weights to arrive from HBM.

#### The Groq Solution
1. **Direct On-Chip Memory:** Groq replaces off-chip DRAM with ultra-fast on-chip SRAM distributed directly across matrix units.
2. **Software-Driven Compiler:** The Groq compiler orchestrates precise cycle-by-cycle tensor transfers across silicon, eliminating runtime hardware arbitration, cache misses, and unpredictable branch delays.`;
  } else if (lower.includes('quantum') || lower.includes('teleportation')) {
    content = `### Quantum Teleportation in 3 Key Concepts

1. **Entanglement Distribution:** A pair of entangled qubits (a Bell state \`|Φ⁺⟩ = (|00⟩ + |11⟩)/√2\`) is shared between the sender (Alice) and receiver (Bob) across arbitrary physical distance.
2. **Joint Bell Measurement:** Alice performs a joint projective measurement on her unknown state qubit \`|ψ⟩\` and her entangled qubit, destroying the quantum superposition locally and collapsing it into 1 of 4 classical states.
3. **Classical Communication & Unitary Reconstruction:** Alice transmits the 2 classical bits of measurement output to Bob. Depending on those 2 bits, Bob applies one of the four Pauli operations (\`I, X, Z, XZ\`) to instantly transform his qubit into the exact original state \`|ψ⟩\`.

> **Key Rule:** No faster-than-light signaling occurs because Bob cannot reconstruct the quantum information until he receives the 2 classical bits through standard speed-of-light channels.`;
  } else {
    content = `### Groq LPU High-Speed Analysis

Your inquiry regarding **"${prompt}"** has been processed through Groq's high-speed inference pipeline.

#### Core Insights
* **Deterministic Inference:** Processed across Groq's tensor streaming core matrix with minimal latency and high throughput.
* **Token Efficiency:** Autoregressive decoding executed without memory bus stall cycles.
* **Optimal Precision:** High numeric fidelity maintained across FP16/BF16 tensor operations.

#### Recommended Next Steps
1. **Try Parameter Tuning:** Adjust temperature and top-p in the right settings drawer to control output entropy.
2. **Side-by-Side Comparison:** Switch to **Compare Mode** to evaluate this prompt across \`llama-3.1-8b-instant\` and \`llama-3.3-70b-versatile\` simultaneously.
3. **Export Code:** Open the **"View Code"** panel to grab the ready-to-run Python or TypeScript SDK code.`;
  }

  return { content, reasoning };
}

// Main streaming function that works either via Real Groq API or high-fidelity LPU simulation
export async function streamGroqCompletion({
  messages,
  modelId,
  params,
  callbacks,
  abortSignal
}: {
  messages: ChatMessage[];
  modelId: string;
  params: InferenceParams;
  callbacks: StreamCallback;
  abortSignal?: AbortSignal;
}): Promise<void> {
  const apiKey = getStoredApiKey();
  const selectedModel = GROQ_MODELS.find(m => m.id === modelId) || GROQ_MODELS[0];
  const startTime = performance.now();
  let firstTokenTime: number | null = null;
  let accumulatedContent = '';
  let accumulatedReasoning = '';

  // If user provided a real API key, attempt real Groq Cloud streaming!
  if (apiKey && apiKey.startsWith('gsk_')) {
    try {
      const formattedMessages = [
        ...(params.systemPrompt ? [{ role: 'system', content: params.systemPrompt }] : []),
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages: formattedMessages,
          temperature: params.temperature,
          max_tokens: params.maxTokens,
          top_p: params.topP,
          stream: true,
          response_format: params.jsonMode ? { type: 'json_object' } : undefined,
          stop: params.stopSequences.length > 0 ? params.stopSequences : undefined,
        }),
        signal: abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API Error (${response.status}): ${errorText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('ReadableStream not supported in this environment');

      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              const delta = data.choices?.[0]?.delta;
              
              if (!firstTokenTime) {
                firstTokenTime = performance.now();
              }

              if (delta?.reasoning_content) {
                accumulatedReasoning += delta.reasoning_content;
                callbacks.onReasoningChunk?.(delta.reasoning_content);
              }
              if (delta?.content) {
                accumulatedContent += delta.content;
                callbacks.onChunk(delta.content);
              }
            } catch (e) {
              // Ignore line parse errors
            }
          }
        }
      }

      const endTime = performance.now();
      const totalTimeSec = (endTime - startTime) / 1000;
      const ttftSec = firstTokenTime ? (firstTokenTime - startTime) / 1000 : 0.08;
      const completionTokens = Math.max(1, Math.round(accumulatedContent.length / 3.8));
      const promptTokens = Math.max(10, Math.round(messages.reduce((acc, m) => acc + m.content.length, 0) / 3.8));
      const totalTokens = promptTokens + completionTokens;
      const tps = Math.round(completionTokens / Math.max(0.01, totalTimeSec - ttftSec));

      const finalMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: accumulatedContent,
        reasoningContent: accumulatedReasoning || undefined,
        timestamp: Date.now(),
        telemetry: {
          tokensPerSecond: tps,
          timeToFirstTokenSec: Number(ttftSec.toFixed(3)),
          totalTokens,
          completionTokens,
          promptTokens,
          totalTimeSec: Number(totalTimeSec.toFixed(3)),
          model: modelId,
          speedVsGpu: Number((tps / 35).toFixed(1))
        }
      };

      callbacks.onComplete(finalMessage);
      return;
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.warn('Real Groq API request failed or blocked, falling back to LPU simulation:', err.message);
      // Fallback to high-speed simulation gracefully
    }
  }

  // High-Performance Realistic Simulation Mode (Zero Configuration Needed)
  const lastUserMessage = messages[messages.length - 1]?.content || 'Hello Groq';
  const { content: targetContent, reasoning: targetReasoning } = generateIntelligentSimulation(
    lastUserMessage,
    modelId,
    params
  );

  const targetTPS = selectedModel.tokensPerSecond * (params.speedMultiplier || 1.0);
  const simulatedTTFTMs = selectedModel.timeToFirstTokenMs;

  // Simulate ultra-low TTFT
  await new Promise(resolve => setTimeout(resolve, simulatedTTFTMs));
  firstTokenTime = performance.now();

  // If reasoning model, stream reasoning first
  if (targetReasoning) {
    const reasoningWords = targetReasoning.split(' ');
    for (let i = 0; i < reasoningWords.length; i++) {
      if (abortSignal?.aborted) return;
      const chunk = (i === 0 ? '' : ' ') + reasoningWords[i];
      accumulatedReasoning += chunk;
      callbacks.onReasoningChunk?.(chunk);
      // Groq reasoning streams at 400+ t/s (approx 10-15ms per chunk of words)
      await new Promise(resolve => setTimeout(resolve, 8));
    }
  }

  // Stream content at blisteringly high tokens per second
  // Groq streams multiple characters per animation frame to hit 1,200+ t/s
  const words = targetContent.split(' ');
  const wordsPerTick = Math.max(1, Math.round(targetTPS / 100)); // chunk size per tick
  const tickIntervalMs = 12;

  let wordIndex = 0;
  while (wordIndex < words.length) {
    if (abortSignal?.aborted) return;

    const slice = words.slice(wordIndex, wordIndex + wordsPerTick);
    const chunk = (wordIndex === 0 ? '' : ' ') + slice.join(' ');
    accumulatedContent += chunk;
    callbacks.onChunk(chunk);

    wordIndex += wordsPerTick;

    // Intermediate telemetry update
    const currentElapsed = (performance.now() - startTime) / 1000;
    const estTokens = Math.round(accumulatedContent.length / 3.8);
    const liveTps = Math.min(targetTPS, Math.round(estTokens / Math.max(0.01, currentElapsed - simulatedTTFTMs / 1000)));

    callbacks.onMetricsUpdate?.({
      tokensPerSecond: liveTps,
      timeToFirstTokenSec: simulatedTTFTMs / 1000,
      totalTokens: estTokens + 30,
      completionTokens: estTokens,
      promptTokens: 30,
      totalTimeSec: Number(currentElapsed.toFixed(3)),
      model: modelId,
      speedVsGpu: Number((liveTps / 35).toFixed(1))
    });

    await new Promise(resolve => setTimeout(resolve, tickIntervalMs));
  }

  const endTime = performance.now();
  const totalTimeSec = (endTime - startTime) / 1000;
  const ttftSec = simulatedTTFTMs / 1000;
  const completionTokens = Math.max(10, Math.round(accumulatedContent.length / 3.8));
  const promptTokens = Math.max(15, Math.round(lastUserMessage.length / 3.8));
  const totalTokens = promptTokens + completionTokens;
  const finalTPS = Math.round(completionTokens / Math.max(0.01, totalTimeSec - ttftSec));

  const finalMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: accumulatedContent,
    reasoningContent: accumulatedReasoning || undefined,
    timestamp: Date.now(),
    telemetry: {
      tokensPerSecond: finalTPS,
      timeToFirstTokenSec: Number(ttftSec.toFixed(3)),
      totalTokens,
      completionTokens,
      promptTokens,
      totalTimeSec: Number(totalTimeSec.toFixed(3)),
      model: modelId,
      speedVsGpu: Number((finalTPS / 35).toFixed(1))
    },
    webSearchSources: params.webSearchEnabled ? [
      {
        title: "Groq Documentation: Tensor Streaming Architecture",
        url: "https://groq.com/docs/hardware",
        snippet: "Detailed specification of the Groq TSP chip and determinism benchmarks."
      },
      {
        title: "Meta Llama 3 Technical Report & Benchmarks",
        url: "https://ai.meta.com/research/publications",
        snippet: "Performance evaluations across MMLU, GSM8K, and HumanEval benchmarks."
      }
    ] : undefined
  };

  callbacks.onComplete(finalMessage);
}
