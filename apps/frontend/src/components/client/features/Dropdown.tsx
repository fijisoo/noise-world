"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Dropdown = ({
  selectedLanguage,
  items,
  linkComponent: LinkComponent,
}: any) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex bg-brandDark w-full items-center justify-center rounded-md border border-transparent px-6 py-2 text-xxs font-bold text-brandWhite no-underline hover:bg-brandDarkHover">
        {selectedLanguage}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map(({ name, href }: any) => {
              return (
                <Menu.Item key={`${name}-${href}`}>
                  {({ active }) => (
                    <LinkComponent
                      href={href}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xs"
                      )}
                    >
                      {name}
                    </LinkComponent>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
