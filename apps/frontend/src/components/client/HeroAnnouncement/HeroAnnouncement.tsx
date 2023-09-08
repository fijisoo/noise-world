"use client";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_LATEST_BLOG } from "../../../requests/queries/getLatestBlog";

export const HeroAnnouncement = () => {
  const { data } = useQuery(GET_LATEST_BLOG);

  const latestPostTitle = data?.strapi_blogs?.data?.[0]?.attributes;
  const id = data?.strapi_blogs?.data?.[0]?.id;

  return latestPostTitle?.title ? (
    <a href={`/blog/${id}-s:${latestPostTitle?.slug}`}>
      <span className="md:hidden fixed bottom-4 left-0 m-1 flex w-[calc(100%-8px)] justify-center rounded-full border border-black bg-brandWhite p-2 text-xxs">
        <p className="mr-3 flex overflow-hidden truncate">
          {latestPostTitle?.title}.{" "}
        </p>
        <b className="ml-1 flex shrink-0 justify-end font-bold">{`Read more ->`}</b>
      </span>
      <span className="hidden w-fit rounded-full border border-black px-2 py-1 text-xxs md:flex">
        {latestPostTitle?.title}.{" "}
        <b className="ml-1 font-bold">{`Read more ->`}</b>
      </span>
    </a>
  ) : (
    <></>
  );
};
