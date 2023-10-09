"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/app/hooks/useConversation";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { Button } from "@/components/ui/button";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div className="px-4 py-4 bg-gray-200 dark:bg-gray-950 border-t border-t-gray-300 dark:border-t-gray-800 flex items-center gap-2 lg:gap-4 w-full">
      <div className="flex justify-center items-center py-2 px-2 bg-gray-300 dark:bg-gray-800 w-full rounded-full">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="tp78ofwm"
        >
          <HiPhoto size={30} className="text-blue-700" />
        </CldUploadButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message"
          />
          <Button
            type="submit"
            className="rounded-full py-2 bg-blue-700 hover:bg-blue-800 cursor-pointer transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
