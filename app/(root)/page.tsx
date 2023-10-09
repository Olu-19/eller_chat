import { ModeToggle } from "@/components/mode-toggler";
import Image from "next/image";
import AuthForm from "@/app/(root)/components/AuthForm";

const Page = () => {
  return (
    <div className="flex min-h-[100vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/eller-logo.svg"
          alt="Logo"
          width="92"
          height="92"
          className="mx-auto"
        />
        <h2 className="mt-12 text-center text-4xl tracking-tight font-bold text-gray-900 dark:text-gray-200">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
      {/* <ModeToggle /> */}
    </div>
  );
};

export default Page;
