import asyncio
import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from rag_engine import RAGEngine

app = FastAPI(
    title="Prawin Lakhman Portfolio - AI Lab API",
    version="1.0.0",
    description="RAG and streaming assistant API for Prawin Lakhman's portfolio."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

kb_path = os.path.join(os.path.dirname(__file__), "knowledge_base.json")
rag = RAGEngine(kb_path)

class ChatRequest(BaseModel):
    message: str

@app.get("/api/health")
async def health():
    return {"status": "online", "model": "Neural-RAG-v1", "engineer": "Prawin Lakhman"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Empty message query.")

    result = rag.answer_query(request.message)

    async def event_generator():
        # Stream answer token by token for real-time natural streaming
        words = result["answer"].split(" ")
        for i, word in enumerate(words):
            chunk = word + (" " if i < len(words) - 1 else "")
            payload = json.dumps({"token": chunk})
            yield f"data: {payload}\n\n"
            await asyncio.sleep(0.02)

        # Send final completion event with sources
        final_payload = json.dumps({
            "done": True,
            "sources": result["sources"]
        })
        yield f"data: {final_payload}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
