import { getLandlordRentRequest } from "../../_actions/landlordActions";
import RentalRequestTable from "../../_components/RentalRequestTable";


export default async function RentalRequestPage() {
    const result = await getLandlordRentRequest();

    if (!result.success) {
        return <div>{result.message}</div>;
    }

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Rental Requests</h1>
                <p className="text-muted-foreground">
                    Manage all booking requests for your properties.
                </p>
            </div>

            <RentalRequestTable requests={result.data ?? []} />
        </div>
    );
}