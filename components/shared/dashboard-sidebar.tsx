"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import AddPropertyDialog from "@/app/(Landlord)/_components/AddPropertyDialog";
import { adminMenus, landlordMenus } from "@/lib/dashboard-menus";

interface DashboardSidebarProps {
  role: any;
}

export default function DashboardSidebar({
  role,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menus = role === "ADMIN" ? adminMenus : landlordMenus;

  return (
    <>
      <aside className="w-64 border-r bg-card h-[calc(100vh-64px)] sticky top-16">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            {role === "ADMIN" ? "Admin Panel" : "Landlord Panel"}
          </h2>

          <nav className="space-y-1">
            {menus.map((menu: any) => {
              const Icon = menu.icon;

              if (menu.action === "add-property") {
                return (
                  <button
                    key={menu.title}
                    onClick={() => setOpen(true)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {menu.title}
                  </button>
                );
              }

              const active = pathname === menu.href;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {menu.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {role === "LANDLORD" && (
        <AddPropertyDialog
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}