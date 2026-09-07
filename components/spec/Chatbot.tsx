"use client";

import { useEffect, useRef, useState } from "react";
import { answer, type Answer } from "@/lib/chat/retrieve";

/**
 * Specs concierge — RAG chatbot.
 * UI only: retrieval + grounding live in lib/chat/{knowledge,embeddings,retrieve}.
 * Theme stays minimal black/white/grey; answers cite their sources.
 */

type Msg = { from: "bot" | "user"; text: string; sources?: Answer["sources"] };

const CHIPS = ["Prices?", "Book a slot?", "Home try-on?", "Warranty?"];

export default function SpecChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hey, I'm Specs! I answer from the store's own notes — ask about prices, slots, lenses, or warranty.",
    },
  ]);
  const [val, setVal] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const a = answer(q);
    setMsgs((m) => [...m, { from: "user", text: q }, { from: "bot", text: a.text, sources: a.sources }]);
    setVal("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat with Specs" : "Chat with Specs"}
        className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-lg bg-black text-lg text-white transition-colors hover:bg-ink"
      >
        {open ? "✕" : "◖◗"}
      </button>
      {open && (
        <section
          aria-label="Chat with Specs"
          className="fixed bottom-20 right-5 z-[80] flex h-[440px] w-[330px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
        >
          <header className="border-b border-border bg-white px-4 py-3">
            <p className="text-sm font-medium text-heading">Specs · concierge</p>
            <p className="text-[11px] text-smoke">Grounded in store notes · cites sources</p>
          </header>
          <div ref={logRef} className="flex-1 space-y-2 overflow-y-auto bg-sand/40 p-3" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "bot" ? "max-w-[88%]" : "ml-auto max-w-[85%]"}>
                <p
                  className={`rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "bot" ? "bg-white" : "bg-heading text-white"
                  }`}
                >
                  {m.text}
                </p>
                {m.sources && m.sources.length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-1 px-1" aria-label="Answer sources">
                    {m.sources.map((s) => (
                      <span key={s.id} className="rounded-md bg-sand px-1.5 py-0.5 text-[10px] font-medium text-smoke">
                        {s.topic}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-2">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => send(chip)}
                className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-sand"
              >
                {chip}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(val);
            }}
          >
            <label htmlFor="chat-in" className="sr-only">
              Message Specs
            </label>
            <input
              id="chat-in"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Ask prices, slots…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-border px-3.5 py-2.5 text-sm placeholder:text-disabled"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-black px-3.5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-ink"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
}
