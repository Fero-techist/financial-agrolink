import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleCheck,
  CircleX,
  Upload,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { programs } from "../data/programs";

const applicant = {
  name: "Bisi Adeyemi",
  initials: "BA",
  farm: "Sunrise Farm",
  location: "Iseyin, Oyo",
  amount: "$8,000",
  id: "APP-1042",
};

const sections = [
  { id: "farm", title: "Farm Information" },
  { id: "location", title: "Farm Location" },
  { id: "crops", title: "Crop Category" },
  { id: "infrastructure", title: "Infrastructure & Workforce" },
  { id: "documents", title: "Verification & Documents" },
];

const documents = [
  { name: "Farmer Photo", status: "Verified" },
  { name: "Farm Photos", status: "Verified" },
  { name: "Govt ID", status: "Verified" },
  { name: "Farm Reg", status: "Pending" },
  { name: "Cooperative Cert", status: "Rejected" },
  { name: "CAC Document", status: "Upload" },
  { name: "Land Agreement", status: "Verified" },
];

function InfoField({ label, children, className = "" }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <dt className="text-xs font-semibold text-[#183127]">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-5 text-[#718078]">
        {children}
      </dd>
    </div>
  );
}

function ReviewSection({ id, title, expanded, onToggle, children }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(20,55,35,0.03)]">
      <h2>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-content`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
        >
          <span className="text-base font-semibold text-[#382417]">
            {title}
          </span>
          <ChevronDown
            aria-hidden="true"
            size={19}
            className={`shrink-0 text-[#183127] transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </h2>
      {expanded && (
        <div
          id={`${id}-content`}
          className="px-5 pb-6 sm:px-6"
        >
          {children}
        </div>
      )}
    </section>
  );
}

function VerificationBadge({ status }) {
  const styles = {
    Verified: "bg-[#e6f3e9] text-[#087642]",
    Pending: "bg-[#fff4df] text-[#a46a0a]",
    Rejected: "bg-[#fde9e8] text-[#b42318]",
    Upload: "bg-[#efede9] text-[#5f574c]",
  };
  const Icon =
    status === "Verified"
      ? CircleCheck
      : status === "Rejected"
        ? CircleX
        : status === "Upload"
          ? Upload
          : null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          size={11}
        />
      )}
      {status}
    </span>
  );
}

function DocumentList() {
  return (
    <ul className="space-y-2">
      {documents.map((document) => (
        <li
          key={document.name}
          className="flex min-h-10 items-center justify-between gap-3 rounded-lg bg-[#f7f9f6] px-3 py-2"
        >
          <span className="text-sm text-[#183127]">{document.name}</span>
          <VerificationBadge status={document.status} />
        </li>
      ))}
    </ul>
  );
}

