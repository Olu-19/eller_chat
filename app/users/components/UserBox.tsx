"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Avatar from "@/app/components/Avatar";
import { ModeToggle } from "@/components/mode-toggler";
import LoadingModal from "@/app/components/LoadingModal";

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-gray-200 dark:bg-gray-950 p-3 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex items-center justify-between mb-1">
              <p className="text-md font-medium text-gray-900 dark:text-gray-200">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
