/**
 * SPEC concierge knowledge base — the ONLY source of truth the chatbot may quote.
 * ---------------------------------------------------------------------------
 * LEARNING NOTE (team): this is step 1 of the RAG pattern.
 *   1. knowledge.ts  → raw content, split into small topic chunks (this file)
 *   2. embeddings.ts → turns each chunk + each user query into a vector
 *   3. retrieve.ts   → cosine-similarity search, returns top-k chunks as context
 * To upgrade to real neural search later, swap the `embed()` implementation in
 * embeddings.ts for an embeddings-API call and persist the vectors as JSON.
 * Nothing in retrieve.ts or the chat UI needs to change.
 */

export type Chunk = {
  /** stable id, used for source chips in the UI */
  id: string;
  /** short label shown as a citation, e.g. "Hours" */
  topic: string;
  title: string;
  text: string;
};

export const KNOWLEDGE: Chunk[] = [
  {
    id: "hours",
    topic: "Hours",
    title: "Store hours",
    text: "SPEC Optical Studio is open Monday to Saturday 10:30 AM – 9:30 PM, and Sunday 11:00 AM – 8:00 PM. Eye exams run every 30 minutes and walk-ins are welcome till 8 PM. Booking ahead skips the wait.",
  },
  {
    id: "location",
    topic: "Location",
    title: "Where to find us",
    text: "Find us at Shop G-14, Ground Floor, Inorbit Mall Road, HITEC City, Hyderabad 500081 — ground floor near the main atrium, stroller and wheelchair accessible. Call +91 40 4855 2211 or WhatsApp the store for directions and parking help.",
  },
  {
    id: "eye-test",
    topic: "Eye test",
    title: "20-minute digital eye exam",
    text: "A 20-minute digital eye exam with our in-house optometrist costs Rs. 299, and is FREE with any frame. It covers autorefractor readings plus trial-lens refinement. You leave with a printed prescription plus an SMS copy that is valid anywhere — and if your power has not changed, we tell you so; about 40% of tests end with no change.",
  },
  {
    id: "pricing",
    topic: "Pricing",
    title: "Frame and lens pricing",
    text: "Frames start at Rs. 1,499 all-in — frame plus single-vision lenses plus fitting. Current offers: flat 40% off frames and students get an extra 10% off. Lens add-ons are quoted before cutting, never after: blue-cut +Rs. 600, photochromic +Rs. 1,200, 1.67 high-index +Rs. 1,800, polarized sun +Rs. 1,500.",
  },
  {
    id: "lab",
    topic: "Same-day lenses",
    title: "Same-day in-store lens lab",
    text: "Single-vision lenses are cut in-store in about 45 minutes — order before 4 PM and pick up the same day. You can watch the edging through the glass door. Coatings carry a 1-year warranty: if the anti-scratch layer peels, we recoat free.",
  },
  {
    id: "home-tryon",
    topic: "Home try-on",
    title: "Home try-on box",
    text: "Pick up to 5 frames and we courier them to Madhapur, Gachibowli or Jubilee Hills for a 48-hour trial, with free pickup afterwards and no card held. Choose in your own mirror instead of under fluorescent light.",
  },
  {
    id: "virtual-tryon",
    topic: "Virtual try-on",
    title: "Virtual try-on (demo)",
    text: "The on-site virtual try-on is a demo preview: allow the camera, align your face inside the guide, and see frames at scale. For the truest fit, try the 48-hour home box or visit the 120-frame wall in store.",
  },
  {
    id: "warranty",
    topic: "Warranty & returns",
    title: "Warranty and exchange policy",
    text: "Every pair carries a 1-year frame warranty plus a 14-day no-questions exchange on frames. Lens coatings are covered for 1 year. Spring adjustments and nose-pad replacements stay free for a year.",
  },
  {
    id: "contacts",
    topic: "Contact lenses",
    title: "Contact-lens trials",
    text: "Contact-lens trials use Bausch & Lomb and Acuvue with a tear-film check and a 15-minute handling lesson, plus a follow-up call on day 7. A trial pair costs Rs. 499, adjusted against your bill.",
  },
  {
    id: "kids",
    topic: "Kids",
    title: "Kids eye tests and frames",
    text: "Kids eye tests are free for ages 5 and up, using picture-based charts without scary equipment. Kids frames are flexible and unbreakable, with free spring adjustment every month for a year.",
  },
  {
    id: "studio",
    topic: "Studio",
    title: "About the studio",
    text: "SPEC opened in 2016 as a 200 sq-ft mall kiosk and is now the mall's top-rated optician: 4.9 stars from 2,300+ reviews with 18,000+ exams done. An optometrist runs the floor — the cashier never guesses your power. GST bills are issued for insurance and corporate reimbursement.",
  },
];
