/**
 * Excel Academy — RAG Retrieval Engine
 *
 * Lightweight BM25-inspired keyword retriever.
 * No external dependencies. Works in both Node (API route) and browser.
 */

import { KNOWLEDGE_BASE, type KnowledgeChunk } from "./knowledge-base";

// ── Tokenisation ──────────────────────────────────────────────────────────

/** Normalise a string into a bag of lowercase tokens. */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// ── Stop words (common English words that don't aid retrieval) ─────────────
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "in", "of", "to", "and", "or", "for",
  "on", "at", "by", "as", "be", "do", "my", "me", "we", "he", "she",
  "they", "you", "i", "was", "are", "that", "this", "with", "have",
  "has", "had", "not", "but", "from", "what", "which", "who", "how",
  "when", "where", "why", "can", "will", "would", "should", "could",
  "there", "their", "about", "your", "tell", "please", "hi", "hello",
]);

function filterStopWords(tokens: string[]): string[] {
  return tokens.filter((t) => !STOP_WORDS.has(t));
}

// ── Scoring ───────────────────────────────────────────────────────────────

interface ScoredChunk {
  chunk: KnowledgeChunk;
  score: number;
}

/**
 * Score a single chunk against a query.
 *
 * Scoring rules (additive):
 *  +3 per query token found in chunk tags  (high precision signal)
 *  +1 per query token found in chunk text  (broader coverage)
 *  +2 if any query bigram appears in chunk text (phrase bonus)
 */
function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[]): number {
  const tagText = chunk.tags.join(" ");
  const bodyTokens = tokenise(chunk.text);
  const tagTokens = tokenise(tagText);

  let score = 0;

  for (const qt of queryTokens) {
    if (tagTokens.includes(qt)) score += 3;
    if (bodyTokens.includes(qt)) score += 1;
  }

  // Bigram phrase bonus
  for (let i = 0; i < queryTokens.length - 1; i++) {
    const bigram = queryTokens[i] + " " + queryTokens[i + 1];
    if (chunk.text.toLowerCase().includes(bigram)) score += 2;
    if (tagText.toLowerCase().includes(bigram)) score += 2;
  }

  return score;
}

// ── Public API ────────────────────────────────────────────────────────────

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

/**
 * Retrieve the top-k most relevant knowledge chunks for a query.
 *
 * @param query   Raw user query string
 * @param topK    Number of chunks to return (default 3)
 * @returns       Ranked array of { chunk, score }
 */
export function retrieve(query: string, topK = 3): RetrievalResult[] {
  const rawTokens = tokenise(query);
  const queryTokens = filterStopWords(rawTokens).length > 0
    ? filterStopWords(rawTokens)
    : rawTokens; // fall back to all tokens if everything was a stop word

  const scored: ScoredChunk[] = KNOWLEDGE_BASE.map((chunk) => ({
    chunk,
    score: scoreChunk(chunk, queryTokens),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((r) => r.score > 0); // drop zero-score chunks
}

/**
 * Build the context string to inject into the LLM system prompt.
 */
export function buildContext(results: RetrievalResult[]): string {
  if (results.length === 0) {
    return "No specific information was found in the knowledge base for this query.";
  }

  return results
    .map((r, i) => `[Fact ${i + 1}]\n${r.chunk.text}`)
    .join("\n\n");
}
