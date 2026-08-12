import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                {/* Header skeleton */}
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-80" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="rounded-3xl border bg-card p-5 space-y-6">
                        <Skeleton className="h-6 w-40" />

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-2 w-full" />
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-28" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </aside>

                    {/* Properties */}
                    <section>
                        <div className="mb-6">
                            <Skeleton className="h-7 w-52" />
                            <Skeleton className="h-4 w-32 mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <PropertyCardSkeleton key={index} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function PropertyCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-3xl border bg-card">
            {/* Image */}
            <Skeleton className="h-64 w-full rounded-none" />

            <div className="p-4 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Beds / baths */}
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                </div>

                {/* Price + button */}
                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-3 w-12" />
                    </div>

                    <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>
        </div>
    );
}