"use client";

import { Switch } from "../client/Switch";
import { FormInput } from "../client/FormInput";
import { useContact } from "../../hooks/useContact";
import { Controller } from "react-hook-form";

export const ContactTemplate = () => {
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isSubmitted,
    isDirty,
    onSubmit,
    control,
  } = useContact();

  return (
    <div className="flex w-full justify-center bg-brandWhite md:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex max-w-[600px] flex-grow flex-col rounded-md border bg-none p-0 md:max-w-[650px] md:bg-brandWhite md:p-10"
      >
        <div className="flex flex-col">
          <h1 className="flex w-full justify-center text-xl font-bold">
            Contact us
          </h1>
          <p className="m-auto block w-full max-w-[400px] text-center text-base">
            Have a topic to discuss? Fill form below or email{" "}
            <a className="italic" href="mailto:contact@sync.art">
              contact@sync.art
            </a>
          </p>
        </div>
        <div className="mt-3 flex flex-col">
          <div className="flex w-full flex-col md:flex-row md:gap-3">
            <div className="flex flex-grow flex-col">
              <FormInput
                type="text"
                errorMessage={errors?.firstName?.message}
                registerFormElement={{ ...register("firstName") }}
                id="first_name"
                labelText="First name"
                required
              />
            </div>
            <div className="flex flex-grow flex-col">
              <FormInput
                type="text"
                errorMessage={errors?.secondName?.message}
                registerFormElement={{ ...register("secondName") }}
                id="second_name"
                labelText="Second name"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <FormInput
              type="text"
              errorMessage={errors?.company?.message}
              registerFormElement={{ ...register("company") }}
              id="company"
              labelText="Company /artist name (optional)"
            />
          </div>
          <div className="flex flex-col">
            <FormInput
              type="email"
              errorMessage={errors?.email?.message}
              registerFormElement={{ ...register("email") }}
              id="email"
              labelText="Email"
              required
            />
          </div>
          <div className="flex flex-col">
            <FormInput
              type="phone"
              errorMessage={errors?.phoneNumber?.message}
              registerFormElement={{ ...register("phoneNumber") }}
              id="phone_number"
              labelText="Phone number"
            />
          </div>
          <div className="flex flex-col">
            <FormInput
              type="textarea"
              errorMessage={errors?.message?.message}
              registerFormElement={{ ...register("message") }}
              id="message"
              labelText="Message"
              required
            />
          </div>
        </div>
        <div className="my-2 flex items-center text-xxs">
          {" "}
          <Controller
            control={control}
            name="privacyPolicy"
            render={({ field: { ref, ...field } }) => (
              <Switch id="privacy_policy" {...field} />
            )}
          />
          <p className="ml-2">
            By selecting this, you agree to our{" "}
            <a className="font-bold" href="/privacy-policy">
              privacy policy
            </a>
            .
          </p>
        </div>
        {!!errors?.privacyPolicy?.message && (
          <div className="flex text-xxs text-[red]">
            {errors?.privacyPolicy?.message}
          </div>
        )}
        <div className="my-2 flex items-center text-xxs">
          <button
            type="submit"
            className="flex w-full flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Please wait..." : "Lets talk"}
          </button>
        </div>
        {isSubmitted && (
          <div className="flex w-full">{`We'll contact you soon!`}</div>
        )}
      </form>
    </div>
  );
};
