import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  MapPin,
  Pencil,
  X,
} from "lucide-react";

const initialProfile = {
  name: "Dr. Adewale Ogunleye",
  role: "Senior Agricultural Consultant",
  experience: "8+ years experience",
  location: "Ibadan, Oyo State",
  availability: "Available for On-site & Remote",
  summary:
    "Helps poultry and livestock farmers improve feed conversion ratios, establish biosecurity protocols, and cut chick mortality by up to 40%.",
  about:
    "Dr. Adewale has over 8 years of hands-on experience helping Nigerian poultry and mixed farmers scale flock sizes, implement modern climate-smart biosecurity, and optimize feed cost formulations. Certified by the Nigerian Institute of Animal Science (NIAS).",
};

const inputClassName =
  "mt-2 min-h-12 w-full rounded-lg border border-[#dfe8df] bg-white px-4 py-3 text-sm text-[#183127] outline-none transition placeholder:text-[#9aa69e] focus:border-[#07512f] focus:ring-4 focus:ring-[#07512f]/[0.08]";

function ProfileCard({ profile }) {
  return (
    <section className="rounded-[16px] border border-[#e7eee6] bg-white p-5 shadow-[0_6px_12px_rgba(20,55,35,0.036)] sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
          alt={profile.name}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-[#edf4ec] sm:h-24 sm:w-24"
        />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-[#132f23] sm:text-xl">
            {profile.name}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#17613b]">
            {profile.role}
          </p>
          <p className="mt-1 text-sm text-[#718078]">{profile.experience}</p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#f5f8f4] px-4 py-3.5 text-sm leading-6 text-[#5e7065]">
        <MapPin
          aria-hidden="true"
          className="mt-1 shrink-0 text-[#287245]"
          size={19}
        />
        <p>
          {profile.location}{" "}
          <span className="text-[#849189]">({profile.availability})</span>
        </p>
      </div>

      <p className="mt-6 text-sm leading-6 text-[#1d3428]">
        {profile.summary}
      </p>
    </section>
  );
}

export default function OrganizationalDetails() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({ ...currentDraft, [name]: value }));
  }

  function handleEdit() {
    setDraft(profile);
    setIsEditing(true);
  }

  function handleCancel() {
    setDraft(profile);
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();
    setProfile(draft);
    setIsEditing(false);
  }

  return (
    <div className="mx-auto max-w-4xl pb-12 text-[#183127]">
      <header className="mb-8 border-b border-[#e8eee7] bg-white/70 px-4 pb-6 pt-2 sm:mb-10 sm:px-7 sm:pb-8">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Back to settings"
            onClick={() => navigate("/settings")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3f7f2] text-[#183127] transition hover:bg-[#e8f1e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
          >
            <ArrowLeft aria-hidden="true" size={22} />
          </button>
          <div className="min-w-0 flex-1 text-center sm:pr-14">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#829188]">
              Profile
            </p>
            <h1 className="mt-1 text-lg font-semibold tracking-tight text-[#07512f] sm:text-xl">
              Company Details
            </h1>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-[#7b8a81]">
            Keep your expertise and professional profile up to date.
          </p>
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#07512f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
            >
              <Pencil aria-hidden="true" size={16} />
              Edit details
            </button>
          ) : null}
        </div>
      </header>

      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-[16px] border border-[#e5ece4] bg-white p-5 shadow-[0_6px_12px_rgba(20,55,35,0.036)] sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf5ed] text-[#17613b]">
              <BriefcaseBusiness aria-hidden="true" size={19} />
            </span>
            <div>
              <h2 className="font-semibold text-[#19382a]">Edit your profile</h2>
              <p className="text-sm text-[#718078]">
                Share clear, current information with farmers.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#294b37]">
              Full name
              <input
                required
                name="name"
                value={draft.name}
                onChange={updateField}
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37]">
              Professional title
              <input
                required
                name="role"
                value={draft.role}
                onChange={updateField}
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37]">
              Experience
              <input
                name="experience"
                value={draft.experience}
                onChange={updateField}
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37]">
              Location
              <input
                required
                name="location"
                value={draft.location}
                onChange={updateField}
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37] sm:col-span-2">
              Availability
              <input
                name="availability"
                value={draft.availability}
                onChange={updateField}
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37] sm:col-span-2">
              Profile summary
              <textarea
                required
                name="summary"
                rows={3}
                value={draft.summary}
                onChange={updateField}
                className={`${inputClassName} resize-y`}
              />
            </label>
            <label className="text-sm font-semibold text-[#294b37] sm:col-span-2">
              About
              <textarea
                required
                name="about"
                rows={5}
                value={draft.about}
                onChange={updateField}
                className={`${inputClassName} resize-y`}
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#edf1ed] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#dce6dc] px-5 py-3 text-sm font-semibold text-[#506357] transition hover:bg-[#f6f8f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
            >
              <X aria-hidden="true" size={17} />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#07512f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
            >
              <Check aria-hidden="true" size={17} />
              Save changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <ProfileCard profile={profile} />
          <section aria-labelledby="about-heading">
            <h2
              id="about-heading"
              className="mb-3 text-lg font-semibold tracking-tight text-[#19382a]"
            >
              About
            </h2>
            <p className="rounded-[12px] border border-[#e7eee6] bg-white px-5 py-6 text-sm leading-6 text-[#24392e] shadow-[0_4px_9px_rgba(20,55,35,0.026)] sm:px-8 sm:py-8">
              {profile.about}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
