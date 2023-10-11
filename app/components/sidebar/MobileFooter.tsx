"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "@/app/components/sidebar/MobileItem";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter = ({ currentUser }: MobileFooterProps) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentUser={currentUser}
      />
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-gray-200 dark:bg-gray-950 border-t-[1px] border-t-gray-400 dark:border-t-gray-800 lg:hidden">
        {routes.map((route) => (
          <MobileItem
            key={route.label}
            href={route.href}
            icon={route.icon}
            active={route.active}
            onClick={route.onClick}
          />
        ))}
        <Link
          href="#"
          onClick={() => setMenuOpen(true)}
          className="group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 dark:text-gray-700 hover:text-black dark:hover:text-gray-200"
        >
          <HiMenu className="w-6 h-6 shrink-0" />
          <span className="sr-only">Profile</span>
        </Link>
      </div>
    </>
  );
};

export default MobileFooter;
