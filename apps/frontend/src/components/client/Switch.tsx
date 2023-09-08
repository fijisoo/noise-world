import { useState } from "react";
import { Switch as SwitchHeadlessUI } from "@headlessui/react";

export const Switch = ({ handleValue, id }: any) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
    handleValue(id, checked);
  };

  return (
    <SwitchHeadlessUI
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? "bg-brandDark" : "bg-gray-400"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Agree privacy policy</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-brandWhite transition`}
      />
    </SwitchHeadlessUI>
  );
};
