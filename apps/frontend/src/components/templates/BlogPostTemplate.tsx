"use client";

import { useBackgroundQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { BlogPost } from "../client/features/Blog/BlogPost";
import { GET_BLOG_POST } from "../../requests/queries/getBlogPost";

export const BlogPostTemplate = ({ slug }: any) => {
  const id = slug.slice("-s:")[0];

  const [blogPostQuery] = useBackgroundQuery(GET_BLOG_POST, {
    queryKey: `getBlogPost-${slug}`,
    variables: {
      id,
    },
    fetchPolicy: "cache-first",
  });

  return <BlogPost queryRef={blogPostQuery} />;
};
