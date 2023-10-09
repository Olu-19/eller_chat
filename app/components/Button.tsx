"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "reset" | "submit" | "button" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        `
            flex
            justify-center
            rounded-lg
            px-3
            py-3
            text-md
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
          `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900 dark:text-gray-200" : "text-white",
        danger &&
          "bg-rose-700 hover:bg-rose-800 focus-visible:outline-rose-800",
        !secondary &&
          !danger &&
          "bg-blue-700 hover:bg-blue-800 focus-visible:outline-blue-800"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
