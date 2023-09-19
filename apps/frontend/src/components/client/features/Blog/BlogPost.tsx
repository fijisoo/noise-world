import Image from "next/image";
import { formatData } from "../../../../utils/strapiDataFormat";
import ReactMarkdown from "react-markdown";
import "./../../../../styles/github-markdown.css";

export const BlogPost = ({ data }: any) => {
  const {
    title,
    publishedAt: dataISO8601,
    content,
    featuredImage,
  } = (data as any)?.strapi_blog?.data?.attributes;
  const featuredImageUrl = featuredImage?.data?.attributes?.url;

  const publishedAt = formatData(dataISO8601);

  return (
    <div className="flex w-full flex-col">
      <nav aria-label="Breadcrumb">
        <ol
          className="ml-3 flex shrink-0 flex-row flex-nowrap items-center py-2"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
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
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a className="flex flex-nowrap" itemProp="item" href="/blog">
              <span className="flex pl-1 text-xs">/</span>
              <span className="flex text-xs" itemProp="name">
                Blog
              </span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            className="truncate text-clip"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <div className="flex flex-nowrap" itemProp="item">
              <span className="flex pl-1 text-xs">/</span>
              <span className="truncate text-clip text-xs" itemProp="name">
                {title}
              </span>
            </div>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
      <div className="flex w-full max-w-[600px] flex-col">
        <div className="relative flex max-h-[300px] min-h-[150px] w-full min-w-[150px] max-w-[600px] md:min-h-[300px]">
          <Image
            src={featuredImageUrl || "/blog-post-placeholder.png"}
            alt={"featured Image"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex w-full justify-end text-xxs">{publishedAt}</div>
        <h1 className="text-md flex w-full font-bold">{title}</h1>
        <div className="flex w-full flex-wrap whitespace-break-spaces text-xs">
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
