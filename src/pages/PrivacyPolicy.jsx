import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  Lock,
  Share2,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "Introduction",
    text: "At Cephas Agro Link, we are committed to protecting your personal data and your privacy. This policy outlines how we handle your information with the highest standards of digital integrity.",
    accent: "#0b5b43",
  },
  {
    icon: Database,
    title: "Data Collection",
    text: "We collect information you provide directly to us when you create an account, such as your name, email, and farm details.",
    accent: "#0b5b43",
  },
  {
    icon: BrainCircuit,
    title: "How We Use Data",
    text: "Your data helps us improve our AI-powered crop intelligence and facilitate secure marketplace transactions. We transform raw data into actionable insights for your farm.",
    accent: "#0b5b43",
  },
  {
    icon: Share2,
    title: "Data Sharing",
    text: "We do not sell your personal data. We share it only with verified partners like logistics and financial institutions to fulfill your orders and maintain ecosystem security.",
    accent: "#0b5b43",
  },
  {
    icon: Lock,
    title: "Security",
    text: "We use enterprise-grade encryption to protect your data. All transactions and profile information are stored in highly secure, fragmented cloud environments.",
    accent: "#d34f4f",
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-[calc(100svh-11rem)] max-w-[42rem] pb-12 text-[#183127]">
      <header className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Back to settings"
          onClick={() => navigate("/settings")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#183127] shadow-[0_4px_9px_rgba(17,45,29,0.046)] transition hover:bg-[#f1f6f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:h-14 sm:w-14"
        >
          <ArrowLeft
            aria-hidden="true"
            size={23}
          />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold tracking-tight text-[#0a422a] sm:text-xl">
          Privacy & Policy
        </h1>
        <div
          className="h-12 w-12 sm:h-14 sm:w-14"
          aria-hidden="true"
        />
      </header>

      <main className="mt-8 rounded-[1rem] border border-[#e4e8e2] bg-[#f3f4f3] px-4 pb-5 pt-6 shadow-[0_9px_11px_rgba(22,45,34,0.026)] sm:px-6">
        {sections.map(({ icon: Icon, title, text, accent }, index) => (
          <section
            key={title}
            className={index > 0 ? "mt-8" : ""}
          >
            <div className="flex items-start gap-4">
              <div
                className="mt-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dfe7df] bg-[#edf3ee] text-[#0b5b43]"
                style={{ color: accent }}
              >
                <Icon
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold leading-tight text-[#0a5d41] sm:text-base">
                  {title}
                </h2>

                {title === "Data Collection" ? (
                  <>
                    <p className="mt-3 text-sm leading-6 text-[#1e382f]">
                      {text}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-[#e7efe8] px-4 py-3 text-xs font-medium text-[#1d312a] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] sm:text-sm">
                        <span className="block text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#476257]">
                          Identity
                        </span>
                        <span className="mt-1 block">Name & Contacts</span>
                      </div>

                      <div className="rounded-lg bg-[#e7efe8] px-4 py-3 text-xs font-medium text-[#1d312a] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] sm:text-sm">
                        <span className="block text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#476257]">
                          Assets
                        </span>
                        <span className="mt-1 block">Farm Details</span>
                      </div>
                    </div>
                  </>
                ) : title === "Data Sharing" ? (
                  <>
                    <p className="mt-3 text-sm leading-6 text-[#1e382f]">
                      {text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="rounded-full bg-[#e6f0e8] px-4 py-2 text-sm font-medium text-[#12382b] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        Logistics Partners
                      </span>
                      <span className="rounded-full bg-[#e6f0e8] px-4 py-2 text-sm font-medium text-[#12382b] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        Financial Institutions
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-[#1e382f]">
                    {text}
                  </p>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
