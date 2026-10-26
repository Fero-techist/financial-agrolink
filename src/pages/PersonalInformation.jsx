import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Camera, Check, Pencil } from "lucide-react";
import Modal from "../components/shared/Modal";

const initialDetails = [
  { label: "Full Name", value: "Samuel Okonjo" },
  { label: "Phone Number", value: "+1-123-456-7890" },
  {
    label: "Gender",
    value: "Male",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
  },
  { label: "Nationality", value: "Nigerian" },
  { label: "Address", value: "123 Main St, Springfield, USA" },
  { label: "NIN", value: "12345678901" },
];

function ProfileIdentity() {
  return (
    <section className="flex flex-col items-center pt-8">
      <div className="relative">
        <div className="h-36 w-36 overflow-hidden rounded-full border-[4px] border-[#0b5b43] bg-[#dfe9e0] p-[3px] shadow-[0_7px_10px_rgba(17,45,29,0.078)] sm:h-44 sm:w-44">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
            alt="Samuel Okonjo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <button
          type="button"
          aria-label="Change profile photo"
          className="absolute -bottom-1 right-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#0b5b43] bg-[#0d6f4d] text-white shadow-sm transition hover:bg-[#09583d]"
        >
          <Camera
            aria-hidden="true"
            size={22}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.04em] text-[#4b382b] sm:text-[2.2rem]">
          Samuel Okonjo
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5eee6] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#18392b]">
          <BadgeCheck
            aria-hidden="true"
            size={16}
            fill="currentColor"
          />
          Verified
        </span>
      </div>

      <p className="mt-2 text-lg font-medium text-[#66766d] sm:text-[1.8rem]">
        ID: CAL-8842-FMR
      </p>
    </section>
  );
}

function DetailRow({ detail, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(value) {
    onChange(value);
  }

  return (
    <div className="flex min-h-24 items-center gap-4 border-b border-[#e2e9e3] px-5 py-5 last:border-b-0 sm:min-h-[7.7rem] sm:px-10 sm:py-6">
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-[#142d23] sm:text-lg">
          {detail.label}
        </h3>
        {isEditing ? (
          detail.type === "select" ? (
            <select
              aria-label={detail.label}
              autoFocus
              value={detail.value}
              onChange={(event) => handleChange(event.target.value)}
              onBlur={() => setIsEditing(false)}
              className="mt-2 w-full max-w-md rounded-lg border border-[#cbd8cc] bg-white px-3 py-2 text-base text-[#66766d] outline-none focus:border-[#0b5b43] focus:ring-2 focus:ring-[#0b5b43]/20"
            >
              {detail.options.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              aria-label={detail.label}
              autoFocus
              type={detail.label === "Phone Number" ? "tel" : "text"}
              value={detail.value}
              onChange={(event) => handleChange(event.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setIsEditing(false);
                }
              }}
              className="mt-2 w-full max-w-md rounded-lg border border-[#cbd8cc] bg-white px-3 py-2 text-base text-[#66766d] outline-none focus:border-[#0b5b43] focus:ring-2 focus:ring-[#0b5b43]/20"
            />
          )
        ) : (
          <p className="mt-1 break-words text-base text-[#66766d] sm:mt-2 sm:text-[1.3rem]">
            {detail.value}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label={`Edit ${detail.label}`}
        onClick={() => setIsEditing((editing) => !editing)}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9ebea] text-[#142d23] transition hover:bg-[#dce4dd] sm:h-16 sm:w-16"
      >
        <Pencil
          aria-hidden="true"
          size={24}
          strokeWidth={1.8}
        />
      </button>
    </div>
  );
}

export default function PersonalInformation() {
  const navigate = useNavigate();
  const [details, setDetails] = useState(initialDetails);
  const [isSaved, setIsSaved] = useState(false);

  function updateDetail(index, value) {
    setDetails((currentDetails) =>
      currentDetails.map((detail, detailIndex) =>
        detailIndex === index ? { ...detail, value } : detail,
      ),
    );
  }

  return (
    <div className="mx-auto max-w-7xl pb-12 text-[#103128]">
      <header className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Back to settings"
          onClick={() => navigate("/settings")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#103128] shadow-[0_4px_9px_rgba(17,45,29,0.052)] transition hover:bg-[#f4f7f3] sm:h-16 sm:w-16"
        >
          <ArrowLeft
            aria-hidden="true"
            size={26}
            strokeWidth={2.1}
          />
        </button>

        <h1 className="flex-1 text-center text-xl font-semibold tracking-tight text-[#0f512f] sm:text-[2rem]">
          Personal Details
        </h1>

        <div
          className="h-12 w-12 sm:h-16 sm:w-16"
          aria-hidden="true"
        />
      </header>

      <ProfileIdentity />

      <section
        aria-label="Personal information"
        className="mt-10 overflow-hidden rounded-[12px] border border-[#e0e8e1] bg-white shadow-[0_2px_8px_rgba(17,45,29,0.02)] sm:mt-12 sm:rounded-[16px]"
      >
        {details.map((detail, index) => (
          <DetailRow
            key={detail.label}
            detail={detail}
            onChange={(value) => updateDetail(index, value)}
          />
        ))}
      </section>

      <button
        type="button"
        onClick={() => setIsSaved(true)}
        className="mx-auto mt-9 flex min-h-14 w-[84%] max-w-[34rem] items-center justify-center rounded-lg bg-[#07512f] px-6 py-3 text-lg font-medium text-white shadow-[0_4px_8px_rgba(7,81,47,0.104)] transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:mt-14 sm:min-h-[5.5rem] sm:text-[1.6rem]"
      >
        Save
      </button>

      <Modal
        isOpen={isSaved}
        onClose={() => setIsSaved(false)}
        labelledBy="profile-updated-heading"
      >
        <div className="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#4ac17b] to-[#006746] text-white shadow-[inset_0_-8px_14px_rgba(0,61,41,0.2)]">
          <Check
            aria-hidden="true"
            size={42}
            strokeWidth={1.8}
          />
        </div>
        <h2
          id="profile-updated-heading"
          className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#07512f] sm:text-[2.2rem]"
        >
          Profile Updated Successfully
        </h2>
      </Modal>
    </div>
  );
}
