import { HeroCardSection } from "../server/HeroCardSection";
import { HeroText } from "../server/HeroText";
import { HeroAnnouncement } from "../client/HeroAnnouncement/HeroAnnouncement";

export const LandingTemplate = () => {
  // const x = {
  //     contractHash: "0x12b05402224d01bea5bab5810a1177fe2daa7015",
  //     nftName: "0",
  //     uniqueID: "",
  // };

  // const stringified = JSON.stringify(x);

  // const data = encryptData(stringified)

  // const xxx = 'U2FsdGVkX1/noM/OXkkaMq3JE1/m616Dwd6L6rTouX48Ip6JiRnMKJdPYcOdZnAjcBJaulq3JFTlWN2JTd2rHnMhARRfZEg//UxV6kAX3EsQT5SMcsjile7F1fTNXOY0OcDTxpk0FWsXldhWK4gBzg==';

  // console.log('data', data)

  // const decrypted = decryptData(data);

  // console.log('decrypted', decrypted)
  return (
    <div className="relative isolate flex flex-col items-start px-6 pt-14 md:flex-row lg:px-8">
      <div className="z-20 shrink-0">
        <div className="min-h-6 flex h-6">
          <HeroAnnouncement />
        </div>
        <HeroText />
      </div>
      <div className="noScrollbar relative top-0 z-10 m-0 p-0 pb-16 pt-16 md:-left-32 md:top-32 md:-ml-[300px] lg:-right-16 lg:left-20 lg:top-24 lg:-ml-[700px] lg:h-[650px] lg:w-[1460px] lg:overflow-auto lg:pl-[400px] lg:pr-0">
        <HeroCardSection />
      </div>
    </div>
  );
};
