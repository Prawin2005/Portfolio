import { useState } from "react";
import { skillsData, skillCategories } from "../data/skills";
import type { TechNodeItem } from "../data/skills";
import { Network, Terminal } from "lucide-react";


export const SkillsUniverse = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeNode, setActiveNode] = useState<TechNodeItem | null>(skillsData[0]); // Default to Python
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const filteredNodes = selectedCategory === "all"
    ? skillsData
    : skillsData.filter((node) => node.category === selectedCategory);

  const currentDisplayNode = hoveredNodeId
    ? skillsData.find((n) => n.id === hoveredNodeId) || activeNode
    : activeNode;

  return (
    <section id="skills" className="relative py-28 px-6 bg-[#030508] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3 w-fit">
              <Network className="w-3.5 h-3.5" />
              02 // AI TECH UNIVERSE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
              Interactive System Topology
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
              Hover or click any node to explore its ecosystem dependencies, architectural bindings, and connected tech stack.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Interactive Node Cluster + Live Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Node Grid / Constellation */}
          <div className="lg:col-span-7 tech-card rounded-2xl p-6 md:p-8 border border-white/10 relative min-h-[460px] flex flex-col justify-between">
            {/* Center Anchor Indicator */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  CORE: PRAWIN LAKHMAN
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                ACTIVE NODES: {filteredNodes.length} / {skillsData.length}
              </span>
            </div>

            {/* Nodes Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto">
              {filteredNodes.map((node) => {
                const isSelected = activeNode?.id === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isConnected = currentDisplayNode?.connections.includes(node.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`group relative p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected || isHovered
                        ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)] translate-y-[-2px]"
                        : isConnected
                        ? "bg-indigo-950/30 border-indigo-500/50 text-indigo-200"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          node.category === "ai"
                            ? "text-cyan-400 bg-cyan-950/60"
                            : node.category === "backend"
                            ? "text-emerald-400 bg-emerald-950/60"
                            : node.category === "cloud"
                            ? "text-amber-400 bg-amber-950/60"
                            : "text-purple-400 bg-purple-950/60"
                        }`}
                      >
                        {node.category}
                      </span>
                      {isConnected && (
                        <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                          LINK
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {node.name}
                    </h4>

                    <div className="flex items-center gap-1 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.level}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>* Click node to pin details</span>
              <span>Connections dynamically illuminated</span>
            </div>
          </div>

          {/* Right: Detailed Inspector & Tree Visualization */}
          <div className="lg:col-span-5">
            {currentDisplayNode && (
              <div className="tech-card rounded-2xl p-6 md:p-7 border border-cyan-500/30 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
                {/* Node Title & Level */}
                <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        NODE INSPECTOR //
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                        {currentDisplayNode.level}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      {currentDisplayNode.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {currentDisplayNode.description}
                </p>

                {/* Tree Visualization (as requested in Section 12) */}
                <div className="mb-6 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-slate-300">
                  <div className="text-cyan-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span>{currentDisplayNode.name}</span>
                    <span className="text-slate-500 font-normal">// Ecosystem Tree</span>
                  </div>
                  <div className="space-y-1 pl-1">
                    {currentDisplayNode.ecosystem.map((sub, idx, arr) => {
                      const isLast = idx === arr.length - 1;
                      return (
                        <div key={sub} className="flex items-center gap-2">
                          <span className="text-slate-600">
                            {isLast ? "└──" : "├──"}
                          </span>
                          <span className="text-slate-200">{sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Connected System Nodes */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-indigo-400" />
                    Interlinked Technologies
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDisplayNode.connections.map((connId) => {
                      const linked = skillsData.find((n) => n.id === connId);
                      if (!linked) return null;
                      return (
                        <span
                          key={connId}
                          onClick={() => setActiveNode(linked)}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:border-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"
                        >
                          {linked.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
