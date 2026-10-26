import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { House, ClipboardList, Sprout, Settings } from "lucide-react";

const navigation = [
  { label: "Home", path: "/", icon: House },
  { label: "Programs", path: "/programs", icon: ClipboardList },
  { label: "Farmers", path: "/farmers", icon: Sprout },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#dce8dc] bg-white/80 text-[#183127] shadow-[3px_0_12px_rgba(17,45,29,0.02)] backdrop-blur-xl md:flex">
      <div className="flex h-20 items-center gap-1 border-b border-[#e8eee7] px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl">
          <img
            src={Logo}
            alt="Logo"
          />
        </span>
        <span className="text-lg font-bold tracking-tight text-[#333333]">
          AgroLinks
        </span>
      </div>

      <p className="px-6 pb-2 pt-7 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#96a49a]">
        Workspace
      </p>
      <nav
        aria-label="Main navigation"
        className="flex-1 space-y-1.5 px-3 py-2"
      >
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#eaf4ec] font-semibold text-[#07512f] shadow-[inset_0_0_0_1px_rgba(7,81,47,0.06)]"
                  : "text-[#697a70] hover:bg-[#f4f7f3] hover:text-[#123e2b]"
              }`
            }
          >
            <Icon
              size={18}
              strokeWidth={1.8}
            />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-4 rounded-xl bg-gradient-to-br from-[#edf5ee] to-[#f6f9f3] p-4 shadow-[0_5px_11px_rgba(17,45,29,0.026)]">
        <p className="text-xs font-semibold text-[#234332]">Growing together</p>
        <p className="mt-1 text-xs leading-5 text-[#78877e]">
          Manage funding and farmer support from one place.
        </p>
      </div>
    </aside>
  );
}
