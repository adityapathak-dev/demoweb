# Excel Academy — Premium Rebuild (Next.js)

A ground-up art-directed redesign and migration to a genuine Next.js application
for Excel Academy, a coaching institute for Classes 8–12 (Boards, JEE, NEET).
Content is rebuilt exclusively from the reference site — no invented claims.

## Stack

- Next.js (App Router) + TypeScript (strict) + React server/client components
- Tailwind CSS v4 (token-based theme in `app/globals.css`)
- Three.js + React Three Fiber + Drei (lazy, client-only 3D scenes)

## Structure

```
app/               # routes: / /programs /results /approach /schedule /contact /login
components/        # Navbar, Hero, Tracks, WhyExcel, ResultsPreview, MethodSection,
                   # Testimonial, DemoCTA, forms, PageHero, StatBand, …
components/three/  # HeroScene, MethodOrbit, ConstellationField + SceneGate fallback
lib/               # content.ts (reference content), theme.ts (color system),
                   # hooks.ts, utils.ts
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-check + prerender)
npm run lint
```

## Design notes

- Color system is documented in `lib/theme.ts`: electric-blue backbone + cyan
  interaction energy on a deep-navy base; violet = method/intelligence, lime =
  outcomes, coral = human voice; one accent per subject.
- All 3D mounts only when WebGL is available, motion is not reduced, and the
  scene is in view; otherwise a pure-CSS fallback carries the composition.

## AI Chatbot (RAG)

A floating chat widget (bottom-right) answers visitor questions using
Retrieval-Augmented Generation grounded in the academy's own data.

```
lib/knowledge-base.ts  # ~25 factual text chunks (programs, schedule, results…)
lib/rag.ts             # BM25-style keyword retriever — no vector DB needed
app/api/chat/route.ts  # POST /api/chat — retrieval → Gemini 1.5 Flash → reply
components/ChatWidget.tsx  # Glassmorphism floating widget
```

### Local setup

```bash
cp .env.local.example .env.local
# Add your Gemini API key from https://aistudio.google.com/
```

### Vercel deployment

Add `GEMINI_API_KEY` in **Project Settings → Environment Variables** on Vercel.
The chatbot degrades gracefully (shows a contact-us message) if the key is absent.

