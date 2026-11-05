import json
import os
import re
from typing import Dict, Any, List

from dotenv import load_dotenv
import google.generativeai as genai

# Load .env from the same directory as this file
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))


class RAGEngine:
    def __init__(self, knowledge_base_path: str):
        with open(knowledge_base_path, "r", encoding="utf-8") as f:
            self.kb: Dict[str, Any] = json.load(f)
        self.chunks = self._generate_chunks()

        # Configure Gemini
        api_key = os.environ.get("GEMINI_API_KEY", "")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel("gemini-2.0-flash")
            self.use_llm = True
        else:
            self.use_llm = False
            print("[RAGEngine] WARNING: GEMINI_API_KEY not set. Falling back to deterministic answers.")

    # ------------------------------------------------------------------ #
    #  Chunk generation
    # ------------------------------------------------------------------ #

    def _generate_chunks(self) -> List[Dict[str, Any]]:
        chunks = []

        # Profile
        p = self.kb.get("profile", {})
        chunks.append({
            "title": f"Profile: {p.get('name')}",
            "text": (
                f"Name: {p.get('name')}. "
                f"Role: {p.get('role')}. "
                f"Location: {p.get('location')}. "
                f"Focus areas: {p.get('focus')}. "
                f"{p.get('summary')}"
            ),
            "keywords": ["who", "about", "profile", "prawin", "lakhman", "role", "background", "bio"]
        })

        # Wipro internship overview
        w = self.kb.get("wipro_internship", {})
        chunks.append({
            "title": f"Internship: {w.get('company')}",
            "text": (
                f"Prawin interned as {w.get('role')} at {w.get('company')} "
                f"in {w.get('location')} from {w.get('duration')}. "
                f"Technologies used: {w.get('technologies')}. "
                f"He built 4 core Google Cloud AI applications during this internship."
            ),
            "keywords": ["wipro", "internship", "intern", "bangalore", "gcp", "google cloud", "duration"]
        })

        # Individual Wipro projects
        for proj in w.get("projects", []):
            chunks.append({
                "title": f"Wipro Project: {proj.get('name')}",
                "text": f"At Wipro, Prawin built '{proj.get('name')}': {proj.get('description')}",
                "keywords": ["wipro", proj.get("name", "").lower()]
            })

        # Featured projects
        for proj in self.kb.get("projects", []):
            chunks.append({
                "title": f"Project: {proj.get('name')}",
                "text": (
                    f"Project: '{proj.get('name')}'. "
                    f"Category: {proj.get('category')}. "
                    f"Tech stack: {proj.get('stack')}. "
                    f"Architecture: {proj.get('architecture', 'N/A')}. "
                    f"Details: {proj.get('details')}"
                ),
                "keywords": [
                    "project", proj.get("name", "").lower(),
                    proj.get("category", "").lower()
                ]
            })

        # Skills
        s = self.kb.get("skills", {})
        chunks.append({
            "title": "Technical Skills & Technologies",
            "text": (
                f"Languages: {', '.join(s.get('languages', []))}. "
                f"AI/ML: {', '.join(s.get('ai_ml', []))}. "
                f"Backend: {', '.join(s.get('backend', []))}. "
                f"Cloud: {', '.join(s.get('cloud', []))}. "
                f"Frontend: {', '.join(s.get('frontend', []))}."
            ),
            "keywords": ["skills", "stack", "technologies", "tools", "python", "fastapi", "react", "cloud"]
        })

        # Achievements
        ach = self.kb.get("achievements", [])
        chunks.append({
            "title": "Verified Achievements & Contests",
            "text": "Verified milestones: " + " | ".join(ach),
            "keywords": ["achievements", "awards", "hackathon", "competitions", "certifications"]
        })

        return chunks

    # ------------------------------------------------------------------ #
    #  Retrieval
    # ------------------------------------------------------------------ #

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        tokens = set(re.findall(r"\w+", query.lower()))
        scored = []
        for chunk in self.chunks:
            score = 0
            for kw in chunk["keywords"]:
                for word in kw.split():
                    if word in tokens:
                        score += 3
            chunk_tokens = set(re.findall(r"\w+", chunk["text"].lower()))
            overlap = tokens.intersection(chunk_tokens)
            score += len(overlap) * 1.5
            if score > 0:
                scored.append((score, chunk))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = [item[1] for item in scored[:top_k]]
        if not results:
            results = [self.chunks[0], self.chunks[1]]
        return results

    # ------------------------------------------------------------------ #
    #  Answer generation
    # ------------------------------------------------------------------ #

    def answer_query(self, query: str) -> Dict[str, Any]:
        relevant = self.retrieve(query)
        context = "\n\n".join([f"[{r['title']}]\n{r['text']}" for r in relevant])
        sources = [r["title"] for r in relevant]

        if self.use_llm:
            ans = self._ask_gemini(query, context)
        else:
            ans = self._deterministic_answer(query, relevant)

        return {
            "answer": ans,
            "sources": sources,
            "context": context
        }

    def _ask_gemini(self, query: str, context: str) -> str:
        system_prompt = (
            "You are a friendly AI assistant embedded in Prawin Lakhman's personal portfolio website. "
            "Your job is to answer questions about Prawin — his skills, projects, experience, and background.\n\n"
            "Rules you must follow strictly:\n"
            "1. For greetings (hi, hello, hey, etc.) respond warmly and briefly introduce yourself as Prawin's portfolio assistant, "
            "then invite the user to ask about Prawin's work.\n"
            "2. For questions about Prawin, answer ONLY from the context below. Do NOT invent anything not in the context.\n"
            "3. If the question is unrelated to Prawin (e.g. general knowledge, coding help, etc.), reply: "
            "\"I'm Prawin's portfolio assistant — I can only answer questions about his projects, skills, and experience.\"\n"
            "4. Keep answers concise, factual, and professional.\n"
            "5. Do not add disclaimers like 'Based on the context provided...' — just answer directly.\n"
            "6. Format with bullet points or numbered lists only when it genuinely improves clarity.\n\n"
            f"CONTEXT:\n{context}"
        )

        response = self.model.generate_content(
            f"{system_prompt}\n\nUser question: {query}"
        )
        return response.text.strip()

    def _deterministic_answer(self, query: str, relevant: List[Dict[str, Any]]) -> str:
        """Tight keyword-to-answer mapping used when no LLM key is configured."""
        q = query.lower()

        # --- Profile / identity ---
        if any(w in q for w in ["who is", "who are", "about prawin", "introduce"]):
            p = self.kb["profile"]
            return (
                f"{p['name']} is an {p['role']}.\n"
                f"Location: {p['location']}.\n"
                f"Focus: {p['focus']}.\n\n"
                f"{p['summary']}"
            )

        # --- Wipro internship ---
        if any(w in q for w in ["wipro", "internship", "intern", "bangalore"]):
            w = self.kb["wipro_internship"]
            proj_list = "\n".join(
                f"  {i+1}. {pr['name']}: {pr['description']}"
                for i, pr in enumerate(w["projects"])
            )
            return (
                f"Prawin interned as {w['role']} at {w['company']} ({w['location']}) "
                f"from {w['duration']}.\n\n"
                f"Technologies: {w['technologies']}.\n\n"
                f"Projects built:\n{proj_list}"
            )

        # --- Individual projects ---
        project_map = {
            "customer support agent": "Customer Support Agent",
            "langgraph":              "Customer Support Agent",
            "smartstock":             "SmartStock Vision / AI Restock Manager",
            "restock":                "SmartStock Vision / AI Restock Manager",
            "yolo":                   "SmartStock Vision / AI Restock Manager",
            "gemini translator":      "Gemini Translator",
            "translator":             "Gemini Translator",
            "ada compliance":         "ADA Compliance Checker",
            "compliance checker":     "ADA Compliance Checker",
            "axe":                    "ADA Compliance Checker",
            "vision api shelf":       "Vision API Shelf Analyzer",
            "shelf analyzer":         "Vision API Shelf Analyzer",
        }
        for keyword, proj_name in project_map.items():
            if keyword in q:
                proj = next(
                    (p for p in self.kb["projects"] if p["name"] == proj_name), None
                )
                if proj:
                    return (
                        f"Project: {proj['name']}\n"
                        f"Category: {proj['category']}\n"
                        f"Stack: {proj['stack']}\n"
                        f"Architecture: {proj.get('architecture', 'N/A')}\n"
                        f"Details: {proj['details']}"
                    )

        # --- Skills ---
        if any(w in q for w in ["skill", "technolog", "stack", "tools", "know", "language"]):
            s = self.kb["skills"]
            return (
                f"Languages: {', '.join(s['languages'])}\n"
                f"AI/ML: {', '.join(s['ai_ml'])}\n"
                f"Backend: {', '.join(s['backend'])}\n"
                f"Cloud: {', '.join(s['cloud'])}\n"
                f"Frontend: {', '.join(s['frontend'])}"
            )

        # --- Achievements ---
        if any(w in q for w in ["achievement", "award", "hackathon", "certification", "contest"]):
            ach = self.kb["achievements"]
            return "Verified achievements:\n" + "\n".join(f"• {a}" for a in ach)

        # --- Location / availability ---
        if any(w in q for w in ["location", "relocate", "available", "where", "india", "travel"]):
            p = self.kb["profile"]
            return f"Location/Availability: {p['location']}"

        # --- Projects overview ---
        if any(w in q for w in ["project", "built", "created", "developed"]):
            projects = self.kb["projects"]
            return "Projects built by Prawin:\n" + "\n".join(
                f"• {p['name']} ({p['category']}): {p['details']}" for p in projects
            )

        # --- Out of scope ---
        return (
            "I can only answer questions about Prawin Lakhman's portfolio, "
            "projects, skills, and experience. Try asking:\n"
            "• \"What projects did Prawin build?\"\n"
            "• \"Tell me about his Wipro internship\"\n"
            "• \"What is his tech stack?\"\n"
            "• \"Explain the Customer Support Agent\""
        )
