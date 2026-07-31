import { Building2 } from "lucide-react"
import type { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Building2 className="h-7 w-7" />
          <span>RentNest</span>
        </div>

        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Find your perfect rental property with ease
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Manage properties, connect with tenants, and simplify your
            rental experience using RentNest.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2 lg:hidden text-2xl font-bold">
            <Building2 className="h-6 w-6 text-primary" />
            <span>RentNest</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}