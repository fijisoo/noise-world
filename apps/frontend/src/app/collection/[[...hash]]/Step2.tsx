import { Input } from "../../../components/client/Input";
import React, { useEffect } from "react";

export const Step2 = ({
  code,
  contractAddress,
  nftName,
  data,
  handleNftCode,
  handleNftContractAddress,
  handleNftName,
  setToggleForm,
  toggleForm,
  nftImgData,
  handleRedeemCode,
  isLoading,
}: any) => {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  // const x = {
  //   code,
  //   contractAddress,
  //   nftName,
  // };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {(!data || toggleForm) && (
          <div className="flex flex-col">
            <div>
              <p className="text-xs">Write your redeem code: </p>
              <Input
                id="nftCode"
                handleValue={handleNftCode}
                defaultVal={code}
              />
            </div>
            <div>
              <p className="text-xs">Write Contract Address:</p>
              <Input
                id="contractAddress"
                handleValue={handleNftContractAddress}
                defaultVal={contractAddress}
              />
            </div>
            <div>
              <p className="text-xs">Write nft Name:</p>
              <Input
                id="nftName"
                handleValue={handleNftName}
                defaultVal={nftName}
              />
            </div>
          </div>
        )}

        {!nftImgData && data && (
          <div className="flex">
            couldnt load nft data, please provide proper data
          </div>
        )}
        {!toggleForm && data && (
          <button
            className="flex"
            onClick={() => {
              setToggleForm((prev: any) => !prev);
            }}
          >
            Let me fill it by myself
          </button>
        )}
        <button
          className="mt-3 flex w-fit flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover"
          onClick={handleRedeemCode}
        >
          {isLoading ? "Please wait..." : "Redeem code"}
        </button>
      </div>
    </div>
  );
};
