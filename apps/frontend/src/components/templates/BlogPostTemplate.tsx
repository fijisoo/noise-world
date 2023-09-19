import { BlogPost } from "../client/features/Blog/BlogPost";
import { getBlogPost } from "../../requests/actions/getBlogPost";

export const BlogPostTemplate = async ({ slug }: any) => {
  const id = slug.slice("-s:")[0];
  const data = await getBlogPost({ id });
  return <BlogPost data={data?.data} />;
};
