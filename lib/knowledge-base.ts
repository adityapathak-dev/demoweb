/**
 * Excel Academy — RAG Knowledge Base
 *
 * All factual content is derived from lib/content.ts and lib/theme.ts.
 * Nothing is invented. Each chunk is a self-contained answer to a
 * predictable user question, tagged for retrieval scoring.
 */

export interface KnowledgeChunk {
  id: string;
  /** Short label used in retrieval scoring against query terms */
  tags: string[];
  /** The actual text fed into the LLM as context */
  text: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── Overview ────────────────────────────────────────────────────────────
  {
    id: "overview",
    tags: ["excel academy", "about", "overview", "coaching", "classes", "tutoring", "institution"],
    text: "Excel Academy is a personalised coaching centre for students in Classes 8 to 12. It offers structured programs covering board exam preparation (CBSE/NCERT), JEE Foundation, and NEET Preparation. The academy has been operating for 12+ years, has taught 500+ students, maintains a 95% board pass rate, and has produced 50+ school and district toppers. All batches are small — a maximum of 15 students — to ensure personalised attention.",
  },

  // ── Stats ────────────────────────────────────────────────────────────────
  {
    id: "stats",
    tags: ["stats", "statistics", "pass rate", "students", "toppers", "experience", "results", "achievements"],
    text: "Excel Academy key statistics: 500+ students taught, 95% board pass rate, 12+ years of teaching experience, 50+ board toppers, 85% of students score 80% or above in boards, and students see an average score improvement of 30%.",
  },

  // ── Programs — Class 8 ──────────────────────────────────────────────────
  {
    id: "program-class8",
    tags: ["class 8", "class eight", "program", "subjects", "schedule", "timing", "batch"],
    text: "Class 8 Program: Foundation building for middle-school students with a focus on strong basics in Mathematics and Science to prepare them for higher classes. Subjects covered: Mathematics and Science. Mode: Offline only. Timing: Wednesday and Friday, 3:00 PM to 4:30 PM. Batch size: Maximum 15 students. Aligned with CBSE/NCERT curriculum.",
  },

  // ── Programs — Class 9 ──────────────────────────────────────────────────
  {
    id: "program-class9",
    tags: ["class 9", "class nine", "program", "subjects", "schedule", "timing", "batch"],
    text: "Class 9 Program: Comprehensive coaching focused on building analytical thinking and exam readiness for board exams. Subjects covered: Mathematics, Science, and English. Mode: Offline and Online. Timing: Monday to Friday, 4:30 PM to 6:00 PM. Batch size: Maximum 15 students. Includes weekly tests and doubt sessions.",
  },

  // ── Programs — Class 10 ─────────────────────────────────────────────────
  {
    id: "program-class10",
    tags: ["class 10", "class ten", "board exam", "program", "subjects", "schedule", "timing", "batch", "mock test"],
    text: "Class 10 Program: Intensive board exam preparation with mock tests, previous year analysis, and focused revision strategy. Subjects covered: Mathematics, Science, and English. Mode: Offline and Online. Timing: Monday to Friday, 6:00 PM to 8:00 PM. Batch size: Maximum 15 students. Special focus: Board Preparation and Mock Tests.",
  },

  // ── Programs — Class 11 ─────────────────────────────────────────────────
  {
    id: "program-class11",
    tags: ["class 11", "class eleven", "jee", "neet", "program", "subjects", "schedule", "timing", "batch", "senior secondary"],
    text: "Class 11 Program: Senior secondary coaching with emphasis on conceptual depth covering the full CBSE syllabus, plus JEE and NEET Foundation preparation. Subjects covered: Mathematics, Physics, Chemistry, and Biology. Mode: Offline and Online. Timing: Monday to Saturday, 8:00 AM to 12:00 PM. Batch size: Maximum 15 students.",
  },

