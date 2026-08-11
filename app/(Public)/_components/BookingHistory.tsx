import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface BookingDataProps {
    bookings: any[];
}

export default function MyBookings({ bookings }: BookingDataProps) {
    return (
        <section className="mt-10 rounded-2xl border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Bookings</h2>
                <Badge variant="secondary">{bookings.length} Bookings</Badge>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Move In</TableHead>
                        <TableHead>Move Out</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium">
                                {booking.property.title}
                            </TableCell>

                            <TableCell>
                                {booking.property.city}
                            </TableCell>

                            <TableCell>
                                {new Date(booking.moveInDate).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                {new Date(booking.moveOutDate).toLocaleDateString()}
                            </TableCell>

                            <TableCell>${booking.totalPrice}</TableCell>

                            <TableCell>
                                <Badge
                                    className={
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
                                    }
                                >
                                    {booking.status}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                                <Button asChild size="sm">
                                    <Link href={`/bookings/${booking.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}