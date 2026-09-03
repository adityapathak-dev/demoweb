/**
 * Excel Academy — content model.
 * Every string below is transcribed from the reference site
 * (https://demoweb-gules.vercel.app/). Nothing is invented:
 * no fake logos, stats, testimonials or pricing.
 */

export interface Stat {
  value: string;
  label: string;
}

export const HERO_STATS: Stat[] = [
  { value: "500+", label: "Students Taught" },
  { value: "95%", label: "Board Pass Rate" },
  { value: "12+", label: "Years Experience" },
  { value: "50+", label: "Board Toppers" },
];

export interface Track {
  id: string;
  level: string;
  blurb: string;
  subjects: string[];
}

export const TRACKS: Track[] = [
  {
    id: "foundation",
    level: "Classes 8–10",
    blurb: "Foundation years — strong basics, analytical thinking, exam readiness.",
    subjects: ["Mathematics", "Science", "English", "Computer Science"],
  },
  {
    id: "senior",
    level: "Classes 11–12",
    blurb: "Senior secondary — conceptual depth across the full CBSE syllabus.",
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Computer Science",
    ],
  },
  {
    id: "competitive",
    level: "Competitive Exams",
    blurb: "Beyond boards — structured preparation layered on top of schoolwork.",
    subjects: ["CBSE Board Preparation", "JEE Foundation", "NEET Preparation"],
  },
];

export interface WhyPoint {
  index: string;
  title: string;
  body: string;
}

export const WHY_POINTS: WhyPoint[] = [
  {
    index: "01",
    title: "Experienced Teacher",
    body: "12+ years of teaching experience with deep understanding of board exam patterns and student psychology.",
  },
  {
    index: "02",
    title: "Small Batches",
    body: "Maximum 15 students per batch ensures individual attention and personalised doubt-clearing sessions.",
  },
  {
    index: "03",
    title: "Proven Results",
    body: "95% students score above 80% in boards. 50+ students have been school and district toppers.",
  },
  {
    index: "04",
    title: "Flexible Timing",
    body: "Morning, afternoon, and evening batches available. Online classes for students who prefer learning from home.",
  },
];

export interface Topper {
  initials: string;
  name: string;
  detail: string;
  score: string;
  tag: string;
}

export const TOPPERS_2024: Topper[] = [
  { initials: "PS", name: "Priya S.", detail: "Class 12 — CBSE Board 2024", score: "98.2%", tag: "School Topper" },
  { initials: "AM", name: "Arjun M.", detail: "Class 10 — CBSE Board 2024", score: "96.4%", tag: "District Rank 5" },
  { initials: "SR", name: "Sneha R.", detail: "Class 12 — Science 2024", score: "94.8%", tag: "Science Topper" },
  { initials: "RK", name: "Rohit K.", detail: "Class 10 — CBSE Board 2024", score: "97.0%", tag: "Maths 100/100" },
];

export const TOPPERS_2023: Topper[] = [
  { initials: "NV", name: "Neha V.", detail: "Class 12 — Science", score: "96.6%", tag: "School Topper" },
  { initials: "KS", name: "Karan S.", detail: "Class 10", score: "95.2%", tag: "City Rank 12" },
  { initials: "AP", name: "Ananya P.", detail: "Class 12 — Science", score: "93.4%", tag: "Physics: 98/100" },
  { initials: "VT", name: "Vikram T.", detail: "Class 10", score: "94.0%", tag: "All Subjects 90+" },
];

export const RESULT_STATS: Stat[] = [
  { value: "95%", label: "Overall Pass Rate" },
  { value: "50+", label: "School / District Toppers" },
  { value: "85%", label: "Students Score 80+" },
  { value: "30%", label: "Average Improvement" },
];

export interface GrowthStory {
  name: string;
  context: string;
  gain: string;
  before: string;
  after: string;
}

export const GROWTH_STORIES: GrowthStory[] = [
  { name: "Aditya G.", context: "Class 10, Maths", gain: "+32%", before: "62%", after: "94%" },
  { name: "Meera J.", context: "Class 12, Chemistry", gain: "+28%", before: "61%", after: "89%" },
  { name: "Sahil D.", context: "Class 10, Science", gain: "+35%", before: "56%", after: "91%" },
  { name: "Riya P.", context: "Class 12, Physics", gain: "+25%", before: "62%", after: "87%" },
];

