export interface WiproProject {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  techStack: string[];
  impact: string;
  architectureSteps: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  cloudFocus: string;
  projects: WiproProject[];
}

export const experienceData: ExperienceItem = {
  company: "Wipro Technologies",
  role: "GenAI Intern",
  location: "Bangalore, India",
  period: "Jul 29, 2025 – Oct 31, 2025",
  summary: "Focused on developing enterprise Generative AI and Computer Vision applications natively integrated with Google Cloud Platform services.",
  cloudFocus: "Google Cloud Platform (GCP) • Vertex AI • Cloud Storage • Cloud Run • Vision API",
  projects: [
    {
      id: "wipro-p1",
      title: "Gemini Language Translator & Multimodal App",
      subtitle: "Enterprise Multilingual Processing Pipeline",
      problem: "Cross-border communication and domain-specific enterprise documents suffered from inaccurate direct translations lacking cultural nuances and technical context.",
      solution: "Engineered a high-fidelity translation engine powered by Google Gemini, incorporating context injection, linguistic nuance preservation, and seamless text-to-speech output.",
      techStack: ["Google Gemini API", "Python", "Google Cloud Run", "Speech Synthesis", "FastAPI"],
      impact: "Reduced domain mistranslations and preserved document semantic fidelity across multilingual enterprise operations.",
      architectureSteps: [
        "Audio / Text Input",
        "Context Normalization & Tokenization",
        "Gemini Prompt Optimization",
        "Target Language Synthesis",
        "TTS Streaming Audio Output"
      ]
    },
    {
      id: "wipro-p2",
      title: "ADA Compliance Checker",
      subtitle: "Automated Web Accessibility Audit & WCAG Remediation",
      problem: "Manual accessibility audits were slow, expensive, and failed to reliably detect subtle WCAG contrast, ARIA, and keyboard navigational violations at scale.",
      solution: "Built an automated compliance scanner leveraging headless Playwright automation and the Axe-core engine to crawl, inspect, and classify accessibility defects by severity.",
      techStack: ["Playwright", "Axe-core", "Python", "WCAG 2.1 Guidelines", "JSON Reporting"],
      impact: "Accelerated compliance audit turnaround by generating instant actionable severity reports with remediation code snippets.",
      architectureSteps: [
        "Target URL Ingestion",
        "Headless Browser Orchestration (Playwright)",
        "DOM Tree Extraction & Axe-core Injection",
        "WCAG Violation Categorization",
        "Executive & Dev Remediation Report"
      ]
    },
    {
      id: "wipro-p3",
      title: "Vision API Shelf Analysis",
      subtitle: "Automated Retail Planogram & Inventory Variance Detection",
      problem: "Retail stores suffered from untracked out-of-stock items and planogram non-compliance due to manual inspection latency.",
      solution: "Integrated Google Cloud Storage with the Google Vision API to execute automated object detection and product counting from captured retail shelf photography.",
      techStack: ["Google Cloud Vision API", "Google Cloud Storage", "Python", "Image Processing", "GCP IAM"],
      impact: "Provided near-real-time visibility into inventory variance and stockout incidents directly from shelf camera feeds.",
      architectureSteps: [
        "Store Shelf Image Upload",
        "Google Cloud Storage Event Trigger",
        "Google Vision API Feature Extraction",
        "Product Detection & Density Mapping",
        "Stock Variance Alert Dispatch"
      ]
    },
    {
      id: "wipro-p4",
      title: "Enterprise RAG Chatbot",
      subtitle: "Retrieval-Augmented Internal Knowledge Assistant",
      problem: "Internal team members struggled to quickly surface technical documentation, deployment runbooks, and internal SOPs buried across disparate manuals.",
      solution: "Developed an enterprise retrieval-augmented chatbot using vector embeddings, semantic chunking, and LLM synthesis with grounded citations.",
      techStack: ["Python", "FastAPI", "Vector Embeddings", "RAG Pipeline", "Google Cloud"],
      impact: "Drastically decreased lookup time for enterprise documentation with verified factual citations and hallucination mitigation.",
      architectureSteps: [
        "Document Parsing & Chunking",
        "Dense Embedding Generation",
        "Semantic Vector Search",
        "Context Injection & Grounding",
        "Streaming Response with Citations"
      ]
    }
  ]
};
