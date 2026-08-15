import { PropertyProps } from "@/lib/types";


export default function PropertyHeader({
    propertydata,
}: PropertyProps) {
    const { title, city, area } = propertydata;
    
    return (
        <div>
            <h1 className="text-4xl font-bold">{title}</h1>

            <p className="text-muted-foreground mt-2">
                {city}, {area}
            </p>
        </div>
    );
}