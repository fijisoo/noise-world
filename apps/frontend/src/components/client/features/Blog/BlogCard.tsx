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
    <a
      className="flex w-[300px]  w-full max-w-[300px] shrink-0 flex-col flex-col rounded-md border-2 border-black bg-brandWhite px-3 py-4 transition-all hover:shadow-xl"
      href={`/blog/${id}-s:${slug}`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="relative mb-5 flex h-[90px] w-[170px] w-full overflow-visible">
            <div className="absolute flex h-[90px] w-[170px] bg-brandDark" />
            <div className="relative bottom-0 left-0 right-0 right-0 flex h-[90px] max-h-[90px] w-[170px] max-w-[170px] translate-x-[6px] translate-y-[6px]">
              <Image
                src={"/blog-post-placeholder.png"} //`${process.env.NEXT_PUBLIC_API_CMS}${url}` ||
                alt={alternativeText || "blog post"}
                unoptimized
                fill
                placeholder="blur"
                blurDataURL="/blog-post-placeholder.png"
                className="z-10 "
              />
            </div>
          </div>
          <div className="flex flex-shrink-0 text-xxs">{publishedAt}</div>
        </div>
        <div className="flex flex-col">
          <div className="mb-3 line-clamp-3 w-full text-base font-bold">
            {title}
          </div>
          <div className="line-clamp-3 text-xs">
            <span>{description}</span>
          </div>
          <div className="relative flex w-full justify-end p-2 transition-all hover:translate-x-2">
            <Image src="/arrow.svg" alt="arrow" width={26} height={16} />
          </div>
        </div>
      </div>
    </a>
  );
};
