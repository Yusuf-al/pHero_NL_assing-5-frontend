"use client";

import { Star, User } from "lucide-react";
import { IProperties } from "@/lib/types";

interface PropertyReviewsProps {
    property: IProperties;
}

export default function PropertyReviews({
    property,
}: PropertyReviewsProps) {
    const reviews = property.reviews ?? [];

    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                (sum: number, review: any) => sum + Number(review.rating),
                0
            ) / reviews.length
            : 0;

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="rounded-3xl border bg-card p-6 shadow-sm space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Reviews & Ratings</h2>

                <p className="text-sm text-muted-foreground mt-1">
                    See what previous tenants think about this property.
                </p>
            </div>

            {/* Average Rating */}
            <div className="rounded-2xl bg-muted/50 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="text-center sm:text-left">
                        <div className="text-5xl font-bold">
                            {averageRating.toFixed(1)}
                        </div>

                        <div className="flex justify-center sm:justify-start mt-2">
                            {renderStars(Math.round(averageRating))}
                        </div>

                        <p className="text-sm text-muted-foreground mt-2">
                            {reviews.length}{" "}
                            {reviews.length === 1 ? "review" : "reviews"}
                        </p>
                    </div>

                    <div className="hidden sm:block h-16 w-px bg-border" />

                    <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                            Overall Rating
                        </p>

                        <p>
                            Based on ratings from previous tenants.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review: any) => (
                        <div
                            key={review.id}
                            className="rounded-2xl border p-5 space-y-4"
                        >
                            {/* Tenant */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            {review.tenant?.name || "Anonymous Tenant"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Previous Tenant
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    {renderStars(Number(review.rating))}

                                    <span className="text-sm font-semibold">
                                        {Number(review.rating).toFixed(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Comment */}
                            {review.comment ? (
                                <p className="text-sm leading-6 text-muted-foreground">
                                    "{review.comment}"
                                </p>
                            ) : (
                                <p className="text-sm italic text-muted-foreground">
                                    No comment provided.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed p-10 text-center">
                    <Star className="mx-auto h-10 w-10 text-muted-foreground" />

                    <h3 className="mt-3 font-semibold">
                        No reviews yet
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Be the first tenant to review this property.
                    </p>
                </div>
            )}
        </section>
    );
}