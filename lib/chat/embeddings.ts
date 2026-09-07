/**
 * Tiny local embeddings — the learning-seam of the RAG chatbot.
 * --------------------------------------------------------------
 * LEARNING NOTE (team): production RAG uses neural embeddings (e.g. an
 * embeddings API or sentence-transformers) stored in a vector DB. This module
 * mimics that interface with a deterministic hashed bag-of-words + character
 * trigrams, so retrieval, ranking and UI code are IDENTICAL to the real thing:
 *
 *   embed(text) -> number[]   // L2-normalized vector, fixed dimension
 *   cosine(a, b) -> number    // similarity score in [-1, 1]
 *
 * Trigrams give us typo/plural tolerance ("sunglass" ~ "sunglasses",
 * "warrenty" ~ "warranty") without any dependency or network call.
 * To go neural: replace `embed` with an API call + cache, keep the rest.
 */

const DIM = 256;

function hashToken(token: string): number {
  let h = 2166136261;
  for (let i = 0; i < token.length; i++) {
    h ^= token.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % DIM;
}

/** Lowercase words plus char-trigrams of longer words (fuzzy matching). */
export function tokens(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9₹.\s]/g, " ")
    .split(/[\s.]+/)
    .filter((w) => w.length > 1);
  const out: string[] = [];
  for (const w of words) {
    out.push(w);
    out.push(w); // words weigh 2x vs trigrams
    if (w.length >= 4) {
      for (let i = 0; i <= w.length - 3; i++) out.push("△" + w.slice(i, i + 3));
    }
  }
  return out;
}

/** Deterministic L2-normalized vector for any string. */
export function embed(text: string): number[] {
  const vec = new Array<number>(DIM).fill(0);
  for (const t of tokens(text)) vec[hashToken(t)] += 1;
  let norm = 0;
  for (let i = 0; i < DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < DIM; i++) vec[i] /= norm;
  return vec;
}

/** Cosine similarity — for normalized vectors this is the dot product. */
export function cosine(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < DIM; i++) s += a[i] * b[i];
  return s;
}
