import type { Metadata } from "next";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifAccent = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Excel Academy — Learn Smarter, Score Higher | Classes 8–12",
    template: "%s — Excel Academy",
  },
  description:
    "Personalised coaching for Classes 8–12 with a focus on conceptual clarity, regular practice, and exam-ready preparation. Boards, JEE and NEET. Small batches, big results.",
  keywords: ["coaching", "CBSE", "JEE", "NEET", "Classes 8-12", "board exams", "Excel Academy"],
  openGraph: {
    title: "Excel Academy — Learn Smarter, Score Higher",
    description:
      "Personalised coaching for Classes 8–12. Small batches, proven results, flexible timing.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serifAccent.variable}`}>
      <body className="bg-abyss text-ink font-sans">
        <div aria-hidden className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
