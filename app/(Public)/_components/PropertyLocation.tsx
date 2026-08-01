import { PropertyProps } from "@/lib/types";
import { MapPin } from "lucide-react";

export default function PropertyLocation({
    propertydata,
}: PropertyProps) {
    return (
        <section>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold">Property Location</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Find this property at the address below.
                        </p>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">City</span>
                                <span className="font-medium">{propertydata.city}</span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">Area</span>
                                <span className="font-medium">{propertydata.area}</span>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <span className="text-sm text-muted-foreground">Address</span>
                                <span className="max-w-sm text-right font-medium">
                                    {propertydata.address}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}