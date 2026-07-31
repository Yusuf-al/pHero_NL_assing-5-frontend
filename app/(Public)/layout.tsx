import type { ReactNode } from "react"
import Link from "next/link"
import { Search, User, LogOut, Settings, LayoutDashboard } from "lucide-react"

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
import { IUser } from "@/lib/types";
import { getProfile } from "@/service/getMe";
import { logoutAction } from "../(Auth)/_actions/authAction";

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
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search location, property, or landlord..."
                            className="border-0 focus-visible:ring-0 shadow-none"
                        />
                        <Button size="sm" className="rounded-full">
                            Search
                        </Button>
                    </div>

                    {/* Right Side */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full h-11 px-2 flex items-center gap-2"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.profileImage} alt={user.name} />
                                        <AvatarFallback>
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="hidden sm:inline text-sm font-medium">
                                        {user.name}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-64">
                                <DropdownMenuLabel className="space-y-1">
                                    <p className="font-medium leading-none">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />
                                {
                                    user.role === 'LANDLORD' ? <> <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="flex items-center gap-2">
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem> </> : ""
                                }


                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={async () => { await logoutAction() }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/register">Register</Link>
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