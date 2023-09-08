import { HeroCard } from "./HeroCard";

export const HeroCardSection = () => {
  return (
    <div className="relative flex flex-col flex-nowrap items-start gap-8 md:flex-row lg:-mr-12">
      <div className="relative flex lg:top-[130px]">
        <HeroCard
          src="/concert.png"
          alt="concert"
          description={
            <p className="block px-3 py-4 text-xxs text-white">
              We are looking for artists who want to collaborate with us. We
              offer wide spectre of possibilities which we gladly present you.
              Send us a mail on
              <a href="mailto:contact@sync.art">contact@sync.art</a> and we’ll
              respond you with our brochure.
            </p>
          }
          sideTextElement={
            <p className="pointer-events-none flex shrink-0 flex-nowrap text-xxs lg:text-xs">
              PICK <b className="mx-1">CONCERT </b>WITH
              <b className="mx-1">SYNC.ART</b> PARTNERSHIP
            </p>
          }
        />
      </div>
      <div className="relative flex md:top-[60px] lg:left-0 lg:top-0">
        <HeroCard
          src="/qr-code.png"
          alt="QR code"
          description={
            <p className="flex flex-col px-3 py-4 text-xxs text-white">
              On each concert you can get free QR code (stamp). It’s important
              to have in mind that there are no replacements so - you lost QR
              code, no possibility to get new one.
            </p>
          }
          sideTextElement={
            <p className="pointer-events-none flex shrink-0 flex-nowrap text-xxs lg:text-xs">
              GRAB <b className="mx-1">QR CODE</b> ON AN ENTRANCE
            </p>
          }
        />
      </div>
      <div className="lg:top-[228px]lg:left-0 relative flex md:top-[140px]">
        <HeroCard
          src="/computer-girl.png"
          alt="Use QR code"
          description={
            <p className="flex flex-col px-3 py-4 text-xxs text-white">
              You can easily scan your QR code with your smartphone camera and
              receive unique ID which after the login process you able to put on
              a page collection.sync.art. This will allow you to mint NFT.
            </p>
          }
          sideTextElement={
            <p className="pointer-events-none flex shrink-0 flex-nowrap text-xxs lg:text-xs">
              <b className="mr-1">SCAN</b> QR CODE AND COLLECT NFT
            </p>
          }
        />
      </div>
      <div className="relative flex md:-left-[368px] md:top-[328px] lg:left-0 lg:top-[46px]">
        <HeroCard
          src="/singing-guy.png"
          alt="Premium content"
          description={
            <p className="flex flex-col px-3 py-4 text-xxs text-white">
              After the mint you can enjoy souvenirs and you have your badge to
              shine. You can also resale it to others with all the content so
              keep in mind that in that scenario you lost all of the rights to
              original and copies of the content (so whole NFT).
            </p>
          }
          sideTextElement={
            <p className="pointer-events-none flex shrink-0 flex-nowrap text-xxs lg:text-xs">
              <b className="mr-1">ENJOY</b> PREMIUM CONTENT
            </p>
          }
        />
      </div>
    </div>
  );
};
