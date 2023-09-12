import { useContractRead } from "wagmi";
import { abi } from "../../../contract/abi";
import { useReadNftData } from "./useReadNftData";

export const useGetNftAttributes = (collectionName: any, nftName: any) => {
  const imgUrl = useReadNftData(collectionName, nftName);
  const { data: attributes } = useContractRead({
    address: collectionName as any,
    abi: abi,
    functionName: "getNftAttributes",
    watch: true,
    args: [nftName] as any,
  });

  return { imgUrl, ...(!!attributes ? (attributes as any) : {}) };
};
