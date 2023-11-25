// import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export const UserAvatar = () => {
//   const { user } = useUser();
const user = {firstName: "John", lastName: "Doe"}

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};