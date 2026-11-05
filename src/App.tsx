import { useEffect, useState } from "react";
import Lenis from "lenis";
import { FluidCursor } from "./components/cursor/FluidCursor";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { AIAssistantWidget } from "./components/ai/AIAssistantWidget";
import { EngineeringProcess } from "./sections/EngineeringProcess";
import { CloudArchitecture } from "./sections/CloudArchitecture";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          Boolean(node.closest?.("[data-lenis-prevent]"))
        );
      }
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let animationId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    }
    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cinematic Fluid Splash Cursor */}
      <FluidCursor />

      {/* Intro Loading Sequence */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Floating Minimal Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <EngineeringProcess />
        <CloudArchitecture />
        <Achievements />
        <Contact />
      </main>

      {/* Floating Customer-Support Style AI Assistant */}
      <AIAssistantWidget />

      {/* Minimal Technical Footer */}
      <Footer />
    </div>
  );
}
