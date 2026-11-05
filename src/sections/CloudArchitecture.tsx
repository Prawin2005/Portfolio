import { Cloud, Server, Database, Cpu, Box } from "lucide-react";


export const CloudArchitecture = () => {
  const cloudStack = [
    {
      name: "Google Cloud Run",
      role: "Serverless Container Compute",
      description: "Auto-scaling microservices for FastAPI backends and model inference endpoints.",
      icon: Server,
      accent: "text-blue-400"
    },
    {
      name: "Vertex AI",
      role: "Foundation Models & Embeddings",
      description: "Managed Gemini 1.5 Pro inference and multimodal vector embeddings generation.",
      icon: Cpu,
      accent: "text-cyan-400"
    },
    {
      name: "Google Cloud Storage",
      role: "Object Storage & Event Triggers",
      description: "Secure storage for shelf captures, planograms, and automated event triggers.",
      icon: Database,
      accent: "text-amber-400"
    },
    {
      name: "Google Vision API",
      role: "Automated Visual Telemetry",
      description: "Cloud-native computer vision feature extraction for retail shelf auditing.",
      icon: Cloud,
      accent: "text-emerald-400"
    },
    {
      name: "Artifact Registry",
      role: "Container Image Management",
      description: "Immutable Docker container image versioning and deployment automation.",
      icon: Box,
      accent: "text-indigo-400"
    }
  ];

  return (
    <section id="cloud" className="relative py-28 px-6 bg-[#04060a] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 mb-3">
            <Cloud className="w-3.5 h-3.5" />
            05 // CLOUD TOPOLOGY
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Google Cloud Infrastructure
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
            Architected for scalability, secure identity policies, and minimal serverless cold starts.
          </p>
        </div>

        {/* Cloud Tier Architecture Flow */}
        <div className="tech-card rounded-2xl p-6 md:p-8 border border-white/10 mb-8 relative overflow-hidden">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-6 flex items-center justify-between">
            <span>Production Deployment Pipeline</span>
            <span className="text-slate-500">GCP REGION: ASIA-SOUTH1</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cloudStack.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <item.icon className={`w-6 h-6 ${item.accent} mb-3`} />
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400/80 block mb-2">
                    {item.role}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
