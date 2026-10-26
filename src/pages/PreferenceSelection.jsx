import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import {
  CURRENCY_OPTIONS,
  DEFAULT_SETTINGS_PREFERENCES,
  getSettingsPreferences,
  LANGUAGE_OPTIONS,
  saveSettingsPreference,
} from "../utils/settingsPreferences";

const configuration = {
  language: {
    title: "Language",
    heading: "Available languages",
    description: "Choose your preferred language.",
    options: LANGUAGE_OPTIONS,
    notice:
      "Your language preference is saved. Some content may still appear in English.",
  },
  currency: {
    title: "Currency",
    heading: "Preferred currency",
    description: "Choose the currency you prefer to see.",
    options: CURRENCY_OPTIONS,
    notice:
      "Your currency preference is saved. Existing amounts are not converted.",
  },
};

export default function PreferenceSelection({ preference }) {
  const navigate = useNavigate();
  const page = configuration[preference];
  const [selected, setSelected] = useState(() => {
    try {
      return {
        preferences: getSettingsPreferences(),
        error: "",
        notice: "",
      };
    } catch (error) {
      console.error("Unable to load saved settings preferences.", error);
      return {
        preferences: DEFAULT_SETTINGS_PREFERENCES,
        error: "Saved preferences could not be loaded. You can still choose an option.",
        notice: "",
      };
    }
  });

  function chooseOption(value) {
    const updatedPreferences = { ...selected.preferences, [preference]: value };
    try {
      saveSettingsPreference(preference, value, selected.preferences);
      setSelected({
        preferences: updatedPreferences,
        error: "",
        notice: page.notice,
      });
    } catch (error) {
      console.error("Unable to save settings preference.", error);
      setSelected((current) => ({
        ...current,
        error: "Your choice could not be saved. Please try again.",
        notice: "",
      }));
    }
  }

  return (
    <div className="mx-auto min-h-[calc(100svh-11rem)] max-w-3xl pb-12 text-[#183127]">
      <header className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Back to settings"
          onClick={() => navigate("/settings")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#183127] shadow-[0_4px_9px_rgba(17,45,29,0.046)] transition hover:bg-[#f1f6f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:h-14 sm:w-14"
        >
          <ArrowLeft aria-hidden="true" size={23} />
        </button>
        <h1 className="flex-1 text-center text-2xl font-semibold tracking-tight text-[#07512f] sm:text-3xl">
          {page.title}
        </h1>
        <div className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true" />
      </header>

      <section className="mt-10 sm:mt-12">
        <h2 className="mb-4 text-lg font-semibold text-[#7b8a81] sm:text-xl">
          {page.heading}
        </h2>
        <p className="sr-only">{page.description}</p>
        <fieldset>
          <legend className="sr-only">{page.description}</legend>
          <div className="overflow-hidden rounded-[12px] border border-[#e2eae2] bg-white shadow-[0_4px_9px_rgba(20,55,35,0.023)]">
            {page.options.map((option, index) => (
              <label
                key={option.value}
                className={`flex min-h-[4.5rem] cursor-pointer items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#fafcf9] sm:min-h-[5.5rem] sm:px-7 ${
                  index !== page.options.length - 1
                    ? "border-b border-[#e5ebe5]"
                    : ""
                }`}
              >
                <input
                  className="peer sr-only"
                  type="radio"
                  name={preference}
                  value={option.value}
                  checked={selected.preferences[preference] === option.value}
                  onChange={() => chooseOption(option.value)}
                />
                <span className="text-base font-medium text-[#19382a] sm:text-lg">
                  {option.label}
                </span>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[2px] border-[#e3eae4] transition after:h-2.5 after:w-2.5 after:rounded-full after:bg-white after:opacity-0 after:content-[''] peer-checked:border-[#07512f] peer-checked:bg-[#07512f] peer-checked:after:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-[#07512f]/20 sm:h-8 sm:w-8 sm:after:h-3 sm:after:w-3">
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {selected.notice ? (
          <p
            role="status"
            className="mt-4 flex items-start gap-2 rounded-lg bg-[#eaf5ec] px-4 py-3 text-sm leading-6 text-[#17613b]"
          >
            <Check aria-hidden="true" className="mt-1 shrink-0" size={16} />
            {selected.notice}
          </p>
        ) : null}
        {selected.error ? (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-[#fff1ef] px-4 py-3 text-sm leading-6 text-[#9c3328]"
          >
            {selected.error}
          </p>
        ) : null}
      </section>
    </div>
  );
}
