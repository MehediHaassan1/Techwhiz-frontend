import { ClipboardPlus, CreditCard, House, Key, Settings, Users } from "lucide-react";

export const UserLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "My Post", path: "/dashboard-user/my-posts", icon: ClipboardPlus },
];

export const AdminLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Manage Users", path: "/dashboard-admin/manage-users", icon: Users },
  {
    name: "Payment History",
    path: "/dashboard-admin/payment-history",
    icon: CreditCard,
  },
];