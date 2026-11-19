import React, { useState } from 'react';
import { BookOpen, Terminal, Code2, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../UI/CodeBlock';

export const DocsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'node' | 'curl'>('python');

  const pythonInstall = `pip install groq`;
  const nodeInstall = `npm install groq-sdk`;

  const pythonQuickstart = `import os
from groq import Groq

# Automatically reads os.environ.get("GROQ_API_KEY")
client = Groq()

completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Explain the difference between on-chip SRAM and external HBM3."
        }
    ],
    temperature=0.7,
    max_tokens=1024,
    stream=True
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")`;

  const nodeQuickstart = `import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: "Explain Groq LPU deterministic execution." }
    ],
    model: "llama-3.1-8b-instant",
    stream: true,
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();`;

  const openAiMigration = `// Swap your existing OpenAI client to Groq in 2 lines:
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // <-- Point to Groq LPU
});

const response = await openai.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: "Hello Groq!" }],
});`;

  const jsonModeSnippet = `// Enforce guaranteed valid JSON output:
const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system", content: "Output valid JSON only." },
    { role: "user", content: "List the top 3 benefits of LPU hardware." }
  ],
  response_format: { type: "json_object" }
});`;

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#222222] mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h1 className="font-display font-bold text-2xl text-white">Documentation & Quickstart</h1>
        </div>
        <p className="text-xs text-zinc-400">
          Build sub-second AI applications using Groq's official client libraries and OpenAI-compatible endpoints.
        </p>
      </div>

      {/* Step 1: Install */}
      <div className="mb-10">
        <h2 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#F55036] text-white text-xs flex items-center justify-center font-bold">1</span>
          <span>Install Official Groq SDK</span>
        </h2>
        <p className="text-xs text-zinc-400 mb-3">
          Groq provides lightweight, zero-dependency SDKs for Python and TypeScript/JavaScript.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-1">Python:</span>
            <CodeBlock code={pythonInstall} language="bash" />
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-1">Node.js / TypeScript:</span>
            <CodeBlock code={nodeInstall} language="bash" />
          </div>
        </div>
      </div>

      {/* Step 2: Code Snippets */}
      <div className="mb-10">
        <h2 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#F55036] text-white text-xs flex items-center justify-center font-bold">2</span>
          <span>Streaming Chat Completion</span>
        </h2>
        <p className="text-xs text-zinc-400 mb-3">
          Tokens stream in real-time at over 1,200 tokens per second with sub-50ms TTFT.
        </p>

        <div className="flex border-b border-[#262626] mb-3 text-xs font-mono">
          <button
            onClick={() => setActiveTab('python')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'python'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setActiveTab('node')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'node'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            TypeScript / Node.js
          </button>
        </div>

        {activeTab === 'python' ? (
          <CodeBlock code={pythonQuickstart} language="python" title="quickstart.py" />
        ) : (
          <CodeBlock code={nodeQuickstart} language="typescript" title="quickstart.ts" />
        )}
      </div>

      {/* Step 3: 1-Minute OpenAI Migration */}
      <div className="mb-10 p-6 rounded-2xl bg-[#141414] border border-[#262626]">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[#F55036]" />
          <h3 className="font-display font-bold text-base text-white">
            Migrate from OpenAI in 1 Minute
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Because Groq's API is 100% compatible with the OpenAI API specification, you can swap your existing OpenAI SDK client by simply changing the <code className="text-[#F55036] font-mono">baseURL</code> and passing your <code className="text-[#F55036] font-mono">GROQ_API_KEY</code>.
        </p>
        <CodeBlock code={openAiMigration} language="typescript" title="OpenAI SDK Migration" />
      </div>

      {/* Step 4: JSON Mode */}
      <div className="mb-10">
        <h2 className="font-display font-bold text-lg text-white mb-2">
          Structured Outputs (JSON Mode)
        </h2>
        <p className="text-xs text-zinc-400 mb-3">
          Pass <code className="text-[#F55036] font-mono">{`response_format: { type: "json_object" }`}</code> to guarantee strictly parseable JSON output.
        </p>
        <CodeBlock code={jsonModeSnippet} language="typescript" title="json_mode.ts" />
      </div>

    </div>
  );
};
