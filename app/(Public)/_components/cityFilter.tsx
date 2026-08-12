"use client"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQueryFilter } from '@/hook/useQuery';


const cityFilter = () => {
    const { getQuery, updateQuery } = useQueryFilter()

    const handleCityFilter = (value: string) => {
        updateQuery("city", value)
    }
    return (
        <>
            <Label>Location</Label>
            <Input
                placeholder="Enter location"
                defaultValue={getQuery("city")}
                onChange={(e) => handleCityFilter(e.target.value)}
            />
        </>
    )
}

export default cityFilter