  // ── Programs — Class 12 ─────────────────────────────────────────────────
  {
    id: "program-class12",
    tags: ["class 12", "class twelve", "board exam", "competitive", "jee", "neet", "program", "subjects", "schedule", "timing", "batch"],
    text: "Class 12 Program: Complete board exam preparation with additional competitive exam support, including revision, mock tests, and personalised coaching. Subjects covered: Mathematics, Physics, Chemistry, Biology, English, and Computer Science. Mode: Offline and Online. Timing: Monday to Saturday, Morning and Afternoon batches. Batch size: Maximum 15 students.",
  },

  // ── Batch Timings ───────────────────────────────────────────────────────
  {
    id: "batches",
    tags: ["batch", "timing", "morning", "afternoon", "evening", "schedule", "time", "hours", "when"],
    text: "Excel Academy runs three daily batches: Morning Batch from 8:00 AM to 12:00 PM (for Classes 11 and 12), Afternoon Batch from 2:00 PM to 4:30 PM (for Classes 8 and 12), and Evening Batch from 4:30 PM to 8:00 PM (for Classes 9 and 10). Both online and offline options are available for most classes.",
  },

  // ── Weekly Schedule ─────────────────────────────────────────────────────
  {
    id: "schedule-monday",
    tags: ["monday", "schedule", "timetable", "week"],
    text: "Monday schedule: Physics Class 11 (8:00–10:00 AM), Biology Class 11 (10:00–12:00 PM), Chemistry Class 12 (2:00–4:00 PM), Mathematics Class 9 (4:30–6:00 PM), Mathematics Class 10 (6:00–8:00 PM).",
  },
  {
    id: "schedule-tuesday",
    tags: ["tuesday", "schedule", "timetable", "week"],
    text: "Tuesday schedule: Chemistry Class 11 (8:00–10:00 AM), Physics Class 11 (10:00–12:00 PM), Mathematics Class 12 (2:00–4:00 PM), Science Class 9 (4:30–6:00 PM), Physics Class 10 (6:00–8:00 PM).",
  },
  {
    id: "schedule-wednesday",
    tags: ["wednesday", "schedule", "timetable", "week"],
    text: "Wednesday schedule: Mathematics Class 11 (8:00–10:00 AM), Chemistry Class 11 (10:00–12:00 PM), Physics Class 12 (2:00–4:00 PM), Mathematics Class 8 (3:00–4:30 PM), Chemistry Class 10 (6:00–8:00 PM).",
  },
  {
    id: "schedule-thursday",
    tags: ["thursday", "schedule", "timetable", "week"],
    text: "Thursday schedule: Physics Class 11 (8:00–10:00 AM), Biology Class 11 (10:00–12:00 PM), English Class 12 (2:00–4:00 PM), English Class 9 (4:30–6:00 PM), Biology Class 10 (6:00–8:00 PM).",
  },
  {
    id: "schedule-friday",
    tags: ["friday", "schedule", "timetable", "week"],
    text: "Friday schedule: Chemistry Class 11 (8:00–10:00 AM), Physics Class 11 (10:00–12:00 PM), Computer Science Class 12 (2:00–4:00 PM), Science Class 8 (3:00–4:30 PM), English Class 10 (6:00–8:00 PM).",
  },
  {
    id: "schedule-saturday",
    tags: ["saturday", "schedule", "timetable", "week", "test", "doubt"],
    text: "Saturday schedule: Mathematics Class 11 (8:00–10:00 AM), Weekly Test for Class 11 and Class 12 (10:00–12:00 PM), Doubt Session for Class 10 (2:00–4:00 PM), Weekly Test for Class 9 and Class 10 (4:30–6:00 PM). Sunday is a holiday. Schedule may vary during exam season — special revision and doubt-clearing sessions are added before board exams.",
  },

  // ── Tracks ───────────────────────────────────────────────────────────────
  {
    id: "tracks",
    tags: ["tracks", "levels", "foundation", "senior", "competitive", "jee", "neet", "cbse"],
    text: "Excel Academy offers three learning tracks: (1) Foundation Track for Classes 8–10 — strong basics, analytical thinking, and exam readiness, covering Mathematics, Science, English, and Computer Science. (2) Senior Secondary Track for Classes 11–12 — conceptual depth across the full CBSE syllabus including Mathematics, Physics, Chemistry, Biology, English, and Computer Science. (3) Competitive Exam Track — structured preparation for CBSE Board, JEE Foundation, and NEET, layered on top of regular schoolwork.",
  },

