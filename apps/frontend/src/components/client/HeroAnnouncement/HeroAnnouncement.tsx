"use client";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_LATEST_BLOG } from "../../../requests/queries/getLatestBlog";

export const HeroAnnouncement = () => {
  const { data } = useQuery(GET_LATEST_BLOG);

  const latestPostTitle = data?.strapi_blogs?.data?.[0]?.attributes;
  const id = data?.strapi_blogs?.data?.[0]?.id;

  return latestPostTitle?.title ? (
    <a href={`/blog/${id}-s:${latestPostTitle?.slug}`}>
      <span className="flex w-fit rounded-full border border-black p-1 text-xxs">
        {latestPostTitle?.title}.{" "}
        <b className="ml-1 font-bold">{`Read more ->`}</b>
      </span>
    </a>
  ) : (
    <></>
  );
};
