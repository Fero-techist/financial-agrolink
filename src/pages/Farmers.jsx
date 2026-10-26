import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const farmers = Array.from({ length: 4 }, (_, index) => ({
  id: `farmer-${index + 1}`,
  initials: "AY",
  name: "Amina Yusuf",
  reference: "FRM-0248",
  location: "Zaria",
  state: "Kaduna State",
  crop: "Maize cultivation",
  land: "4.2 hectares",
  amount: "$5,200",
  program: "Smallholder Growth Loan",
  status: "Disbursed",
  date: "18 Oct 2026",
}));

function FarmerCard({ farmer }) {
  return (
    <article className="rounded-[12px] border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.026)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_11px_rgba(20,55,35,0.052)] sm:p-7">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e7f2e5] to-[#d4e8d4] text-sm font-bold text-[#07512f]"
        >
          {farmer.initials}
        </span>
        <div>
          <h2 className="text-base font-semibold leading-6 text-[#19382a] sm:text-lg">
            {farmer.name}
          </h2>
          <p className="mt-0.5 text-sm text-[#718379] sm:text-base">
            {farmer.reference}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5">
        <div className="min-w-0">
          <dt className="font-medium leading-6 text-[#10291c]">
            {farmer.location}
          </dt>
          <dd className="mt-1 text-[#718379]">{farmer.state}</dd>
        </div>
        <div className="min-w-0 text-right">
          <dt className="font-medium leading-6 text-[#10291c]">
            {farmer.crop}
          </dt>
          <dd className="mt-1 text-[#718379]">{farmer.land}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-lg font-semibold leading-6 text-[#10291c]">
            {farmer.amount}
          </dt>
          <dd className="mt-1 text-[#718379]">{farmer.program}</dd>
        </div>
        <div className="min-w-0 text-right">
          <dt>
            <span className="inline-flex rounded-lg bg-[#e8f3e9] px-3.5 py-2 font-medium leading-6 text-[#07512f]">
              {farmer.status}
            </span>
          </dt>
          <dd className="mt-1 text-[#718379]">{farmer.date}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function Farmers() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <header>
        <div className="relative flex min-h-14 items-center justify-center">
          <Link
            to="/"
            aria-label="Back to home"
            className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#10291c] transition hover:bg-[#eef4ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
          >
            <ArrowLeft
              aria-hidden="true"
              size={24}
            />
          </Link>
          <h1 className="text-center text-xl font-semibold tracking-tight text-[#07512f] sm:text-2xl">
            Farmers Managed
          </h1>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-6 text-[#718078] sm:text-lg sm:leading-7">
          Follow farmer progress, funding, and program participation across your network.
        </p>
      </header>

      <section
        aria-label="Managed farmers"
        className="space-y-4 sm:space-y-5"
      >
        {farmers.map((farmer) => (
          <FarmerCard
            key={farmer.id}
            farmer={farmer}
          />
        ))}
      </section>
    </div>
  );
}
