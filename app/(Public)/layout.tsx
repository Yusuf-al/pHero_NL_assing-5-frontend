
import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IUser } from "@/lib/types";
import { getProfile } from "@/service/getMe";
import UserMenu from "@/components/shared/UserMenu";
import PropertySearch from "@/components/shared/searchbar";

export default async function PublicLayout({
    children,

}: {
    children: ReactNode

}) {
    // Replace this with your real auth/session check
    const user: IUser = await getProfile()


    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-primary">
                        RentNest
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm w-[420px]">

                    </div>

                    {/* Right Side */}
                    {user ? <>
                        <UserMenu user={user} />
                    </> : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/registration">Register</Link>
                            </Button>

                            <Button className="rounded-full" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}