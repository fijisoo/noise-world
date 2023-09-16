"use client";

import { Label } from "./Label";
import { Input } from "./Input";

export const FormInput = ({
  id,
  labelText,
  type,
  errorMessage,
  registerFormElement,
  required,
}: any) => {
  return (
    <>
      <Label text={labelText} id={id} />
      <Input
        id={id}
        registerFormElement={registerFormElement}
        type={type}
        required={required}
      />
      {errorMessage && <div className="flex text-xxs text-[red]">{errorMessage}</div>}
    </>
  );
};
