import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  CalendarDays,
  CirclePause,
  Droplet,
  Landmark,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";

const programs = [
  {
    id: 1,
    type: "Grant",
    status: "Open",
    organization: "Bank of Agriculture × FMARD",
    organizationDescription: "Federal Agricultural Initiative",
    title: "Smallholder Poultry Expansion Grant",
    amount: "₦250,000",
    details: [
      { label: "100 Beneficiaries", icon: Users },
      { label: "Poultry Farmers", icon: Droplet },
    ],
    description:
      "Non-repayable grant for acquiring day-old chicks, high-protein feed, and battery.",
    date: "15 Sep – 15 Dec 2026",
  },
  {
    id: 2,
    type: "Loan",
    status: "Open",
    organization: "Bank of Agriculture × FMARD",
    organizationDescription: "Federal Agricultural Initiative",
    title: "Commercial Crop Working Capital Loan",
    amount: "₦250,000 – ₦1,000,000",
    details: [
      { label: "From 8% p.a.", icon: ArrowDownRight },
      { label: "6 – 24 Month Tenure", icon: CalendarDays },
      { label: "3 Month Grace Period", icon: CirclePause },
    ],
    description:
      "Flexible seasonal financing for certified cocoa, maize, and cashew growers...",
    estimate: "Estimated ₦45,200/mo on ₦1M (24mos)",
    date: "15 Sep – 15 Dec 2026",
  },
];

const filters = ["All", "Grants", "Loans"];

function ProgramCard({ program }) {
  const isGrant = program.type === "Grant";

  return (
    <article className="group flex h-full flex-col rounded-[12px] border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.029)] transition duration-200 hover:-translate-y-0.5 hover:border-[#ccdfcb] hover:shadow-[0_8px_11px_rgba(20,55,35,0.058)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ec] px-3.5 py-1.5 text-xs font-semibold text-[#07512f]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2b9b5c]" />
          {program.status}
        </span>
        <span className="text-xs font-medium text-[#87958c]">{program.date}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ea] text-[#287245]">
          <Landmark
            aria-hidden="true"
            size={25}
            strokeWidth={1.8}
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[#10291c] sm:text-base lg:text-sm">
            {program.organization}
          </h2>
          <p className="mt-0.5 text-xs text-[#91a097]">
            {program.organizationDescription}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase ${
            isGrant ? "bg-[#087642] text-white" : "bg-[#d1e7dd] text-[#07512f]"
          }`}
        >
          {program.type}
        </span>
        {isGrant && (
          <p className="text-lg font-bold text-[#087642] sm:text-xl lg:text-lg">
            {program.amount}
          </p>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-[#213c2d] sm:text-xl lg:text-lg">
        {program.title}
      </h3>

      {!isGrant && (
        <p className="mt-2 text-xl font-semibold tracking-tight text-[#087642] sm:text-2xl lg:text-xl">
          {program.amount}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {program.details.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#faf5eb] px-3 py-2 text-xs text-[#47554c]"
          >
            <Icon
              aria-hidden="true"
              className="text-[#287245]"
              size={15}
              strokeWidth={2}
            />
            {label}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-[#4f5c53] sm:text-base lg:text-sm">
        {program.description}
      </p>

      {program.estimate && (
        <p className="mt-3 text-sm font-semibold text-[#4f5c53] lg:text-xs">
          {program.estimate}
        </p>
      )}

      <button
        type="button"
        className="mt-auto min-h-11 w-full rounded-lg bg-[#006331] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004f27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
      >
        View
      </button>
    </article>
  );
}

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const visiblePrograms = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return programs.filter((program) => {
      const matchesFilter =
        activeFilter === "All" ||
        program.type.toLowerCase() === activeFilter.slice(0, -1).toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${program.title} ${program.organization} ${program.type}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="space-y-7 sm:space-y-8">
      <WelcomeHeader />

      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#819087]">
          Funding
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#123e2b] sm:text-3xl">
          Funding opportunities
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[#718078] sm:text-base">
          Explore grants and loans designed to help farmers invest, grow, and plan for the seasons ahead.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/programs/create"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#041B0E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:w-auto"
        >
          Create an opportunity
          <Plus
            aria-hidden="true"
            size={18}
            strokeWidth={2}
          />
        </Link>

        <Link
          to="/programs/drafts"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#F0F5EC] px-5 py-3 text-sm font-semibold text-[#041B0E] transition hover:bg-[#e3eee2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:w-auto"
        >
          Saved drafts
        </Link>
      </div>

      <section
        aria-label="Search and filter programs"
        className="space-y-4"
      >
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10291c]"
            size={21}
            strokeWidth={2}
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try a program name or organization"
            aria-label="Search funding programs"
            className="h-16 w-full rounded-xl border border-[#dedfdd] bg-white pl-12 pr-4 text-base text-[#10291c] outline-none placeholder:text-[#9aa49e] focus:border-[#07512f] focus:ring-2 focus:ring-[#07512f]/10 lg:h-12 lg:text-sm"
          />
        </label>

        <div
          role="tablist"
          aria-label="Filter programs by type"
          className="grid grid-cols-3 rounded-xl bg-[#eef4ea] p-1.5"
        >
          {filters.map((filter) => {
            const count =
              filter === "All"
                ? programs.length
                : programs.filter(
                    (program) =>
                      program.type.toLowerCase() ===
                      filter.slice(0, -1).toLowerCase(),
                  ).length;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`min-h-11 rounded-lg px-2 text-sm font-semibold transition sm:text-base lg:text-sm ${
                  activeFilter === filter
                    ? "bg-white text-[#07512f] shadow-sm"
                    : "text-[#718078] hover:text-[#07512f]"
                }`}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-label="Available funding programs"
        className="grid items-stretch gap-5 lg:grid-cols-2 xl:gap-6"
      >
        {visiblePrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
          />
        ))}

        {visiblePrograms.length === 0 && (
          <div className="rounded-xl bg-white px-5 py-12 text-center text-sm text-[#718078] shadow-sm lg:col-span-2">
            No opportunities match these filters. Try another search or choose a different funding type.
          </div>
        )}
      </section>
    </div>
  );
}
