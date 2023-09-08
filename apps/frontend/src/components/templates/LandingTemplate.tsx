import { HeroCardSection } from "../server/HeroCardSection";
import { HeroText } from "../server/HeroText";
import { HeroAnnouncement } from "../client/HeroAnnouncement/HeroAnnouncement";

export const LandingTemplate = () => {
  return (
    <div className="relative isolate flex flex-col items-start px-6 pt-14 md:flex-row lg:px-8">
      <div className="z-20 shrink-0">
        <HeroAnnouncement />
        <HeroText />
      </div>
      <div className="noScrollbar relative top-0 z-10 m-0 p-0 pt-16 md:top-32 md:-ml-[300px] lg:-right-16 lg:top-24 lg:-ml-[700px] lg:h-[650px] lg:overflow-auto lg:pl-[400px] lg:pr-52">
        <HeroCardSection />
      </div>
    </div>
  );
};
