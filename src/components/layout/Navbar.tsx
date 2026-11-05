import { useEffect, useState } from "react";
import { personalData } from "../../data/personal";
import { 
  Terminal, 
  Menu, 
  X, 
  FileText, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-lab", label: "Ask AI", highlight: true },
  { href: "#contact", label: "Contact" }
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#ai-lab") {
      window.dispatchEvent(new CustomEvent("open-ai-assistant"));
      return;
    }
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex justify-center ${
        scrolled ? "py-3 px-4" : "py-5 px-6"
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-300 rounded-full border ${
          scrolled
            ? "bg-[#060910]/85 border-white/10 backdrop-blur-md shadow-2xl py-2 px-4 md:px-6 w-full max-w-5xl"
            : "bg-[#060910]/40 border-white/5 backdrop-blur-sm py-2 px-5 md:px-7 w-full max-w-6xl"
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection("#home")}
          className="flex items-center gap-2 group cursor-pointer text-left"
          aria-label="Prawin Lakhman Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white font-heading">
              PRAWIN<span className="text-cyan-400">.</span>L
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              AI ENGINEER
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-cyan-300 bg-cyan-950/40 border border-cyan-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                } ${link.highlight ? "text-cyan-400 font-semibold" : ""}`}
              >
                <span className="flex items-center gap-1.5">
                  {link.highlight && <Sparkles className="w-3 h-3 text-cyan-400" />}
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Social / Action Links */}
        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-3">
          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
          >
            <FileText className="w-3 h-3" />
            Resume
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#070b13]/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                  {link.label}
                </span>
                <span className="text-xs font-mono text-slate-500">//</span>
              </button>
            ))}
          </div>

          <div className="h-px bg-white/10 my-1" />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/30"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

