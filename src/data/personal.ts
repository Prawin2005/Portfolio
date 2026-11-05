export interface PersonalData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  extendedBio: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  techHighlights: string[];
}

export const personalData: PersonalData = {
  name: "Prawin Lakhman",
  role: "AI Engineer",
  tagline: "Building intelligent systems with AI, ML and GenAI.",
  bio: "Python Developer & AI Engineer focused on production-grade Generative AI, RAG architectures, Agentic workflows, and cloud-scale intelligent applications.",
  extendedBio: [
    "Specialized in architecting autonomous multi-agent workflows and high-precision RAG systems that move beyond simple prompts into verifiable enterprise software.",
    "Experienced with Google Cloud infrastructure, deploying performant computer vision models, and building end-to-end full-stack AI applications with FastAPI and modern React.",
    "Driven by engineering rigor: deterministic routing, robust evaluation pipelines, stateful checkpointing, and clean system design."
  ],
  location: "Available Anywhere in India (Open to Relocate / Travel)",
  email: "prawin.lakhman.ai@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  resumeUrl: "/Prawin_Lakhman_K_Resume.pdf",
  metrics: [
    { label: "Core Focus", value: "GenAI & RAG", sublabel: "Agentic Systems" },
    { label: "Wipro Internship", value: "4 Projects", sublabel: "Google Cloud Platform" },
    { label: "Architecture", value: "LangGraph", sublabel: "Stateful Workflows" },
    { label: "Code Quality", value: "Production", sublabel: "FastAPI + React" }
  ],
  techHighlights: [
    "Python",
    "AI / ML",
    "GenAI",
    "RAG",
    "Agentic AI",
    "Google Cloud",
    "FastAPI",
    "React"
  ]
};
