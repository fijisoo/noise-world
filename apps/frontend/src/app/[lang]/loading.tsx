import Image from "next/image";
import * as React from "react";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 pb-24 pt-6 md:p-24">
      <div className="z-11 mb-10 w-full items-start justify-between font-mono text-sm lg:mb-0 lg:flex">
        <div className="w-auto items-center justify-start gap-3 lg:flex">
          <div>
            <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-3 py-2 text-base font-medium text-black no-underline hover:bg-white">
              LOADING
            </button>
          </div>
          <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-3 py-2 text-base font-medium text-black no-underline hover:bg-white">
            Loading
          </button>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none relative bottom-5 flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://sync.art"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/syncArt.svg"
              alt="SyncArt Logo"
              className="ease-out-in invert duration-700 hover:invert hover:transition xl:invert-0"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="markdown-body z-5 pb-14 lg:pb-0">LOADING</div>
    </main>
  );
}
