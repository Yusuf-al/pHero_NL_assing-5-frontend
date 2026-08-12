"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQueryFilter } from "@/hook/useQuery";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({
    currentPage,
    totalPages,
}: PaginationProps) => {

    const { updateQuery } = useQueryFilter()

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        updateQuery('page', String(page))
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">

            {/* Previous */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() =>
                    handlePageChange(currentPage - 1)
                }
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </Button>

            {/* Page Numbers */}
            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <Button
                    key={page}
                    size="sm"
                    variant={
                        currentPage === page
                            ? "default"
                            : "outline"
                    }
                    onClick={() =>
                        handlePageChange(page)
                    }
                >
                    {page}
                </Button>
            ))}

            {/* Next */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                    handlePageChange(currentPage + 1)
                }
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>

        </div>
    );
};

export default Pagination;