function EquipmentList() {
  const equipment = [
    ["Warehouse", true],
    ["Borehole", true],
    ["Irrigation", false],
    ["Drying Area", true],
    ["Processing", false],
    ["Storage", true],
    ["Solar", false],
    ["Tractor", true],
    ["Pickup", true],
    ["Other Equipment", false],
  ];

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
      {equipment.map(([name, available]) => (
        <li
          key={name}
          className="flex items-center gap-2 text-sm text-[#382417]"
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
              available ? "bg-[#087642] text-white" : "border border-[#cbd5cd]"
            }`}
          >
            {available && (
              <Check
                aria-hidden="true"
                size={12}
                strokeWidth={3}
              />
            )}
          </span>
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function ApplicationReview() {
  const { programId = "2", applicationId } = useParams();
  const [expandedSections, setExpandedSections] = useState(() =>
    Object.fromEntries(sections.map(({ id }) => [id, true])),
  );
  const [decision, setDecision] = useState("");
  const program = programs.find((item) => String(item.id) === programId);

  if (!program) {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-[#718078]">
        Program not found.
        <Link
          to="/programs"
          className="ml-1 font-semibold text-[#07512f] underline"
        >
          Return to programs
        </Link>
      </div>
    );
  }

  const toggleSection = (sectionId) => {
    setExpandedSections((expanded) => ({
      ...expanded,
      [sectionId]: !expanded[sectionId],
    }));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
      <header className="grid grid-cols-[3rem_1fr_3rem] items-center">
        <Link
          to={`/programs/${programId}/applications`}
          aria-label="Back to applications"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#183127] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          <ArrowLeft
            aria-hidden="true"
            size={20}
          />
        </Link>
        <h1 className="text-center text-base font-semibold text-[#07512f]">
          Applications
        </h1>
      </header>

      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#07512f]">
        {program.title}
      </h2>

      <section
        aria-label="Applicant summary"
        className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(20,55,35,0.035)] sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] text-sm font-semibold text-[#07512f]">
            {applicant.initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#07512f]">
              {applicant.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-[#829189]">
              {applicant.farm} · {applicant.location}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <VerificationBadge status="Verified" />
          <span className="rounded-full bg-[#fff4df] px-2 py-1 text-[10px] font-medium text-[#a46a0a]">
            Low risk · 742
          </span>
        </div>
      </section>

      <section
        aria-label="Application decision"
        className="grid gap-3 sm:grid-cols-2"
      >
        <button
          type="button"
          onClick={() => setDecision("Accepted")}
          className={`min-h-12 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] ${
            decision === "Accepted"
              ? "bg-[#00452a] text-white ring-2 ring-[#87c99c]"
              : "bg-[#07512f] text-white hover:bg-[#063f25]"
          }`}
        >
          {decision === "Accepted" ? "Accepted" : "Accept"}
        </button>
        <button
          type="button"
          onClick={() => setDecision("Rejected")}
          className={`min-h-12 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] ${
            decision === "Rejected"
              ? "bg-[#e5eee4] text-[#07512f] ring-2 ring-[#b8d2bb]"
              : "bg-[#f0f5ec] text-[#07512f] hover:bg-[#e3eee2]"
          }`}
        >
          {decision === "Rejected" ? "Rejected" : "Reject"}
        </button>
      </section>
      {decision && (
        <p
          role="status"
          className="text-xs text-[#718078]"
        >
          {decision} selected for this session. This decision has not been
          submitted.
        </p>
      )}

      <div className="space-y-4">
        <ReviewSection
          id="farm"
          title="Farm Information"
          expanded={expandedSections.farm}
          onToggle={() => toggleSection("farm")}
        >
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
            <InfoField label="Farm Name">Green Horizon Estates</InfoField>
            <InfoField label="Farm Type">Commercial</InfoField>
            <InfoField label="Farm Size">50 Hectares</InfoField>
            <InfoField label="Ownership Type">Owned</InfoField>
            <InfoField label="Year Established">2005</InfoField>
            <InfoField label="Years Farming">25</InfoField>
            <InfoField
              label="Description"
              className="col-span-2"
            >
              <span className="block rounded-lg border border-[#edf1ed] bg-[#fbfcfa] p-3 leading-5">
                A prime commercial crop estate focusing on sustainable cocoa and
                cashew production.
              </span>
            </InfoField>
          </dl>
        </ReviewSection>

        <ReviewSection
          id="location"
          title="Farm Location"
          expanded={expandedSections.location}
          onToggle={() => toggleSection("location")}
        >
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
            <InfoField label="Country">Nigeria</InfoField>
            <InfoField label="State">Oyo</InfoField>
            <InfoField label="LGA">Ogbomoso South</InfoField>
            <InfoField label="Community">50 Hectares</InfoField>
            <InfoField label="Farm Address">Ogbomoso South</InfoField>
            <InfoField label="Postal Code">201010</InfoField>
          </dl>
        </ReviewSection>

        <ReviewSection
          id="crops"
          title="Crop Category"
          expanded={expandedSections.crops}
          onToggle={() => toggleSection("crops")}
        >
          <p className="text-xs text-[#183127]">Crop Category</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {["Cocoa", "Cashew", "Rice", "Sesame", "Ginger"].map((crop) => (
              <li
                key={crop}
                className="rounded-full border border-[#d7e9dd] bg-[#e8f4ec] px-3 py-1 text-xs text-[#07512f]"
              >
                {crop}
              </li>
            ))}
          </ul>
        </ReviewSection>

        <ReviewSection
          id="infrastructure"
          title="Infrastructure & Workforce"
          expanded={expandedSections.infrastructure}
          onToggle={() => toggleSection("infrastructure")}
        >
          <p className="mb-3 text-xs font-medium text-[#183127]">
            Facilities &amp; Equipment
          </p>
          <EquipmentList />
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <InfoField label="Full-time Employees">
              <span className="block rounded-lg border border-[#edf1ed] bg-[#fbfcfa] px-3 py-2">
                12
              </span>
            </InfoField>
            <InfoField label="Seasonal Workers">
              <span className="block rounded-lg border border-[#edf1ed] bg-[#fbfcfa] px-3 py-2">
                45
              </span>
            </InfoField>
          </dl>
        </ReviewSection>

        <ReviewSection
          id="documents"
          title="Verification & Documents"
          expanded={expandedSections.documents}
          onToggle={() => toggleSection("documents")}
        >
          <DocumentList />
        </ReviewSection>

        <section className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(20,55,35,0.03)]">
          <h2 className="text-base font-semibold text-[#382417]">
            Application details
          </h2>
          <dl className="mt-3 grid grid-cols-2 gap-4">
            <InfoField label="Requested amount">{applicant.amount}</InfoField>
            <InfoField label="Application ID">
              {applicationId || applicant.id}
            </InfoField>
          </dl>
        </section>
      </div>
    </div>
  );
}
