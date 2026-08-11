import PaymentsTable from "@/app/(Landlord)/_components/PaymentsTable";
import { allCompletePayments } from "../../_actions/adminActions";



export default async function PaymentPage() {
    const result = await allCompletePayments();

    if (!result.success) {
        return <div>{result.message}</div>;
    }

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Payments</h1>
                <p className="text-muted-foreground">
                    View all payments received from tenants.
                </p>
            </div>

            <PaymentsTable payments={result.data ?? []} />
        </div>
    );
}