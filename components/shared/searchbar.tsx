"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function PropertySearch({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}) {

    const search = await searchParams;
    console.log(search)
    return (
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
    );
}