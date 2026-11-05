import { personalData } from "../data/personal";
import { Mail, FileText, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/ui/Icons";


export const Contact = () => {
  return (
    <section id="contact" className="relative py-16 md:py-28 px-4 sm:px-6 bg-[#04060a] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          07 // INITIATE TRANSMISSION
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 font-heading">
          LET'S BUILD SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">INTELLIGENT</span>.
        </h2>

        {/* Supporting text */}
        <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Have an AI engineering opportunity, high-impact project, or production problem? Let's connect and build deterministic solutions.
        </p>

        {/* Primary Contact Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full sm:w-auto">
          <a
            href={`mailto:${personalData.email}`}
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full text-sm font-semibold text-[#030508] bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_-5px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me Directly</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4 text-cyan-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full text-sm font-medium text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Location & Response Time */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono text-slate-500 px-2">
          <span>LOCATION: AVAILABLE ANYWHERE IN INDIA (OPEN TO RELOCATE)</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            TYPICAL RESPONSE: &lt; 24 HOURS
          </span>
        </div>
      </div>
    </section>
  );
};
