import { achievementsData } from "../data/achievements";
import { Trophy, CheckCircle } from "lucide-react";


export const Achievements = () => {
  return (
    <section id="achievements" className="relative py-16 md:py-24 px-4 sm:px-6 bg-[#030508] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-14">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3">
            <Trophy className="w-3.5 h-3.5" />
            06 // VERIFIED MILESTONES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Competitions & Recognition
          </h2>
        </div>

        {/* Minimal Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="tech-card rounded-xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 font-heading">
                  {item.title}
                </h3>
                <h4 className="text-xs font-mono text-cyan-400/80 mb-3">
                  {item.organization}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
