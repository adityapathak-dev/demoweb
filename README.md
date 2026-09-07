# SPEC Optical Studio — Client Demo (Next.js)

Demo site for **SPEC Optical Studio**, Inorbit Mall Rd, HITEC City, Hyderabad —
requested via Adarsh, for client review by Tuesday.

Tagline: **"See clearly. Look sharp."**

## Stack

- Next.js (App Router) + TypeScript + React server/client components
- Tailwind CSS v4 (SPEC tokens in `app/globals.css`)
- Three.js + React Three Fiber (procedural hero frame model, client-only, CSS fallback)

## Routes

```
app/                  # / /collections /services /about /book /contact
components/spec/      # Navbar, Hero, Hero3D, Ticker, Collections, Services,
                      # Trust, Testimonials, Booking, Footer, Chatbot, …
lib/spec.ts           # store facts, frames, services, testimonials (single source)
SPEC-DESIGN.md        # design system + rationale + evolution log
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Notes

- All copy, prices, hours and reviews are realistic demo content written for the
  presentation — replace with the client's real facts before launch.
- Chatbot deferred for Tuesday demo per client call: `components/spec/Chatbot.tsx`
  + `lib/chat/` (knowledge/embeddings/retrieve) stay in the repo as the
  Phase-4 seam but are not rendered. Re-enable by importing `SpecChatbot`
  in `app/layout.tsx`.
