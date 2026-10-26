import { ArrowLeft, MessageSquareMore, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((currentMessages) => [...currentMessages, text]);
    setMessage("");
  }

  return (
    <div className="mx-auto min-h-[calc(100svh-9rem)] max-w-7xl pb-10 text-[#183127] md:pb-12">
      <header className="flex items-center mt-6  justify-between">
        <button
          type="button"
          aria-label="Back to settings"
          onClick={() => navigate("/settings")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#183127] shadow-[0_4px_9px_rgba(17,45,29,0.046)] transition hover:bg-[#f1f6f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:h-14 sm:w-14"
        >
          <ArrowLeft
            aria-hidden="true"
            size={20}
          />
        </button>

        <h1 className="flex-1 text-center text-[1.8rem] font-semibold tracking-tight text-[#0a422a] md:text-[2rem]">
          Contact Support
        </h1>

        <div
          className="h-12 w-12 sm:h-14 sm:w-14"
          aria-hidden="true"
        />
      </header>

      <p className="mt-8 max-w-[26rem] text-[1.08rem] leading-[1.45] text-[#1a3229] sm:text-[1.25rem] md:text-[1.35rem]">
        We’re here to help, reach out to us for more questions, support or
        feedback.
      </p>

      <section
        aria-label="Support chat"
        className="mt-8 rounded-[1.25rem] border border-[#e4e8e2] bg-[#eef1ee] p-4 shadow-[0_8px_10px_rgba(22,45,34,0.032)]"
      >
        <div
          aria-live="polite"
          className="space-y-6"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dfe7df] bg-[#f5f7f5] text-[#0d412c]">
              <MessageSquareMore
                aria-hidden="true"
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <div className="max-w-[88%] rounded-[0.875rem] bg-[#e7ece7] px-4 py-3 text-[0.92rem] leading-[1.6] text-[#223a2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
              Hi! Thanks for reaching out. Send us a message and we’ll be happy
              to help.
            </div>
          </div>

          {messages.map((text, index) => (
            <div
              className="flex justify-end"
              key={`${index}-${text}`}
            >
              <div className="flex items-end gap-3">
                <div className="max-w-[88%] whitespace-pre-wrap break-words rounded-[0.875rem] bg-[#f2f4f2] px-4 py-3 text-[0.92rem] leading-[1.6] text-[#223a2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  {text}
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_30%,#f8e6e7_0%,#d2bbb1_18%,#7f4b5a_48%,#342c2d_100%)] ring-2 ring-[#edf1ee]">
                  <span className="text-[0.72rem] font-semibold text-white">
                    A
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <form
        onSubmit={sendMessage}
        className="mt-12 flex items-center gap-3 rounded-[1rem] border border-[#e1e8e1] bg-[#f0f3f0] px-3 py-3 shadow-[0_5px_9px_rgba(20,45,30,0.026)]"
      >
        <input
          type="text"
          aria-label="Type your message"
          placeholder="Text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="flex-1 border-0 bg-transparent px-2 py-2 text-[1.15rem] text-[#173127] placeholder:text-[#77857d] focus:outline-none"
        />

        <button
          type="submit"
          aria-label="Send message"
          disabled={!message.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-[0.75rem] bg-[#0d422b] text-white shadow-[0_6px_11px_rgba(9,58,37,0.169)] transition hover:bg-[#0b3a26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d422b]"
        >
          <SendHorizontal
            aria-hidden="true"
            size={20}
            strokeWidth={2.1}
          />
        </button>
      </form>
    </div>
  );
}
