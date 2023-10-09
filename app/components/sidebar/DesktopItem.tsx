"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
                group
                flex
                gap-x-3
                rounded-md
                p-3
                leading-6
                font-semibold
                text-gray-500
                dark:text-gray-700
                hover:text-black
                dark:hover:text-gray-200
                hover:bg-gray-300
                dark:hover:bg-gray-900

              `,
          active && "text-gray-950 dark:text-white bg-gray-400 dark:bg-gray-800"
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
