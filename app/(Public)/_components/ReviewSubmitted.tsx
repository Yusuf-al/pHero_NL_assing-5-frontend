"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewSubmittedProps {
    rating: number;
    comment?: string | null;
}

export default function ReviewSubmitted({
    rating,
    comment,
}: ReviewSubmittedProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                    Your Review
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={`h-5 w-5 ${index < rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                                }`}
                        />
                    ))}

                    <span className="ml-2 font-medium">
                        {rating}/5
                    </span>
                </div>

                {/* Comment */}
                {comment && (
                    <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">
                            {comment}
                        </p>
                    </div>
                )}

                <p className="text-sm text-green-600">
                    ✓ Review submitted successfully
                </p>
            </CardContent>
        </Card>
    );
}