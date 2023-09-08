"use client";

import { BlogCard } from "./BlogCard";
import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";
export const BlogListing = ({ queryRef }: any) => {
  const { data } = useReadQuery(queryRef);
  const blogPosts = (data as any)?.strapi_blogs?.data

  return (
    <div className="flex flex-wrap gap-3">
      {blogPosts?.map((el: any) => (
        <BlogCard key={el.attributes.slug} id={el.id} {...el.attributes} />
      ))}
    </div>
  );
};
