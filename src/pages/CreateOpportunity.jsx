import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import KeywordSuggestions from "../components/KeywordSuggestions";
import OpportunityReview from "../components/OpportunityReview";
import OpportunityTypeSwitch from "../components/OpportunityTypeSwitch";
import {
  createOpportunityDraftId,
  getOpportunityDraft,
  saveOpportunityDraft,
} from "../utils/opportunityDrafts";
import { ArrowLeft } from "lucide-react";

const initialForm = {
  type: "Loan",
  title: "Smallholder Poultry Expansion Grant",
  description:
    "Seasonal working capital for maize and cassava farmers in Oyo State. Finance certified seed, fertiliser and land preparation, with repayment aligned to harvest.",
  minimumAmount: "30000",
  maximumAmount: "300000",
  currency: "USD",
  opensAt: "",
  closesAt: "",
  eligibleAgriculture: "Maize, Cassava",
  agricultureKeywords: [],
  geographicBoundaries: [],
  interestPercentage: "8",
  minimumDuration: "",
  maximumDuration: "",
  gracePeriod: "4",
};

const fieldClassName =
  "mt-2 min-h-14 w-full rounded-lg border border-[#dfe8df] bg-white px-4 py-3 text-base text-[#1b3025] outline-none transition placeholder:text-[#a0aaa3] hover:border-[#bdcfbf] focus:border-[#07512f] focus:ring-4 focus:ring-[#07512f]/[0.08] lg:text-sm";
const totalSteps = 3;

