/**
 * Retrieval + grounded answering — step 3 of the RAG pattern.
 * ------------------------------------------------------------
 *   retrieve(query, k) → top-k { chunk, score } by cosine similarity
 *   answer(query)      → short grounded reply + cited sources
 *
 * The reply is composed ONLY from retrieved chunks (plus a greeting), so the
 * bot can never invent hours, prices or policies. Anything below MIN_SCORE
 * falls back to a human handoff instead of guessing.
 */

import { KNOWLEDGE, type Chunk } from "./knowledge";
import { cosine, embed } from "./embeddings";

export type Hit = { chunk: Chunk; score: number };
export type Answer = { text: string; sources: Chunk[] };

const MIN_SCORE = 0.12;
const GREET = /^(hi|hii+|hello|hey|namaste|good (morning|afternoon|evening))\b/;

// Pre-computed once at module load (build time on server, first render on client).
const INDEX = KNOWLEDGE.map((chunk) => ({
  chunk,
  vec: embed(`${chunk.topic} ${chunk.title} ${chunk.text}`),
}));

/** Embed the query, rank chunks by cosine similarity, return top-k. */
export function retrieve(query: string, k = 3): Hit[] {
  const q = embed(query);
  return INDEX.map(({ chunk, vec }) => ({ chunk, score: cosine(q, vec) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

function firstSentence(text: string): string {
  const m = text.match(/^[^.]+./);
  return (m ? m[0] : text).trim();
}

/** Grounded answer composer — quotes retrieval, never the model's memory. */
export function answer(query: string): Answer {
  const q = query.trim();
  if (!q) {
    return { text: "Ask me about prices, eye-test slots, lenses, or home try-on.", sources: [] };
  }
  if (GREET.test(q.toLowerCase())) {
    return {
      text: "Hey! I'm Specs, the SPEC concierge. Ask me about prices, eye-test slots, lens options, or home try-on — I answer from the store's own notes.",
      sources: [],
    };
  }
  if (/human|agent|call|whatsapp|phone|number/i.test(q)) {
    const loc = KNOWLEDGE.find((c) => c.id === "location")!;
    return {
      text: `You can reach a human at ${"+91 40 4855 2211"} (store hours below), or tap WhatsApp in the booking section and we'll pick it up. ${firstSentence(loc.text)}`,
      sources: [loc],
    };
  }

  const hits = retrieve(q, 3).filter((h) => h.score >= MIN_SCORE);
  if (hits.length === 0) {
    return {
      text: "I don't have that in the store notes — I won't guess. Call +91 40 4855 2211 or ask me about prices, slots, lenses, warranty, or home try-on.",
      sources: [],
    };
  }
  const [top, ...rest] = hits;
  let text = top.chunk.text;
  if (rest.length > 0) {
    text += ` Also useful: ${rest.map((h) => firstSentence(h.chunk.text)).join(" ")}`;
  }
  if (text.length > 420) text = text.slice(0, 417).trimEnd() + "…";
  return { text, sources: hits.map((h) => h.chunk) };
}
