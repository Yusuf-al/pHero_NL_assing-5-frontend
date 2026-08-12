"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQueryFilter } from "@/hook/useQuery";
import { useSearchParams } from "next/navigation";

const BedroomFilter = () => {
    const { updateQuery } = useQueryFilter();
    const searchParams = useSearchParams();

    const selectedBedroom = searchParams.get("bedrooms");

    const handleBedroomFilter = (value: string) => {
        // If already selected, remove it
        if (selectedBedroom === value) {
            updateQuery("bedrooms", null);
            return;
        }

        // Otherwise select it
        updateQuery("bedrooms", value);
    };

    return (
        <div className="space-y-3">
            <Label>Bedrooms</Label>

            <div className="grid grid-cols-3 gap-2">
                <Button
                    type="button"
                    variant={selectedBedroom === "1" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBedroomFilter("1")}
                >
                    1
                </Button>

                <Button
                    type="button"
                    variant={selectedBedroom === "2" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBedroomFilter("2")}
                >
                    2
                </Button>

                <Button
                    type="button"
                    variant={selectedBedroom === "3" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBedroomFilter("3")}
                >
                    3+
                </Button>
            </div>
        </div>
    );
};

export default BedroomFilter;