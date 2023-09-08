"use client";
import { useState } from "react";

export const Textarea = ({ name, id, placeholder, handleValue }: any) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.currentTarget.value);
    handleValue(id, e.currentTarget.value);
  };
  return (
    <textarea
      className="border-1 flex flex-grow rounded-md border border-black bg-brandWhite px-2 py-1 text-xxs outline-0"
      name={name}
      id={id}
      onChange={handleOnChange}
      placeholder={placeholder}
      cols={30}
      rows={10}
      value={value}
    />
  );
};