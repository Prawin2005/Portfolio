import { useEffect, useRef } from "react";
import type { ProjectItem } from "../data/projects";
import { 
  X, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Terminal
} from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";


interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!project) return;

    // Pause Lenis smooth scrolling so it doesn't intercept modal scroll
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) lenis.stop();

    // Prevent background body scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Reset scroll position to top when a new project is selected
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (lenis) lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      data-lenis-prevent
    >
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div
        ref={contentRef}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] sm:max-h-[90vh] bg-[#070b13] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-y-auto overscroll-contain z-10 p-5 sm:p-7 md:p-8 text-left [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
      >
        {/* Sticky close button so user can always close even when scrolled down */}
        <div className="sticky top-0 z-30 flex justify-end pointer-events-none -mt-1 -mr-1 sm:-mt-2 sm:-mr-2 mb-2">
          <button
            onClick={onClose}
            className="pointer-events-auto p-2 rounded-xl bg-[#070b13]/90 border border-white/20 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/60 backdrop-blur-md transition-all shadow-xl cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                PROJECT // {project.number}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              {project.title}
            </h2>
            <p className="text-sm text-cyan-300/80 font-mono mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
          {project.longDescription}
        </p>

        {/* Architecture Pipeline Visual Flow */}
        <div className="mb-8 p-5 rounded-xl bg-black/50 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
            <Layers className="w-4 h-4" />
            {project.architecture.title}
          </div>

          <div className="space-y-3">
            {project.architecture.flow.map((node, idx, arr) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-center shrink-0 font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-semibold text-white font-mono">
                      {node.step}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {node.detail}
                    </p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex justify-center my-1 text-slate-600">
                    <span className="text-xs font-mono">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Engineering Highlights & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Technical Innovations
            </h4>
            <div className="space-y-2">
              {project.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              System Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    {m.label}
                  </span>
                  <span className="text-base font-bold text-white font-mono block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack & Action Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                Repository
              </a>

            )}
            {project.demoUrl && (
              <button
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("open-ai-assistant", {
                      detail: { prompt: `Tell me about ${project.title}` }
                    })
                  );
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-[#030508] bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                Query in AI Assistant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
