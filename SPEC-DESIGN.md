# SPEC — Optical Studio · Design System v1.0
Client-facing demo · Requested via Adarsh · Deadline Tuesday
Assumption: SPEC Optical Studio, Road No. 2, Inorbit Mall Rd, HITEC City, Hyderabad 500081
Tagline: "See clearly. Look sharp."

## 1. Positioning
Modern mall studio for young professionals (22–38) + style-aware families.
Bold-value energy (Lenskart-learned patterns: colour blocking, try-on play,
offer urgency) fused with clinical trust (optometrist-led, warranty, lab transparency).
NOT a Lenskart clone: warmer paper base, editorial typography, asymmetric layouts.

## 2. Palette — light & premium (client-supplied, Round 7)
- `paper` #FFFFFF — page background; cards sit at pure white.
- `sand` #F7F7F7 — alternating section background; cards "float" on it.
- `card` #FFFFFF — card surface (pure white on sand sections).
- `border` #EAEAEA — 1px thin dividers, hairlines, input borders, chips.
- `ink` #2B2B2B — body text (no pure-black walls of text).
- `heading` #1A1A1A — near-black for headings.
- `smoke` #6B6B6B — secondary/meta/caption text.
- `disabled` #C4C4C4 — placeholders, strike-through MRP.
- Cards: soft elevation ONLY (0 1px 2px + 0 2px 12px rgba(0,0,0,0.06)). Never
  border + shadow stacked. Hover lift: translateY(-4px) + softened/expanded shadow.
- CTA buttons: solid `#1A1A1A` bg + white text; hover → `#2B2B2B`; disabled `#C4C4C4`.
- No gradients, blobs, glassmorphism, neon, colored icons, or icon-in-circle repetition.

## 3. Typography — simple, light, premium (client-supplied, Round 7)
- **Inter everywhere** (or Helvetica Neue): body 400 (never bold walls), headings
  500–600, no 700+ on any heading. No Poppins/Montserrat/rounded/geo display faces.
- Scale: h1 clamp(2.4rem→3.5rem) / h2 clamp(1.6–1.8rem) / body 16px / small 14px.
  Line-height 1.2 headings, 1.6 body. Normal letter-spacing. Left-aligned.
- Light weight + line-height 1.6 is what carries the premium read — not colour.

## 4. Grid / spacing
- Max 1280px, 12 col, 24px gutters. Base unit 8px.
- Section rhythm: 96px desktop / 64px mobile; wide open whitespace, nothing crowded.
- Cards: generous internal padding 24–32px; radius 12px (`rounded-xl` for the hero
  visual), buttons 8–10px (`rounded-lg`) — no pills, no sharp 4px edges.

## 5. Iconography / imagery
- Line icons, black/grey only, no coloured icon backgrounds.
- Product shots: real photography (local `public/frames/`, served offline-safe),
  edge-to-edge 4:3 crops with floating tag/discount/shape badges;
  SVG line-art retired after client asked for real imagery.
  Demo photos are Unsplash stand-ins — replace with in-store shots before launch.

## 6. Motion
- 180ms snappy hovers (translateY -4px + shadow shift), 500ms cinematic reveals
  (rise 28px + deblur), marquee ticker 28s, hero 3D idle rotate 12s.
- Card tilt on pointer (max 6deg) for product cards; respect prefers-reduced-motion.
- Sticky nav: utility strip folds on scroll,CTA condenses.
- Product cards (Round 7): hover lift translateY(-4px) + shadow expands,
  300ms ease, nothing bouncy.

## 8. Design evolution log (Phase-3 critique cycles)

### Round 1 — "Would I put my name on this for Tuesday?"
- R1. Stale Excel Academy routes (approach/programs/results/schedule/login) still
  built and reachable. Deleted — sitemap is now SPEC-only (/, /collections,
  /services, /about, /book, /contact).
- R2. `package.json` still named excel-academy; renamed to spec-studio.
- R3. Collection "Try at home" CTA was hover-only on desktop — an invisible tab
  stop for keyboard users. Added `group-focus-within` reveal so it appears on focus.
