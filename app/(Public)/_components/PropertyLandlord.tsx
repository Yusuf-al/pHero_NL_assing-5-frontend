import { PropertyProps } from "@/lib/types";

export default function PropertyLandlord({
    propertydata,
}: PropertyProps) {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">
                Hosted By
            </h2>

            <div className="flex items-center gap-4">
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    className="h-16 w-16 rounded-full"
                />

                <div>
                    <h3 className="font-semibold">{propertydata.landlord.name}</h3>
                    <p className="text-muted-foreground">
                        {propertydata.landlord.email}
                    </p>
                </div>
            </div>
        </section>
    );
}