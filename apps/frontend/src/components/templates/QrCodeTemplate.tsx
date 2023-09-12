"use client";

export const QrCodeTemplate = ({ qrCode }: any) => {
  const [contractAddress, nftName, code] =
    decodeURIComponent(qrCode).split(";");

  const data = {
    contractAddress,
    nftName,
    code,
  };

  localStorage.clear();
  localStorage.setItem("nftData", JSON.stringify(data));

  return (
    <div className="flex flex-col bg-white">
      <p className="text-xxs">Redeem code: {code}</p>
      <p className="text-xxs">Contract Address: {contractAddress}</p>
      <p className="text-xxs">Nft name: {nftName}</p>

      <p className="flex flex-col">
        Go to sync.art/mint and copy paste the data.
      </p>

      <p className="flex flex-col text-xxs">
        If you have access to metamask please continue by clicking button below
        <a
          className="flex bg-brandDark px-2 py-1 text-white hover:bg-brandDarkHover"
          href="/mint"
          target="_blank"
        >
          Redirect
        </a>
      </p>
    </div>
  );
};
