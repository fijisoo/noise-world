import { GlobalLayout } from "../../../components/templates/GlobalLayout";
import { BlogPostTemplate } from "../../../components/templates/BlogPostTemplate";

export default function Page({ params: { slug } }: any) {
  return (
    <GlobalLayout>
      <BlogPostTemplate slug={slug} />
    </GlobalLayout>
  );
}
