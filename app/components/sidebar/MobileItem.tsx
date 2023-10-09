"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        dark:text-gray-700
        hover:text-black
        dark:hover:text-gray-200
      `,
      active && "text-black dark:text-white bg-gray-400 dark:bg-gray-800 rounded-2xl"
      )}
    >
      <Icon className="w-8 h-8" />
    </Link>
  );
};

export default MobileItem;
