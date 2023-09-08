import Image from "next/image";
import { formatData } from "../../../../utils/strapiDataFormat";

export const BlogCard = ({
  featuredImage,
  publishedAt: dataISO8601,
  title,
  description,
  slug,
  id,
}: any) => {
  const { alternativeText, url } = featuredImage?.data?.attributes;
  const publishedAt = formatData(dataISO8601);

  return (
    <div className="flex w-[300px] w-full max-w-[300px] shrink-0 flex-col rounded-md border-2 border-black bg-brandWhite px-3 py-4">
      <div className="flex justify-between">
        <div className="relative mb-5 flex h-[90px] w-[170px] w-full overflow-visible">
          <div className="absolute flex h-[90px] w-[170px] bg-brandDark" />
          <div className="relative flex h-[90px] max-h-[90px] w-[170px] max-w-[170px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_CMS}${url}`}
              alt={alternativeText || "blog post"}
              unoptimized
              fill
              placeholder="blur"
              blurDataURL="/blog-post-placeholder.png"
              style={{
                zIndex: 1,
                top: "8px",
                left: "8px",
                right: 0,
                bottom: 0,
              }}
            />
          </div>
        </div>
        <div className="flex flex-shrink-0 text-xxs">{publishedAt}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full overflow-hidden truncate text-base font-bold">
          {title}
        </div>
        <div className="flex h-14 w-full overflow-hidden text-ellipsis text-xs">
          <span>{description}</span>
        </div>
        <div className="flex w-full justify-end">
          <a className="flex p-3" href={`/blog/${id}-s:${slug}`}>
            <Image src="/arrow.svg" alt="arrow" width={26} height={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
