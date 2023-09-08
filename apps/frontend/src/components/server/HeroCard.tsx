import Image from "next/image";

export const HeroCard = ({ src, alt, sideTextElement, description }: any) => {
  return (
    <div className="flex items-center relative">
      <div className="absolute left-0 -ml-2 w-full justify-center flex shrink-0 -translate-x-1/2 -rotate-90 flex-nowrap">
        {sideTextElement}
      </div>
      <div className="flip-card flex items-center justify-center ">
        <div className="flip-card-inner h-[240px] w-[152px] lg:h-[400px] lg:w-[240px]">
          <div className="flip-card-front absolute">
            <div className="relative h-[240px] w-[152px] items-center justify-center overflow-hidden rounded-3xl bg-blue-500 lg:h-[400px] lg:w-[240px]">
              <Image src={src} alt={alt} fill />
              <div className="absolute left-0 top-0 flex h-[240px] w-[152px] rounded-3xl border-2 lg:border-1 border-black lg:h-[400px] lg:w-[240px] opacity-20" />
            </div>
          </div>
          <div className="flip-card-back absolute">
            <div className="relative h-[240px] w-[152px] items-center justify-center overflow-hidden rounded-3xl bg-brandDark lg:h-[400px] lg:w-[240px]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
