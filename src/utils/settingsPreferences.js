export const PREFERENCE_STORAGE_KEY = "agrolinks-settings-preferences";

export const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Français", label: "Français" },
  { value: "Hausa", label: "Hausa" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Igbo", label: "Igbo" },
  { value: "Pidgin English", label: "Pidgin English" },
];

export const CURRENCY_OPTIONS = [
  { value: "NGN", label: "NGN - Nigerian Naira (₦)", summary: "Naira" },
  { value: "USD", label: "USD - US Dollar ($)", summary: "US Dollar" },
  { value: "GBP", label: "GBP - British Pound (£)", summary: "British Pound" },
  { value: "EUR", label: "EUR - Euro (€)", summary: "Euro" },
  { value: "GHS", label: "GHS - Ghanaian Cedi (₵)", summary: "Ghanaian Cedi" },
  { value: "KES", label: "KES - Kenyan Shilling (KSh)", summary: "Kenyan Shilling" },
];

export const DEFAULT_SETTINGS_PREFERENCES = {
  language: "English",
  currency: "NGN",
};

export function getSettingsPreferences() {
  const storedValue = window.localStorage.getItem(PREFERENCE_STORAGE_KEY);
  if (!storedValue) return DEFAULT_SETTINGS_PREFERENCES;

  const parsedValue = JSON.parse(storedValue);
  if (!parsedValue || typeof parsedValue !== "object") {
    throw new Error("Saved preferences have an invalid format.");
  }

  return {
    language: LANGUAGE_OPTIONS.some(
      (option) => option.value === parsedValue.language,
    )
      ? parsedValue.language
      : DEFAULT_SETTINGS_PREFERENCES.language,
    currency: CURRENCY_OPTIONS.some(
      (option) => option.value === parsedValue.currency,
    )
      ? parsedValue.currency
      : DEFAULT_SETTINGS_PREFERENCES.currency,
  };
}

export function saveSettingsPreference(key, value, currentPreferences) {
  const updatedPreferences = { ...currentPreferences, [key]: value };
  window.localStorage.setItem(
    PREFERENCE_STORAGE_KEY,
    JSON.stringify(updatedPreferences),
  );
  return updatedPreferences;
}
