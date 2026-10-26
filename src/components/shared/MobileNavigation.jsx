import { NavLink } from "react-router-dom";
import { ClipboardList, House, Settings, Sprout } from "lucide-react";

const navigation = [
  { label: "Home", path: "/", icon: House },
  { label: "Programs", path: "/programs", icon: ClipboardList },
  { label: "Farmers", path: "/farmers", icon: Sprout },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function MobileNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e8eee7] bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_9px_rgba(17,45,29,0.039)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-1 p-2">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] leading-4 transition-all duration-200 ${
                isActive
                  ? "bg-[#eaf4ec] font-semibold text-[#07512f] shadow-[inset_0_0_0_1px_rgba(7,81,47,0.04)]"
                  : "text-[#718078] hover:bg-[#f4f7f3] hover:text-[#07512f]"
              }`
            }
          >
            <Icon
              aria-hidden="true"
              size={22}
              strokeWidth={1.8}
            />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
