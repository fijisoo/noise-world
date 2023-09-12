"use client";
import { useGetNftAttributes } from "../../../hooks/useGetNftAttributes";
import Image from "next/image";
import { ipfsParseLink } from "../../../utils/ipfsParseLink";

export default function Page({ params }: { params: { item: string } }) {
  const collectionName = params?.item[0];
  const nftName = params?.item[1];

  const data = useGetNftAttributes(collectionName, nftName);

  return (
    <div>
      {data?.imgUrl && (
        <div className="relative flex h-[100px] w-[100px]">
          <Image src={data.imgUrl} alt="coverImage" fill unoptimized />
        </div>
      )}
      {data?.mp3 && (
        <div className="flex flex-col">
          <p className="flex">MP3 demo for the next album</p>
          <a
            className="mt-3 flex w-fit flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover"
            href={ipfsParseLink(data.mp3)!}
          >
            MP3
          </a>
        </div>
      )}
    </div>
  );
}
