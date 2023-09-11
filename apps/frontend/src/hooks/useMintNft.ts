import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi } from "../../../contract/abi";
import { sepolia } from "wagmi/chains";
import { parseEther } from "viem";

export const useMintNft = (contractAddress: any, tokenName: any) => {
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

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMint = () => {
    if (write) write();
  };

  return {
    isLoading,
    isSuccess,
    prepareError,
    isPrepareError,
    handleMint,
  };
};
