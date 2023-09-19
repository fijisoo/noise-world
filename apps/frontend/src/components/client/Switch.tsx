import { Switch as SwitchHeadlessUI } from "@headlessui/react";

export const Switch = ({ value, id, onChange }: any) => {

  return (
    <SwitchHeadlessUI
      checked={value}
      id={id}
      onChange={onChange}
      className={`${
        value ? "bg-brandDark" : "bg-gray-400"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Agree privacy policy</span>
      <span
        className={`${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-brandWhite transition`}
      />
    </SwitchHeadlessUI>
  );
};
