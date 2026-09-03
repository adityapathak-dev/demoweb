import type { Metadata } from "next";
import Link from "next/link";
import LoginTabs from "@/components/LoginTabs";

export const metadata: Metadata = {
  title: "Student & Teacher Login",
  description: "Log in to access your Excel Academy dashboard and study materials.",
};

export default function LoginPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 sm:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[22rem] w-[22rem] rounded-full bg-mind/20 blur-[130px]" />
        <div className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      </div>
      <div className="relative flex w-full max-w-md flex-col items-center">
        <Link href="/" className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand via-brand-deep to-mind font-display text-lg font-bold text-white shadow-[0_14px_40px_-10px_rgba(47,107,255,0.8)]">
          EA
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Log in to access your dashboard and study materials
        </p>
        <div className="mt-8 w-full">
          <LoginTabs />
        </div>
        <Link
          href="/"
          className="mt-8 text-sm text-muted transition-colors hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
