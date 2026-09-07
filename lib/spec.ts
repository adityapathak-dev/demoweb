export const STORE = {
  name: "SPEC Optical Studio",
  short: "SPEC",
  tagline: "See clearly. Look sharp.",
  phoneDisplay: "+91 40 4855 2211",
  phoneHref: "tel:+914048552211",
  whatsapp:
    "https://wa.me/914048552211?text=Hi%20SPEC!%20I%20want%20to%20book%20an%20eye%20test.",
  email: "hello@specstudio.in",
  addressLines: ["Shop G-14, Ground Floor, Inorbit Mall Rd", "HITEC City, Hyderabad 500081"],
  hoursLines: ["Mon–Sat: 10:30 AM – 9:30 PM", "Sun: 11:00 AM – 8:00 PM", "Eye exams: every 30 min, walk-ins till 8 PM"],
  rating: "4.9",
  reviews: "2,300+",
  examsDone: "18,000+",
} as const;

export const NAV_LINKS = [
  { href: "/collections", label: "Frames" },
  { href: "/services", label: "Eye Care" },
  { href: "/about", label: "Studio" },
  { href: "/book", label: "Book Test" },
  { href: "/contact", label: "Visit" },
] as const;

export type Frame = {
  sku: string;
  name: string;
  shape: "Round" | "Square" | "Cat-eye" | "Oval" | "Aviator" | "Sun wall";
  price: number;
  mrp: number;
  tag?: string;
  photo: string;
  photoAlt: string;
  material: string;
  weight: string;
  best: string;
  rating?: number;
  reviews?: number;
};

export const SHAPES = ["All", "Square", "Round", "Cat-eye", "Oval", "Aviator", "Sun wall"] as const;

export type ShopCategory = {
  label: string;
  blurb: string;
  photo: string;
  photoAlt: string;
  href: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  { label: "Eyeglasses", blurb: "Everyday acetate + metal", photo: "/frames/sp-r11.jpg", photoAlt: "Chunky black square acetate glasses on a dark wooden table", href: "/collections" },
  { label: "Sunglasses", blurb: "UV400 + polarized", photo: "/frames/sp-a02.jpg", photoAlt: "Small round black polarized sunglasses on a pink studio background", href: "/collections" },
  { label: "Blue-cut", blurb: "8-hr screen days", photo: "/frames/sp-vision.jpg", photoAlt: "Close-up of a man wearing square black eyeglasses", href: "/collections" },
  { label: "Aviators", blurb: "Driving + outdoors", photo: "/frames/sp-breeze.jpg", photoAlt: "Classic black sunglasses on a model in a black jacket", href: "/collections" },
  { label: "Rimless", blurb: "Feather-light 12 g", photo: "/frames/sp-s04.jpg", photoAlt: "Minimalist silver rimless oval glasses floating on a pale grey background", href: "/collections" },
  { label: "Sun wall", blurb: "40+ in store to try", photo: "/frames/sp-w07.jpg", photoAlt: "Wall display of twelve sunglasses in wayfarer, round and panto styles", href: "/book" },
];

export type WallShot = { src: string; alt: string; caption: string };

export const SHOP_WALL: WallShot[] = [
  { src: "/frames/hero.jpg", alt: "Customer browsing the wall of frames inside the SPEC store", caption: "The frame wall · 120+ in store" },
  { src: "/frames/sp-classic.jpg", alt: "Black wayfarer sunglasses in shallow focus — the headline SPEC frame", caption: "Wayfarer Classic · try it in 3D" },
  { src: "/frames/sp-r11.jpg", alt: "Chunky black square acetate glasses on a dark wooden table", caption: "Hitech Square Noir · SP-R11" },
  { src: "/frames/sp-s04.jpg", alt: "Minimalist silver rimless oval glasses floating on a pale grey background", caption: "Rimless Silver · 12 g" },
  { src: "/frames/sp-breeze.jpg", alt: "Classic black sunglasses on a model in a black jacket", caption: "On face · Breeze Aviator" },
  { src: "/frames/sp-vision.jpg", alt: "Close-up of a man wearing square black eyeglasses", caption: "On face · Vision Square" },
  { src: "/frames/sp-a02.jpg", alt: "Small round black polarized sunglasses on a pink studio background", caption: "Polarized Round Sun" },
  { src: "/frames/sp-o17.jpg", alt: "Rose-gold round metal glasses resting on a white pedestal", caption: "Rosé metal · SP-O17" },
  { src: "/frames/sp-c09.jpg", alt: "Magenta cat-eye and violet rectangular glasses styled with pink ribbon", caption: "Cat-eye Magenta" },
  { src: "/frames/sp-w07.jpg", alt: "Wall display of twelve sunglasses in wayfarer, round and panto styles", caption: "Banjara Sun Wall · 40+" },
  { src: "/frames/sp-glow.jpg", alt: "Illuminated display shelf with dozens of frames inside the SPEC store", caption: "Lit shelf · night view" },
];

