import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { UserProfile } from "./profile-types"
import { IUser } from "@/lib/types";


interface Props {
  user: IUser
}


export default function ProfileHeader({ user }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

      <div className="flex items-center gap-5">

        <Avatar className="h-24 w-24">
          <AvatarImage src={user.profileImage} />

          <AvatarFallback className="text-2xl">
            {user.name
              .split(" ")
              .map(name => name[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>

        </Avatar>


        <div>
          <h1 className="text-3xl font-bold">
            {user.name}
          </h1>

          <Badge className="mt-2">
            {user.role}
          </Badge>


          <p className="text-sm text-muted-foreground mt-2">
            {user.isActive}
          </p>

        </div>

      </div>


      <Button className="rounded-full">
        <Edit className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>

    </div>
  )
}