function FormField({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-[#294b37] lg:text-sm"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CreateOpportunity() {
  const [searchParams] = useSearchParams();
  const requestedDraftId = searchParams.get("draft");
  const [draftId] = useState(
    () => requestedDraftId || createOpportunityDraftId(),
  );
  const [loadedDraft] = useState(() => {
    if (!requestedDraftId) return null;
    try {
      return getOpportunityDraft(requestedDraftId) || null;
    } catch (error) {
      console.error("Unable to load the opportunity draft.", error);
      return null;
    }
  });
  const [form, setForm] = useState(() =>
    loadedDraft
      ? Object.fromEntries(
          Object.keys(initialForm).map((key) => [
            key,
            loadedDraft[key] ?? initialForm[key],
          ]),
        )
      : initialForm,
  );
  const [step, setStep] = useState(() =>
    Math.min(Math.max(Number(loadedDraft?.step) || 1, 1), totalSteps),
  );
  const [notice, setNotice] = useState(
    requestedDraftId && !loadedDraft
      ? "This draft could not be found or loaded. It may have been removed."
      : "",
  );
  const [noticeIsError, setNoticeIsError] = useState(
    Boolean(requestedDraftId && !loadedDraft),
  );
  const stepTitle =
    step === 2
      ? "Eligibility"
      : step === 3
        ? "Review & Publish"
        : "Program details";
  const stepDescription =
    step === 2
      ? `Define who qualifies for this ${form.type.toLowerCase()}.`
      : step === 3
        ? "Confirm the details before opening applications."
        : "Create a new opportunity for your farmers.";
  const stepNames = ["Details", "Eligibility", "Review"];

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setNotice("");
  }

  function saveProgress(message, stepToSave = step, status = "draft") {
    try {
      saveOpportunityDraft({
        ...form,
        id: draftId,
        step: stepToSave,
        status,
        savedAt: new Date().toISOString(),
      });
      setNotice(message);
      setNoticeIsError(false);
      return true;
    } catch (error) {
      console.error("Unable to save the opportunity draft.", error);
      setNotice("Unable to save your progress. Please try again.");
      setNoticeIsError(true);
      return false;
    }
  }

  function handleContinue(event) {
    event.preventDefault();
    if (step < totalSteps) {
      if (saveProgress(`Step ${step} saved.`, step + 1)) {
        setStep((currentStep) => currentStep + 1);
      }
      return;
    }

    saveProgress("Opportunity draft saved.");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <header className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-4">
          {step === 1 ? (
            <Link
              to="/programs"
              aria-label="Back to programs"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#10291c] shadow-sm transition hover:bg-[#eef4ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:h-14 sm:w-14"
            >
              <span
                aria-hidden="true"
                className="text-2xl leading-none"
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={24}
                />
              </span>
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Go to previous step"
              onClick={() => {
                const previousStep = step - 1;
                if (saveProgress(`Step ${previousStep} saved.`, previousStep)) {
                  setStep(previousStep);
                }
              }}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#10291c] shadow-sm transition hover:bg-[#eef4ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:h-14 sm:w-14"
            >
              <span
                aria-hidden="true"
                className="text-2xl leading-none"
              >
                ←
              </span>
            </button>
          )}
          <h1 className="min-w-0 text-2xl font-semibold tracking-tight text-[#123e2b] sm:text-3xl">
            {stepTitle}
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[#718078] sm:text-base sm:leading-7">
          {stepDescription}
        </p>
      </header>

      <form
        onSubmit={handleContinue}
        className="space-y-5 sm:space-y-6"
      >
        <section
          aria-label="Creation progress"
          className="rounded-xl border border-[#e5ece4] bg-white p-4 shadow-[0_3px_11px_rgba(20,55,35,0.023)] sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#07512f]">
              Step {step} of {totalSteps}
            </p>
            <p className="text-sm font-medium text-[#718078]">
              {stepNames[step - 1]}
            </p>
          </div>
          <ol
            aria-label={`Step ${step} of ${totalSteps}`}
            className="mt-4 grid grid-cols-3 gap-2"
          >
            {Array.from({ length: totalSteps }, (_, index) => (
              <li key={index}>
                <button
                  type="button"
                  aria-label={`Save and go to step ${index + 1}: ${stepNames[index]}`}
                  aria-current={index === step - 1 ? "step" : undefined}
                  onClick={() => {
                    if (saveProgress(`Step ${index + 1} saved.`, index + 1)) {
                      setStep(index + 1);
                    }
                  }}
                  className={`block h-2 w-full rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] ${
                    index < step ? "bg-[#07512f]" : "bg-[#edf2ea]"
                  }`}
                />
              </li>
            ))}
          </ol>
        </section>

        {step === 1 && (
          <>
            <OpportunityTypeSwitch
              value={form.type}
              onChange={(type) => {
                setForm((currentForm) => ({ ...currentForm, type }));
                setNotice("");
              }}
            />

            <div className="grid gap-5">
              <FormField
                label="Program title *"
                htmlFor="program-title"
              >
                <input
                  id="program-title"
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  required
                  className={fieldClassName}
                />
              </FormField>

              <FormField
                label="Description *"
                htmlFor="program-description"
              >
                <textarea
                  id="program-description"
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  required
                  rows={4}
                  className={`${fieldClassName} resize-y leading-7`}
                />
              </FormField>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.8fr)] lg:items-end">
              <FormField
                label="Fund range *"
                htmlFor="minimum-amount"
              >
                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#1b3025]">
                      {form.currency === "USD" ? "$" : "₦"}
                    </span>
                    <input
                      id="minimum-amount"
                      name="minimumAmount"
                      type="number"
                      min="0"
                      value={form.minimumAmount}
                      onChange={updateField}
                      required
                      aria-label="Minimum fund amount"
                      className={`${fieldClassName} mt-0 pl-9`}
                    />
                  </div>
                  <span aria-hidden="true">—</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#1b3025]">
                      {form.currency === "USD" ? "$" : "₦"}
                    </span>
                    <input
                      name="maximumAmount"
                      type="number"
                      min={form.minimumAmount || "0"}
                      value={form.maximumAmount}
                      onChange={updateField}
                      required
                      aria-label="Maximum fund amount"
                      className={`${fieldClassName} mt-0 pl-9`}
                    />
                  </div>
                </div>
              </FormField>

              <FormField
                label="Currency *"
                htmlFor="currency"
              >
                <select
                  id="currency"
                  name="currency"
                  value={form.currency}
                  onChange={updateField}
                  className={fieldClassName}
                >
                  <option value="USD">USD — US Dollar</option>
                  <option value="NGN">NGN — Nigerian Naira</option>
                </select>
              </FormField>
            </div>

            <section className="rounded-2xl bg-white p-5 sm:p-7">
              <h2 className="text-lg font-semibold text-[#07512f]">
                Application window
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Opens"
                  htmlFor="opens-at"
                >
                  <input
                    id="opens-at"
                    name="opensAt"
                    type="date"
                    value={form.opensAt}
                    onChange={updateField}
                    required
                    className={`${fieldClassName} min-w-0`}
                  />
                </FormField>
                <FormField
                  label="Closes"
                  htmlFor="closes-at"
                >
                  <input
                    id="closes-at"
                    name="closesAt"
                    type="date"
                    value={form.closesAt}
                    onChange={updateField}
                    min={form.opensAt || undefined}
                    required
                    className={`${fieldClassName} min-w-0`}
                  />
                </FormField>
              </div>
            </section>
          </>
        )}

        {step === 2 && (
          <div className="grid items-start gap-5 lg:grid-cols-2">
            <div className="space-y-5">
              <FormField
                label="Eligible agriculture *"
                htmlFor="eligible-agriculture"
              >
                <input
                  id="eligible-agriculture"
                  name="eligibleAgriculture"
                  value={form.eligibleAgriculture}
                  onChange={updateField}
                  required
                  className={fieldClassName}
                />
              </FormField>

              <KeywordSuggestions
                title="Eligible agriculture"
                suggestions={[
                  "Crops",
                  "Livestock",
                  "Aquaculture",
                  "Processing",
                ]}
                value={form.agricultureKeywords}
                onChange={(agricultureKeywords) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    agricultureKeywords,
                  }))
                }
              />

              <KeywordSuggestions
                title="Geographic boundary"
                suggestions={["Oyo", "Osun", "Ondo", "Akure"]}
                value={form.geographicBoundaries}
                onChange={(geographicBoundaries) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    geographicBoundaries,
                  }))
                }
              />
            </div>

            {form.type === "Loan" && (
              <section className="space-y-5 rounded-2xl bg-white p-5 sm:p-7">
                <div>
                  <h2 className="text-lg font-semibold text-[#07512f]">
                    Repayment process
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#718078]">
                    Set the interest and repayment schedule for this loan.
                  </p>
                </div>
                <FormField
                  label="Interest percentage (monthly)"
                  htmlFor="interest-percentage"
                >
                  <div className="relative">
                    <input
                      id="interest-percentage"
                      name="interestPercentage"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.interestPercentage}
                      onChange={updateField}
                      className={`${fieldClassName} pr-10`}
                    />
                    <span className="absolute right-4 top-1/2 mt-2 -translate-y-1/2 text-[#1b3025]">
                      %
                    </span>
                  </div>
                </FormField>
                <FormField label="Duration">
                  <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                    <input
                      name="minimumDuration"
                      type="number"
                      min="1"
                      value={form.minimumDuration}
                      onChange={updateField}
                      placeholder="Min:"
                      aria-label="Minimum duration in months"
                      className={`${fieldClassName} mt-0 min-w-0`}
                    />
                    <span aria-hidden="true">–</span>
                    <input
                      name="maximumDuration"
                      type="number"
                      min={form.minimumDuration || "1"}
                      value={form.maximumDuration}
                      onChange={updateField}
                      placeholder="Max:"
                      aria-label="Maximum duration in months"
                      className={`${fieldClassName} mt-0 min-w-0`}
                    />
                  </div>
                </FormField>
                <FormField
                  label="Grace period"
                  htmlFor="grace-period"
                >
                  <div className="relative">
                    <input
                      id="grace-period"
                      name="gracePeriod"
                      type="number"
                      min="0"
                      value={form.gracePeriod}
                      onChange={updateField}
                      className={`${fieldClassName} pr-24`}
                    />
                    <span className="absolute right-4 top-1/2 mt-2 -translate-y-1/2 text-[#47554c]">
                      months
                    </span>
                  </div>
                </FormField>
              </section>
            )}
          </div>
        )}

        {step === 3 && (
          <OpportunityReview
            form={form}
            onEditDetails={() => {
              setNotice("");
              setStep(1);
            }}
            onEditEligibility={() => {
              setNotice("");
              setStep(2);
            }}
          />
        )}

        {notice && (
          <p
            role="status"
            className={`text-center text-sm ${
              noticeIsError ? "text-red-700" : "text-[#07512f]"
            }`}
          >
            {notice}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type={step === totalSteps ? "button" : "submit"}
            onClick={
              step === totalSteps
                ? () =>
                    saveProgress(
                      "Opportunity saved on this device. Connect publishing to make it visible to farmers.",
                      step,
                      "published",
                    )
                : undefined
            }
            className="min-h-14 w-full rounded-xl bg-[#07512f] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:order-1 sm:text-base"
          >
            {step === totalSteps ? "Publish Opportunity" : "Continue"}
          </button>
          <button
            type="button"
            onClick={() => saveProgress("Draft saved on this device.")}
            className="min-h-14 w-full rounded-xl bg-[#eef4ea] px-6 py-4 text-sm font-semibold text-[#07512f] transition hover:bg-[#e3eee2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:order-2 sm:text-base"
          >
            Save as Draft
          </button>
        </div>
        <p className="pb-2 text-center text-xs leading-5 text-[#718078] sm:text-sm">
          {step === totalSteps
            ? "Publishing will open this opportunity to eligible farmers."
            : "Your progress is saved on this device."}
        </p>
      </form>
    </div>
  );
}
