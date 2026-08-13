import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"


import { IUser } from "@/lib/types";



export default function AccountOverviewCard({
    user
}: {
    user: IUser
}) {


    return (

        <Card>

            <CardHeader>
                <CardTitle>
                    Account Overview
                </CardTitle>
            </CardHeader>


            <CardContent className="space-y-5">

                <div>
                    <p className="text-sm text-muted-foreground">
                        Account Type
                    </p>

                    <p className="font-medium">
                        {
                            user?.role === "LANDLORD"
                                ? "Property Owner"
                                : "Tenant"
                        }
                    </p>

                </div>
                <Separator />


                <div>

                    <p className="text-sm text-muted-foreground">
                        Properties Listed
                    </p>

                    <p className="text-2xl font-bold">
                        {user?.properties?.length || 0}
                    </p>

                </div>


                <Separator />


                <div>

                    {/* <p className="text-sm text-muted-foreground">
Reviews
</p>

{/* <p className="text-2xl font-bold">
{user.reviewsCount || 0}
</p> */}

                </div>


            </CardContent>


        </Card>

    )

}