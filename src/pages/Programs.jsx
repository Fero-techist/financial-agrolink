import { useMemo, useState } from "react";
import { CalendarDays, Landmark, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import { programs } from "../data/programs";

const filters = ["All", "Grants", "Loans"];

function ProgramCard({ program }) {
  const isGrant = program.type === "Grant";

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.029)] transition duration-200 hover:-translate-y-0.5 hover:border-[#ccdfcb] hover:shadow-[0_8px_11px_rgba(20,55,35,0.058)] sm:p-6">
      <div className="mb-4">
        <span className="inline-flex min-h-9 items-center rounded-lg bg-[#e8f4ea] px-4 py-2 text-sm font-medium text-[#07512f]">
          {program.status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ea] text-[#287245]">
          <Landmark
            aria-hidden="true"
            size={23}
            strokeWidth={1.8}
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[#10291c]">
            {program.organization}
          </h2>
          <p className="mt-0.5 text-xs text-[#91a097]">
            {program.organizationDescription}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase ${
            isGrant ? "bg-[#087642] text-white" : "bg-[#d1e7dd] text-[#07512f]"
          }`}
        >
          {program.type}
        </span>
        {isGrant && (
          <p className="text-lg font-bold text-[#087642] sm:text-xl">
            {program.amount}
          </p>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-[#382417] sm:text-xl">
        {program.title}
      </h3>

      {!isGrant && (
        <p className="mt-2 wrap-break-word text-xl font-semibold tracking-tight text-[#087642] sm:text-2xl">
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
        <p className="mt-3 text-xs font-semibold leading-5 text-[#4f5c53] sm:text-sm">
          {program.estimate}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#10291c]">
        <CalendarDays
          aria-hidden="true"
          size={16}
          className="shrink-0 text-[#287245]"
        />
        <span>{program.date}</span>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          to={`/programs/${program.id}/applications`}
          className="min-h-12 min-w-0 flex-1 items-center text-center rounded-xl bg-[#006331] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#004f27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          View Application
        </Link>

        <Link to="/programs/create">
          <button
            type="button"
            className="min-h-12 rounded-xl bg-[#f0f5ec] px-4 py-3 text-sm font-semibold text-[#10291c] transition hover:bg-[#e3eee2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
          >
            Edit
          </button>
        </Link>
      </div>
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
    <div className="space-y-6 sm:space-y-7">
      <WelcomeHeader />

      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-[#07512f]">
          Loan &amp; Grants Opportunities
        </h1>
        <p className="max-w-2xl text-base leading-6 text-[#718078]">
          Discover funding opportunities to grow your farm and business.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/programs/create"
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#07512f] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#063f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:w-auto"
        >
          Create New Opportunity
          <Plus
            aria-hidden="true"
            size={21}
            strokeWidth={2}
          />
        </Link>

        <Link
          to="/programs/drafts"
          className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#f0f5ec] px-5 py-3 text-sm font-semibold text-[#10291c] transition hover:bg-[#e3eee2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:w-auto"
        >
          View Draft
        </Link>
      </div>

      <section
        aria-label="Search and filter programs"
        className="space-y-3"
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
            placeholder="Search funding opportunities"
            aria-label="Search funding programs"
            className="h-14 w-full rounded-xl border border-[#dedfdd] bg-white pl-12 pr-4 text-sm text-[#10291c] outline-none placeholder:text-[#9aa49e] focus:border-[#07512f] focus:ring-2 focus:ring-[#07512f]/10"
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
                className={`min-h-11 rounded-lg px-2 text-sm font-semibold transition ${
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
        className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5"
      >
        {visiblePrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
          />
        ))}

        {visiblePrograms.length === 0 && (
          <div className="rounded-xl bg-white px-5 py-12 text-center text-sm text-[#718078] shadow-sm lg:col-span-2">
            No opportunities match these filters. Try another search or choose a
            different funding type.
          </div>
        )}
      </section>
    </div>
  );
}
