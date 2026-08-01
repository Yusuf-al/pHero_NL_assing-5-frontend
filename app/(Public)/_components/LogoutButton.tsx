"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/(Auth)/_actions/authAction";

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="flex w-full items-center px-2 py-1.5 text-red-600"
            >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </button>
        </form>
    );
}