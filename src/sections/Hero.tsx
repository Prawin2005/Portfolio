import { useEffect, useState } from "react";
import { personalData } from "../data/personal";
import { NeuralCore } from "../components/3d/NeuralCore";
import { 
  Sparkles, 
  Layers, 
  ChevronRight 
} from "lucide-react";


export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden tech-grid"
    >
      {/* 3D Neural Centerpiece Scene */}
      <NeuralCore />

      {/* Atmospheric lighting layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md mb-8 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs font-mono tracking-wider text-cyan-300">
            SYSTEM ONLINE // AI & GENAI ENGINEER
          </span>
        </div>

        {/* Display Name */}
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-4 font-heading transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          PRAWIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">LAKHMAN</span>
        </h1>

        {/* Role & Core Discipline */}
        <div
          className={`flex items-center gap-3 text-lg sm:text-2xl md:text-3xl font-mono text-cyan-400 mb-6 font-medium transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-slate-500">&gt;</span>
          <span>AI ENGINEER</span>
          <span className="text-slate-500">//</span>
          <span className="text-slate-300 text-base sm:text-xl md:text-2xl font-sans">
            Python Developer
          </span>
        </div>

        {/* Supporting Tagline */}
        <p
          className={`text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Building production-grade intelligent systems with{" "}
          <span className="text-white font-medium">Generative AI</span>,{" "}
          <span className="text-cyan-300 font-medium">RAG architectures</span>, and{" "}
          <span className="text-indigo-300 font-medium">Agentic workflows</span>.
        </p>

        {/* Supporting Tech Tags Carousel / Badges */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 max-w-xl transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {personalData.techHighlights.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] rounded-md hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-600 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group px-6 py-3 rounded-full text-sm font-semibold text-[#030508] bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_25px_-5px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Explore Projects
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-ai-assistant"));
            }}
            className="px-6 py-3 rounded-full text-sm font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            Ask AI Assistant
          </button>
        </div>

        {/* Key Engineering Pillars Preview */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-3xl pt-8 border-t border-white/10 text-left transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {personalData.metrics.map((m, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                {m.label}
              </span>
              <span className="text-sm md:text-base font-semibold text-white block">
                {m.value}
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono block">
                {m.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollTo("about")}
        className="relative z-10 mt-12 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        aria-label="Scroll down to About section"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">
          EXPLORE
        </span>
        <div className="w-6 h-10 rounded-full border border-slate-700 group-hover:border-cyan-500/50 flex justify-center p-1 transition-colors">
          <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce mt-1" />
        </div>
      </button>
    </section>
  );
};
