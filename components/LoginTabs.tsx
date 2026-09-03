"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Role = "teacher" | "student";

/**
 * Portal access panel — teacher / student tabs with an honest handoff:
 * credentials are provisioned at enrolment, so the panel routes new
 * users to contact instead of dead-ending.
 */
export default function LoginTabs() {
  const [role, setRole] = useState<Role>("student");
  const [notice, setNotice] = useState<string | null>(null);

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-abyss/60 px-4 py-3 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-pulse/70";

  return (
    <div className="glass w-full max-w-md rounded-[2rem] p-8 sm:p-10">
      <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-abyss/60 p-1">
        {(["teacher", "student"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => {
              setRole(r);
              setNotice(null);
            }}
            aria-pressed={role === r}
            className={cn(
              "rounded-full py-2.5 font-display text-sm font-bold capitalize transition-all duration-300",
              role === r
                ? "bg-brand text-white"
                : "text-muted hover:text-white"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(
            role === "teacher"
              ? "Teacher access is provisioned by the academy office — please contact us if you need your credentials."
              : "Student logins are created at enrolment. New here? Contact us to enrol and receive your student ID."
          );
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            {role === "teacher" ? "Email or username" : "Student ID or phone number"}
          </span>
          <input
            required
            type="text"
            placeholder={role === "teacher" ? "you@excelacademy.in" : "EA-2024-… or +91 …"}
            className={inputCls}
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Password
          </span>
          <input required type="password" placeholder="••••••••" className={inputCls} />
        </label>
        <button
          type="submit"
          className="btn-sheen mt-6 w-full rounded-full bg-brand py-3.5 font-display text-sm font-bold text-white transition-colors hover:bg-[#4a82ff]"
        >
          Sign In as {role === "teacher" ? "Teacher" : "Student"}
        </button>
        <button
          type="button"
          onClick={() =>
            setNotice("Password resets are handled by the academy office — reach us on WhatsApp for the fastest help.")
          }
          className="mx-auto mt-4 block text-sm text-muted transition-colors hover:text-pulse"
        >
          Forgot Password?
        </button>
      </form>

      {notice && (
        <p role="status" className="mt-5 rounded-2xl border border-pulse/30 bg-pulse/10 p-4 text-sm leading-relaxed text-white">
          {notice}
        </p>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/contact" className="font-bold text-pulse hover:underline">
          Contact us to enrol
        </Link>
      </p>
    </div>
  );
}
