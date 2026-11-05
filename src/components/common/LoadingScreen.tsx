import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [stage, setStage] = useState<"name" | "role" | "exit">("name");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Quick progress bar tick
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    const timer1 = setTimeout(() => {
      setStage("role");
    }, 600);

    const timer2 = setTimeout(() => {
      setStage("exit");
    }, 1250);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030508] transition-all duration-500 ${
        stage === "exit" ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Subtle ambient light */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Terminal badge */}
        <div className="flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs text-cyan-400 font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          SYSTEM_BOOT // INITIALIZING
        </div>

        {/* Primary Name Display */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 font-heading">
          PRAWIN
        </h1>

        {/* Role Reveal */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            stage === "role" || stage === "exit"
              ? "max-h-20 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-3"
          }`}
        >
          <p className="text-lg md:text-xl font-mono tracking-widest text-cyan-400 uppercase font-medium">
            AI ENGINEER
          </p>
        </div>

        {/* Progress Line */}
        <div className="w-48 h-0.5 bg-slate-800 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-slate-500 mt-2">
          {progress}%
        </span>
      </div>
    </div>
  );
};
