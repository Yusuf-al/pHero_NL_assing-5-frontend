
import { IProperties } from "@/lib/types";
import { getSingleProperty } from "../../_actions/getProperties";
import PropertyAmenities from "../../_components/PropertyAmenities";
import PropertyDetails from "../../_components/PropertyDetails";
import PropertyGallery from "../../_components/PropertyGallery";
import PropertyHeader from "../../_components/PropertyHeader";
import PropertyLandlord from "../../_components/PropertyLandlord";
import PropertyLocation from "../../_components/PropertyLocation";
import PropertySidebar from "../../_components/PropertySidebar";
import PropertyReviews from "../../_components/PropertyReviews";


interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function SinglePropertyPage({ params }: Props) {
    const { id } = await params;
    const property: IProperties = await getSingleProperty(id as string);
    return (
        <main className="container mx-auto py-10">
            <div className="space-y-8">
                <PropertyHeader propertydata={property} />

                <PropertyGallery />

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_400px] gap-8">
                    <div className="space-y-8">
                        <PropertyDetails propertydata={property} />
                        <PropertyAmenities />
                        <PropertyLocation propertydata={property} />
                        <PropertyLandlord propertydata={property} />
                        <PropertyReviews property={property} />
                    </div>

                    <PropertySidebar propertydata={property} />
                </div>
            </div>
        </main>
    );
}