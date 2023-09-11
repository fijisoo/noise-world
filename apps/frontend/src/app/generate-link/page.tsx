"use client";

import { Input } from "../../components/client/Input";
import { useEffect, useState } from "react";
import { nftDataToUrl } from "../../utils/nftDataToUrl";

export default function Page() {
  const [objData, setObjData] = useState({});

  const [contractAddress, setContractAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftId, setNftId] = useState("");

  const handleChangeNftId = (_: any, value: any) => {
    setNftId(value);
  };

  const handleChangeNftName = (_: any, value: any) => {
    setNftName(value);
  };

  const handleChangeContractAddress = (_: any, value: any) => {
    setContractAddress(value);
  };

  useEffect(() => {
    setObjData({
      nftId,
      nftName,
      contractAddress,
    });
  }, [nftId, nftName, contractAddress]);

  return (
    <div className="flex flex-col">
      contact address:{" "}
      <Input id="test" handleValue={handleChangeContractAddress} />
      nft name: <Input id="test" handleValue={handleChangeNftName} />
      nft id (unique code): <Input id="test" handleValue={handleChangeNftId} />
      link:{" "}
      <a href={nftDataToUrl(objData, "localhost:3020")} target="_blank">
        {nftDataToUrl(objData, "localhost:3020")}
      </a>
    </div>
  );
}
