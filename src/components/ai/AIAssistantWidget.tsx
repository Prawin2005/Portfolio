import { useState, useRef, useEffect, useCallback } from "react";
import { queryAILab } from "../../lib/ragClient";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  FileText,
  X,
  ChevronDown
} from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

const suggestedPrompts = [
  "Available anywhere in India?",
  "Tell me about your Customer Support Agent",
  "What did you build at Wipro?",
  "SmartStock Vision pipeline",
  "What is your core tech stack?"
];

export const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Prawin's AI Assistant, grounded in his verified projects, Wipro experience, and technical stack.\n\nAsk me anything about his work, system architecture, or availability across India!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  const handleSend = useCallback(async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    setInput("");
    setLoading(true);
    setHasInteracted(true);

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
  }, [input, loading]);

  // Listen for global open triggers (e.g. from Navbar, Hero, or Projects)
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      setHasInteracted(true);
      if (customEvent.detail?.prompt) {
        handleSend(customEvent.detail.prompt);
      }
    };

    window.addEventListener("open-ai-assistant", handleOpenEvent);
    return () => window.removeEventListener("open-ai-assistant", handleOpenEvent);
  }, [handleSend]);

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
    <>
      {/* Floating Chat Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* Helper popup pill before user has opened it */}
        {!isOpen && !hasInteracted && (
          <button
            onClick={() => {
              setIsOpen(true);
              setHasInteracted(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#070b13]/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl backdrop-blur-md hover:border-cyan-400 transition-all cursor-pointer animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ask Prawin's AI Assistant</span>
          </button>
        )}

        {/* Main Floating Circle Launcher */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? "bg-slate-800 text-white border border-white/20 rotate-90"
              : "bg-gradient-to-tr from-cyan-500 to-sky-400 text-[#030508] hover:scale-105 shadow-[0_0_30px_-5px_rgba(0,240,255,0.6)]"
          }`}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-[#030508] group-hover:scale-110 transition-transform" />
              {/* Online Pulse Dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#030508]" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Drawer / Window on Right Side */}
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed bottom-22 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[82vh] bg-[#070b13]/95 border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-black/60 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white font-mono flex items-center gap-1.5">
                  Prawin AI Agent
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Knowledge Grounded • Available India-wide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Reset chat conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-black/40 border-b border-white/5 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              Quick:
            </span>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-white/[0.04] hover:bg-cyan-950/40 hover:text-cyan-300 hover:border-cyan-500/30 border border-white/5 transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Feed */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500/25 border border-cyan-500/40 text-white rounded-br-none"
                      : "bg-white/[0.04] border border-white/10 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Streaming cursor */}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
                  )}

                  {/* Grounded Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center gap-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1">
                        <FileText className="w-2.5 h-2.5 text-cyan-400" />
                        Sources:
                      </span>
                      {msg.sources.map((src, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/20"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-black/80 border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask anything about Prawin..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-cyan-400 text-[#030508] hover:bg-cyan-300 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message to AI assistant"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
