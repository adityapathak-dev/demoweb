# SPEC Optical Studio — Client Demo (Next.js)

Demo site for **SPEC Optical Studio**, Inorbit Mall Rd, HITEC City, Hyderabad —
requested via Adarsh, for client review by Tuesday.

Tagline: **"See clearly. Look sharp."**

## Stack

- Next.js (App Router) + TypeScript + React server/client components
- Tailwind CSS v4 (SPEC tokens in `app/globals.css`: ivory/ink/gold, Fraunces + Inter)
- No 3D runtime needed — showcase motion is CSS 3D transforms + pointer physics

## Routes

```
/ /collections /shop/eyeglasses /shop/sunglasses /shop/screen /shop/titanium
/product/[sku] (18 frames) /services /about /book /contact /stores
/track-order /try-on /face-shape-guide /prescription-guide /lens-technology
/faq /warranty /privacy-policy /terms /sitemap
```

Components in `components/spec/`, data in `lib/spec.ts`,
design system + evolution log in `SPEC-DESIGN.md`.

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
