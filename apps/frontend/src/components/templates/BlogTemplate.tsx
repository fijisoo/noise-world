import { BlogListing } from "../client/features/Blog/BlogListing";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

export const BlogTemplate = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <nav aria-label="Breadcrumb">
          <ol
            className="ml-3 flex flex-row flex-nowrap items-center py-2"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              className="flex"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <a itemProp="item" href="/">
                <Image
                  itemProp="name"
                  src={"/home.svg"}
                  alt="Home"
                  width={16}
                  height={16}
                />
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li
              className="flex"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <div className="flex flex-nowrap" itemProp="item">
                <span className="flex pl-1 text-xs">/</span>
                <span className="flex text-xs" itemProp="name">
                  Blog
                </span>
              </div>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
      <ErrorBoundary
        fallback={<div className="text-xxs text-black">Couldnt load data</div>}
      >
        <Suspense
          fallback={<div className="text-xxs text-black">Loading...</div>}
        >
          <BlogListing />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
