import type { ReactNode } from "react"
import Link from "next/link"
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LandlordHeader from "./_components/landlord-header";
import LandlordSidebar from "./_components/landlord-sidebar";

export default function LandlordLayout({
  children,
}: {
  children: ReactNode
}) {
  // Replace this with your real auth/session check
  const user = {
    name: "Yusuf Al Naiem",
    email: "yusuf@example.com",
    image: "",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <LandlordHeader />

      {/* Two Column Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <LandlordSidebar />

        {/* Right Content */}
        <main className="flex-1 p-6 overflow-y-auto min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}