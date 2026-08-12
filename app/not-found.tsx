import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-lg">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6">
                        <Home className="h-12 w-12 text-primary" />
                    </div>
                </div>

                <p className="text-8xl font-extrabold tracking-tight text-primary">
                    404
                </p>

                <h1 className="mt-4 text-3xl font-bold tracking-tight">
                    Oops! Page Not Found
                </h1>

                <p className="mt-4 text-muted-foreground">
                    The page you're looking for doesn't exist or may have
                    been moved to another location.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild className="rounded-full">
                        <Link href="/home">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        asChild
                        className="rounded-full"
                    >
                        <Link href="/home">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Browse Properties
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}