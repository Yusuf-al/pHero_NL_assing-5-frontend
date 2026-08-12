"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

const MIN_PRICE = 50;
const MAX_PRICE = 300;

const RangeFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const rangeParams = useSearchParams();

    const [range, setRange] = useState<number[]>([
        MIN_PRICE,
        MAX_PRICE,
    ]);

    // Sync slider with URL
    useEffect(() => {
        const minRent =
            Number(rangeParams.get("minRent")) || MIN_PRICE;

        const maxRent =
            Number(rangeParams.get("maxRent")) || MAX_PRICE;

        setRange([minRent, maxRent]);
    }, [rangeParams]);

    const handleRangeFilter = (value: number[]) => {
        setRange(value);

        const params = new URLSearchParams(
            rangeParams.toString()
        );

        const [minRent, maxRent] = value;

        // If the slider is at its default range,
        // remove the parameters from URL.
        if (
            minRent === MIN_PRICE &&
            maxRent === MAX_PRICE
        ) {
            params.delete("minRent");
            params.delete("maxRent");
        } else {
            params.set("minRent", String(minRent));
            params.set("maxRent", String(maxRent));
        }

        const queryString = params.toString();

        router.replace(
            queryString
                ? `${pathname}?${queryString}`
                : pathname,
            {
                scroll: false,
            }
        );
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>Price Range</Label>

                <span className="text-sm text-muted-foreground">
                    ${range[0]} - ${range[1]}
                </span>
            </div>

            <Slider
                value={range}
                onValueChange={handleRangeFilter}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={10}
                className="mt-4"
            />
        </div>
    );
};

export default RangeFilter;