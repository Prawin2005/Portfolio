import { useState } from "react";
import { projectsData } from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { ProjectModal } from "./ProjectModal";
import { 
  Layers, 
  ArrowUpRight, 
  Workflow
} from "lucide-react";


export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-16 md:py-28 px-4 sm:px-6 bg-[#030508] border-t border-white/5 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-cyan-500/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3 w-fit">
              <Layers className="w-3.5 h-3.5" />
              03 // FLAGSHIP PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
              Intelligent Systems & Architectures
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-xs md:text-sm font-mono">
            // Click any project card to inspect deep architectural diagrams, evaluation metrics, and state flow charts.
          </p>
        </div>

        {/* Featured Projects List: Cinematic Panels */}
        <div className="flex flex-col gap-6 sm:gap-10">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group tech-card rounded-2xl p-4 sm:p-7 md:p-10 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover accent light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/0 group-hover:bg-cyan-500/5 rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Column: Number, Title, Overview, Tech Stack */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono font-bold text-cyan-400">
                        {project.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/5">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-cyan-400/80 font-mono mt-1 mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills & Expand CTA */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-slate-400 bg-black/40 border border-white/5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                      <span>Inspect Architecture & Specs</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Architecture Flow Preview */}
                <div className="lg:col-span-6 bg-black/50 rounded-xl p-5 md:p-6 border border-white/5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5" />
                      {project.architecture.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      LIVE PIPELINE
                    </span>
                  </div>

                  <div className="space-y-2">
                    {project.architecture.flow.slice(0, 4).map((f, fIdx, arr) => (
                      <div key={fIdx} className="flex flex-col">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono">
                          <span className="text-slate-300 font-medium">
                            {f.step}
                          </span>
                          <span className="text-[11px] text-slate-500 truncate max-w-[200px] text-right">
                            {f.detail}
                          </span>
                        </div>
                        {fIdx < arr.length - 1 && (
                          <div className="flex justify-center my-0.5 text-slate-700 text-xs font-mono">
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                    {project.architecture.flow.length > 4 && (
                      <div className="text-center pt-1 text-[11px] font-mono text-cyan-400/70">
                        + {project.architecture.flow.length - 4} more validation nodes
                      </div>
                    )}
                  </div>

                  {/* Quick Metric Bar */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold font-mono text-white block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
