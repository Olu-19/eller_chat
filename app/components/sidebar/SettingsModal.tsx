"use client";

import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import Image from "next/image";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Button from "../Button";
import { ModeToggle } from "@/components/mode-toggler";
import TextArea from "../inputs/TextArea";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
      bio: currentUser?.bio,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An error occurred while trying to submit form.",
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-500 pb-12">
            <h2 className="text-[18px] font-semibold leading-7 text-gray-900 dark:text-gray-200">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <TextArea
                disabled={isLoading}
                placeholder="Write something about yourself"
                label="Bio"
                id="bio"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    width="48"
                    height="48"
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="tp78ofwm"
                  >
                    <Button disabled={isLoading} type="button" secondary>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
              <div>
                <h2 className="text-[18px] font-semibold leading-7 mb-3 text-gray-900 dark:text-gray-200">
                  Theme
                </h2>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
