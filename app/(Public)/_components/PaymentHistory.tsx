import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PaymentDataProps {
    payments: any[];
}

export default function PaymentHistory({
    payments,
}: PaymentDataProps) {
    return (
        <section className="mt-10 rounded-2xl border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    Payment History
                </h2>

                <Badge variant="secondary">
                    {payments.length} Payments
                </Badge>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell className="font-mono text-xs">
                                {payment.transactionId}
                            </TableCell>

                            <TableCell>
                                {payment.paymentMethod}
                            </TableCell>

                            <TableCell>
                                ${payment.amount}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        payment.status === "PAID"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {payment.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    payment.paymentDate
                                ).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}