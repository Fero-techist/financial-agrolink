import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Languages,
  LogOut,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  CURRENCY_OPTIONS,
  DEFAULT_SETTINGS_PREFERENCES,
  getSettingsPreferences,
} from "../utils/settingsPreferences";
import SettingsImg from "../assets/settingsImg.svg";
import ActionConfirmationModal from "../components/shared/ActionConfirmationModal";

const accountSettings = [
  {
    icon: CircleUserRound,
    label: "Personal Information",
    detail: "Name, Email, Phone number",
    path: "/settings/personal-information",
  },
  {
    icon: BriefcaseBusiness,
    label: "Organization Details",
    detail: "Name",
    path: "/settings/organization",
  },
];

const preferences = [
  {
    icon: Languages,
    label: "Language",
    detail: "English",
    path: "/settings/language",
  },
  {
    icon: CreditCard,
    label: "Currency",
    detail: "Naira",
    path: "/settings/currency",
  },
];

const support = [
  {
    icon: Phone,
    label: "Contact Us",
    detail: "Get in touch anytime",
    path: "/settings/contact",
  },
  {
    icon: MessageSquareText,
    label: "Contact Support",
    detail: "Chat with support instantly",
    path: "/settings/contact",
  },
  {
    icon: ShieldCheck,
    label: "Privacy & Policy",
    detail: "Learn how data is protected",
    path: "/settings/privacy-policy",
  },
];

const accountActions = [
  {
    icon: Trash2,
    label: "Delete Account",
    detail: "Permanently remove your account",
    danger: true,
    type: "delete",
  },
  {
    icon: LogOut,
    label: "Logout",
    detail: "",
    type: "logout",
  },
];

function SettingsRow({
  icon: Icon,
  label,
  detail,
  danger = false,
  last = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#07512f] disabled:cursor-default disabled:hover:bg-transparent ${last ? "rounded-b-[12px]" : "border-b border-[#dfe5dc]"}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dfe5dc] ${
          danger ? "bg-[#f9dfe2] text-[#d03d52]" : "bg-[#ebf1e9] text-[#1b3529]"
        }`}
      >
        <Icon
          aria-hidden="true"
          size={18}
          strokeWidth={1.8}
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`text-sm font-medium ${danger ? "text-[#1c2d25]" : "text-[#1a2d24]"}`}
          >
            {label}
          </p>
          {detail ? (
            <p className="mt-1 text-xs text-[#66766d]">{detail}</p>
          ) : null}
        </div>

        <ChevronRight
          aria-hidden="true"
          className="shrink-0 text-[#1a2d24]"
          size={18}
          strokeWidth={2}
        />
      </div>
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(null);
  const [preferenceState] = useState(() => {
    try {
      return { preferences: getSettingsPreferences(), error: "" };
    } catch (error) {
      console.error("Unable to load saved settings preferences.", error);
      return {
        preferences: DEFAULT_SETTINGS_PREFERENCES,
        error:
          "Your saved language or currency preference could not be loaded.",
      };
    }
  });
  const selectedCurrency = CURRENCY_OPTIONS.find(
    (option) => option.value === preferenceState.preferences.currency,
  );
  const preferenceDetails = {
    Language: preferenceState.preferences.language,
    Currency: selectedCurrency?.summary || "Naira",
  };

  const confirmationDetails =
    confirmation?.type === "delete"
      ? {
          title: "Delete Account",
          description:
            "Are you certain you want to remove this product? This action is irreversible.",
          confirmText: "Delete",
          variant: "danger",
        }
      : {
          title: "LogOut",
          description: "Are you sure you want to log out of your account?",
          confirmText: "Logout",
          variant: "default",
        };

  function handleConfirmation() {
    if (confirmation?.type === "delete") {
      console.log("Delete account confirmed");
    } else {
      console.log("Logout confirmed");
    }

    setConfirmation(null);
  }

  return (
    <div className="mx-auto max-w-7xl pb-12 text-[#103128]">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#103128] shadow-[0_4px_9px_rgba(17,45,29,0.052)] transition hover:bg-[#f4f7f3]"
        >
          <ArrowLeft
            aria-hidden="true"
            size={22}
            strokeWidth={2.1}
          />
        </button>

        <h1 className="flex-1 text-center text-xl font-semibold tracking-tight text-[#0f412d]">
          Settings
        </h1>

        <div
          className="w-12"
          aria-hidden="true"
        />
      </div>

      <section className="flex flex-col items-center pt-2">
        <div className="relative">
          <div className="h-32 w-32 overflow-hidden rounded-full border-[4px] border-[#0b5b43] bg-[#dfe9e0] shadow-[0_7px_10px_rgba(17,45,29,0.078)]">
            <img
              src={SettingsImg}
              alt="Samuel Okonjo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 right-2 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#0b5b43] bg-[#0d6f4d] text-white shadow-sm">
            <Camera
              aria-hidden="true"
              size={18}
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a2d24] sm:text-2xl">
            Samuel Okonjo
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e5eee6] px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#0d6f4d]">
            <BadgeCheck
              aria-hidden="true"
              size={14}
            />
            Verified
          </span>
        </div>

        <p className="mt-1.5 text-sm font-medium text-[#6f7f75]">
          ID: CAL-8842-FMR
        </p>
      </section>

      <div className="mt-8 space-y-6">
        {preferenceState.error ? (
          <p
            role="alert"
            className="rounded-lg bg-[#fff1ef] px-4 py-3 text-sm text-[#9c3328]"
          >
            {preferenceState.error}
          </p>
        ) : null}
        <section className="overflow-hidden rounded-[12px] border border-[#dfe5dc] bg-[#FFFFFF]">
          <h3 className="px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.03em] text-[#1a2d24]">
            Account Settings
          </h3>
          <div>
            {accountSettings.map((item, index) => (
              <SettingsRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                detail={item.detail}
                last={index === accountSettings.length - 1}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-[#dfe5dc] bg-[#FFFFFF]">
          <h3 className="px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.03em] text-[#1a2d24]">
            Preferences
          </h3>
          <div>
            {preferences.map((item, index) => (
              <SettingsRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                detail={preferenceDetails[item.label] || item.detail}
                last={index === preferences.length - 1}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-[#dfe5dc] bg-[#FFFFFF]">
          <h3 className="px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.03em] text-[#1a2d24]">
            Support
          </h3>
          <div>
            {support.map((item, index) => (
              <SettingsRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                detail={item.detail}
                last={index === support.length - 1}
                onClick={item.path ? () => navigate(item.path) : undefined}
                disabled={!item.path}
              />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-[#dfe5dc] bg-[#FFFFFF]">
          <h3 className="px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.03em] text-[#1a2d24]">
            Account
          </h3>
          <div>
            {accountActions.map((item, index) => (
              <SettingsRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                detail={item.detail}
                danger={item.danger}
                last={index === accountActions.length - 1}
                onClick={() => setConfirmation(item)}
              />
            ))}
          </div>
        </section>
      </div>

      <ActionConfirmationModal
        isOpen={Boolean(confirmation)}
        onClose={() => setConfirmation(null)}
        onConfirm={handleConfirmation}
        title={confirmationDetails.title}
        description={confirmationDetails.description}
        confirmText={confirmationDetails.confirmText}
        variant={confirmationDetails.variant}
      />
    </div>
  );
}
