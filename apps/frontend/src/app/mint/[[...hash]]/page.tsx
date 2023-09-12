"use client";

import React, { useCallback, useState } from "react";
import { useConnectWallet } from "../../../hooks/useConnectWallet";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Icon } from "../../../components/server/Icon";
import { useBalance } from "wagmi";
import { useGetCollectionParams } from "../../../hooks/useGetCollectionParams";
import { useReadNftData } from "../../../hooks/useReadNftData";
import Image from "next/image";
import { useMintNft } from "../../../hooks/useMintNft";

export default function Page() {
  const { isConnected, address } = useConnectWallet();
  const { data: balance } = useBalance({
    address: address,
  });
  const [toggleForm, setToggleForm] = useState(false);
  const collectionParams = useGetCollectionParams();
  const nftImgData = useReadNftData(
    collectionParams.contractAddress,
    collectionParams.nftName
  );
  const {
    isLoading: isMintingLoading,
    isUserUpdateLoading,
    isSuccess: isMintingSuccess,
    isPrepareError,
    handleMint,
  } = useMintNft(
    collectionParams.contractAddress,
    collectionParams.nftName,
    address,
    nftImgData
  );

  const handleRedeemCode = collectionParams.handleRedeemCode;
  const isRedeemLoading = collectionParams.isLoading;
  const isRedeemSuccess = collectionParams.isSuccess;

  const renderComponent = useCallback(() => {
    if (!isConnected) {
      return <Step1 />;
    }

    if (isConnected && !isRedeemSuccess) {
      return (
        <Step2
          data={collectionParams.localStorageData}
          {...collectionParams}
          setToggleForm={setToggleForm}
          toggleForm={toggleForm}
          handleRedeemCode={handleRedeemCode}
          isLoading={isRedeemLoading}
        />
      );
    }
    return <></>;
  }, [handleRedeemCode, isRedeemSuccess, isRedeemLoading]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col">
        <h2 className="text-lg mb-2 flex font-semibold">
          To receive NFT you have to:
        </h2>
        <div className="flex max-w-sm list-inside list-disc flex-col space-y-1">
          <div className="flex w-full items-start">
            <Icon
              src={isConnected ? "/check.svg" : "/chevron.svg"}
              alt="chevron"
            />
            <p className="flex text-xs">
              have ethereum wallet connected to Metamask
            </p>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex">
              <Icon
                src={
                  isConnected &&
                  !!balance &&
                  !!balance.formatted &&
                  Number(balance.formatted) > 0.01
                    ? "/check.svg"
                    : "/chevron.svg"
                }
                alt="chevron"
              />
              <p className="flex text-xs">
                {`have enough ETH coins (since we're on sepolia testnet, use
                sepolia faucet to get free SepoliaETH)`}
              </p>
            </div>

            <p className="my-2 ml-4 flex text-xs">
              {isConnected
                ? !!balance &&
                  !!balance.formatted &&
                  Number(balance.formatted) > 0.01
                  ? `you have sufficient amount of: ${balance?.formatted}SepoliaETH 😎`
                  : `u have to have at least 0.1 SepoliaETH. Your balance is: ${balance?.formatted}`
                : ""}
            </p>
          </div>
          <div className="flex w-full items-start">
            <Icon
              src={
                isConnected && isRedeemSuccess ? "/check.svg" : "/chevron.svg"
              }
              alt="chevron"
            />
            <p className="flex text-xs">
              and the most important have redeem code from your QR code
            </p>
          </div>
        </div>
        {renderComponent()}
        {isConnected && isRedeemSuccess ? (
          <>
            <button
              className="mt-3 flex w-fit flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover"
              onClick={handleMint}
              disabled={
                isMintingSuccess ||
                isMintingLoading ||
                isUserUpdateLoading
              }
            >
              {isMintingLoading
                ? "Minting..."
                : isUserUpdateLoading
                ? "Assigning NFT..."
                : nftImgData
                ? "Mint!"
                : "Error loading nft data..."}
            </button>
          </>
        ) : (
          <></>
        )}
        <div className="text-red flex flex-col">
          <p className="test-xxs flex">{collectionParams.errorMessage}</p>
          {isPrepareError && (
            <p className="text-xxs flex">
              There was a problem preparing contract info
            </p>
          )}
        </div>
      </div>
      <div className="flex">
        {nftImgData && (
          <div className="relative flex h-[350px] w-[350px]">
            <Image
              src={nftImgData}
              alt="NFT Image"
              fill
              unoptimized
              style={{
                filter: !isRedeemSuccess ? `blur(10px)` : "",
                transition: "all 0.3s ease-in",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
