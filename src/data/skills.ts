export interface TechNodeItem {
  id: string;
  name: string;
  category: "ai" | "backend" | "cloud" | "frontend";
  level: "Advanced" | "Proficient" | "Core";
  description: string;
  ecosystem: string[];
  connections: string[];
  x?: number; // relative normalized coordinate for graph positioning
  y?: number;
}

export const skillsData: TechNodeItem[] = [
  {
    id: "python",
    name: "Python",
    category: "backend",
    level: "Advanced",
    description: "Primary language for AI pipelines, asynchronous backends, and data science workflows.",
    ecosystem: ["NumPy", "Pandas", "AsyncIO", "FastAPI", "Automation", "PyTorch"],
    connections: ["genai", "rag", "fastapi", "langgraph", "pytorch", "aiml"]
  },
  {
    id: "genai",
    name: "GenAI",
    category: "ai",
    level: "Advanced",
    description: "Foundation model engineering, context optimization, structured outputs, and prompt chaining.",
    ecosystem: ["Gemini 1.5 Pro", "Vertex AI", "Claude", "Embeddings", "Evaluation"],
    connections: ["python", "rag", "agentic", "langgraph", "gcp"]
  },
  {
    id: "rag",
    name: "RAG",
    category: "ai",
    level: "Advanced",
    description: "Retrieval-Augmented Generation with hybrid vector search, reranking, and semantic chunking.",
    ecosystem: ["ChromaDB", "FAISS", "Cosine Similarity", "Dense Retrieval", "Context Compression"],
    connections: ["python", "genai", "agentic", "fastapi"]
  },
  {
    id: "agentic",
    name: "Agentic AI",
    category: "ai",
    level: "Advanced",
    description: "Multi-agent autonomous systems, stateful loop execution, tool calling, and deterministic routing.",
    ecosystem: ["State Machines", "Tool Calling", "Human-in-the-loop", "Self-Correction", "Reflection"],
    connections: ["langgraph", "genai", "rag", "fastapi"]
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "ai",
    level: "Advanced",
    description: "Graph-based cyclical agent orchestration with SQLite persistent checkpointing.",
    ecosystem: ["StateGraph", "Cyclic Flows", "Checkpointing", "LangChain", "Conditional Edges"],
    connections: ["agentic", "python", "genai"]
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    level: "Advanced",
    description: "High-performance asynchronous REST and SSE streaming APIs for AI microservices.",
    ecosystem: ["Pydantic v2", "Uvicorn", "SSE Streaming", "Async Routes", "Dependency Injection"],
    connections: ["python", "rag", "react", "gcp"]
  },
  {
    id: "gcp",
    name: "Google Cloud (GCP)",
    category: "cloud",
    level: "Proficient",
    description: "Cloud-native AI deployment, serverless compute, and enterprise storage services.",
    ecosystem: ["Vertex AI", "Cloud Run", "Cloud Storage", "Vision API", "Artifact Registry"],
    connections: ["genai", "fastapi", "aiml"]
  },
  {
    id: "aiml",
    name: "AI / ML",
    category: "ai",
    level: "Advanced",
    description: "Supervised and unsupervised learning, model training, evaluation, and inference optimization.",
    ecosystem: ["Scikit-learn", "Classification", "Regression", "Clustering", "YOLOv8"],
    connections: ["python", "pytorch", "tensorflow", "gcp"]
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai",
    level: "Proficient",
    description: "Deep learning tensor operations, neural network architectures, and custom training loops.",
    ecosystem: ["Tensors", "Autograd", "TorchVision", "Neural Networks"],
    connections: ["python", "aiml"]
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai",
    level: "Proficient",
    description: "End-to-end open source machine learning platform for training and production deployment.",
    ecosystem: ["Keras", "Model Serving", "SavedModel", "TFLite"],
    connections: ["python", "aiml"]
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "Advanced",
    description: "Component architecture, interactive state management, and real-time streaming UI integration.",
    ecosystem: ["React 19", "Hooks", "Virtual DOM", "Context API", "Suspense"],
    connections: ["typescript", "fastapi", "threejs"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "Advanced",
    description: "Type safety, robust interfaces, refactor predictability, and strict API schemas.",
    ecosystem: ["Generics", "Strict Null Checks", "Type Inference", "Interfaces"],
    connections: ["react", "threejs"]
  },
  {
    id: "threejs",
    name: "Three.js / WebGL",
    category: "frontend",
    level: "Proficient",
    description: "3D scene composition, custom GLSL shaders, camera controls, and spatial interactive nodes.",
    ecosystem: ["Shaders", "BufferGeometry", "Lattices", "Post-processing"],
    connections: ["react", "typescript"]
  },
  {
    id: "sql",
    name: "SQL & Databases",
    category: "backend",
    level: "Proficient",
    description: "Relational modeling, indexing, ACID transactions, vector storage integrations.",
    ecosystem: ["PostgreSQL", "SQLite", "Supabase", "ChromaDB", "Vector Indexing"],
    connections: ["python", "fastapi", "rag"]
  }
];

export const skillCategories = [
  { key: "all", label: "All Technologies" },
  { key: "ai", label: "AI, GenAI & Agents" },
  { key: "backend", label: "Python & Backend" },
  { key: "cloud", label: "Google Cloud Platform" },
  { key: "frontend", label: "Frontend & 3D" }
] as const;
