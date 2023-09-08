import { HeroCardSection } from "../server/HeroCardSection";
import { HeroText } from "../server/HeroText";

export const LandingTemplate = () => {
  return (
    <div className="relative isolate flex flex-col items-start px-6 pt-14 md:flex-row lg:px-8">
      <div className="z-20 shrink-0">
        <HeroText />
      </div>
      <div className="noScrollbar relative top-0 z-10 m-0 p-0 pt-16 md:top-32 md:-ml-[300px] lg:-right-16 lg:top-16 lg:-ml-[700px] lg:h-[600px] lg:overflow-auto lg:pl-[400px] lg:pr-52">
        <HeroCardSection />
      </div>
    </div>
  );
};
