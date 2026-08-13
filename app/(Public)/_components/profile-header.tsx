import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/lib/types";
import EditProfileDialog from "./EditProfileDialog";

interface Props {
  user: IUser;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

      <div className="flex items-center gap-5">

        <Avatar className="h-24 w-24">
          <AvatarImage
            src={user?.profileImage || ""}
            alt={user?.name || ""}
          />

          <AvatarFallback className="text-2xl">
            {user?.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-bold">
            {user?.name}
          </h1>

          <Badge className="mt-2">
            {user?.role}
          </Badge>

          <p className="text-sm text-muted-foreground mt-2">
            {user?.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <EditProfileDialog user={user} />

    </div>
  );
}