export const FRAMES: Frame[] = [
  { sku: "SP-R11", name: "Hitech Square Noir", shape: "Square", price: 1499, mrp: 2999, tag: "Bestseller", photo: "/frames/sp-r11.jpg", photoAlt: "Chunky black square acetate glasses on a dark wooden table", material: "Hand-finished acetate", weight: "24 g", best: "Oval + heart faces", rating: 4.9, reviews: 412 },
  { sku: "SP-S04", name: "Gachibowli Rimless Silver", shape: "Oval", price: 1999, mrp: 3499, tag: "New", photo: "/frames/sp-s04.jpg", photoAlt: "Minimalist silver rimless oval glasses floating on a pale grey background", material: "Feather metal, rimless mount", weight: "12 g", best: "Barely-there everyday wear", rating: 4.8, reviews: 186 },
  { sku: "SP-C09", name: "Jubilee Cat-Eye Magenta", shape: "Cat-eye", price: 2499, mrp: 4499, photo: "/frames/sp-c09.jpg", photoAlt: "Magenta cat-eye and violet rectangular glasses styled with pink ribbon", material: "Italian acetate", weight: "21 g", best: "Statement evenings", rating: 4.9, reviews: 203 },
  { sku: "SP-A02", name: "Kondapur Round Sun", shape: "Round", price: 2999, mrp: 5499, tag: "Polarized", photo: "/frames/sp-a02.jpg", photoAlt: "Small round black polarized sunglasses on a pink studio background", material: "Polarized CR-39, metal trim", weight: "17 g", best: "Driving + outdoor", rating: 4.9, reviews: 327 },
  { sku: "SP-O17", name: "Madhapur Round Rosé", shape: "Round", price: 1799, mrp: 3299, photo: "/frames/sp-o17.jpg", photoAlt: "Rose-gold round metal glasses resting on a white pedestal", material: "Rose-gold metal", weight: "16 g", best: "Teens + petite faces", rating: 4.7, reviews: 154 },
  { sku: "SP-W07", name: "Banjara Sun Wall", shape: "Sun wall", price: 2199, mrp: 3999, tag: "40+ in store", photo: "/frames/sp-w07.jpg", photoAlt: "Wall display of twelve sunglasses in wayfarer, round and panto styles", material: "Polarized + UV400 range", weight: "From 19 g", best: "Try the wall in 10 minutes", rating: 4.8, reviews: 98 },
  { sku: "SP-BRZ", name: "Breeze Aviator Sun", shape: "Aviator", price: 2499, mrp: 4499, tag: "New", photo: "/frames/sp-breeze.jpg", photoAlt: "Classic black sunglasses on a model in a black jacket", material: "Lightweight metal, UV400", weight: "36 g", best: "Men + long commutes", rating: 4.8, reviews: 211 },
  { sku: "SP-VDI", name: "Vision Square Noir", shape: "Square", price: 1699, mrp: 2999, photo: "/frames/sp-vision.jpg", photoAlt: "Close-up of a man wearing square black eyeglasses", material: "Acetate + anti-glare", weight: "30 g", best: "Office + screen days", rating: 4.9, reviews: 342 },
  { sku: "SP-CL01", name: "Madhapur Wayfarer Classic", shape: "Square", price: 2299, mrp: 4299, tag: "Bestseller", photo: "/frames/sp-classic.jpg", photoAlt: "Black wayfarer sunglasses in shallow focus — the headline SPEC frame", material: "Hand-polished acetate", weight: "28 g", best: "First premium pair", rating: 5.0, reviews: 528 },
];

