import { getLatestBlog } from "../../../requests/actions/getLatestBlog";

export const HeroAnnouncement = async () => {
  const { data } = await getLatestBlog();

  const latestPostTitle = data?.strapi_blogs?.data?.[0]?.attributes;
  const id = data?.strapi_blogs?.data?.[0]?.id;

  return latestPostTitle?.title ? (
    <a href={`/blog/${id}-s:${latestPostTitle?.slug}`}>
      <span className="fixed bottom-4 left-0 m-1 flex w-[calc(100%-8px)] justify-center rounded-full border border-black bg-brandWhite p-2 text-xxs md:hidden">
        <p className="mr-3 flex overflow-hidden truncate">
          {latestPostTitle?.title}.{" "}
        </p>
        <b className="ml-1 flex shrink-0 justify-end font-bold">{`Read more ->`}</b>
      </span>
      <span className="hidden w-fit rounded-full border border-black bg-brandWhite px-2 py-1 text-xxs md:flex">
        {latestPostTitle?.title}.{" "}
        <b className="ml-1 font-bold">{`Read more ->`}</b>
      </span>
    </a>
  ) : (
    <></>
  );
};
