import { achievementsData } from "../data/achievements";

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onSources?: (sources: string[]) => void;
  onError?: (err: Error) => void;
  onDone?: () => void;
}

export async function queryAILab(
  prompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const BACKEND_URL = "http://localhost:8000/api/chat";

  // Try live FastAPI backend first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.token) {
                callbacks.onToken(data.token);
              }
              if (data.done) {
                if (data.sources && callbacks.onSources) {
                  callbacks.onSources(data.sources);
                }
              }
            } catch {
              // ignore partial chunk json parse errors
            }
          }
        }
      }

      callbacks.onDone?.();
      return;
    }
  } catch {
    // Backend unavailable or timed out; execute client-side RAG fallback seamlessly
  }

  // Client-side deterministic RAG fallback engine
  await executeClientRAG(prompt, callbacks);
}

// ─── Knowledge base (mirrors server/knowledge_base.json) ──────────────────────
const KB = {
  profile: {
    name: "Prawin Lakhman",
    role: "AI Engineer & Python Developer",
    location: "Available Anywhere in India (Open to Relocate & Travel)",
    focus: "Generative AI, RAG, Agentic AI, Computer Vision, Cloud Applications",
    summary:
      "Prawin Lakhman is an AI Engineer and Python Developer specializing in building production-grade intelligent systems. He has hands-on experience developing multi-agent workflows with LangGraph, hybrid RAG pipelines, computer vision models with YOLOv8, and cloud deployments on Google Cloud Platform."
  },
  wipro: {
    company: "Wipro Technologies",
    location: "Bangalore",
    role: "GenAI Intern",
    duration: "Jul 29 2025 – Oct 31 2025",
    technologies:
      "Google Cloud Platform (Vertex AI, Cloud Run, Cloud Storage, Vision API), Python, FastAPI, Playwright, Axe-core",
    projects: [
      {
        name: "Gemini Language Translator & Multimodal App",
        description:
          "Multilingual translation pipeline with cultural nuance preservation and streaming TTS audio synthesis using Gemini APIs on Cloud Run."
      },
      {
        name: "ADA Compliance Checker",
        description:
          "Automated web accessibility auditor running headless Playwright and Axe-core to generate instant WCAG 2.1 severity reports."
      },
      {
        name: "Vision API Shelf Analysis",
        description:
          "Automated retail shelf monitoring pipeline connecting Google Cloud Storage and Vision API to identify product out-of-stocks and planogram variance."
      },
      {
        name: "Enterprise RAG Chatbot",
        description:
          "Internal technical document knowledge retrieval chatbot using dense vector embeddings and grounded citations."
      }
    ]
  },
  projects: [
    {
      name: "Customer Support Agent",
      category: "Agentic AI",
      stack: "LangGraph, Python, FastAPI, ChromaDB, SQLite Checkpointing, LLM APIs",
      architecture:
        "User Query → Intent Router → Specialized Sub-Agents → RAG Knowledge Retrieval → Validator Node → Streaming Response",
      details:
        "Solves multi-step enterprise queries using stateful cyclical graphs with SQLite checkpointing and deterministic validation to prevent hallucinations."
    },
    {
      name: "SmartStock Vision / AI Restock Manager",
      category: "Computer Vision & Full-Stack",
      stack: "YOLOv8, Python, FastAPI, React, Supabase, OpenCV",
      architecture:
        "Shelf Camera Image → YOLOv8 Object Detection → Product Count per Zone → ERP Inventory Comparison → Variance Computation → Automated Restock Alert",
      details:
        "Real-time automated retail auditing system detecting on-shelf product shortages with 45ms inference latency and 92.1% mAP@0.5."
    },
    {
      name: "Gemini Translator",
      category: "GenAI / Multimodal",
      stack: "Google Gemini, Cloud Run, Python, FastAPI, TTS Synthesis",
      details:
        "Context-preserving multilingual translation with low-latency speech synthesis deployed on serverless GCP."
    },
    {
      name: "ADA Compliance Checker",
      category: "Automated QA & Accessibility",
      stack: "Playwright, Axe-core, Python, WCAG 2.1 Rules",
      details:
        "Headless browser crawler auditing web applications against WCAG 2.1 AA/AAA criteria with automated code fix generation."
    },
    {
      name: "Vision API Shelf Analyzer",
      category: "Cloud Computer Vision",
      stack: "Google Vision API, Google Cloud Storage, Cloud Run, Python",
      details:
        "Serverless event-driven image processing pipeline calculating shelf occupancy and missing SKU alerts."
    }
  ],
  skills: {
    languages: ["Python", "TypeScript", "SQL", "JavaScript", "HTML5", "CSS3"],
    ai_ml: ["Generative AI", "RAG", "Agentic AI", "LangGraph", "LangChain", "PyTorch", "TensorFlow", "Scikit-learn", "YOLOv8", "ChromaDB", "FAISS", "Embeddings"],
    backend: ["FastAPI", "Uvicorn", "Pydantic", "REST APIs", "SSE Streaming", "AsyncIO", "SQLite", "Supabase", "PostgreSQL"],
    cloud: ["Google Cloud Platform (GCP)", "Cloud Run", "Vertex AI", "Cloud Storage", "Vision API", "Docker", "Artifact Registry"],
    frontend: ["React", "TypeScript", "Three.js", "WebGL", "Tailwind CSS", "GSAP", "Lenis", "Framer Motion"]
  },
  achievements: [
    "Wipro Technologies GenAI Internship (Jul–Oct 2025)",
    "Google Cloud Hackathon Participant & Prototype Developer",
    "NIT Trichy Competitive Programming Contest",
    "Zoho Young Creators Application Engineering",
    "Modern Web Engineering & UI/UX Certification"
  ]
};