- R4. README described the old coaching project; rewrote for SPEC with stack,
  routes, and the Phase-4 chatbot seam.

### Round 2 — "Fresh eyes, accessibility audit"
- R5. Hero 3D spun forever even under prefers-reduced-motion. Model now reads
  the media query once and freezes the idle animation (colour switching still works).
- R6. No structured data for a local shop demo. Added Optician JSON-LD
  (address, hours, 4.9★ aggregate) on /contact.
- R7. Footer had four dead `#` social badges. Replaced with three working
  actions: WhatsApp (real link), Maps (Inorbit Mall query), Call (tel:).

### Round 3 — "Real photos, honestly labelled" (client request)
- Replaced all six SVG line-art frames with real spectacle photography,
  downloaded locally to `public/frames/` so the demo works on mall Wi-Fi.
- Remapped every product name/shape/material to match what each photo actually
  shows (e.g. "Hitech Square Noir", "Kondapur Round Sun", "Banjara Sun Wall");
  the 6th card honestly sells the in-store sun wall instead of a fake single frame.
- Cards now use edge-to-edge 4:3 `next/image` crops with floating tag / −% /
  shape badges; `FrameArt.tsx` deleted; chatbot price example updated.

### Round 4 — Monochrome re-theme (client request: grey/greyish/white only) All 13 theme tokens remapped to a grey scale; token names untouched so every
  section followed with zero layout edits. Photos left exactly as they are.
- Contrast repairs: discount badge → ink/paper, card CTA hover → ink/paper,
  chat Send → ink/paper; 3D model colours → graphite/grey/ink with neutral
  lens tint and key light; logo shadow + lens tint hex strays neutralised.

### Round 5 — Real-photo 3D hero + Inter-only type + all-light theme (client request)
- Hero: WebGL model retired (`Hero3D.tsx` deleted). New `HeroVisual.tsx` shows
  a real in-store photo (customer at the frame wall) in an interactive 3D tilt
  card with mouse-parallax floating badges; frozen under reduced-motion.
- Type: Bricolage Grotesque + Space Mono removed; Inter 400–800 serves every
  role via the existing `font-display`/`font-sans`/`font-mono` classes.
- Theme: every dark section converted to light (ticker, trust, booking,
  footer, nav strip, testimonial card, chat header/bubbles). Only buttons,
  badges and body text remain dark — required for contrast on light surfaces.

### Round 6 — Lenskart-style grey/white/black system (client request, exact hexes)
- Palette locked to the client's spec in §2: page `#FFFFFF`, sections `#F5F5F5`,
  cards `#FAFAFA`, hairline `#E0E0E0`, body `#2B2B2B`, headings `#000000`,
  muted `#6B6B6B`, disabled `#C4C4C4`. CTA solid black, hover `#2B2B2B`.
- Removed all non-grey tokens (tangerine/mint/teal/cobalt/butter/sky/peach/
  lilac) and flourish utilities (`shadow-hard*`, `text-outline-*`, `dot-grid`,
  grain) from `globals.css`; rebuilt Navbar, Hero, HeroVisual, Ticker,
  Collections, Services, Trust, Testimonials, Booking, Footer, PageHero,
  Chatbot, plus the /collections, /about, /contact inner cards and the
  error / loading / not-found pages on the new tokens only.
- Pill buttons gone — flat `rounded` (4–8px) solids and hairlined outlines only.
- Type: single Inter family for every role; H1 up to ~40–48px, H2 ~28–32px,
  body 16 / small 14, line-height 1.2 headings / 1.55 body, normal tracking,
  solid-black focus ring, marquee keyframes retained outside the theme block.
