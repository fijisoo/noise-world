"use client";

import Image from "next/image";
import { formatData } from "../../../../utils/strapiDataFormat";
import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const BlogPost = ({ queryRef }: any) => {
  const { data } = useReadQuery(queryRef);

  const {
    title,
    featuredImage,
    publishedAt: dataISO8601,
    content,
  } = (data as any)?.strapi_blog?.data?.attributes;

  const { alternativeText, url } = featuredImage?.data?.attributes;
  const publishedAt = formatData(dataISO8601);

  return (
    <div className="flex max-w-[600px] flex-col">
      <div className="relative flex h-[300px] w-[600px] w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_CMS}${url}`}
          alt={alternativeText || "featured Image"}
          fill
          unoptimized
        />
      </div>
      <div className="flex w-full justify-end text-xxs">{publishedAt}</div>
      <div className="flex w-full text-base font-bold">{title}</div>
      <div className="flex w-full text-xs">{content}</div>
    </div>
  );
};
