import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import {
  Mail,
  Phone,
  MapPin
} from "lucide-react"

import { UserProfile } from "./profile-types"
import { IUser } from "@/lib/types";



export default function ProfileInfoCard({
  user
}: {
  user: IUser
}) {

  return (

    <Card>

      <CardHeader>
        <CardTitle>
          Personal Information
        </CardTitle>
      </CardHeader>


      <CardContent className="space-y-5">


        <div className="flex gap-3 items-center">

          <Mail className="h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>

          </div>

        </div>


        <Separator />


        <div className="flex gap-3 items-center">

          <Phone className="h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">
              Phone
            </p>

            <p className="font-medium">
              {user.phone || "Not added"}
            </p>

          </div>

        </div>



        <Separator />


        <div className="flex gap-3 items-center">

          <MapPin className="h-5 w-5 text-muted-foreground" />

          <div>

            <p className="text-sm text-muted-foreground">
              Location
            </p>

            <p className="font-medium">
              {user.address || "Not added"}
            </p>


          </div>

        </div>


      </CardContent>

    </Card>

  )

}