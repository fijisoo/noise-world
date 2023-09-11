import { BlogPostTemplate } from "../../../components/templates/BlogPostTemplate";

export default function Page({ params: { slug } }: any) {
  return <BlogPostTemplate slug={slug} />;
}
