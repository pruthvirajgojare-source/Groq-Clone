import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { CodeBlock } from '../UI/CodeBlock';
import { ChatMessage, InferenceParams } from '../../types';

interface CodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  modelId: string;
  params: InferenceParams;
}

export const CodeDrawer: React.FC<CodeDrawerProps> = ({
  isOpen,
  onClose,
  messages,
  modelId,
  params
}) => {
  const [activeLang, setActiveLang] = useState<'python' | 'typescript' | 'curl' | 'json'>('python');

  const formattedMessages = [
    ...(params.systemPrompt ? [{ role: 'system', content: params.systemPrompt }] : []),
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  if (formattedMessages.length === 0) {
    formattedMessages.push({ role: 'user', content: 'Explain Groq LPU architecture.' });
  }

  const getPythonSnippet = () => {
    return `import os
from groq import Groq

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

chat_completion = client.chat.completions.create(
    messages=${JSON.stringify(formattedMessages, null, 8).replace(/"role"/g, "'role'").replace(/"content"/g, "'content'")},
    model="${modelId}",
    temperature=${params.temperature},
    max_tokens=${params.maxTokens},
    top_p=${params.topP},
    stream=${params.stream ? 'True' : 'False'},
${params.jsonMode ? '    response_format={"type": "json_object"},\n' : ''})

${params.stream ? `for chunk in chat_completion:
    print(chunk.choices[0].delta.content or "", end="")` : `print(chat_completion.choices[0].message.content)`}`;
  };

  const getTypeScriptSnippet = () => {
    return `import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: ${JSON.stringify(formattedMessages, null, 6)},
    model: "${modelId}",
    temperature: ${params.temperature},
    max_tokens: ${params.maxTokens},
    top_p: ${params.topP},
    stream: ${params.stream ? 'true' : 'false'},
${params.jsonMode ? '    response_format: { type: "json_object" },\n' : ''}  });

${params.stream ? `  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }` : `  console.log(chatCompletion.choices[0]?.message?.content);`}
}

main();`;
  };

  const getCurlSnippet = () => {
    const payload = {
      model: modelId,
      messages: formattedMessages,
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      top_p: params.topP,
      stream: params.stream,
      ...(params.jsonMode ? { response_format: { type: 'json_object' } } : {})
    };

    return `curl "https://api.groq.com/openai/v1/chat/completions" \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $GROQ_API_KEY" \\
  -d '${JSON.stringify(payload, null, 2)}'`;
  };

  const getJsonSnippet = () => {
    return JSON.stringify(
      {
        model: modelId,
        messages: formattedMessages,
        temperature: params.temperature,
        max_tokens: params.maxTokens,
        top_p: params.topP,
        stream: params.stream,
        ...(params.jsonMode ? { response_format: { type: 'json_object' } } : {})
      },
      null,
      2
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export API Code" maxWidth="2xl">
      <div className="space-y-4">
        <p className="text-xs text-zinc-400">
          Drop this code straight into your production app. Groq provides drop-in compatibility with the OpenAI SDK format.
        </p>

        {/* Language Tabs */}
        <div className="flex border-b border-[#282828] text-xs font-mono">
          <button
            onClick={() => setActiveLang('python')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeLang === 'python'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setActiveLang('typescript')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeLang === 'typescript'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            TypeScript / Node
          </button>
          <button
            onClick={() => setActiveLang('curl')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeLang === 'curl'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            cURL
          </button>
          <button
            onClick={() => setActiveLang('json')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeLang === 'json'
                ? 'border-[#F55036] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            JSON Payload
          </button>
        </div>

        {/* Code Content */}
        <div>
          {activeLang === 'python' && (
            <CodeBlock code={getPythonSnippet()} language="python" title="Python (groq SDK)" />
          )}
          {activeLang === 'typescript' && (
            <CodeBlock code={getTypeScriptSnippet()} language="typescript" title="TypeScript (groq-sdk)" />
          )}
          {activeLang === 'curl' && (
            <CodeBlock code={getCurlSnippet()} language="bash" title="cURL Command" />
          )}
          {activeLang === 'json' && (
            <CodeBlock code={getJsonSnippet()} language="json" title="Raw JSON" />
          )}
        </div>
      </div>
    </Modal>
  );
};
