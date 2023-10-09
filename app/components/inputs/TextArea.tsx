"use client";

import clsx from "clsx";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const TextArea = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label
        className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.8
            text-black
            dark:text-white
            shadow-sm
            bg-gray-200
            dark:bg-gray-800
            ring-2
            ring-inset
            ring-gray-400
            dark:ring-gray-600
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-blue-700
            sm:text-sm
            sm:leading-6`,
            errors[0] && "focus:ring-rose-700",
            disabled && "opacity-50 cursor-default"
            )}
        />
      </div>
    </div>
  );
};

export default TextArea;
