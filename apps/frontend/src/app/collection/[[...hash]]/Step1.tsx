import React from "react";
import { useConnectWallet } from "../../../hooks/useConnectWallet";

export const Step1 = () => {
  const { connect } = useConnectWallet();
  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <button
          className="mt-3 flex w-fit flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
