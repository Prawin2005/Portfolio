import { processStages } from "../data/process";
import { Workflow } from "lucide-react";


export const EngineeringProcess = () => {
  return (
    <section id="process" className="relative py-16 md:py-28 px-4 sm:px-6 bg-[#030508] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3">
            <Workflow className="w-3.5 h-3.5" />
            04 // METHODOLOGY
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            HOW I BUILD
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-xs sm:text-sm md:text-base">
            From raw problem deconstruction to deterministic evaluation and cloud deployment, every intelligent system follows a rigorous engineering lifecycle.
          </p>
        </div>

        {/* 8-Stage Sequential Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {processStages.map((stage, idx) => (
            <div
              key={stage.step}
              className="tech-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-[#030508] transition-colors">
                    {stage.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-heading group-hover:text-cyan-300 transition-colors mb-1">
                  {stage.title}
                </h3>
                <h4 className="text-xs font-mono text-cyan-400/80 mb-3">
                  {stage.subtitle}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {stage.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">
                  Instruments & Deliverables
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stage.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/5 text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
