import { allUser } from "@/app/(Admin)/_actions/adminActions";
import UsersTable from "../../_components/UsersTable";


export default async function AdminUsersPage() {
    const result = await allUser();

    if (!result.success) {
        return (
            <div className="p-8 text-center text-red-500">
                {result.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Users</h1>
                <p className="text-muted-foreground">
                    Manage all registered users.
                </p>
            </div>

            <UsersTable users={result.data ?? []} />
        </div>
    );
}