import { Search, Bell } from "lucide-react";
import Navimg from "../../assets/navimg.svg";
export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 hidden h-[76px] items-center justify-between border-b border-[#e8eee7] bg-white/80 px-6 backdrop-blur-xl md:flex lg:px-10">
      <div className="relative w-full max-w-[34rem]">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
        />
        <input
          type="search"
          placeholder="Search farmers, programs..."
          aria-label="Search dashboard"
          className="h-11 w-full rounded-xl border border-[#e3eae2] bg-[#f8faf7] pl-11 pr-4 text-sm text-[#183127] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition-all duration-200 placeholder:text-[#9aa69e] focus:border-[#6b9b78] focus:bg-white focus:ring-4 focus:ring-[#07512f]/[0.08]"
        />
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-[#53665a] transition-all duration-200 hover:bg-[#f1f5ef] hover:text-[#07512f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
        </button>

        <div
          aria-label="Amara's profile"
          role="img"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#dce9df] to-[#cfe1d7] text-sm font-bold text-[#07512f] ring-2 ring-white shadow-[0_4px_9px_rgba(17,45,29,0.052)]"
        >
          <img
            src={Navimg}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
