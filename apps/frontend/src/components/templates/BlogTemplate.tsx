"use client";

import { BlogListing } from "../client/features/Blog/BlogListing";
import { GET_BLOG } from "../../requests/queries/getBlogQuery";
import { useBackgroundQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const BlogTemplate = () => {
  const [blogQuery] = useBackgroundQuery(GET_BLOG);

  return (
    <div className="flex">
      <ErrorBoundary
        fallback={<div className="text-xxs text-black">Couldnt load data</div>}
      >
        <Suspense
          fallback={<div className="text-xxs text-black">Loading...</div>}
        >
          <BlogListing queryRef={blogQuery} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
