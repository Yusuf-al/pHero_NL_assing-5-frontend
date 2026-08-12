"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQueryFilter } from "@/hook/useQuery";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
    { id: "apartment", label: "Apartment", value: "APARTMENT" },
    { id: "studio", label: "Studio", value: "STUDIO" },
    { id: "house", label: "House", value: "HOUSE" },
    { id: "villa", label: "Villa", value: "VILLA" },
    { id: "hostel", label: "Hostel", value: "HOSTEL" },
];

const CategoryFilter = () => {
    const searchParams = useSearchParams();
    const { updateQuery } = useQueryFilter();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        () => {
            const category = searchParams.get("category");

            return category ? category.split(",") : [];
        }
    );

    useEffect(() => {
        const category = searchParams.get("category");

        const categoriesFromUrl = category
            ? category.split(",")
            : [];

        setSelectedCategories(categoriesFromUrl);
    }, [searchParams]);

    const handleCategoryChange = (
        category: string,
        checked: boolean | "indeterminate"
    ) => {
        if (checked === true) {
            const updatedCategories = [
                ...selectedCategories,
                category,
            ];

            setSelectedCategories(updatedCategories);

            updateQuery(
                "category",
                updatedCategories.join(",")
            );

            return;
        }

        const updatedCategories = selectedCategories.filter(
            (item) => item !== category
        );

        setSelectedCategories(updatedCategories);

        if (updatedCategories.length === 0) {
            updateQuery("category", null);
            return;
        }

        updateQuery(
            "category",
            updatedCategories.join(",")
        );
    };

    return (
        <div className="space-y-3">
            <Label>Category</Label>

            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex items-center space-x-2"
                >
                    <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.value)}
                        onCheckedChange={(checked) =>
                            handleCategoryChange(
                                category.value,
                                checked
                            )
                        }
                    />

                    <Label
                        htmlFor={category.id}
                        className="font-normal cursor-pointer"
                    >
                        {category.label}
                    </Label>
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;