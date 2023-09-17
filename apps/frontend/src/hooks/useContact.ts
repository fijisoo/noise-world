import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

export const useContact = () => {
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [httpError, setHttpError] = useState("");

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const preContactSchema = z.object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(2, "First name is too short"),
    secondName: z.string({ required_error: "Second name is required" }),
    company: z.string({ required_error: "Name is required" }),
    phoneNumber: z
      .string({ required_error: "Name is required" })
      .optional()
      .refine((value) => (value ? phoneRegex.test(value) : true), {
        message: "Invalid phone number!",
      }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "The email is invalid." }),
    message: z
      .string({ required_error: "Message is required" })
      .min(20, "Please provide longer message"),
    privacyPolicy: z.boolean().refine((value) => value, {
      message: "You must agree privacy policy",
    }),
  });

  const contactSchema = preContactSchema.required({
    email: true,
    firstName: true,
    message: true,
    privacyPolicy: true,
  });

  type ContactType = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ContactType>({
    mode: "onTouched",
    resolver: zodResolver(contactSchema as any), // Configuration the validation with the zod schema.
    defaultValues: {
      firstName: "",
      secondName: "",
      phoneNumber: "",
      company: "",
      email: "",
      message: "",
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: any, e: any) => {
    try {
      await axios.post("api/mailSender", data).then((data: any) => {
        if (!!data?.data?.success) {
          setIsSent(true);
          setIsSending(false);
          e.target.reset();
          reset();
        } else {
          setIsSent(false);
          setHttpError(
            "Apologies for inconvenience we couldnt send your message. Please send us email on contact@sync.art"
          );
          setIsSending(false);
        }
      });
    } catch (e) {
      setIsSent(false);
      setHttpError(
        "Apologies for inconvenience we couldnt send your message. Please send us email on contact@sync.art"
      );
      setIsSending(false);
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    isSubmitting,
    isSubmitted,
    isDirty,
    isValid,
    isSent,
    httpError,
    isSending,
    onSubmit,
  };
};
