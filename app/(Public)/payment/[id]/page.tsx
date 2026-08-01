import { getRentalRequest } from "../../_actions/getProperties";
import Link from "next/link";
import {
    CheckCircle2,
    CalendarDays,
    MapPin,
    Home,
    CreditCard,
    Receipt,
    ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/lib/types";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function PaymentSuccessPage({ params }: Props) {
    const { id } = await params;
    const bookings = await getRentalRequest(id);
    const bookingData: IBooking = bookings.data

    if (!bookings.success) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    {bookingData.message}
                </h1>
            </div>
        );
    }

    const payment = bookingData.payments[0]

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="container mx-auto max-w-6xl py-12">
                {/* Success Banner */}
                <div className="mb-8 rounded-3xl border bg-gradient-to-r from-green-600 to-emerald-500 p-10 text-white shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <CheckCircle2 className="mb-5 h-20 w-20" />

                        <h1 className="text-4xl font-bold">
                            Payment Successful 🎉
                        </h1>

                        <p className="mt-3 max-w-2xl text-lg text-green-100">
                            Your booking has been confirmed successfully. A payment receipt
                            has been generated and your reservation is now active.
                        </p>

                        <Badge className="mt-6 bg-white text-green-700 hover:bg-white">
                            Booking Confirmed
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_380px]">
                    {/* Left Content */}
                    <div className="space-y-6">
                        {/* Property */}
                        <div className="rounded-3xl border bg-card p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-2">
                                <Home className="h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    Property Information
                                </h2>
                            </div>

                            <h3 className="text-2xl font-bold">
                                {bookingData.property.title}
                            </h3>

                            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />

                                <span>
                                    {bookingData.property.address},{" "}
                                    {bookingData.property.area},{" "}
                                    {bookingData.property.city}
                                </span>
                            </div>
                        </div>

                        {/* Stay Duration */}
                        <div className="rounded-3xl border bg-card p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    Stay Duration
                                </h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl bg-muted p-5">
                                    <p className="text-sm text-muted-foreground">
                                        Move In
                                    </p>

                                    <p className="mt-1 text-lg font-semibold">
                                        {new Date(
                                            bookingData.moveInDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-muted p-5">
                                    <p className="text-sm text-muted-foreground">
                                        Move Out
                                    </p>

                                    <p className="mt-1 text-lg font-semibold">
                                        {new Date(
                                            bookingData.moveOutDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="rounded-3xl border bg-card p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    Payment Receipt
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Amount Paid
                                    </span>

                                    <span className="font-bold">
                                        ${payment.amount}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Payment Method
                                    </span>

                                    <Badge>{payment.paymentMethod}</Badge>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Status
                                    </span>

                                    <Badge className="bg-green-600 hover:bg-green-600">
                                        {payment.status}
                                    </Badge>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Transaction ID
                                    </p>

                                    <div className="mt-2 rounded-xl bg-muted p-3 font-mono text-sm break-all">
                                        {payment.transactionId}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Paid On
                                    </span>

                                    <span>
                                        {new Date(
                                            payment.paymentDate
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="h-fit rounded-3xl border bg-card p-6 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Paid
                                </p>

                                <h2 className="mt-2 text-5xl font-bold">
                                    ${bookingData.totalPrice}
                                </h2>
                            </div>

                            <div className="space-y-3 rounded-2xl bg-muted p-5">
                                <div className="flex justify-between">
                                    <span>Booking Status</span>

                                    <Badge>{bookingData.status}</Badge>
                                </div>

                                <div className="flex justify-between">
                                    <span>Payment</span>

                                    <Badge className="bg-green-600 hover:bg-green-600">
                                        Paid
                                    </Badge>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                Your reservation has been confirmed successfully.
                                You can now view your booking details or continue
                                browsing other properties.
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full" asChild>
                                    <Link href={`/bookings/${bookingData.id}`}>
                                        Booking Details
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href="/">
                                        Browse Properties
                                    </Link>
                                </Button>

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href="/dashboard/my-bookings">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        My Bookings
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}