export interface MethodStep {
  index: string;
  title: string;
  body: string;
}

export const METHOD_STEPS: MethodStep[] = [
  {
    index: "01",
    title: "Concept Building",
    body: "Every topic starts with clear explanations using real-world examples. We ensure you understand the “why” behind every concept.",
  },
  {
    index: "02",
    title: "Practice & Problems",
    body: "Extensive practice with graded difficulty — from NCERT basics to competitive-level problems. Learn shortcuts and time-saving methods.",
  },
  {
    index: "03",
    title: "Test & Assess",
    body: "Regular chapter tests and mock exams in exam conditions. Detailed performance analysis to identify weak areas early.",
  },
  {
    index: "04",
    title: "Review & Improve",
    body: "Personalised feedback, doubt sessions, and targeted revision. We track progress and adapt our teaching to your learning pace.",
  },
];

export const TESTIMONIAL = {
  quote:
    "My daughter's marks in Mathematics improved from 65% to 94% in just six months. The personalised attention she received at Excel Academy made all the difference.",
  initials: "RK",
  name: "Rajesh Kumar",
  role: "Parent — Class 10 Student",
  delta: "65% → 94% in Mathematics",
} as const;

export interface Program {
  className: string;
  modes: string[];
  blurb: string;
  subjects: string[];
  timing: string;
  batch: string;
  highlight: string;
}

export const PROGRAMS: Program[] = [
  {
    className: "Class 8",
    modes: ["Offline"],
    blurb:
      "Foundation building for middle school students. Focus on strong basics in Mathematics and Science that prepare them for higher classes.",
    subjects: ["Mathematics", "Science"],
    timing: "Wed & Fri — 3:00 to 4:30 PM",
    batch: "Small Batch — Max 15",
    highlight: "CBSE / NCERT Aligned",
  },
  {
    className: "Class 9",
    modes: ["Offline", "Online"],
    blurb:
      "Comprehensive coaching with focus on building analytical thinking and exam readiness for board exams.",
    subjects: ["Mathematics", "Science", "English"],
    timing: "Mon–Fri — 4:30 to 6:00 PM",
    batch: "Small Batch — Max 15",
    highlight: "Weekly Tests + Doubt Sessions",
  },
  {
    className: "Class 10",
    modes: ["Offline", "Online"],
    blurb:
      "Intensive board exam preparation with mock tests, previous year analysis, and focused revision strategy.",
    subjects: ["Mathematics", "Science", "English"],
    timing: "Mon–Fri — 6:00 to 8:00 PM",
    batch: "Small Batch — Max 15",
    highlight: "Board Preparation + Mock Tests",
  },
  {
    className: "Class 11",
    modes: ["Offline", "Online"],
    blurb:
      "Senior secondary coaching with emphasis on conceptual depth. Covers full CBSE syllabus with JEE/NEET foundation.",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    timing: "Mon–Sat — 8:00 AM to 12:00 PM",
    batch: "Small Batch — Max 15",
    highlight: "CBSE + JEE/NEET Foundation",
  },
  {
    className: "Class 12",
    modes: ["Offline", "Online"],
    blurb:
      "Complete board exam preparation with additional competitive exam support. Includes revision, mock tests, and personalised coaching.",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
    timing: "Mon–Sat — Morning & Afternoon",
    batch: "Small Batch — Max 15",
    highlight: "Board + Competitive Prep",
  },
];

export interface Batch {
  name: string;
  time: string;
  classes: string;
}

export const BATCHES: Batch[] = [
  { name: "Morning Batch", time: "8:00 AM – 12:00 PM", classes: "Classes 11 & 12" },
  { name: "Afternoon Batch", time: "2:00 PM – 4:30 PM", classes: "Classes 8 & 12" },
  { name: "Evening Batch", time: "4:30 PM – 8:00 PM", classes: "Classes 9 & 10" },
];

export interface ScheduleRow {
  time: string;
  subject: string;
  className: string;
}

export interface ScheduleDay {
  day: string;
  rows: ScheduleRow[];
}

