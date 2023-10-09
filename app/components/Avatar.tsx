"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "@/app/hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar = ({ user }: AvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden w-9 h-9 md:w-11 md:h-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Profile_Image"
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-600 ring-2 ring-gray-200 dark:ring-gray-950 top-0 right-0 w-2 h-2 md:w-3 md:h-3" />
      )}
    </div>
  );
};

export default Avatar;
