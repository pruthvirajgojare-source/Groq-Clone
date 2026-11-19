# Groq Clone — Ultra-Fast AI Inference & Developer Platform

An exact, high-fidelity replica of **[Groq](https://groq.com)** and the **[GroqCloud Developer Console](https://console.groq.com)**, engineered with a pixel-accurate developer aesthetic, real-time token telemetry, dual-model arena testing, and support for both native Groq LPU simulation (1,250+ tokens/sec) and real Groq Cloud API connections.

---

## ⚡ Key Highlights & Features

### 1. The Groq Playground & GroqChat (`/playground`)
* **Blazing Fast Token Streaming:** Watch tokens stream in real-time at up to 1,250 tokens per second with sub-50ms Time-to-First-Token (TTFT).
* **Live Hardware Telemetry Badge:** Every generated response displays real-time telemetry metrics:
  * ⚡ **Tokens / Sec (t/s):** Throughput measurement.
  * ⏱️ **Time to First Token (TTFT):** Millisecond-accurate latency.
  * 📊 **Token Usage:** Breakdown of Prompt tokens and Completion tokens.
  * ⌛ **Total Elapsed Time:** Sub-second end-to-end timing.
  * 📈 **Speed Multiplier:** Direct comparison vs traditional cloud GPUs (e.g. *18.5x faster than GPU*).
* **DeepSeek R1 Step-by-Step Reasoning:** Full support for reasoning models with collapsible `<think>` thought process accordions.
* **Web Search Grounding:** Toggle live web search references and source citation pills.
* **Audio Transcription Demo:** Fast Whisper Large v3 voice recording/transcription simulation.
* **Rich Markdown & Syntax Highlighting:** Clean code blocks with copy-to-clipboard buttons and language badges.

### 2. Dual-Model Arena & Live Race Mode (`/compare`)
* Run two models simultaneously side-by-side on the same prompt (e.g., `llama-3.1-8b-instant` vs `llama-3.3-70b-versatile`).
* Dual animated speedometers visualizer displaying real-time generation races.
* Automatic latency winner detection.

### 3. "View Code" Dynamic Integration Panel
* Dynamically translates any active playground conversation and parameters into production-ready code snippets with one-click copy:
  * **Python** (`groq` client library)
  * **TypeScript / Node.js** (`groq-sdk`)
  * **cURL** command
  * **JSON Payload**

### 4. GroqCloud Console Architecture
* **API Keys Management (`/api-keys`):**
  * Generate simulated `gsk_...` keys with creation and last-used tracking.
  * **Connect Real Groq API Key:** Enter your own free API key from `console.groq.com/keys` to make live requests to `https://api.groq.com/openai/v1/chat/completions`. If empty, the app uses the built-in high-speed LPU simulation engine.
* **Usage & Telemetry Analytics (`/usage`):**
  * Interactive 7-day token consumption bar chart (Prompt vs Completion tokens).
  * Requests count, average LPU latency, model volume distribution, and cost savings calculator.
* **Models Catalog (`/models`):**
  * Specifications for `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `deepseek-r1-distill-llama-70b`, `mixtral-8x7b-32768`, `gemma2-9b-it`, and `whisper-large-v3`.
* **Documentation & Quickstart (`/docs`):**
  * Step-by-step SDK installation guide (`npm install groq-sdk`, `pip install groq`).
  * 1-minute OpenAI SDK migration guide.
  * Structured JSON Mode documentation.

### 5. Official Groq.com Homepage Clone (`/landing`)
* Hero headline: *"Groq is the premier neocloud for fast inference."*
* **Interactive Live Speed Race:** Direct side-by-side test comparing Traditional Cloud GPU (35 t/s, 850ms TTFT) against Groq LPU (1,250 t/s, 45ms TTFT).
* Architectural breakdown of Groq's Tensor Streaming Processor (TSP) solving the HBM3 memory wall.
* Pricing comparison table ($0.05/1M tokens vs proprietary APIs at $2.50+/1M tokens).

---

## 🎨 Design & Aesthetics
* **Brand Color Palette:**
  * Groq Signature Orange: `#F55036`
  * Groq Dark Orange: `#D03E28`
  * Deep Charcoal & Pitch Black: `#0A0A0A`, `#121212`, `#161616`
  * Border Grays: `#242424`, `#2E2E2E`
  * Operational Green: `#22C55E`
* **Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (code & metrics).

---

## 🚀 Running the Application

### Development Server
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure
```
src/
├── types.ts                      # Core TypeScript interfaces
├── data/
│   ├── models.ts                 # Full metadata on Groq LPU models
│   └── samplePrompts.ts          # Preset prompts & system instructions
├── services/
│   ├── groqApi.ts                # Real Groq Cloud API + LPU streaming simulator
│   └── storage.ts                # LocalStorage management for keys & settings
├── components/
│   ├── Navbar.tsx                # Groq header with tabs & status pill
│   ├── Playground/
│   │   ├── ChatView.tsx          # Main chat view
│   │   ├── ChatMessage.tsx       # Formatted messages & DeepSeek reasoning
│   │   ├── ChatInput.tsx         # Input with model selector & toggles
│   │   ├── ArenaView.tsx         # Side-by-side Dual Model comparison
│   │   ├── SettingsDrawer.tsx    # Parameters & system prompt panel
│   │   ├── TelemetryBar.tsx      # Real-time speed & token telemetry
│   │   ├── CodeDrawer.tsx        # "View Code" modal (Python, TS, cURL, JSON)
│   │   └── PromptPresets.tsx     # Quick start prompt cards
│   ├── Landing/
│   │   ├── HeroSection.tsx       # Homepage hero with GPU vs LPU live race
│   │   ├── SpeedBenchmarks.tsx   # Interactive speedometers
│   │   ├── ArchitectureSection.tsx # Microarchitectural breakdown
│   │   ├── ModelsShowcase.tsx    # Model explorer
│   │   ├── PricingComparison.tsx # Cost comparison table
│   │   └── Footer.tsx            # Footer
│   ├── Console/
│   │   ├── ApiKeysView.tsx       # Key management & real Groq API key setup
│   │   ├── UsageView.tsx         # Token charts & metrics
│   │   ├── ModelsCatalogView.tsx # Model cards
│   │   └── DocsView.tsx          # SDK Quickstart
│   └── UI/
│       ├── Speedometer.tsx       # Custom SVG speedometer dial
│       ├── CodeBlock.tsx         # Formatted code box with copy button
│       └── Modal.tsx             # Accessible dialog modal
├── App.tsx                       # Main application state & navigation
├── main.tsx                      # React root
└── index.css                     # Tailwind CSS & custom styling
```
