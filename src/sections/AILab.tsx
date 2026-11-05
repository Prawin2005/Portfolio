import { useState, useRef, useEffect } from "react";
import { queryAILab } from "../lib/ragClient";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  FileText,
  Zap,
  ShieldCheck,
  Terminal,
  ArrowRight
} from "lucide-react";


interface Message {
  role: "assistant" | "user";
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

const suggestedPrompts = [
  "Can you relocate or travel anywhere in India?",
  "Explain the Customer Support Agent architecture",
  "Tell me about your Wipro GenAI internship",
  "How does the SmartStock Vision project work?",
  "What is your experience with RAG & LangGraph?"
];

export const AILab = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am Prawin's AI Assistant, grounded in his verified projects, Wipro experience, and system architectures.\n\nAsk me anything about his technical stack, engineering methodology, or relocation availability."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    setInput("");
    setLoading(true);

    // Add user message
    const userMsg: Message = { role: "user", content: queryText };
    // Prepare placeholder streaming assistant message
    const assistantMsg: Message = { role: "assistant", content: "", isStreaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    try {
      await queryAILab(queryText, {
        onToken: (token: string) => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                content: updated[lastIdx].content + token
              };
            }
            return updated;
          });
        },
        onSources: (sources: string[]) => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                sources
              };
            }
            return updated;
          });
        },
        onDone: () => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                isStreaming: false
              };
            }
            return updated;
          });
          setLoading(false);
        },
        onError: () => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                content: updated[lastIdx].content || "An error occurred retrieving context. Please try another query.",
                isStreaming: false
              };
            }
            return updated;
          });
          setLoading(false);
        }
      });
    } catch {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "AI Assistant reset. Grounded retrieval engine ready. Feel free to ask another question about Prawin's background or architecture patterns."
      }
    ]);
  };

  return (
    <section id="ai-lab" className="relative py-28 px-6 bg-[#04060a] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Context, Architecture Specs & Clickable Inquiries */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Section Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-300 mb-5 w-fit shadow-[0_0_15px_-3px_rgba(0,240,255,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                04 // SIGNATURE AI INTERACTIVE LAB
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading mb-4 leading-tight">
                Grounded AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                  Assistant
                </span>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                Interact with Prawin's personal AI Assistant on the right. Query in natural language to inspect architecture decisions, Wipro deliverables, and relocation availability.
              </p>

              {/* RAG Architectural Pillars */}
              <div className="space-y-3 mb-8">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-mono">Semantic Vector Retrieval</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Retrieves verified documentation, project pipelines, and tech stack details.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-mono">Deterministic Guardrails</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Grounds all responses in verifiable facts with strict anti-hallucination checks.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-mono">Real-Time Streaming Runtime</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      FastAPI SSE microservice with automated client-side fallback.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Prompts on Left */}
            <div className="pt-5 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 block mb-3 uppercase tracking-wider">
                Quick Inquiries (Click to Ask):
              </span>
              <div className="flex flex-col gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    disabled={loading}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/[0.03] hover:bg-cyan-950/40 hover:text-cyan-300 hover:border-cyan-500/40 border border-white/5 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated AI Assistant Panel */}
          <div className="lg:col-span-7 w-full">
            <div className="tech-card rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col h-[640px] relative">
              {/* Assistant Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_-3px_rgba(0,240,255,0.4)]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070b13]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white font-mono tracking-wide">
                      PRAWIN AI ASSISTANT
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Neural-RAG Runtime • Online
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    title="Reset conversation"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-colors cursor-pointer"
                    aria-label="Reset chat conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5" data-lenis-prevent>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyan-500/20 border border-cyan-500/40 text-white rounded-br-none shadow-[0_0_20px_-5px_rgba(0,240,255,0.2)]"
                          : "bg-white/[0.03] border border-white/10 text-slate-200 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Streaming cursor blink */}
                      {msg.isStreaming && (
                        <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
                      )}

                      {/* Sources Footnote */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                            <FileText className="w-3 h-3 text-cyan-400" />
                            Grounded Sources:
                          </span>
                          {msg.sources.map((src, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-500/20"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Control Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3.5 md:p-4 bg-black/70 border-t border-white/10 flex items-center gap-2.5"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Ask the AI Assistant (e.g. 'Can you relocate anywhere in India?')..."
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 rounded-xl bg-cyan-400 text-[#030508] font-semibold hover:bg-cyan-300 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send query to assistant"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