export const WEEK_SCHEDULE: ScheduleDay[] = [
  {
    day: "Monday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Physics", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Biology", className: "Class 11" },
      { time: "2:00 – 4:00 PM", subject: "Chemistry", className: "Class 12" },
      { time: "4:30 – 6:00 PM", subject: "Mathematics", className: "Class 9" },
      { time: "6:00 – 8:00 PM", subject: "Mathematics", className: "Class 10" },
    ],
  },
  {
    day: "Tuesday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Chemistry", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Physics", className: "Class 11" },
      { time: "2:00 – 4:00 PM", subject: "Mathematics", className: "Class 12" },
      { time: "4:30 – 6:00 PM", subject: "Science", className: "Class 9" },
      { time: "6:00 – 8:00 PM", subject: "Physics", className: "Class 10" },
    ],
  },
  {
    day: "Wednesday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Mathematics", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Chemistry", className: "Class 11" },
      { time: "2:00 – 4:00 PM", subject: "Physics", className: "Class 12" },
      { time: "3:00 – 4:30 PM", subject: "Mathematics", className: "Class 8" },
      { time: "6:00 – 8:00 PM", subject: "Chemistry", className: "Class 10" },
    ],
  },
  {
    day: "Thursday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Physics", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Biology", className: "Class 11" },
      { time: "2:00 – 4:00 PM", subject: "English", className: "Class 12" },
      { time: "4:30 – 6:00 PM", subject: "English", className: "Class 9" },
      { time: "6:00 – 8:00 PM", subject: "Biology", className: "Class 10" },
    ],
  },
  {
    day: "Friday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Chemistry", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Physics", className: "Class 11" },
      { time: "2:00 – 4:00 PM", subject: "Computer Science", className: "Class 12" },
      { time: "3:00 – 4:30 PM", subject: "Science", className: "Class 8" },
      { time: "6:00 – 8:00 PM", subject: "English", className: "Class 10" },
    ],
  },
  {
    day: "Saturday",
    rows: [
      { time: "8:00 – 10:00 AM", subject: "Mathematics", className: "Class 11" },
      { time: "10:00 – 12:00 PM", subject: "Weekly Test", className: "Class 11 · Class 12" },
      { time: "2:00 – 4:00 PM", subject: "Doubt Session", className: "Class 10" },
      { time: "4:30 – 6:00 PM", subject: "Weekly Test", className: "Class 9 · Class 10" },
    ],
  },
];

export const SCHEDULE_NOTE =
  "Schedule may vary during exam season. Special revision classes and extra doubt-clearing sessions are added before board exams. Sunday is a holiday.";

export const FOUNDER = {
  name: "Rajendra Sharma",
  role: "Founder & Lead Educator",
  bio: [
    "With over 12 years of teaching experience, Rajendra Sharma founded Excel Academy to bridge the gap between classroom teaching and exam preparation. His approach focuses on building conceptual clarity rather than rote memorisation.",
    "Having taught thousands of students across Classes 8–12, he understands the specific challenges students face at each level — from building foundations in middle school to navigating the pressure of board exams and competitive entrance tests.",
  ],
  credentials: ["M.Sc. Mathematics", "B.Ed.", "12+ Years"],
  philosophy:
    "A student who understands the concept will never forget the formula. My job is to make them understand, not memorise.",
} as const;

export const PILLARS: string[] = [
  "Small batch sizes (max 15 students) for personalised attention and regular doubt-clearing",
  "Regular parent-teacher communication with monthly progress reports",
  "Structured study material aligned with CBSE/NCERT syllabus with additional practice sets",
  "Weekly tests and mock exams in real exam conditions",
  "Both online and offline classes available with flexible timing",
];

export interface Milestone {
  year: string;
  body: string;
}

export const MILESTONES: Milestone[] = [
  { year: "2012", body: "Started with 5 students in a small room. Classes 9–10, Mathematics only." },
  { year: "2015", body: "Expanded to cover Science and English. Moved to a dedicated classroom space." },
  { year: "2018", body: "First batch of Class 12 students. 3 school toppers in CBSE Board Exams." },
  { year: "2020", body: "Introduced online classes during the pandemic. Maintained 95% retention rate." },
  { year: "2022", body: "Crossed 500+ students milestone. Added JEE and NEET foundation courses." },
  { year: "Present", body: "Serving students across Classes 8–12. 50+ board toppers and counting." },
];

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/programs", label: "Programs" },
  { href: "/results", label: "Results" },
  { href: "/approach", label: "Our Approach" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
];

export const CLASS_OPTIONS = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "All Subjects",
];
