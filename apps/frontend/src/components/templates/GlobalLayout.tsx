"use client";

import { NavItem } from "../server/NavItem";
import { useState } from "react";
import Image from "next/image";

export const GlobalLayout = ({ children }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const companyName = "syncArt";

  return (
    <div className="flex h-screen min-h-screen flex-col justify-start overflow-x-hidden bg-[#F3F3F3] font-mono">
      <div className="fixed right-0 top-0 z-0 flex min-h-screen min-w-full">
        <Image
          src="/background.svg"
          alt="SyncArt Logo background"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minWidth: "1512px",
            minHeight: "982px",
            objectPosition: "right",
            objectFit: "cover",
          }}
          width="2512"
          height="1982"
          priority
        />
      </div>
      <header className="relative inset-x-0 top-3 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-11"
          aria-label="Global"
        >
          <div className="flex items-center justify-start">
            <div className="flex lg:flex">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">{companyName}</span>
                <div className="relative h-[55px] max-h-[55px] w-[100px] max-w-[100px]">
                  {/*<Logo />*/}
                  <Image src={"/syncArt2.svg"} alt={"Logo"} fill />
                </div>
              </a>
            </div>
            <div className="ml-[20px] hidden lg:flex lg:gap-x-12">
              <NavItem href="/en/manifesto" text="Manifesto" />
              <NavItem href="/blog" text="Blog" />
              <NavItem href="#" text="Live Stamps" />
              <NavItem href="/contact" text="Contact" />
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Image
              src="/syncArt3.svg"
              alt="SyncArt Logo"
              className="ease-out-in duration-700 hover:transition xl:invert-0"
              width={100}
              height={24}
              priority
            />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-9 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">{companyName}</span>
                  <Image
                    src="/syncArt3.svg"
                    alt="SyncArt Logo"
                    className="ease-out-in duration-700 hover:transition xl:invert-0"
                    width={100}
                    height={24}
                    priority
                  />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                  }}
                  className="-m-2.5 mt-2.5 flex rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <NavItem isMobile href="/en/manifesto" text="Manifesto" />
                    <NavItem isMobile href="/blog" text="Blog" />
                    <NavItem isMobile href="#" text="Live Stamps" />
                    <NavItem isMobile href="/contact" text="Contact" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <main lang="en" className="relative z-10 flex items-start p-6 lg:px-11">
        {children}
      </main>
      <footer className="relative flex w-full flex-grow items-end justify-center self-end md:justify-end">
        <p className="mr-0 flex text-xxs font-semibold md:mr-[77px]">
          ALL RIGHTS RESERVED © 2023 syncArt
        </p>
      </footer>
    </div>
  );
};
