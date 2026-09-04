/**
 * POST /api/chat
 *
 * RAG-powered chat endpoint for Excel Academy.
 * 1. Runs keyword retrieval against lib/knowledge-base.ts
 * 2. Injects top-3 chunks into the Gemini system prompt
 * 3. Calls Gemini 1.5 Flash via REST
 * 4. Returns the assistant reply as JSON
 */

import { NextRequest, NextResponse } from "next/server";
import { retrieve, buildContext } from "@/lib/rag";

// ── Types ─────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

// ── System prompt ─────────────────────────────────────────────────────────

function buildSystemPrompt(context: string): string {
  return `You are the helpful virtual assistant for Excel Academy, a personalised coaching centre for students in Classes 8–12 in New Delhi, India.

Your job is to answer prospective students' and parents' questions accurately and warmly, using ONLY the factual context provided below.

RULES:
1. Answer ONLY from the provided context. Do not invent facts, statistics, fees, or schedules not mentioned.
2. If the context does not contain the answer, say so honestly and direct them to contact the academy (phone: +91 98765 43210, email: info@excelacademy.in).
3. Be friendly, concise, and helpful. Use a warm, professional tone.
4. For fee/admission enquiries, always direct them to contact the academy directly.
5. Format lists with bullet points when appropriate.
6. Keep answers under 150 words unless the question genuinely requires more.

CONTEXT FROM EXCEL ACADEMY KNOWLEDGE BASE:
${context}

Remember: You are speaking on behalf of Excel Academy. Be helpful, accurate, and encouraging.`;
}

// ── Gemini REST API call ──────────────────────────────────────────────────

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

async function callGemini(
  systemPrompt: string,
  history: ChatMessage[],
  userMessage: string,
  apiKey: string
): Promise<string> {
  // Build Gemini conversation history
  const contents: GeminiContent[] = [];

  // Add chat history (excluding the current message)
  for (const msg of history.slice(-6)) { // keep last 6 messages for context
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    });
  }

  // Add current user message
  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 512,
      topP: 0.8,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No text in Gemini response");
  }

  return text.trim();
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback: return a helpful message without AI
      return NextResponse.json({
        reply:
          "Our AI assistant isn't configured yet. For immediate help, please contact Excel Academy at +91 98765 43210 or email info@excelacademy.in. We're available Monday–Saturday, 8 AM–8 PM.",
        fallback: true,
      });
    }

    // 1. Retrieve relevant context
    const results = retrieve(message, 3);
    const context = buildContext(results);

    // 2. Build system prompt with context
    const systemPrompt = buildSystemPrompt(context);

    // 3. Call Gemini
    const reply = await callGemini(systemPrompt, history, message, apiKey);

    return NextResponse.json({ reply, fallback: false });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      {
        reply:
          "Sorry, I ran into an issue. Please contact Excel Academy directly at +91 98765 43210 or info@excelacademy.in.",
        fallback: true,
      },
      { status: 200 } // return 200 so the client shows the fallback message nicely
    );
  }
}
