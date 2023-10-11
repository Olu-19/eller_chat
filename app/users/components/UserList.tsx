"use client";

import { User } from "@prisma/client";
import UserBox from "@/app/users/components/UserBox";

interface UserListProps {
  items: User[];
}

const UserList = ({ items }: UserListProps) => {
  return (
    <aside className="fixed inset-y-0 pb:20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-r-gray-300 dark:border-r-gray-800 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-200 py-4">
            People
          </div>
        </div>
        {items.map((item) => (
            <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