  // ── Why Excel Academy ────────────────────────────────────────────────────
  {
    id: "why-excel",
    tags: ["why", "advantages", "benefits", "features", "best", "unique", "special", "different"],
    text: "Why choose Excel Academy: (1) Experienced Teacher — 12+ years of teaching experience with deep understanding of board exam patterns and student psychology. (2) Small Batches — maximum 15 students per batch ensures individual attention and personalised doubt-clearing. (3) Proven Results — 95% of students score above 80% in boards; 50+ school and district toppers produced. (4) Flexible Timing — morning, afternoon, and evening batches available; online classes for students who prefer learning from home.",
  },

  // ── Teaching Method ──────────────────────────────────────────────────────
  {
    id: "method",
    tags: ["method", "approach", "teaching", "how", "learn", "concept", "practice", "test", "review"],
    text: "Excel Academy's 4-step teaching method: (1) Concept Building — every topic starts with clear explanations using real-world examples, ensuring students understand the 'why' behind every concept. (2) Practice & Problems — extensive practice with graded difficulty, from NCERT basics to competitive-level problems, with shortcuts and time-saving techniques. (3) Test & Assess — regular chapter tests and mock exams in real exam conditions, with detailed performance analysis to identify weak areas early. (4) Review & Improve — personalised feedback, doubt sessions, and targeted revision; teaching adapts to each student's learning pace.",
  },

  // ── Pillars ──────────────────────────────────────────────────────────────
  {
    id: "pillars",
    tags: ["pillars", "policy", "study material", "parent", "communication", "online", "offline", "ncert", "cbse"],
    text: "Excel Academy's core pillars: small batch sizes (max 15 students) for personalised attention; regular parent-teacher communication with monthly progress reports; structured study material aligned with CBSE/NCERT syllabus with additional practice sets; weekly tests and mock exams in real exam conditions; both online and offline classes with flexible timing.",
  },

  // ── Results 2024 ─────────────────────────────────────────────────────────
  {
    id: "toppers-2024",
    tags: ["topper", "result", "2024", "score", "rank", "board", "achievement"],
    text: "2024 Board Results highlights: Priya S. scored 98.2% in Class 12 CBSE Board (School Topper). Arjun M. scored 96.4% in Class 10 CBSE Board (District Rank 5). Sneha R. scored 94.8% in Class 12 Science (Science Topper). Rohit K. scored 97.0% in Class 10 CBSE Board (Mathematics 100/100).",
  },

  // ── Results 2023 ─────────────────────────────────────────────────────────
  {
    id: "toppers-2023",
    tags: ["topper", "result", "2023", "score", "rank", "board", "achievement"],
    text: "2023 Board Results highlights: Neha V. scored 96.6% in Class 12 Science (School Topper). Karan S. scored 95.2% in Class 10 (City Rank 12). Ananya P. scored 93.4% in Class 12 Science (Physics 98/100). Vikram T. scored 94.0% in Class 10 (All Subjects 90+).",
  },

  // ── Growth Stories ───────────────────────────────────────────────────────
  {
    id: "growth-stories",
    tags: ["growth", "improvement", "before", "after", "progress", "increase", "score"],
    text: "Student improvement stories: Aditya G. (Class 10 Maths) improved from 62% to 94% (+32%). Meera J. (Class 12 Chemistry) improved from 61% to 89% (+28%). Sahil D. (Class 10 Science) improved from 56% to 91% (+35%). Riya P. (Class 12 Physics) improved from 62% to 87% (+25%).",
  },

