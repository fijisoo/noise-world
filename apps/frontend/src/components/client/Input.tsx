"use client";
import { useState } from "react";

export const Input = ({ id, handleValue, type = "text" }: any) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.currentTarget.value);
    handleValue(id, e.currentTarget.value);
  };

  return (
    <input
      type={type}
      id={id}
      className="border-1 flex flex-grow rounded-md border border-black bg-brandWhite px-2 py-1 text-xxs outline-0"
      value={value}
      onChange={handleOnChange}
    />
  );
};
