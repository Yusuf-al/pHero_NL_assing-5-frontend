"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MapPin,
    CreditCard,
    Home,
    MessageSquare,
} from "lucide-react";
import { cancelRentalRequest, makePayment } from "../_actions/getProperties";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingDetailsProps {
    booking: any;
}

export default function BookingDetails({
    booking,
}: BookingDetailsProps) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCancel = () => {
        startTransition(async () => {
            const res = await cancelRentalRequest(booking.id);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success("Booking request cancelled");
            router.refresh(); // re-fetches server data, updates badge/status in UI
        });
    };

    const handlePayment = () => {
        startTransition(async () => {
            const res = await makePayment(booking.id);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success("Please complete your payment process");
            router.push(res.data); // re-fetches server data, updates badge/status in UI
        });
    };
    return (
        <div className="container mx-auto max-w-5xl py-10">
            <div className="rounded-3xl border bg-card shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-primary-foreground p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Booking Details
                            </h1>

                            <p className="mt-2 opacity-90">
                                Booking ID: {booking.id}
                            </p>
                        </div>

                        <Badge
                            variant={
                                booking.status === "PENDING"
                                    ? "secondary"
                                    : "default"
                            }
                        >
                            {booking.status}
                        </Badge>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[2fr_1fr] gap-8 p-8">
                    {/* Left */}
                    <div className="space-y-8">
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Home className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">
                                    Property
                                </h2>
                            </div>

                            <div className="rounded-2xl border p-5 space-y-2">
                                <h3 className="text-lg font-semibold">
                                    {booking.property.title}
                                </h3>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {booking.property.address},{" "}
                                    {booking.property.area},{" "}
                                    {booking.property.city}
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">
                                    Stay Duration
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <p className="text-sm text-muted-foreground">
                                        Move In
                                    </p>

                                    <p className="font-semibold">
                                        {new Date(
                                            booking.moveInDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <p className="text-sm text-muted-foreground">
                                        Move Out
                                    </p>

                                    <p className="font-semibold">
                                        {new Date(
                                            booking.moveOutDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">
                                    Message
                                </h2>
                            </div>

                            <div className="rounded-xl border p-5 text-muted-foreground">
                                {booking.message || "No message provided."}
                            </div>
                        </section>
                    </div>

                    {/* Right */}
                    <aside className="rounded-2xl border p-6 h-fit space-y-6">
                        <div>
                            <p className="text-muted-foreground">
                                Total Price
                            </p>

                            <h2 className="text-4xl font-bold">
                                ${booking.totalPrice}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Payment</span>

                                <Badge
                                    className={
                                        booking.isPaid ? "bg-green-100 text-green-600 hover:bg-green-100" : "bg-red-100 text-red-600 hover:bg-red-100"
                                    }
                                >
                                    {booking.isPaid ? "Paid" : "Unpaid"}
                                </Badge>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>

                                <Badge className={
                                    booking.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
                                        : booking.status === "APPROVED"
                                            ? "bg-green-100 text-green-600 hover:bg-green-100"
                                            : booking.status === "COMPLETED"
                                                ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                                                : booking.status === "CANCELLED"
                                                    ? "bg-red-100 text-red-600 hover:bg-red-100"
                                                    : booking.status === "REJECTED"
                                                        ? "bg-red-100 text-red-600 hover:bg-red-100"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                                } >{booking.status}</Badge>
                            </div>
                        </div>

                        {!booking.isPaid && booking.status === "PENDING" && (
                            <>
                                <Button className="w-full" onClick={handlePayment}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pay Now
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isPending}
                                    className="w-full text-red-500"
                                >
                                    {isPending ? "Cancelling..." : "Cancel Request"}
                                </Button>
                            </>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}