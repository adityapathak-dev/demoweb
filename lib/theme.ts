/**
 * Excel Academy — intentional color system.
 *
 * One backbone (deep navy base + electric blue primary + cyan secondary),
 * every other hue is assigned a MEANING, never scattered decoratively.
 *
 * - Base: deep navy `abyss` — premium dark canvas. Vibrant light sources
 *   sit on top of it instead of rainbow-painted blocks.
 * - Primary `brand` (electric blue): the backbone. CTAs, active states,
 *   brand moments. Used everywhere.
 * - Secondary `pulse` (cyan): interactive/hover energy — underlines,
 *   focus rings, live/hover states, data highlights.
 * - `mind` (violet): intelligence moments — the 4-step method, founder/
 *   philosophy, "how we think" sections.
 * - `signal` (lime): proof & outcomes — results, toppers, growth deltas,
 *   success states.
 * - `warm` (coral): human voice — parent testimonial, contact, urgency
 *   that needs a human (WhatsApp / call).
 *
 * Subjects each own one accent so a learner can track "their" color
 * across programs, schedule and results:
 */

export const COLORS = {
  abyss: "#04070F",
  navy: "#0A1122",
  panel: "#0D1528",
  line: "rgba(148, 178, 255, 0.14)",
  ink: "#F2F6FF",
  muted: "#9DABC9",
  faint: "#64708E",
  brand: "#2F6BFF", // electric blue — primary backbone
  brandDeep: "#1B3FBF",
  pulse: "#3EE2FF", // cyan — interactive / hover energy
  mind: "#8B5CF6", // violet — intelligence / method moments
  signal: "#B6F34A", // lime — proof / outcomes
  warm: "#FF7A59", // coral — human voice / contact
  magenta: "#F064C8", // reserved: Computer Science + rare celebratory beats
  amber: "#FFB020", // reserved: schedule / time highlights
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
