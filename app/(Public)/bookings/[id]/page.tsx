import { getRentalRequest } from "../../_actions/getProperties";
import BookingDetails from "../../_components/BookingDetails";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function BookingPage({ params }: Props) {
    const { id } = await params;
    const bookingData = await getRentalRequest(id);

    if (!bookingData.success) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    {bookingData.message}
                </h1>
            </div>
        );
    }

    const booking = bookingData.data;



    return (
        <BookingDetails booking={booking} />
    );
}