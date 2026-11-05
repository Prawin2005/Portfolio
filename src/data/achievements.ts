export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: "Internship" | "Hackathon" | "Competition" | "Certification";
  description: string;
  highlight: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "wipro-internship",
    year: "2025",
    title: "GenAI Internship",
    organization: "Wipro Technologies • Bangalore",
    category: "Internship",
    description: "Selected for specialized GenAI internship developing production-oriented Google Cloud AI applications, ADA accessibility audit systems, and retail computer vision pipelines.",
    highlight: "Built 4 enterprise Google Cloud AI systems"
  },
  {
    id: "gcp-hackathon",
    year: "2025",
    title: "Google Cloud Hackathon",
    organization: "Google Cloud Ecosystem",
    category: "Hackathon",
    description: "Architected rapid prototype leveraging Vertex AI, multimodal Gemini APIs, and serverless Cloud Run compute under intense competition constraints.",
    highlight: "Vertex AI & Cloud Native Architecture"
  },
  {
    id: "nit-trichy",
    year: "2024",
    title: "Competitive Programming Contest",
    organization: "NIT Trichy",
    category: "Competition",
    description: "Competed in algorithmic problem solving, graph algorithms, dynamic programming, and computational efficiency challenges.",
    highlight: "Advanced Algorithmic Problem Solving"
  },
  {
    id: "zoho-creators",
    year: "2024",
    title: "Zoho Young Creators",
    organization: "Zoho Corporation",
    category: "Competition",
    description: "Designed and engineered rapid application workflows using structured business automation logic and modern database models.",
    highlight: "Business Logic Automation & Workflows"
  },
  {
    id: "web-design",
    year: "2023",
    title: "Modern Web Engineering & Design",
    organization: "Specialized Course & Project Certification",
    category: "Certification",
    description: "Mastered responsive layouts, UI/UX interaction principles, component architectures, and web performance optimization.",
    highlight: "UI/UX & Interactive Frontend Foundations"
  }
];
