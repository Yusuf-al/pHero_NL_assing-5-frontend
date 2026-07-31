"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Home,
  Users,
  CreditCard,
  Settings,
  PlusSquare,
} from "lucide-react"

const menus = [
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
    href: "/landlord/properties/new",
    icon: PlusSquare,
  },
  {
    title: "Tenants",
    href: "/landlord/tenants",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/landlord/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/landlord/settings",
    icon: Settings,
  },
]

export default function LandlordSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-card h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Landlord Panel</h2>

        <nav className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon
            const active = pathname === menu.href

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {menu.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}