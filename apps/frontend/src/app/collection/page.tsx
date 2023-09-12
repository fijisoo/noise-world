"use client";

import { useEffect, useState } from "react";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const { connect, address } = useConnectWallet();
  const [nfts, setNfts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      connect();
      setIsLoading(true);
    } catch (e) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    if (address) {
      const getNfts = async () => {
        try {
          const data = await axios.get(
            `/api/getCollection?walletAddress=${address}`
          );
          const nfts = data?.data?.data?.[0]?.nfts;
          setNfts(nfts);
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
      };
      getNfts();
    }
  }, [address]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 flex">Your collection:</h1>
      <div className="flex gap-3">
        {isLoading && <div>LOADING...</div>}
        {!!nfts ? (
          (nfts as any).map((el: any, index: any) => {
            return (
              <a
                key={`el-${index}-${el.collectionName}`}
                className="relative flex h-[100px] w-[100px]"
                href={`/collection/${el.collectionName}/${el.nftName}`}
              >
                <Image
                  src={el.imgUrl}
                  alt={"nft"}
                  fill
                  unoptimized
                  blurDataURL={"/concert.png"}
                />
              </a>
            );
          })
        ) : (
          <></>
        )}

        {isError && <div>Unexpected error occured</div>}
      </div>
    </div>
  );
}
