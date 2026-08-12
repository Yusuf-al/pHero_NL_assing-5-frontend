"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryFilter } from "@/hook/useQuery";
import { usePathname } from "next/navigation";


export default function PropertySearch() {
    const { getQuery, updateQuery } = useQueryFilter()

    const handleSearch = (value: string) => {
        updateQuery("searchTerm", value)
    }

    const pathname = usePathname();

    if (pathname !== "/home") {
        return null;
    }

    return (
        <div className="hidden md:flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm w-[420px]">
            <Search className="h-4 w-4 text-muted-foreground" />

            <Input
                defaultValue={getQuery("searchTerm")}
                placeholder="Search location, property, or landlord..."
                className="border-0 focus-visible:ring-0 shadow-none"
                onChange={(e) => handleSearch(e.target.value)}
            />

            <Button size="sm" className="rounded-full">
                Search
            </Button>
        </div>
    );
}