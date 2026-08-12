"use client";

import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    LayoutDashboard,
    Settings,
    User,
} from "lucide-react";


import { IUser } from "@/lib/types";
import LogoutButton from "@/app/(Public)/_components/LogoutButton";

interface UserMenuProps {
    user: IUser;
}

export default function UserMenu({ user }: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-full h-11 px-2 flex items-center gap-2"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user.profileImage || ""}
                            alt={user.name}
                        />

                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>

                    <span className="hidden sm:block text-sm font-medium">
                        {user.name}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {user.email}
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {user.role === "LANDLORD" && (
                    <DropdownMenuItem asChild>
                        <Link
                            href="/landlord/dashboard"
                            className="flex items-center gap-2"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}
                {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex items-center gap-2"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className="flex items-center gap-2"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}