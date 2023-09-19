import { BlogCard } from "./BlogCard";
import { getBlogListing } from "../../../../requests/actions/getBlogListing";

export const BlogListing = async () => {
  const { data } = await getBlogListing();

  const blogPosts = (data as any)?.strapi_blogs?.data;

  return (
    <div className="flex flex-wrap gap-3">
      {blogPosts?.map((el: any) => (
        <BlogCard key={el.attributes.slug} id={el.id} {...el.attributes} />
      ))}
    </div>
  );
};
