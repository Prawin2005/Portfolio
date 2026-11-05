import { personalData } from "../../data/personal";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 bg-[#030508] border-t border-white/5 text-slate-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Role */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-white font-bold tracking-tight text-sm font-heading">
            PRAWIN LAKHMAN <span className="text-cyan-400">//</span> AI ENGINEER
          </div>
          <div className="text-slate-500 text-[11px]">
            Python • AI/ML • GenAI • RAG • Agentic AI • Cloud
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="hover:text-cyan-400 transition-colors"
            aria-label="Email Contact"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Prawin Lakhman.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

