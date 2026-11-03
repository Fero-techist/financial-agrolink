import { useState } from "react";
import { ArrowLeft, CalendarDays, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { getOpportunityDrafts } from "../utils/opportunityDrafts";

function formatAmount(amount, currency) {
  const symbol = currency === "USD" ? "$" : "₦";
  const value = Number(amount);
  return `${symbol}${Number.isFinite(value) ? value.toLocaleString("en-US") : amount}`;
}

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function DraftCard({ draft }) {
  const eligibleItems = [
    ...(draft.agricultureKeywords || []),
    ...(draft.geographicBoundaries || []),
  ];
  const repaymentItems =
    draft.type === "Loan"
      ? [
          `${draft.interestPercentage || "0"}% monthly`,
          draft.minimumDuration || draft.maximumDuration
            ? `${draft.minimumDuration || "—"} – ${draft.maximumDuration || "—"} month tenure`
            : "Repayment tenure",
          `${draft.gracePeriod || "0"} month grace period`,
        ]
      : [];
  const details = [...eligibleItems, ...repaymentItems].slice(0, 4);
  const savedDate = draft.savedAt ? formatDate(draft.savedAt.slice(0, 10)) : "";
  const applicationWindow = [
    formatDate(draft.opensAt),
    formatDate(draft.closesAt),
  ]
    .filter(Boolean)
    .join(" – ");
  const dateText =
    applicationWindow || (savedDate ? `Last saved ${savedDate}` : "");

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_5px_11px_rgba(20,55,35,0.039)] sm:p-7">
      <div className="mb-5">
        <span className="inline-flex min-h-10 items-center rounded-lg bg-[#e8f4ea] px-4 py-2 text-sm font-medium text-[#07512f]">
          Draft
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ea] text-[#287245]">
          <Landmark
            aria-hidden="true"
            size={24}
            strokeWidth={1.8}
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[#10291c] sm:text-base">
            Funding opportunity
          </h2>
          <p className="mt-0.5 text-xs text-[#91a097]">Saved on this device</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase ${
            draft.type === "Grant"
              ? "bg-[#087642] text-white"
              : "bg-[#d1e7dd] text-[#07512f]"
          }`}
        >
          {draft.type || "Opportunity"}
        </span>
        <p className="text-base font-bold text-[#087642] sm:text-lg">
          {formatAmount(draft.minimumAmount, draft.currency)}
          {draft.maximumAmount &&
            draft.maximumAmount !== draft.minimumAmount &&
            ` – ${formatAmount(draft.maximumAmount, draft.currency)}`}
        </p>
      </div>

      <h3 className="mt-3 break-words text-lg font-semibold leading-snug text-[#382417] sm:text-xl">
        {draft.title || "Untitled opportunity"}
      </h3>

      {details.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {details.map((item) => (
            <li
              key={item}
              className="inline-flex min-h-9 items-center rounded-lg bg-[#faf5eb] px-3 py-2 text-xs text-[#47554c]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4f5c53]">
        {draft.description || "Add a description to complete this draft."}
      </p>

      {dateText && (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#10291c]">
          <CalendarDays
            aria-hidden="true"
            size={16}
            className="shrink-0 text-[#287245]"
          />
          {dateText}
        </p>
      )}

      <Link
        to={`/programs/create?draft=${encodeURIComponent(draft.id)}`}
        className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#006331] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004f27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
      >
        View
      </Link>
    </article>
  );
}

export default function OpportunityDrafts() {
  const [draftState] = useState(() => {
    try {
      return { drafts: getOpportunityDrafts(), error: "" };
    } catch (loadError) {
      console.error("Unable to load opportunity drafts.", loadError);
      return {
        drafts: [],
        error: "Unable to load drafts. Please refresh and try again.",
      };
    }
  });
  const { drafts, error } = draftState;

  return (
    <div className="mx-auto max-w-7xl space-y-7 sm:space-y-8">
      <Link
        to="/programs"
        aria-label="Back to programs"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#10291c] shadow-sm transition hover:bg-[#eef4ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
      >
        <ArrowLeft
          aria-hidden="true"
          size={23}
        />
      </Link>

      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#819087]">
          Your workspace
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#123e2b] sm:text-3xl">
          Saved drafts
        </h1>
        <p className="text-sm leading-6 text-[#718078] sm:text-base">
          Pick up where you left off and finish setting up your opportunities.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {!error && drafts.length === 0 && (
        <div className="rounded-2xl bg-white px-5 py-12 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#10291c]">
            No saved drafts yet
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#718078]">
            Save an opportunity while creating it and you can continue from here
            later.
          </p>
          <Link
            to="/programs/create"
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#07512f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#063f25]"
          >
            Create opportunity
          </Link>
        </div>
      )}

      {drafts.length > 0 && (
        <section
          aria-label="Saved opportunity drafts"
          className="grid items-stretch gap-5 lg:grid-cols-2 xl:gap-6"
        >
          {drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
            />
          ))}
        </section>
      )}
    </div>
  );
}
