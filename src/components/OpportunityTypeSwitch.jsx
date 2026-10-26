const opportunityTypes = ["Loan", "Grant"];

export default function OpportunityTypeSwitch({ value, onChange }) {
  return (
    <fieldset className="min-w-0 rounded-2xl border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.026)] sm:p-7">
      <legend className="sr-only">Opportunity type</legend>
      <h2       className="text-lg font-semibold text-[#193e2b]">
        Opportunity type
      </h2>
      <div
        role="radiogroup"
        aria-label="Opportunity type"
        className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md"
      >
        {opportunityTypes.map((type) => (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={value === type}
            onClick={() => onChange(type)}
            className={`min-h-12 rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:text-base ${
              value === type
                ? "bg-[#e7f2e7] text-[#07512f] shadow-sm ring-1 ring-inset ring-[#bfd8c2]"
                : "bg-[#f6f8f5] text-[#53665a] hover:bg-[#edf4ec] hover:text-[#07512f]"
            }`}
          >
            <span
              aria-hidden="true"
              className="mr-1.5"
            >
              {value === type ? "●" : "○"}
            </span>
            {type}
          </button>
        ))}
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-[#718078]">
        {value === "Loan"
          ? "Loans include interest and repayment terms. Set the funding range and application window for your loan opportunity."
          : "Grants do not require repayment. Set the funding range and application window for your grant opportunity."}
      </p>
    </fieldset>
  );
}
