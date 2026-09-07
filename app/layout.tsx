import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SpecNavbar from "@/components/spec/Navbar";
import CartDrawer from "@/components/spec/CartDrawer";
import SpecFooter from "@/components/spec/Footer";
import SpecReveal from "@/components/spec/Reveal";
import SpecEffects from "@/components/spec/Effects";
import { CartProvider } from "@/lib/cart";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SPEC Optical Studio — See Clearly, Look Sharp | HITEC City, Hyderabad",
    template: "%s — SPEC Optical Studio",
  },
  description:
    "SPEC Optical Studio, Inorbit Mall Rd, HITEC City. Designer eyeglasses from ₹1,499, sunglasses, 20-min digital eye exams, same-day fitting. 4.9★ from 2,300+ customers.",
  keywords: ["optical", "eyeglasses", "sunglasses", "eye test Hyderabad", "SPEC", "contact lenses"],
  openGraph: {
    title: "SPEC Optical Studio — See Clearly, Look Sharp",
    description: "Mall studio optician: 20-min eye exam, same-day lenses, 1-year warranty.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <CartProvider>
          <SpecNavbar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <SpecFooter />
          <CartDrawer />
          {/* Chatbot deferred per client call — see lib/chat/ seam. */}
        </CartProvider>
        <SpecReveal />
        <SpecEffects />
      </body>
    </html>
  );
}