- Photos unchanged (aligned with client's "real photography" direction).

### Round 7 — "Looks fake and flat" → soft elevation, light & premium (client request)
- Cards were hairline-bordered flat rectangles → now `card` utility: pure-white
  surface, 12px radius, soft elevation only (`0 1px 2px + 0 2px 12px`); borders
  removed from every card. Alternate `card-lift` for interactive cards:
  translateY(-4px) + expanded shadow, 300ms ease.
- Section bases tuned: `sand` → `#F7F7F7`, `card` → `#FFFFFF`, `border` → `#EAEAEA`,
  `heading` → `#1A1A1A`. Testimonials now sit on sand (cards float); Trust moved to
  white; Booking white. Cards get generous padding (24–32px).
- Hero visual: borderless `rounded-2xl` with layered soft shadow; its two stat
  badges float on white pills with their own mini-shadows.
- Type: headings capped at 600 (semibold), zero 700+ anywhere; body 400; body
  line-height raised to 1.6. All buttons/controls → `rounded-lg`; any leftover
  4px `rounded` and `font-bold` removed repo-wide.
- Fallback pages (error / loading / not-found) re-skinned to match.

### Round 8 — Director rebuild: e-commerce patterns + RAG concierge (no reskin)
- Header: sticky + shadow-on-scroll, live frame search (dropdown), Frames mega-menu
  (shape counts + thumbnails), bag icon with live count, account placeholder dialog.
  New `lib/cart.tsx` (context + localStorage) + `CartDrawer` slide-over; bag feeds
  from card [+] and QuickView "Add to bag" (frame + chosen lens). No checkout —
  bag reserves at the store via /book.
- Hero: full-bleed real store photo with copy on a solid white card (no text-on-photo,
  no scrims); headline rewritten specific ("Eyes checked properly. Glasses ready
  today."); scroll cue; trust strip below the fold as a thin icon row.
- Categories (`ShopWall`): asymmetric grid (1 large + 5 small), hover zoom + CTA fade-in.
- Product grid: underline filter tabs, badge+discount merged into one tag, stacked
  price hierarchy, wishlist kept, quick-view kept, colourway swatches added (3 in store).
- New `FaceFinder`: selecting a shape redraws the SVG face+frame diagram side-by-side
  with advice; stylist tips kept. New `TryOn`: labelled-demo camera viewfinder with
  guide oval, brackets, simulated scan; home box positioned as the real test.
- Services: icon-row (desktop) / stacked (mobile) + prominent stat band
  (18,000+ exams · 4.9★ · 45 min). Booking: day picker (Today/Tomorrow/Day after) +
  slots inline. New `Assurance` quiet icon strip; new `Lookbook` masonry with IG
  hover overlay; footer tightened (uppercase micro-headers, outline socials).
- Chatbot rebuilt on genuine RAG: `lib/chat/knowledge.ts` (11 chunks, sole truth
  source) → `embeddings.ts` (hashed BoW+trigram vectors, cosine; neural swap seam
  documented) → `retrieve.ts` (top-k + grounded composer with citations + human
  fallback). UI minimal, shows source chips. Primary CTAs moved to pure black
  per brief; `sand` token kept at #F7F7F7 (Round-7 lock) vs brief's #F5F5F5.

### Round 9 — Chatbot deferred for Tuesday (client call)
- `SpecChatbot` unmounted from `app/layout.tsx`; `components/spec/Chatbot.tsx`
  + `lib/chat/` retained as the documented Phase-4 seam, not rendered.
- No token, layout, or route changes; Tuesday demo ships chatbot-free.

### Round 10 — Phase-2 V1: shoppable hero + dead-code removal
- Hero had no dynamic product element (tilt components existed but were never
  mounted). Added a shoppable floating tag pinned to the hero photo
  (Wayfarer Classic → /book?frame=SP-CL01): solid white, levitates via the
  existing `[data-depth]` motion (frozen under reduced-motion), keyboard-
  reachable link — no redesign, no text-on-photo.
- Deleted dead `HeroVisual.tsx` / `GlassesShowcase.tsx` (unmounted, superseded
  by the full-bleed hero + `FrameCard3D` tilt). Git history retains them.

## 7. What we stole (patterns) vs. invented
- From Lenskart: offer ticker, try-on CTA placement, trust badge row, price+MRP+off.
- From Aesop/Ace & Tate: warm paper, numbered services, editorial whitespace.
- Invented: "Spec Sheet" product meta (mono SKU + lens index), lens-lab timeline,
  mint warranty seal, asymmetric hero with live 3D frame builder.
