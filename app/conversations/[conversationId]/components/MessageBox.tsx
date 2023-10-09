"use client";

import { useSession } from "next-auth/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ImageModal from "@/app/conversations/[conversationId]/components/ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-6", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-blue-700 text-white" : "bg-gray-300 text-black",
    data.image ? "rounded-lg p-0" : "rounded-full p-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-500">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setIsModalOpen(true)}
              src={data.image}
              alt="Image"
              width="288"
              height="288"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
