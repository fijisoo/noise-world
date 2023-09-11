import { useEffect, useState } from "react";
import { useConnectWallet } from "./useConnectWallet";
import axios from "axios";

export const useGetCollectionParams = () => {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { address } = useConnectWallet();
  const [contractAddress, setContractAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [code, setCode] = useState("");

  const handleNftCode = (id: any, value: any) => {
    setCode(value);
    setErrorMessage("");
  };

  const handleNftName = (id: any, value: any) => {
    setNftName(value);
    setErrorMessage("");
  };

  const handleNftContractAddress = (id: any, value: any) => {
    setContractAddress(value);
    setErrorMessage("");
  };

  useEffect(() => {
    const rawLocalStorage = localStorage.getItem("nftData");

    if (rawLocalStorage) {
      const localStorageData = JSON.parse(rawLocalStorage);

      setLocalStorageData(localStorageData);
      setContractAddress(localStorageData?.contractAddress);
      setNftName(localStorageData?.nftName);
      setCode(localStorageData?.code);
    }
  }, []);

  const handleRedeemCode = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/redeemCode", {
          walletAddress: address,
          collectionName: contractAddress,
          qrCodeHashed: code,
        })
        .then((el: any) => {
          if (el?.data?.success) {
            setIsSuccess(true);
            setIsLoading(false);
          } else {
            setIsSuccess(false);
            setErrorMessage(el?.data?.message);
            setIsLoading(false);
          }
        });
    } catch (e: any) {
      setIsSuccess(false);
      setErrorMessage(e);
      setIsLoading(false);
    }
  };

  return {
    contractAddress,
    nftName,
    code,
    handleNftCode,
    handleNftName,
    handleNftContractAddress,
    handleRedeemCode,
    localStorageData,
    isSuccess,
    errorMessage,
    isLoading,
  };
};
