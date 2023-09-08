import Image from "next/image";

export const BlogCard = ({
  featuredImgSrc,
  altText,
  publishDate,
  title,
  description,
  slug,
}: any) => {
  return (
    <div className="flex w-[274px] w-full shrink-0 flex-col rounded-md border-2 border-black bg-brandWhite px-3 py-4">
      <div className="flex justify-between">
        <div className="relative top-[8px] mb-[15px] flex h-[90px] w-[170px] w-full overflow-visible">
          <div className="absolute flex h-[90px] w-[170px] bg-brandDark" />
          <Image
            src={featuredImgSrc}
            alt={altText}
            unoptimized={true}
            fill
            style={{ zIndex: 1, top: "-8px", left: "8px", right: 0, bottom: 0 }}
          />
        </div>
        <div className="flex text-xxs">{publishDate}</div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-hidden flex w-full truncate text-base font-bold">
          {title}
        </div>
        <div className="text-ellipsis overflow-hidden flex h-14 w-full text-xs">
          <span>{description}</span>
        </div>
        <div className="flex w-full justify-end">
          <a className="flex p-3" href={`/blog/${slug}`}>
            <Image src="/arrow.svg" alt="arrow" width={26} height={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
