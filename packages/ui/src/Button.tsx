import * as React from "react";

export const Button = ({ text, href, withArrow }: any) => {
  return (
    <div className="rounded-md">
      <a href={href}>
        <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-base font-medium text-black no-underline hover:bg-gray-300 md:px-3 md:py-2 md:text-lg md:leading-6">
          {text}
          {withArrow && (
            <span className="ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
              →
            </span>
          )}
        </div>
      </a>
    </div>
  );
};
