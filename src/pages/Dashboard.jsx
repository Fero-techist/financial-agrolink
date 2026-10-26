import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Clock3,
  FileText,
  Sprout,
  Users,
} from "lucide-react";
import WelcomeHeader from "../components/WelcomeHeader";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Active programs", value: "6", icon: Sprout },
  {
    label: "Open opportunities",
    value: "4",
    icon: FileText,
    links: "/programs",
  },
  { label: "Pending reviews", value: "36", icon: Clock3 },
  { label: "Farmers supported", value: "248", icon: Users, links: "/farmers" },
];

const activities = [
  {
    title: "New application · Tunde Balogun",
    description: "Poultry Growth Grant · $3,000 · 12 min ago",
    icon: FileText,
  },
  {
    title: "Tranche ready · Grace Eze",
    description: "Irrigation milestone verified · $2,400 · 08:50",
    icon: Banknote,
  },
  {
    title: "Field verification complete",
    description: "Bisi Adeyemi · Joseph Akin · Yesterday",
    icon: BadgeCheck,
  },
];

function FundsSummary() {
  return (
    <section className="relative overflow-hidden rounded-[16px] bg-gradient-to-br from-[#064b35] via-[#06442f] to-[#033323] p-6 text-white shadow-[0_10px_12px_rgba(3,51,35,0.098)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[36px] border-white/[0.035]"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70 sm:text-sm">
          Total funds disbursed <span aria-hidden="true">·</span> 2026 year to
          date
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.1rem]">
          $1,240,000
        </p>
        <p className="mt-2 text-sm text-white/65">
          Funding that helps farming communities thrive.
        </p>
      </div>

      <dl className="relative mt-6 grid grid-cols-2 gap-3 lg:mt-0 lg:w-[min(100%,32rem)]">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.07] px-4 py-4 backdrop-blur sm:px-5 sm:py-5">
          <dt className="text-sm text-white/70 sm:text-base lg:text-sm">
            Loans
          </dt>
          <dd className="mt-1 text-lg font-semibold sm:text-xl lg:text-lg">
            $980,000
          </dd>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.07] px-4 py-4 backdrop-blur sm:px-5 sm:py-5">
          <dt className="text-sm text-white/70 sm:text-base lg:text-sm">
            Grants
          </dt>
          <dd className="mt-1 text-lg font-semibold sm:text-xl lg:text-lg">
            $260,000
          </dd>
        </div>
      </dl>
    </section>
  );
}

function MetricsGrid() {
  return (
    <section
      aria-label="Program metrics"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {metrics.map(({ label, value, icon: Icon, links }) => {
        const content = (
          <article className="group h-full rounded-xl border border-[#e6ede5] bg-white p-4 shadow-[0_2.5px_10px_rgba(22,54,35,0.023)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9ddcb] hover:shadow-[0_6px_9px_rgba(22,54,35,0.052)] sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs font-semibold text-[#74847a] sm:text-sm">
                {label}
              </h2>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf5ed] text-[#17633d]">
                <Icon
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.8}
                />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#123e2b] sm:text-[1.8rem]">
              {value}
            </p>
          </article>
        );

        return links ? (
          <Link
            key={label}
            to={links}
            className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
          >
            {content}
          </Link>
        ) : (
          <div key={label}>{content}</div>
        );
      })}
    </section>
  );
}

function RecentActivity() {
  return (
    <section aria-labelledby="recent-activity-heading">
      <h2
        id="recent-activity-heading"
        className="mb-4 text-base font-semibold text-[#07512f] sm:text-lg lg:text-base"
      >
        Recent activity
      </h2>

      <div className="divide-y divide-[#edf1ed] rounded-[12px] border border-[#e6ede5] bg-white px-4 shadow-[0_4px_9px_rgba(22,54,35,0.026)] sm:px-6">
        {activities.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="flex min-h-24 items-center justify-between gap-4 py-5"
          >
            <div className="min-w-0">
              <h3 className="text-xs font-medium text-[#10291c] sm:text-sm lg:text-xs">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#86948b] sm:text-xs">
                {description}
              </p>
            </div>
            <Icon
              aria-hidden="true"
              className="shrink-0 rounded-lg bg-[#edf5ed] p-2 text-[#07512f]"
              size={22}
              strokeWidth={1.9}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-7 sm:space-y-9">
      <WelcomeHeader />

      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#819087]">
          Your overview
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#123e2b] sm:text-3xl">
          Good morning, Amara
        </h1>
        <p className="max-w-xl text-sm leading-6 text-[#718078] sm:text-base">
          Here’s what’s happening across your programs and farmer network today.
        </p>
      </header>

      <FundsSummary />
      <MetricsGrid />

      <section aria-labelledby="quick-actions-heading">
        <h2
          id="quick-actions-heading"
          className="mb-3 text-base font-semibold text-[#123e2b] sm:text-lg"
        >
          Ready for your next step?
        </h2>

        <Link
          to="/programs/create"
          className="group flex min-h-16 w-full items-center justify-between gap-4 rounded-xl border border-[#dce9dc] bg-[#edf5ec] px-5 py-4 text-sm font-semibold text-[#16472f] transition hover:border-[#b8d2bb] hover:bg-[#e7f1e5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:min-h-[4.5rem] sm:w-auto sm:min-w-[20rem] sm:px-6"
        >
          <span>
            <span className="block">Create a funding opportunity</span>
            <span className="mt-0.5 block text-xs font-normal text-[#718078]">
              Set up a new grant or loan program
            </span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07512f] text-white transition group-hover:translate-x-0.5">
            <ArrowRight
              aria-hidden="true"
              size={17}
            />
          </span>
        </Link>
      </section>

      <RecentActivity />
    </div>
  );
}
