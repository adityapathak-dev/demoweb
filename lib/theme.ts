/**
 * Excel Academy — color system, audited like a studio would.
 *
 * Restraint rule: one dominant neutral (~80% of pixels), one action accent,
 * and a handful of meaning-carrying hues. Nothing here is "a nice color" —
 * each token traces back to the business (a school: ink, paper-marks,
 * subject identity, timetable time, report-card proof) or to a functional
 * need (focus, success). All text pairings measured against WCAG AA.
 *
 * Token raison d'être, one sentence each:
 * - `abyss`: the dominant neutral — a near-black navy that reads as a
 *   chalkboard after hours, the surface ~80% of the UI sits on.
 * - `navy` / `panel`: stepped elevations of the same neutral for footer,
 *   bands and record rows, so depth comes from surface, not shadows.
 * - `ink`: the chalk — body text at 18.6:1 on abyss.
 * - `muted`: secondary text at 8.7:1 on abyss; the only other body-text tone.
 * - `faint`: tertiary micro-text at 5.9:1; the dimmest text allowed anywhere.
 * - `brand` (electric blue): school ink — the single action color for
 *   buttons, active states and brand marks; tuned to 5.3:1 with white text
 *   so every CTA passes AA (it sits where "blue pen on paper" sits).
 * - `brandDeep`: the shaded side of the same ink, used only inside the
 *   EA monogram gradient for depth.
 * - `pulse` (cyan): live current — hovers, focus rings, active nav, the
 *   "this responds to you" signal, at 13:1 on abyss.
 * - `mind` (violet): the thinking color — method cycle, founder card,
 *   philosophy; violet reads as contemplation against the blues.
 * - `signal` (lime): the report-card highlighter — results, toppers and
 *   growth deltas only, at 15.3:1.
 * - `warm` (coral): the human voice — parent quote, contact, WhatsApp;
 *   warmth against an otherwise cool, institutional palette.
 * - `magenta`: exists for one reason — Computer Science owns it in the
 *   subject mapping, so a CS student can track their color site-wide.
 * - `amber`: exists for one reason — timetable time. Morning/afternoon/
 *   evening batches and schedule hours read instantly as "time".
 *
 * Subjects each own one accent so a learner can track "their" color
 * across programs, schedule and results:
 */

export const COLORS = {
  abyss: "#04070F",
  navy: "#0A1122",
  panel: "#0D1528",
  ink: "#F2F6FF",
  muted: "#9DABC9",
  faint: "#7E8AAE",
  brand: "#2F5BF5", // school ink; white text passes AA at 5.3:1
  brandDeep: "#1B3FBF",
  pulse: "#3EE2FF", // live current — interactive/hover energy
  mind: "#8B5CF6", // contemplation — method/founder moments
  signal: "#B6F34A", // highlighter — proof/outcomes only
  warm: "#FF7A59", // human voice — parent/contact moments
  magenta: "#F064C8", // Computer Science identity
  amber: "#FFB020", // timetable time
} as const;

/** Subject → accent mapping. Single source of truth for cards, dots, 3D orbs. */
export const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: COLORS.brand,
  Physics: COLORS.mind,
  Chemistry: COLORS.pulse,
  Biology: COLORS.signal,
  English: COLORS.warm,
  "Computer Science": COLORS.magenta,
  "All Subjects": COLORS.pulse,
};

/** Class level → accent (used on program cards + schedule filters). */
export const CLASS_COLORS: Record<string, string> = {
  "Class 8": COLORS.pulse,
  "Class 9": COLORS.brand,
  "Class 10": COLORS.mind,
  "Class 11": COLORS.magenta,
  "Class 12": COLORS.signal,
};

/** Type scale — display / h1 / h2 / lead / body / caption. */
export const TYPE = {
  display: "clamp(3rem, 7.5vw, 7rem)",
  h1: "clamp(2.5rem, 5.5vw, 4.75rem)",
  h2: "clamp(2rem, 4vw, 3.25rem)",
  h3: "clamp(1.25rem, 2.2vw, 1.6rem)",
  lead: "clamp(1.05rem, 1.6vw, 1.3rem)",
} as const;

export const CONTACT = {
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp:
    "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20tuition%20classes",
  email: "info@excelacademy.in",
  addressLines: ["42, Knowledge Lane, Near City Park", "New Delhi — 110001"],
  hoursLines: ["Mon – Sat: 8:00 AM – 8:00 PM", "Sunday: Closed"],
} as const;
