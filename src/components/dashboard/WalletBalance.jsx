import { EllipsisVertical, Wallet, ArrowDownToLine } from "lucide-react";

export default function WalletBalance() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#003f2d] p-5 text-white sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative">
        <p className="text-xs uppercase tracking-wide text-white/65">
          Wallet Balance
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          ₦12,540.00
        </h1>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <div>
            <p className="text-xs text-white/65">Pending Balance</p>
            <p className="mt-0.5 text-sm font-medium">₦200,000</p>
          </div>

          <button
            type="button"
            aria-label="Wallet options"
            className="rounded p-1 hover:bg-white/10"
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#e6ad43] px-5 py-2 text-sm font-medium text-[#172719] hover:bg-[#f0bd5d]"
          >
            <Wallet size={15} />
            Fund
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#e6ad43] px-5 py-2 text-sm font-medium text-[#172719] hover:bg-[#f0bd5d]"
          >
            <ArrowDownToLine size={15} />
            Withdraw
          </button>
        </div>
      </div>
    </section>
  );
}
