import { useState } from "react";
import { experienceData } from "../data/experience";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Cloud, 
  ArrowRight, 
  Layers, 
  CheckCircle,
  AlertCircle
} from "lucide-react";


export const Experience = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    experienceData.projects[0].id
  );

  const activeProject = experienceData.projects.find(
    (p) => p.id === activeProjectId
  ) || experienceData.projects[0];

  return (
    <section id="experience" className="relative py-28 px-6 bg-[#04060a] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            02 // INDUSTRY EXPERIENCE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Wipro Technologies • GenAI Internship
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
            Engineered 4 production-grade AI systems natively deployed on Google Cloud Platform, encompassing multimodal models, web accessibility engines, and computer vision retail pipelines.
          </p>
        </div>

        {/* Company Overview Header Card */}
        <div className="tech-card rounded-2xl p-6 md:p-8 border border-white/10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                  {experienceData.company}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {experienceData.role}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {experienceData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {experienceData.period}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              Cloud Infrastructure Focus
            </span>
            <span className="text-xs font-mono text-cyan-300 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
              {experienceData.cloudFocus}
            </span>
          </div>
        </div>

        {/* Interactive Storytelling Timeline & Project Stage Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Timeline Steps */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 px-1">
              Internship Projects (Select to Inspect)
            </span>

            {experienceData.projects.map((proj, idx) => {
              const isSelected = activeProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`group relative p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_-5px_rgba(0,240,255,0.25)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? "bg-cyan-400 text-[#030508]"
                        : "bg-white/5 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm font-semibold truncate transition-colors ${
                        isSelected ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {proj.subtitle}
                    </p>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-1 transition-all ${
                      isSelected
                        ? "text-cyan-400 translate-x-1"
                        : "text-slate-600 group-hover:text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Presentation Display */}
          <div className="lg:col-span-7">
            <div className="tech-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
              {/* Project Title Header */}
              <div className="border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    PROJECT SPOTLIGHT //
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-500/20">
                    Google Cloud Native
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-cyan-300/80 font-mono mt-1">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-red-950/15 border border-red-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 uppercase mb-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Problem Statement
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {activeProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase mb-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Engineering Solution
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Steps Sequence */}
              <div className="mb-6">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  System Pipeline Flow
                </h5>
                <div className="flex flex-col gap-2">
                  {activeProject.architectureSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used & Verified Impact */}
              <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:text-right">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Verified Result
                  </span>
                  <span className="text-xs text-emerald-400 font-medium font-mono">
                    {activeProject.impact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
