"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useToast } from "@/components/ui/use-toast";
import AuthSocialButton from "@/app/(root)/components/AuthSocialButton";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const { toast } = useToast();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setIsLoading(true);

      if (variant === "REGISTER") {
        axios
          .post("/api/register", data)
          .then(() => signIn("credentials", data))
          .catch(() =>
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "An error occurred while trying to submit form.",
            })
          )
          .finally(() => setIsLoading(false));
      }

      if (variant === "LOGIN") {
        signIn("credentials", {
          ...data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "An error occurred while trying to sign in.",
              });
            }

            if (callback?.ok && !callback?.error) {
              toast({
                title: "Signed in successfully.",
                description: "You signed in successfully!",
              });
              router.push("/users");
            }
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error: any) {
      console.log(`Failed to submit form: ${error.message}`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while trying to submit form.",
      });
    }
  };

  const socialAction = (action: string) => {
    try {
      setIsLoading(true);

      signIn(action, { redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "An error occurred while trying to sign in.",
            });
          }

          if (callback?.ok && !callback?.error) {
            toast({
              title: "Signed in successfully.",
              description: "You signed in successfully!",
            });
          }
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log(`Failed to perform action: ${error.message}`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while trying to submit form.",
      });
    }
  };

  return (
    <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gray-300 dark:bg-gray-900 px-4 py-8 shadow-xl sm:rounded-xl sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              errors={errors}
              id="name"
              label="Name"
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            errors={errors}
            id="email"
            type="email"
            label="Email"
            register={register}
            disabled={isLoading}
          />
          <Input
            errors={errors}
            id="password"
            type="password"
            label="Password"
            register={register}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-400 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-300 dark:bg-gray-900 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              text="Github"
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              text="Google"
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 dark:text-gray-400">
          <div>
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          <div
            className="underline text-blue-700 cursor-pointer"
            onClick={toggleVariant}
          >
            {variant === "LOGIN" ? "Join now" : "Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
