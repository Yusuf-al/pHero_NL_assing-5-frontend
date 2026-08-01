import { PropertyProps } from "@/lib/types";
import { Bath, BedDouble } from "lucide-react";

export default function PropertyDetails({
    propertydata,
}: PropertyProps) {

    const { description, bedrooms, bathrooms } = propertydata
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold">About this property</h2>

            <p>
                {description}
            </p>

            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <BedDouble />
                    {bedrooms} Bedrooms
                </div>

                <div className="flex items-center gap-2">
                    <Bath />
                    {bathrooms} Bathrooms
                </div>
            </div>
        </section>
    );
}