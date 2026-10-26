import { Link } from "react-router-dom";

export default function QuickActionItem({ label, icon: Icon, to, badge }) {
  return (
    <Link
      to={to}
      className="group flex min-w-0 flex-col items-center gap-2 text-center"
    >
      <span className="relative flex h-11 w-12 items-center justify-center rounded-md border border-gray-100 bg-white text-[#183b2a] shadow-sm transition group-hover:border-[#07512f] group-hover:bg-[#eaf4ed]">
        <Icon
          size={19}
          strokeWidth={1.6}
        />
        {badge && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e6ad43] px-1 text-[9px] font-semibold text-[#183b2a]">
            {badge}
          </span>
        )}
      </span>

      <span className="text-[10px] font-medium leading-4 text-[#183b2a]">
        {label}
      </span>
    </Link>
  );
}
