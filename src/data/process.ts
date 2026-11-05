export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
}

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Problem Deconstruction",
    subtitle: "Root Cause & Constraint Analysis",
    description: "Break down complex business requirements into verifiable technical constraints, failure boundaries, and latency budgets.",
    tools: ["Requirements Spec", "Domain Modeling", "User Journeys"]
  },
  {
    step: "02",
    title: "Research & Feasibility",
    subtitle: "Literature & Benchmark Evaluation",
    description: "Compare state-of-the-art model architectures, embedding models, token costs, and algorithmic tradeoffs prior to implementation.",
    tools: ["ArXiv / Papers", "Benchmarking", "Latency Profiling"]
  },
  {
    step: "03",
    title: "System Architecture",
    subtitle: "State Machines & Data Contracts",
    description: "Design deterministic state graphs, API schemas, streaming interfaces, database indexes, and fallback redundancy mechanisms.",
    tools: ["LangGraph StateGraph", "Pydantic Schemas", "System Flowcharts"]
  },
  {
    step: "04",
    title: "AI / ML Engineering",
    subtitle: "Prompt Chaining & Model Pipelines",
    description: "Develop dense embeddings, hybrid vector search, RAG contextual retrieval, tool declarations, and validator guardrails.",
    tools: ["ChromaDB", "Gemini", "PyTorch", "YOLOv8"]
  },
  {
    step: "05",
    title: "High-Performance Backend",
    subtitle: "Asynchronous APIs & Streaming",
    description: "Build asynchronous FastAPI microservices with Server-Sent Events (SSE), connection pooling, and resilient error recovery.",
    tools: ["FastAPI", "Uvicorn", "AsyncIO", "SQLite / PostgreSQL"]
  },
  {
    step: "06",
    title: "Frontend & Digital Experience",
    subtitle: "Responsive, Cinematic Interfaces",
    description: "Construct modern React user interfaces with real-time token streaming, accessible keyboard flows, and performant 60fps animations.",
    tools: ["React 19", "TypeScript", "Tailwind CSS", "Three.js"]
  },
  {
    step: "07",
    title: "Cloud Infrastructure",
    subtitle: "Serverless & Scalable Deployments",
    description: "Containerize microservices with Docker, provision Google Cloud Run compute, and establish secure Cloud Storage event pipelines.",
    tools: ["Google Cloud Run", "Vertex AI", "Cloud Storage", "Docker"]
  },
  {
    step: "08",
    title: "Testing & Deterministic Verification",
    subtitle: "Automated Evaluation & CI/CD",
    description: "Execute end-to-end evaluation runs, WCAG accessibility audits, hallucination checks, and load simulations before production release.",
    tools: ["Playwright", "Pytest", "Axe-core", "Automated Evals"]
  }
];