export const SERVICES = [
  {
    n: "01",
    title: "20-min digital eye exam",
    copy: "Autorefractor + trial-lens refinement with our optometrist, not a salesperson. You leave with a printed + SMS prescription — valid anywhere.",
    meta: "₹299 · FREE with any frame",
    accent: "teal",
  },
  {
    n: "02",
    title: "Same-day lens lab",
    copy: "Single-vision lenses cut in-store in ~45 minutes. Blue-cut, photochromic and 1.67 high-index stocked, not 'ordered in 7 days'.",
    meta: "From ₹899 · 1-yr coating warranty",
    accent: "cobalt",
  },
  {
    n: "03",
    title: "Home try-on box",
    copy: "Pick 5 frames online, we courier them to Madhapur / Gachibowli / Jubilee Hills for a 48-hour trial. Free pickup, no card held.",
    meta: "FREE · 48-hr trial",
    accent: "tangerine",
  },
  {
    n: "04",
    title: "Lens fitting + care plan",
    copy: "Contact-lens trial with Bausch & Lomb / Acuvue, tear-film check, and a 15-min handling lesson. Follow-up call on day 7.",
    meta: "Trial pair ₹499, adjusted in bill",
    accent: "ink",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sneha R., UX designer",
    area: "Madhapur",
    quote: "Power was off by 0.5 for two years — SPEC caught it in 20 minutes. New blue-cut pair in 3 hours, zero push to buy the expensive one.",
    detail: "Bought SP-S04 · Blue-cut 1.61",
    size: "lg",
  },
  {
    name: "Adarsh V.",
    area: "HITEC City",
    quote: "Asked for this demo on Monday, brought my whole team on Tuesday. Try-on box came to office next morning.",
    detail: "5 frames · office trial",
    size: "sm",
  },
  {
    name: "Farhan K., cab driver",
    area: "Kondapur",
    quote: "Night driving glare is gone. Polarized aviators, fitted while I waited, chai on the house. My third pair from them.",
    detail: "SP-A02 polarized · ₹2,999",
    size: "md",
  },
  {
    name: "Meera & Arjun, parents",
    area: "Jubilee Hills",
    quote: "Kids' first specs without drama. Unbreakable flex frames, free spring adjustment every month. They remember our names.",
    detail: "2 kids' pairs · flex TR90",
    size: "md",
  },
];

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export type FaceShape = {
  id: "oval" | "round" | "square" | "heart" | "diamond";
  label: string;
  blurb: string;
  frames: string[];
  tip: string;
  /** frame shape to pre-filter the shop grid */
  shopShape: (typeof SHAPES)[number];
};

/** Face-shape finder content — copy kept human, tips kept from the old panel. */
export const FACE_SHAPES: FaceShape[] = [
  {
    id: "oval",
    label: "Oval",
    blurb: "Balanced proportions, cheekbones slightly wider than the forehead. The most versatile face — almost everything suits you.",
    frames: ["Square", "Round", "Aviator", "Geometric"],
    tip: "You can carry bold shapes. Try a strong square first — contrast flatters balanced faces.",
    shopShape: "Square",
  },
  {
    id: "round",
    label: "Round",
    blurb: "Full cheeks with soft angles and roughly equal width and length. Structure is your friend.",
    frames: ["Square", "Rectangle", "Cat-eye"],
    tip: "Angular frames add definition. Avoid small rounds — they echo the face instead of shaping it.",
    shopShape: "Square",
  },
  {
    id: "square",
    label: "Square",
    blurb: "Strong jaw and broad forehead with sharp lines. Soften, don't mirror, the angles.",
    frames: ["Round", "Oval", "Aviator"],
    tip: "Round and oval frames take the edge off a strong jaw. Thin metal beats chunky acetate here.",
    shopShape: "Round",
  },
  {
    id: "heart",
    label: "Heart",
    blurb: "Wide forehead narrowing to a neat chin. Balance the top half with lighter bottoms.",
    frames: ["Round", "Oval", "Rimless"],
    tip: "Bottom-heavy or rimless styles pull attention down and balance a wider forehead.",
    shopShape: "Round",
  },
  {
    id: "diamond",
    label: "Diamond",
    blurb: "Narrow forehead and chin with wide, high cheekbones. Show off the cheekbones.",
    frames: ["Cat-eye", "Oval", "Rimless"],
    tip: "Cat-eyes follow your cheek line beautifully. Keep the frame wider than your cheekbones.",
    shopShape: "Cat-eye",
  },
];

export type Look = { src: string; alt: string; handle: string; frame: string; tall?: boolean };

/** Demo lookbook — real in-store photos; handles are placeholders until real UGC lands. */
export const LOOKBOOK: Look[] = [
  { src: "/frames/sp-breeze.jpg", alt: "Classic black sunglasses on a model in a black jacket", handle: "@spec.demo.01", frame: "Breeze Aviator Sun", tall: true },
  { src: "/frames/sp-classic.jpg", alt: "Black wayfarer sunglasses in shallow focus — the headline SPEC frame", handle: "@spec.demo.02", frame: "Wayfarer Classic" },
  { src: "/frames/sp-vision.jpg", alt: "Close-up of a man wearing square black eyeglasses", handle: "@spec.demo.03", frame: "Vision Square Noir" },
  { src: "/frames/sp-s04.jpg", alt: "Minimalist silver rimless oval glasses floating on a pale grey background", handle: "@spec.demo.04", frame: "Rimless Silver", tall: true },
  { src: "/frames/sp-a02.jpg", alt: "Small round black polarized sunglasses on a pink studio background", handle: "@spec.demo.05", frame: "Kondapur Round Sun" },
  { src: "/frames/sp-o17.jpg", alt: "Rose-gold round metal glasses resting on a white pedestal", handle: "@spec.demo.06", frame: "Round Rosé" },
];