  // ── Testimonial ──────────────────────────────────────────────────────────
  {
    id: "testimonial",
    tags: ["testimonial", "parent", "feedback", "review", "experience", "maths", "improvement"],
    text: "Parent testimonial from Rajesh Kumar (parent of a Class 10 student): \"My daughter's marks in Mathematics improved from 65% to 94% in just six months. The personalised attention she received at Excel Academy made all the difference.\"",
  },

  // ── Founder ──────────────────────────────────────────────────────────────
  {
    id: "founder",
    tags: ["founder", "teacher", "rajendra", "sharma", "educator", "credentials", "bio", "who", "experience"],
    text: "Excel Academy was founded by Rajendra Sharma, the Lead Educator with over 12 years of teaching experience. He holds an M.Sc. in Mathematics and a B.Ed. His approach focuses on building conceptual clarity rather than rote memorisation. He has taught thousands of students across Classes 8–12, and his teaching philosophy is: 'A student who understands the concept will never forget the formula. My job is to make them understand, not memorise.'",
  },

  // ── History / Milestones ─────────────────────────────────────────────────
  {
    id: "history",
    tags: ["history", "milestone", "journey", "founded", "started", "years", "since", "when"],
    text: "Excel Academy history: Founded in 2012 with 5 students in a small room, teaching Mathematics for Classes 9–10. In 2015, expanded to Science and English and moved to a dedicated classroom. In 2018, launched Class 12 batches and produced 3 school toppers. In 2020, introduced online classes during the pandemic, maintaining a 95% retention rate. In 2022, crossed 500+ students and added JEE and NEET Foundation courses. Today the academy serves Classes 8–12 with 50+ board toppers and counting.",
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  {
    id: "contact",
    tags: ["contact", "phone", "email", "address", "location", "whatsapp", "reach", "call", "enquire", "hours", "open"],
    text: "Contact Excel Academy: Phone: +91 98765 43210. Email: info@excelacademy.in. WhatsApp available at the same number. Address: 42, Knowledge Lane, Near City Park, New Delhi — 110001. Office Hours: Monday to Saturday, 8:00 AM to 8:00 PM. Sunday is closed.",
  },

  // ── Fees / Admission ─────────────────────────────────────────────────────
  {
    id: "fees",
    tags: ["fees", "fee", "cost", "price", "admission", "enroll", "join", "how to join", "registration"],
    text: "For fee and admission information, please contact Excel Academy directly. You can reach us at +91 98765 43210, via WhatsApp, or email info@excelacademy.in. Our team will provide you with the current fee structure and guide you through the enrollment process. Office hours: Monday–Saturday, 8:00 AM to 8:00 PM.",
  },

  // ── Subjects ─────────────────────────────────────────────────────────────
  {
    id: "subjects",
    tags: ["subjects", "mathematics", "physics", "chemistry", "biology", "english", "computer science", "science", "what subjects"],
    text: "Excel Academy covers: Mathematics (all classes), Science (Classes 8–10), Physics (Classes 10–12), Chemistry (Classes 10–12), Biology (Classes 10–12), English (Classes 9–12), and Computer Science (Classes 8 and 12). The subjects available depend on the class — contact the academy for a subject-specific enquiry.",
  },

  // ── Online Classes ───────────────────────────────────────────────────────
  {
    id: "online",
    tags: ["online", "virtual", "remote", "home", "digital", "zoom", "internet"],
    text: "Excel Academy offers online classes for Classes 9, 10, 11, and 12. Class 8 is currently available in offline mode only. Online classes cover the same curriculum and include doubt sessions and weekly tests, so students get the same quality of learning from home.",
  },

  // ── Doubt Sessions & Tests ───────────────────────────────────────────────
  {
    id: "doubt-tests",
    tags: ["doubt", "session", "weekly test", "mock", "exam", "assessment", "test", "practice"],
    text: "Regular assessments are core to Excel Academy's method. Weekly tests are held every Saturday for all classes. Dedicated doubt sessions are held on Saturdays for Class 10 students. Chapter tests and mock exams are conducted throughout the year in real exam conditions, with detailed performance analysis provided to students.",
  },
];
