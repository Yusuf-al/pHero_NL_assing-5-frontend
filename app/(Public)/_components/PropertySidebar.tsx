"use client"
import { Button } from "@/components/ui/button";
import { PropertyProps } from "@/lib/types";
import { useState } from "react";
import BookingDialog from "./BookingDialog";
import { Badge } from "@/components/ui/badge";

export default function PropertySidebar({
    propertydata,
}: PropertyProps) {
    const [open, setOpen] = useState(false);
    const { rent, landlord } = propertydata
    return (
        <>

            <div className="sticky top-24 rounded-3xl border p-6 h-fit">
                <div className="space-y-4">
                    {propertydata.status === "AVAILABLE" && <>
                        <h2 className="text-4xl font-bold">
                            {rent}
                            <span className="text-lg font-normal">/day</span>
                        </h2>

                        <Button className="w-full" onClick={() => setOpen(true)}>


                            Book Now

                        </Button>
                    </>}

                    {
                        propertydata.status !== "AVAILABLE" && <Badge
                            variant="destructive"
                        >
                            {propertydata.status}
                        </Badge>
                    }

                    <Button variant={"outline"} className="w-full">
                        Contact Details
                    </Button>
                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>Name:</strong> {landlord.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {landlord.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {landlord.phone || "Not Given"}
                        </p>
                    </div>
                </div>
            </div>
            <BookingDialog
                open={open}
                onOpenChange={setOpen}
                propertyId={propertydata.id}
            />
        </>
    );
}