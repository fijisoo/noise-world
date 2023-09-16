import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const useContact = () => {
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
      .regex(phoneRegex, "Invalid phone number!"),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "The email is invalid." }),
    message: z
      .string({ required_error: "Message is required" })
      .min(20, "Please provide longer message"),
    privacyPolicy: z.boolean().refine((value) => !!value, {
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
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ContactType>({
    mode: "onChange",
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

  const onSubmit = (data: any) => {
    axios.post("/api/mailSender", {
      ...data,
    });
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    isSubmitting,
    isSubmitted,
    isDirty,
    onSubmit,
  };
};
