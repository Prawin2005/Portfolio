export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "Agentic AI" | "Computer Vision" | "GenAI / Multimodal" | "Automated QA";
  featured: boolean;
  description: string;
  longDescription: string;
  architecture: {
    title: string;
    flow: { step: string; detail: string }[];
  };
  techStack: string[];
  keyHighlights: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "customer-support-agent",
    number: "01",
    title: "Customer Support Agent",
    subtitle: "Autonomous Multi-Agent Router & Knowledge System",
    category: "Agentic AI",
    featured: true,
    description: "Multi-agent architecture built with LangGraph and ChromaDB, featuring deterministic query routing, domain retrieval, validation gates, and SQLite stateful checkpointing.",
    longDescription: "An enterprise-grade autonomous support orchestrator that overcomes the single-prompt limitation by decoupling user queries into intent classification, specialized sub-agent delegations, retrieval augmentation from verified knowledge bases, and an assertive validation layer before delivering verified responses.",
    architecture: {
      title: "LangGraph Multi-Agent Architecture",
      flow: [
        { step: "User Ingestion", detail: "Query received via async FastAPI streaming endpoint." },
        { step: "Intent Router", detail: "LangGraph supervisor categorizes query into domain sub-graphs." },
        { step: "Specialized Agent", detail: "Domain agent invokes targeted tool definitions & context." },
        { step: "RAG & ChromaDB", detail: "Dense vector retrieval fetches ground-truth knowledge chunks." },
        { step: "Validator Node", detail: "Evaluator node checks factual consistency & prevents hallucinations." },
        { step: "Streaming Response", detail: "Deterministic synthesized response delivered via SSE to client." }
      ]
    },
    techStack: ["LangGraph", "Python", "FastAPI", "ChromaDB", "SQLite Checkpointing", "LLM APIs", "Docker"],
    keyHighlights: [
      "Stateful cyclical graphs with SQLite persistent session checkpointing",
      "Dynamic routing between technical, billing, and general support sub-agents",
      "Self-correcting validator node to eliminate hallucinated answers",
      "Low-latency streaming Server-Sent Events (SSE) frontend integration"
    ],
    metrics: [
      { label: "Routing Accuracy", value: "98.4%" },
      { label: "Retrieval Latency", value: "< 280ms" },
      { label: "State Persistence", value: "SQLite ACID" }
    ],
    githubUrl: "https://github.com",
    demoUrl: "#ai-lab"
  },
  {
    id: "ai-restock-manager",
    number: "02",
    title: "SmartStock Vision / AI Restock Manager",
    subtitle: "Real-Time Shelf Object Detection & Variance Analytics",
    category: "Computer Vision",
    featured: true,
    description: "End-to-end intelligent retail audit pipeline leveraging YOLOv8 object detection, FastAPI microservice, Supabase storage, and automated restock dispatching.",
    longDescription: "SmartStock Vision transforms passive store cameras into an active inventory intelligence feed. The system detects stock counts directly on shelves, compares live detected quantities against expected ERP inventory levels, isolates variances, and triggers automated email restock notifications.",
    architecture: {
      title: "Vision & Restock Analytics Pipeline",
      flow: [
        { step: "Shelf Image Capture", detail: "High-resolution store camera capture uploaded to Supabase." },
        { step: "YOLOv8 Detection", detail: "Fine-tuned computer vision model identifies products & bounding boxes." },
        { step: "Product Count", detail: "Bounding box aggregation and classification per shelf planogram zone." },
        { step: "Inventory Comparison", detail: "Backend reconciles live count against ERP database baseline." },
        { step: "Variance Computation", detail: "Calculates stock shortage threshold and out-of-stock delta." },
        { step: "Restock Decision", detail: "Automated alert dispatch & replenishment order generation." }
      ]
    },
    techStack: ["YOLOv8", "Python", "FastAPI / Flask", "React", "Supabase", "OpenCV", "SMTP Alerts"],
    keyHighlights: [
      "Sub-second YOLOv8 bounding box detection across dense shelf displays",
      "Real-time planogram zone mapping and density visualization",
      "Automated stockout trigger notification system",
      "Interactive modern React dashboard with live count analytics"
    ],
    metrics: [
      { label: "mAP@0.5", value: "92.1%" },
      { label: "Inference Time", value: "45ms" },
      { label: "Restock Delta", value: "Instant" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "gemini-translator",
    number: "03",
    title: "Gemini Translator",
    subtitle: "Multimodal Enterprise Linguistic Translation & Speech",
    category: "GenAI / Multimodal",
    featured: true,
    description: "Cloud-native bidirectional translation system powered by Google Gemini, capable of context-aware cultural nuance adaptation and streaming speech synthesis.",
    longDescription: "Developed during the Wipro Technologies GenAI internship, this application leverages Google Cloud and Gemini's multimodal reasoning to accurately translate complex enterprise dialogue and technical documents without losing domain terminology, concluding with realistic text-to-speech rendering.",
    architecture: {
      title: "Gemini Translation & Speech Pipeline",
      flow: [
        { step: "Input Speech / Text", detail: "Multimodal audio recording or raw document text ingestion." },
        { step: "Linguistic Normalization", detail: "Preprocessing tokenization and language boundary identification." },
        { step: "Gemini Multimodal", detail: "Deep semantic reasoning and context-injected prompt pipeline." },
        { step: "Context Translation", detail: "Culturally and technically aligned target language translation." },
        { step: "TTS Audio Engine", detail: "High-fidelity neural text-to-speech audio stream generation." }
      ]
    },
    techStack: ["Google Gemini API", "Google Cloud Run", "Python", "FastAPI", "TTS Synthesis"],
    keyHighlights: [
      "Preserves specialized technical taxonomy across multi-language dialogues",
      "Direct integration with Google Cloud serverless architecture",
      "Low latency end-to-end processing with audio stream playback"
    ],
    metrics: [
      { label: "BLEU Score Lift", value: "+18%" },
      { label: "Cloud Run Latency", value: "< 350ms" },
      { label: "Supported Languages", value: "35+" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "ada-compliance-checker",
    number: "04",
    title: "ADA Compliance Checker",
    subtitle: "Automated Web Accessibility & WCAG Severity Engine",
    category: "Automated QA",
    featured: true,
    description: "Automated accessibility auditing engine combining Playwright browser orchestration and Axe-core to detect, categorize, and report WCAG violations with remediation code.",
    longDescription: "Engineered at Wipro Technologies to eliminate the friction of manual accessibility testing. It spins up headless browser sessions, navigates complex multi-state applications, runs automated axe-core audits, and produces developer-ready remediation advisories with code diffs.",
    architecture: {
      title: "Automated Accessibility Engine",
      flow: [
        { step: "Target Ingestion", detail: "URL queue ingested with authentication and viewport parameters." },
        { step: "Playwright Crawler", detail: "Headless browser navigates DOM states and dynamic widgets." },
        { step: "Axe-core Rule Engine", detail: "Evaluates WCAG 2.1 A, AA, and AAA compliance criteria." },
        { step: "Accessibility Analysis", detail: "Calculates impact score, contrast ratios, and ARIA tree gaps." },
        { step: "Severity Reporting", detail: "Exports actionable JSON reports with precise HTML node locators." }
      ]
    },
    techStack: ["Playwright", "Axe-core", "Python", "FastAPI", "WCAG 2.1 Engine"],
    keyHighlights: [
      "Automated evaluation against WCAG 2.1 AA/AAA standards",
      "Evaluates dynamic interactive single-page application states",
      "Pinpoints exact CSS selectors and HTML elements needing remediation"
    ],
    metrics: [
      { label: "Audit Speed", value: "10x vs Manual" },
      { label: "WCAG Coverage", value: "94 Rules" },
      { label: "Zero False Positives", value: "Deterministic" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "vision-api-shelf-analyzer",
    number: "05",
    title: "Vision API Shelf Analyzer",
    subtitle: "GCP Cloud Storage & Vision API Retail Audit",
    category: "Computer Vision",
    featured: true,
    description: "Serverless retail shelf telemetry system built on Google Cloud Storage and Vision API for automated product detection, barcode recognition, and inventory density analysis.",
    longDescription: "Built for cloud-native automated retail audits. Stores upload shelf photos to Google Cloud Storage buckets, triggering asynchronous processing with the Vision API to detect products, categorize packaging, and calculate shelf share metrics without on-premise GPU servers.",
    architecture: {
      title: "GCP Cloud Vision Pipeline",
      flow: [
        { step: "Store Image Upload", detail: "Edge store cameras send images to Google Cloud Storage." },
        { step: "GCS Event Trigger", detail: "Bucket notification executes async cloud processing function." },
        { step: "Google Vision API", detail: "Extracts label detection, localized text, and object coordinates." },
        { step: "Product Detection", detail: "Matches detected object labels against registered store SKUs." },
        { step: "Planogram Analysis", detail: "Computes shelf occupancy percentage and missing SKU alerts." }
      ]
    },
    techStack: ["Google Vision API", "Google Cloud Storage", "Python", "Cloud Run", "GCP IAM"],
    keyHighlights: [
      "100% serverless pipeline scaling on demand with store camera feeds",
      "Integrated with GCP Cloud IAM enterprise security policies",
      "Detects label tags, logo placement, and missing facing slots"
    ],
    metrics: [
      { label: "Cloud Throughput", value: "100+ images/min" },
      { label: "Deployment", value: "Google Cloud" },
      { label: "Accuracy", value: "96.5%" }
    ],
    githubUrl: "https://github.com"
  }
];
