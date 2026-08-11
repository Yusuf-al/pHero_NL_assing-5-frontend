import type { ReactNode } from "react"


import DashboardHeader from "../../components/shared/dashboard-header";
import DashboardSidebar from "../../components/shared/dashboard-sidebar";
import { getProfile } from "@/service/getMe";

export default async function LandlordLayout({
  children,
}: {
  children: ReactNode
}) {


  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <DashboardHeader />

      {/* Two Column Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <DashboardSidebar role="LANDLORD" />

        {/* Right Content */}
        <main className="flex-1 p-6 overflow-y-auto min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}