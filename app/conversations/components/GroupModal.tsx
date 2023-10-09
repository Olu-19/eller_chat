"use client";

import { User, Conversation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";
import TextArea from "@/app/components/inputs/TextArea";

interface GroupModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
  conversation: Conversation[];
}

const GroupModal = ({ isOpen, onClose, users, conversation }: GroupModalProps) => {
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
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An error occurred while creating group.",
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
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Create a chat with two or more people.
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
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupModal;
