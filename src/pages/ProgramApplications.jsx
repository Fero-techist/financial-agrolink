import { useState } from "react";
import { ArrowLeft, CalendarDays, ChevronRight, Landmark } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { programs } from "../data/programs";

const applicantSamples = [
  {
    id: "APP-1042",
    name: "Bisi Adeyemi",
    initials: "BA",
    farm: "Sunrise Farm",
    location: "Iseyin, Oyo",
    amount: "$8,000",
  },
  {
    id: "APP-1043",
    name: "Amina Yusuf",
    initials: "AY",
    farm: "Green Horizon Estates",
    location: "Ogbomoso, Oyo",
    amount: "$6,500",
  },
  {
    id: "APP-1044",
    name: "Tunde Balogun",
    initials: "TB",
    farm: "Balogun Family Farm",
    location: "Akure, Ondo",
    amount: "$9,200",
  },
];

const programSummaries = {
  1: [
    ["Applications", "01 Sep – 30 Nov 2026"],
    ["Sector", "Poultry"],
    ["Geography", "Nigeria"],
    ["Beneficiaries", "100 farmers"],
    ["Funding", "Grant"],
  ],
  2: [
    ["Applications", "01 Sep – 30 Nov 2026"],
    ["Sector", "Crops: Maize, Cassava"],
    ["Geography", "Oyo, Ondo, Osun"],
    ["Interest", "8%"],
    ["Duration", "6 – 24 months"],
    ["Grace period", "3 months"],
  ],
};

function ApplicantCard({ applicant, programId }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(20,55,35,0.035)] sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] text-sm font-semibold text-[#07512f]">
          {applicant.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[#07512f]">
            {applicant.name}
          </h3>
          <p className="mt-1 truncate text-sm text-[#829189]">
            {applicant.farm} · {applicant.location}
          </p>
        </div>
      </div>

      <dl className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        <dt className="text-[#829189]">Requested</dt>
        <dd className="font-medium text-[#183127]">
          {applicant.amount} · {applicant.id}
        </dd>
      </dl>

      <Link
        to={`/programs/${programId}/applications/${applicant.id}`}
        className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#07512f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
      >
        Review Application
      </Link>
    </article>
  );
}

export default function ProgramApplications() {
  const { programId = "2" } = useParams();
  const program = programs.find((item) => String(item.id) === programId);
  const [listingStatus, setListingStatus] = useState("Open");
  const summary = programSummaries[program?.id] || programSummaries[2];

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

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-7">
      <header className="grid grid-cols-[3rem_1fr_3rem] items-center">
        <Link
          to="/programs"
          aria-label="Back to programs"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#183127] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          <ArrowLeft
            aria-hidden="true"
            size={21}
          />
        </Link>
        <h1 className="text-center text-lg font-semibold text-[#07512f]">
          Applications
        </h1>
      </header>

      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#07512f] sm:text-3xl">
        {program.title}
      </h2>

      <section
        aria-label="Program funding summary"
        className="rounded-2xl bg-[#003d2e] p-5 text-white sm:p-6"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/80">
          <span>{listingStatus}</span>
          <span aria-hidden="true">·</span>
          <span>{program.type}</span>
          <span aria-hidden="true">·</span>
          <span>Naira</span>
        </div>
        <p className="mt-3 text-xl font-semibold sm:text-2xl">
          {program.amount} fund allocation
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
          {program.description}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.07] p-3 sm:p-4">
            <dt className="text-xs text-white/70 sm:text-sm">Applicants</dt>
            <dd className="mt-1 text-xl font-semibold">48</dd>
          </div>
          <div className="rounded-xl bg-white/[0.07] p-3 sm:p-4">
            <dt className="text-xs text-white/70 sm:text-sm">Committed</dt>
            <dd className="mt-1 text-xl font-semibold">$145,000</dd>
          </div>
        </dl>

        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-white/85 sm:text-sm">
            <span>58% committed</span>
            <span>$105,000 available</span>
          </div>
          <div
            role="progressbar"
            aria-label="Funding committed"
            aria-valuenow="58"
            aria-valuemin="0"
            aria-valuemax="100"
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"
          >
            <div className="h-full w-[58%] rounded-full bg-[#e6ad43]" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="program-summary-title"
        className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(20,55,35,0.03)] sm:p-6"
      >
        <div className="flex items-center gap-2">
          <Landmark
            aria-hidden="true"
            size={19}
            className="text-[#287245]"
          />
          <h2
            id="program-summary-title"
            className="text-lg font-semibold text-[#07512f]"
          >
            Program summary
          </h2>
        </div>
        <dl className="mt-4 space-y-3">
          {summary.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[minmax(6.5rem,0.8fr)_minmax(0,1.2fr)] gap-3 text-sm"
            >
              <dt className="text-[#829189]">{label}</dt>
              <dd className="font-medium text-[#183127]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="applications-title">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="applications-title"
            className="text-lg font-semibold text-[#07512f]"
          >
            Applications
          </h2>
          <span className="text-sm text-[#829189]">48 total</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applicantSamples.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              programId={programId}
            />
          ))}
        </div>
        <p className="mt-4 inline-flex items-center gap-1 text-sm text-[#829189]">
          Showing 3 of 48 applications
          <ChevronRight
            aria-hidden="true"
            size={16}
          />
        </p>
      </section>

      <section
        aria-label="Program management"
        className="space-y-3"
      >
        <Link
          to="/programs/create"
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#07512f] px-4 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          Edit Program
        </Link>
        <button
          type="button"
          onClick={() =>
            setListingStatus((status) =>
              status === "Paused" ? "Open" : "Paused",
            )
          }
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#f0f5ec] px-4 py-3 text-sm font-semibold text-[#07512f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          {listingStatus === "Paused"
            ? "Resume Applications"
            : "Pause Applications"}
        </button>
        <button
          type="button"
          onClick={() => setListingStatus("Closed")}
          disabled={listingStatus === "Closed"}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#f0f5ec] px-4 py-3 text-sm font-semibold text-[#07512f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {listingStatus === "Closed" ? "Listing Closed" : "Close Listing"}
        </button>
        <p className="flex items-center justify-center gap-2 pt-1 text-xs text-[#829189]">
          <CalendarDays
            aria-hidden="true"
            size={14}
          />
          Application window: {program.date}
        </p>
      </section>
    </div>
  );
}
