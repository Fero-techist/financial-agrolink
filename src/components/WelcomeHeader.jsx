import ProfileImg from "../assets/Profile.svg";
import { Bell } from "lucide-react";

export default function WelcomeHeader() {
  return (
    <div className="rounded-xl border border-[#e6ede5] bg-white/80 px-4 py-3 shadow-[0_2px_9px_rgba(22,54,35,0.023)] sm:px-5 sm:py-3.5">
      <section className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#edf4ec] text-lg font-semibold ring-2 ring-[#e3eee2] sm:h-12 sm:w-12"
          >
            <img
              src={ProfileImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#19382a] sm:text-base">
              Welcome back, Amara
            </p>
            <p className="mt-0.5 text-xs text-[#718078] sm:text-sm">
              Your agriculture funding workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f4f7f3] text-[#3b5948] transition hover:bg-[#eaf2e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] sm:hidden"
        >
          <Bell
            aria-hidden="true"
            size={23}
            strokeWidth={1.8}
          />
          <span className="absolute right-4 top-3 h-2.5 w-2.5 rounded-full bg-[#e6ad43]" />
        </button>
      </section>
    </div>
  );
}
