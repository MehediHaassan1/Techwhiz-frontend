import {
  BadgeDollarSign,
  ClipboardPlus,
  CreditCard,
  FileChartLine,
  FilePlus2,
  House,
  Users,
} from "lucide-react";

export const UserLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Dashboard", path: "/dashboard-user", icon: FileChartLine },
  { name: "My Posts", path: "/dashboard-user/my-posts", icon: ClipboardPlus },
  {
    name: "My Payments",
    path: "/dashboard-user/my-payments",
    icon: BadgeDollarSign,
  },
];

export const AdminLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Dashboard", path: "/dashboard-admin", icon: FileChartLine },
  { name: "Manage Users", path: "/dashboard-admin/manage-users", icon: Users },
  {
    name: "Manage Posts",
    path: "/dashboard-admin/manage-posts",
    icon: FilePlus2,
  },
  {
    name: "Payment History",
    path: "/dashboard-admin/payment-history",
    icon: CreditCard,
  },
];
