import { personalData } from "../data/personal";
import { 
  Bot, 
  Database, 
  Cloud, 
  Workflow, 
  CheckCircle2
} from "lucide-react";



export const About = () => {
  return (
    <section id="about" className="relative py-28 px-6 bg-[#04060a] border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            01 // PROFILE & PHILOSOPHY
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Engineering Systems That Think, Retrieve & Act.
          </h2>
        </div>

        {/* 2-Column Grid: Narrative vs Architecture Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Background */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-300 leading-relaxed text-base md:text-lg">
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
              I am <span className="text-cyan-400 font-semibold">{personalData.name}</span>, a Python Developer and AI Engineer dedicated to moving beyond basic prompt wrappers into deterministically verifiable, production-ready intelligent software.
            </p>

            {personalData.extendedBio.map((paragraph, index) => (
              <p key={index} className="text-slate-400">
                {paragraph}
              </p>
            ))}

            {/* Core Competency Badges */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Core Specialization Domains
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Bot, label: "Agentic AI", sub: "LangGraph" },
                  { icon: Database, label: "RAG Systems", sub: "Chroma & Dense Search" },
                  { icon: Cloud, label: "Google Cloud", sub: "Run, Storage, Vision" },
                  { icon: Workflow, label: "FastAPI Backend", sub: "Async SSE Pipelines" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col gap-1.5"
                  >
                    <item.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Terminal Stats Card */}
          <div className="lg:col-span-5">
            <div className="tech-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    engineer.py
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                  PYTHON 3.13
                </span>
              </div>

              {/* Code / Profile Output in Pure Python */}
              <div className="space-y-3 font-mono text-xs md:text-sm">
                <div className="text-slate-500 italic">
                  # Production-ready AI Engineer profile
                </div>
                <div>
                  <span className="text-indigo-400">from</span>{" "}
                  <span className="text-white">typing</span>{" "}
                  <span className="text-indigo-400">import</span>{" "}
                  <span className="text-cyan-300">Any</span>
                </div>

                <div className="pt-1">
                  <span className="text-cyan-300">engineer</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-indigo-300">dict</span>
                  <span className="text-slate-400">[</span>
                  <span className="text-indigo-300">str</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-cyan-300">Any</span>
                  <span className="text-slate-400">] = &#123;</span>
                </div>

                <div className="pl-4 space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-sky-300">"role"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">"{personalData.role}"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"location"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">"Available Anywhere in India"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"relocation"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">"Ready to Relocate / Travel Immediately"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"internship"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">"Wipro Technologies (GenAI)"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"cloud"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-400">"Google Cloud Platform (GCP)"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"primary_language"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-cyan-400">"Python 3.x"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-sky-300">"status"</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-indigo-400">"Available for Opportunities"</span>
                  </div>
                </div>

                <div className="text-slate-400">&#125;</div>
              </div>

              {/* Verified Quality Highlights */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
                {[
                  "Hands-on production AI internship at Wipro Technologies",
                  "Stateful LangGraph multi-agent workflows with SQLite checkpointing",
                  "FastAPI asynchronous streaming microservices with SSE",
                  "No fabricated metrics or placeholder claims"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
