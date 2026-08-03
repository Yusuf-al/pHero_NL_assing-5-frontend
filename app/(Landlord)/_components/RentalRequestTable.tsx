"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import EditRentalStatusDialog from "./EditRentalStatusDialog";

export default function RentalRequestTable({
    requests,
}: {
    requests: any[];
}) {
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="rounded-xl border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tenant</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Stay</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-24">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{request.tenant.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {request.tenant.email}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {request.tenant.phone}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {request.property.title}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {request.property.city}, {request.property.area}
                                        </p>

                                        <p className="text-xs">
                                            ${request.property.rent}/day
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="text-sm">
                                        <p>
                                            {new Date(
                                                request.moveInDate
                                            ).toLocaleDateString()}
                                        </p>

                                        <p className="text-muted-foreground">
                                            to
                                        </p>

                                        <p>
                                            {new Date(
                                                request.moveOutDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className="font-semibold">
                                        ${request.totalPrice}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            request.isPaid
                                                ? "default"
                                                : "destructive"
                                        }
                                    >
                                        {request.isPaid ? "Paid" : "Unpaid"}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            request.status === "PENDING"
                                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                                : request.status === "APPROVED"
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : request.status === "COMPLETED"
                                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                        : request.status === "CANCELLED"
                                                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                                                            : request.status === "REJECTED"
                                                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                        }
                                    >
                                        {request.status}
                                    </Badge>
                                </TableCell>
                                {
                                    request.status !== 'CANCELLED' ? <>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedRequest(request);
                                                    setOpen(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </> : ""
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <EditRentalStatusDialog
                open={open}
                onOpenChange={setOpen}
                request={selectedRequest}
            />
        </>
    );
}