// lib/dashboard-menus.ts

import {
  LayoutDashboard,
  Home,
  Users,
  CreditCard,
  PlusSquare,
  Shield,
  GitPullRequestCreateArrow,
} from "lucide-react";

export const landlordMenus = [
  {
    title: "Dashboard",
    href: "/landlord/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Properties",
    href: "/landlord/properties",
    icon: Home,
  },
  {
    title: "Add Property",
    action: "add-property",
    icon: PlusSquare,
  },
  {
    title: "Requests",
    href: "/landlord/rent-requests",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/landlord/payments",
    icon: CreditCard,
  },
];

export const adminMenus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Home,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Requests",
    href: "/admin/rent-requests",
    icon: GitPullRequestCreateArrow,
  },
];
