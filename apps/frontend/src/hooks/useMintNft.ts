import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi } from "../../../contract/abi";
import { sepolia } from "wagmi/chains";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export const useMintNft = (
  contractAddress: any,
  tokenName: any,
  address: any,
  nftImgData: any
) => {
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [isUserUpdateLoading, setIsUserUpdateLoading] = useState(false);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: [parseInt(tokenName), parseInt("1")],
    enabled: Boolean(tokenName),
    chainId: sepolia.id,
    value: parseEther("0.01"),
    onError(error) {
      console.log("Error", error);
    },
  });

  const { data, write } = useContractWrite(config as any);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsUserUpdateLoading(true);
      const assignNftToWallet = async () => {
        try {
          await axios
            .post("api/assignNftToWallet", {
              minterWallet: address,
              collectionName: contractAddress,
              nftName: tokenName,
              imgUrl: nftImgData,
            })
            .then((data) => {
              setIsUserUpdated(true);
            });
        } catch (e) {
          console.error("COULDNT UPDATE ACCOUNT AFTER MINT", e);
        }
      };
      assignNftToWallet();
    }
  }, [isSuccess, tokenName, contractAddress, nftImgData, address]);

  useEffect(() => {
    if (isUserUpdated) redirect("/collection?success=true");
  }, [isUserUpdated]);


  const handleMint = () => {
    if (write) write();
  };

  return {
    isLoading,
    isUserUpdateLoading,
    isSuccess,
    prepareError,
    isPrepareError,
    handleMint,
  };
};
