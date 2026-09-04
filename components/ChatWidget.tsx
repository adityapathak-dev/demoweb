"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What programs do you offer?",
  "What are the class timings?",
  "Is online coaching available?",
  "Tell me about Class 10 preparation",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the Excel Academy assistant 👋\n\nAsk me anything about our programs, schedules, results, or teaching approach — I'm here to help!",
};

// ── Unique ID helper (avoids React key conflicts) ─────────────────────────
let _msgId = 0;
function nextId() {
  return `msg-${++_msgId}-${Date.now()}`;
}

// ── Icons ─────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.09 9.09 2 12l7.09 2.91L12 22l2.91-7.09L22 12l-7.09-2.91L12 2z" />
    </svg>
  );
}

// ── Typing indicator dots ─────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(62, 226, 255, 0.7)",
            animation: `chatDotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        gap: 4,
        animation: "chatMsgIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {!isUser && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2f6bff, #3ee2ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}>
            <SparkleIcon />
          </div>
          <span style={{ fontSize: 11, color: "#9dabc9", fontWeight: 600, letterSpacing: "0.05em" }}>
            Excel AI
          </span>
        </div>
      )}
      <div
        style={{
          maxWidth: "88%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #2f6bff, #1b3fbf)"
            : "rgba(13, 21, 40, 0.8)",
          border: isUser ? "none" : "1px solid rgba(148, 178, 255, 0.14)",
          color: "#f2f6ff",
          fontSize: 13.5,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          backdropFilter: isUser ? "none" : "blur(8px)",
        }}
      >
        {msg.content}
      </div>
    </div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setHasNotification(false);
      return next;
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { id: nextId(), role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        // Build history (exclude welcome message, exclude current user message)
        const history = messages
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();
        const assistantMsg: Message = {
          id: nextId(),
          role: "assistant",
          content: data.reply ?? "Sorry, I couldn't generate a response. Please try again.",
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content:
              "Sorry, something went wrong. Please try again or contact us at +91 98765 43210.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleStarterClick = (q: string) => {
    sendMessage(q);
  };

  const showStarters = messages.length === 1; // only when only welcome message

  return (
    <>
      {/* Injected keyframe animations */}
      <style>{`
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes chatMsgIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes chatPulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes chatPanelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes chatNotif {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.2); }
        }
        .chat-trigger:hover { transform: scale(1.07); }
        .chat-trigger { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .chat-send-btn:hover:not(:disabled) { background: linear-gradient(135deg, #2f6bff, #3ee2ff) !important; transform: scale(1.05); }
        .chat-send-btn { transition: all 0.2s ease; }
        .chat-starter-chip:hover { background: rgba(47, 107, 255, 0.2) !important; border-color: rgba(47, 107, 255, 0.5) !important; color: #f2f6ff !important; }
        .chat-starter-chip { transition: all 0.2s ease; }
        textarea.chat-input:focus { outline: none; border-color: rgba(62, 226, 255, 0.4) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(47, 107, 255, 0.4); border-radius: 4px; }
      `}</style>

      {/* ── Floating trigger button ─────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        {/* Chat panel */}
        {isOpen && (
          <div
            id="excel-chat-panel"
            role="dialog"
            aria-label="Excel Academy chat assistant"
            aria-modal="true"
            style={{
              width: "min(360px, calc(100vw - 48px))",
              height: "min(520px, calc(100vh - 120px))",
              borderRadius: 20,
              background: "linear-gradient(160deg, rgba(20, 30, 58, 0.92), rgba(8, 13, 28, 0.96))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(148, 178, 255, 0.16)",
              boxShadow: "0 32px 80px -20px rgba(0,0,0,0.8), 0 8px 32px -8px rgba(47,107,255,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "chatPanelIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 18px",
              borderBottom: "1px solid rgba(148, 178, 255, 0.10)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(10, 17, 34, 0.5)",
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2f6bff 0%, #3ee2ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(62, 226, 255, 0.35)",
              }}>
                <SparkleIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 14, fontWeight: 700, color: "#f2f6ff" }}>
                  Excel Academy AI
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: "#3ee2ff", fontWeight: 500 }}>
                  ● Online · Ask me anything
                </p>
              </div>
              <button
                id="chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "rgba(148, 178, 255, 0.08)",
                  border: "1px solid rgba(148, 178, 255, 0.12)",
                  borderRadius: 8,
                  color: "#9dabc9",
                  cursor: "pointer",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 16px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "linear-gradient(135deg, #2f6bff, #3ee2ff)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                    }}>
                      <SparkleIcon />
                    </div>
                    <span style={{ fontSize: 11, color: "#9dabc9", fontWeight: 600 }}>Excel AI</span>
                  </div>
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(13, 21, 40, 0.8)",
                    border: "1px solid rgba(148, 178, 255, 0.14)",
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Starter question chips */}
              {showStarters && !isLoading && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleStarterClick(q)}
                      className="chat-starter-chip"
                      style={{
                        background: "rgba(47, 107, 255, 0.08)",
                        border: "1px solid rgba(47, 107, 255, 0.25)",
                        borderRadius: 20,
                        color: "#9dabc9",
                        cursor: "pointer",
                        fontSize: 12,
                        padding: "6px 12px",
                        fontFamily: "inherit",
                        lineHeight: 1.4,
                        textAlign: "left",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={{
              borderTop: "1px solid rgba(148, 178, 255, 0.10)",
              padding: "12px 14px",
              background: "rgba(10, 17, 34, 0.4)",
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
            }}>
              <textarea
                ref={inputRef}
                id="chat-input"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask about programs, timings, results…"
                rows={1}
                aria-label="Chat message input"
                style={{
                  flex: 1,
                  background: "rgba(13, 21, 40, 0.6)",
                  border: "1px solid rgba(148, 178, 255, 0.14)",
                  borderRadius: 12,
                  color: "#f2f6ff",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  padding: "10px 14px",
                  resize: "none",
                  lineHeight: 1.5,
                  maxHeight: 100,
                  overflowY: "auto",
                  transition: "border-color 0.2s ease",
                }}
              />
              <button
                id="chat-send-btn"
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="chat-send-btn"
                aria-label="Send message"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg, #1b3fbf, #2f6bff)"
                    : "rgba(148, 178, 255, 0.08)",
                  border: "1px solid rgba(47, 107, 255, 0.3)",
                  color: input.trim() && !isLoading ? "#fff" : "#64708e",
                  cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        {/* Trigger button */}
        <div style={{ position: "relative" }}>
          {/* Pulse ring (shown when closed) */}
          {!isOpen && (
            <span style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(62, 226, 255, 0.5)",
              animation: "chatPulseRing 2.4s cubic-bezier(0.2, 0, 0.8, 1) infinite",
              pointerEvents: "none",
            }} />
          )}

          {/* Notification dot */}
          {hasNotification && !isOpen && (
            <span style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#b6f34a",
              border: "2px solid #04070f",
              zIndex: 1,
              animation: "chatNotif 1.8s ease-in-out infinite",
            }} />
          )}

          <button
            id="chat-open-btn"
            onClick={toggleOpen}
            className="chat-trigger"
            aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
            aria-expanded={isOpen}
            aria-controls="excel-chat-panel"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isOpen
                ? "linear-gradient(135deg, #0d1528, #0a1122)"
                : "linear-gradient(135deg, #2f6bff, #3ee2ff)",
              border: "none",
              boxShadow: isOpen
                ? "0 8px 32px rgba(0,0,0,0.5)"
                : "0 8px 32px rgba(47,107,255,0.5), 0 2px 8px rgba(62,226,255,0.3)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 0,
            }}
          >
            {isOpen ? <CloseIcon /> : <ChatIcon />}
          </button>
        </div>
      </div>
    </>
  );
}
