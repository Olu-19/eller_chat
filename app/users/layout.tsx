import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";
import { User } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";

interface UsersLayoutProps {
  currentUser: User;
  children: React.ReactNode;
}

export default async function UsersLayout({
  children,
  currentUser
}: UsersLayoutProps) {
  const users = await getUsers();
  
  return (
    <Sidebar>
      <div className="h-[100vh]">
        <UserList
          currentUser={currentUser}
          items={users}
        />
        {children}
      </div>
    </Sidebar>
  );
}
