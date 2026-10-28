import {
  ArrowDownRight,
  CalendarDays,
  CirclePause,
  Droplet,
  Users,
} from "lucide-react";

export const programs = [
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
