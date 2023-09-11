import { useContractRead } from "wagmi";
import { abi } from "../../../contract/abi";
import { useEffect, useState } from "react";
import { ipfsParseLink } from "../utils/ipfsParseLink";
import axios from "axios";

export const useReadNftData = (contractAddress: any, nftName: any) => {
  const [url, setUrl] = useState("");

  const { data: contractNftData } = useContractRead({
    address: contractAddress as any,
    abi: abi,
    functionName: nftName && contractAddress ? "uri" : "",
    watch: true,
    args: [nftName] as any,
  });

  useEffect(() => {
    const getData = async () => {
      const link = ipfsParseLink(contractNftData as string) as any;
      const data = (await axios.get(link)) as any;
      setUrl(ipfsParseLink(data.data.image as any) as any);
    };

    if (contractNftData) {
      getData();
    }
  }, [contractNftData]);

  return url;
};
