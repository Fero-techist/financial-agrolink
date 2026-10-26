function formatAmount(amount, currency) {
  const symbol = currency === "USD" ? "$" : "₦";
  const numericAmount = Number(amount);
  return `${symbol}${Number.isFinite(numericAmount) ? numericAmount.toLocaleString("en-US") : amount}`;
}

function formatDate(date) {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function ReviewSection({ title, subtitle, onEdit, children, dark = false }) {
  return (
    <section
      className={`rounded-2xl border p-5 shadow-[0_4px_9px_rgba(20,55,35,0.026)] sm:p-7 ${
        dark
          ? "border-[#07512f] bg-gradient-to-br from-[#07512f] to-[#033323] text-white"
          : "border-[#e5ece4] bg-white text-[#19382a]"
      }`}
    >
      {children}
      <button
        type="button"
        onClick={onEdit}
        className={`mt-5 flex min-h-12 w-full items-center justify-between gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84c99b] ${
          dark ? "text-white" : "text-[#10291c]"
        }`}
      >
        <span>
          <span className="block text-base font-semibold">{title}</span>
          <span
            className={`mt-1 block text-sm ${
              dark ? "text-white/90" : "text-[#89968d]"
            }`}
          >
            {subtitle}
          </span>
        </span>
        <span aria-hidden="true" className="text-2xl text-[#087642]">
          ›
        </span>
      </button>
    </section>
  );
}

export default function OpportunityReview({
  form,
  onEditDetails,
  onEditEligibility,
}) {
  const agriculture = form.eligibleAgriculture.trim() || "Not provided";
  const sector = form.agricultureKeywords.length
    ? `${form.agricultureKeywords.join(", ")}: ${agriculture}`
    : agriculture;
  const duration =
    form.minimumDuration || form.maximumDuration
      ? `${form.minimumDuration || "—"} - ${form.maximumDuration || "—"} months`
      : "Not set";

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.026)] sm:p-7">
        <h2 className="text-lg font-semibold text-[#07512f]">
          Opportunity type
        </h2>
        <span className="mt-4 inline-flex min-h-10 min-w-36 items-center justify-center rounded-full bg-[#d1e7dd] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#07512f]">
          {form.type}
        </span>
      </section>

      <ReviewSection
        title="Edit Details"
        subtitle="Step 1 · Program details"
        onEdit={onEditDetails}
        dark
      >
        <h2 className="break-words text-lg font-semibold sm:text-xl">
          {form.title || "Untitled opportunity"}
        </h2>
        <p className="mt-4 break-words text-lg font-semibold sm:text-xl">
          {formatAmount(form.minimumAmount, form.currency)} -{" "}
          {formatAmount(form.maximumAmount, form.currency)}
        </p>
        <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-white/95 sm:text-base sm:leading-7">
          {form.description || "No description provided."}
        </p>
        <p className="mt-4 text-sm font-medium text-white/95">
          {formatDate(form.opensAt)} – {formatDate(form.closesAt)}
        </p>
      </ReviewSection>

      <ReviewSection
        title="Edit eligibility"
        subtitle="Step 2 · Eligibility"
        onEdit={onEditEligibility}
      >
        <h2 className="text-lg font-semibold text-[#07512f]">Eligibility</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-3 sm:gap-5">
            <dt className="text-[#89968d]">Sector</dt>
            <dd className="break-words font-medium">{sector}</dd>
          </div>
          <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-3 sm:gap-5">
            <dt className="text-[#89968d]">Geography</dt>
            <dd className="break-words font-medium">
              {form.geographicBoundaries.join(", ") || "Not provided"}
            </dd>
          </div>
          {form.type === "Loan" && (
            <>
              <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-3 sm:gap-5">
                <dt className="text-[#89968d]">Interest</dt>
                <dd className="font-medium">
                  {form.interestPercentage || "0"}%
                </dd>
              </div>
              <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-3 sm:gap-5">
                <dt className="text-[#89968d]">Duration</dt>
                <dd className="font-medium">{duration}</dd>
              </div>
              <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-3 sm:gap-5">
                <dt className="text-[#89968d]">Grace Period</dt>
                <dd className="font-medium">
                  {form.gracePeriod || "0"} months
                </dd>
              </div>
            </>
          )}
        </dl>
      </ReviewSection>
    </div>
  );
}
