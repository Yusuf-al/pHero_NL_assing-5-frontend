"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitReview } from "../_actions/getProperties";
import { useRouter } from "next/navigation";

interface ReviewFormProps {

    propertyId: string;
    bookingId: string;
}

export default function ReviewForm({
    propertyId,
    bookingId
}: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const router = useRouter()

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a review");
            return;
        }

        startTransition(async () => {
            try {
                const submittedReview = await submitReview(propertyId, bookingId, { rating, comment })
                if (submittedReview.success) {

                    toast.success(submittedReview.message);
                }

                setRating(0);
                setComment("");
                router.refresh()
            } catch (error) {
                toast.error("Something went wrong");
            }
        });
    };

    return (
        <div className="rounded-2xl border p-6 space-y-5">
            <div>
                <h2 className="text-xl font-semibold">
                    Leave a Review
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                    How was your experience with this property?
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Rating */}
                <div className="space-y-2">
                    <Label>Rating</Label>

                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() =>
                                    setHoverRating(star)
                                }
                                onMouseLeave={() =>
                                    setHoverRating(0)
                                }
                                className="p-1"
                            >
                                <Star
                                    className={`h-7 w-7 transition ${star <=
                                        (hoverRating || rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                    <Label htmlFor="review">
                        Your Review
                    </Label>

                    <Textarea
                        id="review"
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Share your experience..."
                        rows={4}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full"
                >
                    {isPending
                        ? "Submitting..."
                        : "Submit Review"}
                </Button>
            </form>
        </div>
    );
}