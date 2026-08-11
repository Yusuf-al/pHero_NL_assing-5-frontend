"use client";

import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PaymentsTableProps {
    payments: any[];
}

export default function PaymentsTable({
    payments,
}: PaymentsTableProps) {
    return (
        <div className="rounded-xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center py-8 text-muted-foreground"
                            >
                                No payment history found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {payment.transactionId}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {payment.tenant.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {payment.tenant.email}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {payment.tenant.phone}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {payment.property.title}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            ${payment.property.rent}/day
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell className="font-semibold">
                                    ${payment.amount}
                                </TableCell>

                                <TableCell>
                                    <Badge variant="outline">
                                        {payment.paymentMethod}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                        {payment.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        payment.paymentDate
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}