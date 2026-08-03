import { getLandlordProperties } from "../../_actions/landlordActions";
import PropertyList from "../../_components/PropertyList";


export default async function AllPropertiesPage() {
    const result = await getLandlordProperties();

    if (!result.success) {
        return <div>{result.message}</div>;
    }

    return <PropertyList properties={result.data ?? []} />;
}