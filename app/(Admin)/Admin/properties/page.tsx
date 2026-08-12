import { getAllProperties } from "@/app/(Public)/_actions/getProperties";
import AdminPropertiesTable from "../../_components/AdminPropertiesTable";
import Pagination from "@/components/shared/pagination";
import PropertySearch from "@/components/shared/searchbar";


export default async function AllPropertiesAdminPage({
    searchParams,
}: {
    searchParams?: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) {

    const query = await searchParams;
    const result = await getAllProperties({ query });

    if (!result.success) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-red-500">{result.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div >

                    <h1 className="text-3xl font-bold">All Properties</h1>
                    <p className="text-muted-foreground">
                        Manage all properties in the system.
                    </p>
                </div>
                <div>

                    <PropertySearch paths={["/admin"]} />
                </div>
            </div>

            <AdminPropertiesTable properties={result.data ?? []} />

            <Pagination currentPage={Number(query?.page) || 1}
                totalPages={result.meta?.totalPages || 1} />
        </div>
    );
}