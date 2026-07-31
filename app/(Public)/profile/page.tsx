import {
    Card,
    CardContent
} from "@/components/ui/card"
import ProfileHeader from "../_components/profile-header";
import ProfileInfoCard from "../_components/profile-info-card";
import AccountOverviewCard from "../_components/account-overview-card";
import { IUser } from "@/lib/types";
import { getProfile } from "@/service/getMe";



export default async function ProfilePage() {


    const user: IUser = await getProfile()



    return (

        <div className="container mx-auto max-w-5xl px-4 py-10">


            <Card>

                <CardContent className="p-6">

                    <ProfileHeader user={user} />

                </CardContent>

            </Card>



            <div className="grid md:grid-cols-2 gap-6 mt-6">


                <ProfileInfoCard user={user} />


                <AccountOverviewCard user={user} />


            </div>


        </div>

    )

}