// ─── Route query to the most relevant answer ──────────────────────────────────
async function executeClientRAG(prompt: string, callbacks: StreamCallbacks) {
  const p = prompt.toLowerCase();
  let answer = "";
  const sources: string[] = [];

  // ── Identity / who is Prawin ────────────────────────────────────────────────
  if (/who is|who are|about prawin|introduce|tell me about him/.test(p)) {
    sources.push("Profile: Prawin Lakhman");
    answer =
      `${KB.profile.name} is an ${KB.profile.role}.\n` +
      `Location: ${KB.profile.location}.\n` +
      `Focus: ${KB.profile.focus}.\n\n` +
      KB.profile.summary;

  // ── Wipro internship ────────────────────────────────────────────────────────
  } else if (/wipro|internship|intern|bangalore/.test(p)) {
    sources.push("Experience: Wipro Technologies");
    const projList = KB.wipro.projects
      .map((pr, i) => `  ${i + 1}. ${pr.name}: ${pr.description}`)
      .join("\n");
    answer =
      `Prawin interned as ${KB.wipro.role} at ${KB.wipro.company} (${KB.wipro.location}) ` +
      `from ${KB.wipro.duration}.\n\n` +
      `Technologies: ${KB.wipro.technologies}.\n\n` +
      `Projects built:\n${projList}`;

  // ── Individual featured projects ────────────────────────────────────────────
  } else if (/customer support|langgraph|multi.?agent/.test(p)) {
    const proj = KB.projects[0];
    sources.push(`Project: ${proj.name}`);
    answer =
      `Project: ${proj.name}\nCategory: ${proj.category}\n` +
      `Stack: ${proj.stack}\nArchitecture: ${proj.architecture}\n` +
      `Details: ${proj.details}`;

  } else if (/smartstock|restock|yolo|inventory/.test(p)) {
    const proj = KB.projects[1];
    sources.push(`Project: ${proj.name}`);
    answer =
      `Project: ${proj.name}\nCategory: ${proj.category}\n` +
      `Stack: ${proj.stack}\nArchitecture: ${proj.architecture}\n` +
      `Details: ${proj.details}`;

  } else if (/gemini translator|gemini translation|tts|text.to.speech/.test(p)) {
    const proj = KB.projects[2];
    sources.push(`Project: ${proj.name}`);
    answer =
      `Project: ${proj.name}\nCategory: ${proj.category}\n` +
      `Stack: ${proj.stack}\nDetails: ${proj.details}`;

  } else if (/ada|compliance|accessibility|axe.core|wcag/.test(p)) {
    const proj = KB.projects[3];
    sources.push(`Project: ${proj.name}`);
    answer =
      `Project: ${proj.name}\nCategory: ${proj.category}\n` +
      `Stack: ${proj.stack}\nDetails: ${proj.details}`;

  } else if (/vision api|shelf analyz|shelf monitor|cloud vision/.test(p)) {
    const proj = KB.projects[4];
    sources.push(`Project: ${proj.name}`);
    answer =
      `Project: ${proj.name}\nCategory: ${proj.category}\n` +
      `Stack: ${proj.stack}\nDetails: ${proj.details}`;

  // ── All projects overview ───────────────────────────────────────────────────
  } else if (/projects?|built|created|developed|work/.test(p) && !/how|process|method/.test(p)) {
    sources.push("Featured Projects");
    answer =
      "Projects built by Prawin Lakhman:\n\n" +
      KB.projects
        .map((pr, i) => `${i + 1}. ${pr.name} (${pr.category})\n   Stack: ${pr.stack}\n   ${pr.details}`)
        .join("\n\n");

  // ── Skills / tech stack ─────────────────────────────────────────────────────
  } else if (/skill|technolog|stack|tools|know|language|framework/.test(p)) {
    sources.push("Technical Skills & Technologies");
    const s = KB.skills;
    answer =
      `Languages: ${s.languages.join(", ")}\n` +
      `AI/ML: ${s.ai_ml.join(", ")}\n` +
      `Backend: ${s.backend.join(", ")}\n` +
      `Cloud: ${s.cloud.join(", ")}\n` +
      `Frontend: ${s.frontend.join(", ")}`;

  // ── Achievements ────────────────────────────────────────────────────────────
  } else if (/achievement|award|hackathon|certification|contest|milestone/.test(p)) {
    sources.push("Verified Achievements");
    const ach = achievementsData.map((a) => `• ${a.title} (${a.organization}, ${a.year}): ${a.highlight}`).join("\n");
    answer = `Prawin's verified achievements:\n\n${ach}`;

  // ── Location / availability ─────────────────────────────────────────────────
  } else if (/location|relocate|available|where|india|travel|remote|hybrid/.test(p)) {
    sources.push("Profile: Availability");
    answer = `Location & Availability: ${KB.profile.location}.`;

  // ── Engineering process ─────────────────────────────────────────────────────
  } else if (/process|how you build|how he builds|methodology|approach/.test(p)) {
    sources.push("Engineering Process");
    answer =
      "Prawin's engineering process:\n" +
      "1. Problem Deconstruction & Failure Boundaries\n" +
      "2. Research & Latency Benchmarks\n" +
      "3. State Machine & API Architecture (LangGraph / Pydantic)\n" +
      "4. AI/ML Engineering & Guardrails\n" +
      "5. Asynchronous Backend & SSE Streaming (FastAPI)\n" +
      "6. Modern React UI & Real-Time UX\n" +
      "7. Serverless Cloud Infrastructure (Google Cloud Run / Vertex AI)\n" +
      "8. Deterministic Verification & Automated Evals";

  // ── Greetings / small talk ──────────────────────────────────────────────────
  } else if (/^(hi|hello|hey|howdy|hola|greetings|good\s*(morning|evening|afternoon|day)|what'?s up|sup)\b/.test(p)) {
    sources.push("Portfolio AI Lab");
    answer =
      "Hey there! 👋 I'm Prawin's portfolio assistant.\n\n" +
      "I can tell you all about Prawin's projects, skills, experience, and background.\n\n" +
      "Try asking:\n" +
      "• \"What projects did Prawin build?\"\n" +
      "• \"Tell me about his Wipro internship\"\n" +
      "• \"What is his tech stack?\"\n" +
      "• \"Explain the Customer Support Agent\"";

  // ── Out of scope ────────────────────────────────────────────────────────────
  } else {
    sources.push("Portfolio AI Lab");
    answer =
      "I'm Prawin's portfolio assistant — I can only answer questions about his projects, skills, and experience.\n\n" +
      "Try asking:\n" +
      "• \"What projects did Prawin build?\"\n" +
      "• \"Tell me about his Wipro internship\"\n" +
      "• \"What is his tech stack?\"\n" +
      "• \"Explain the Customer Support Agent\"\n" +
      "• \"What are his achievements?\"";
  }

  // Stream tokens with realistic AI typing cadence
  const words = answer.split(" ");
  for (let i = 0; i < words.length; i++) {
    const chunk = words[i] + (i < words.length - 1 ? " " : "");
    callbacks.onToken(chunk);
    await new Promise((res) => setTimeout(res, 22));
  }

  if (callbacks.onSources) {
    callbacks.onSources(sources);
  }
  callbacks.onDone?.();
}
