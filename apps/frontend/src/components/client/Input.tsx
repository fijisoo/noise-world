"use client";
import { useState } from "react";

export const Input = (
  {
    id,
    handleValue,
    type = "text",
    defaultVal = "",
    name,
    registerFormElement,
    required,
  }: any,
  required1: any = required
) => {
  const [value, setValue] = useState(defaultVal || "");

  const handleOnChange = (e: any) => {
    setValue(e.currentTarget.value);
    handleValue(id, e.currentTarget.value);
  };

  if (registerFormElement) {
    return (
      <input
        type={type}
        id={id}
        required={required1}
        className="border-1 flex max-h-[25px] flex-grow rounded-md border border-black bg-brandWhite px-2 py-1 text-xxs outline-0"
        {...registerFormElement}
      />
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      className="border-1 flex flex-grow rounded-md border border-black bg-brandWhite px-2 py-1 text-xxs outline-0"
      value={value as string}
      onChange={handleOnChange}
    />
  );
};
