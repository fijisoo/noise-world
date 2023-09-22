import { BlogPostTemplate } from "../../../components/templates/BlogPostTemplate";
import { getBlogPost } from "../../../requests/actions/getBlogPost";
import { site } from "../../../../config/site";

export async function generateMetadata({ params }: any) {
  const id = params.slug.slice("-s:")[0];
  const { data } = await getBlogPost({ id });

  const { keywords, description, title } = (data as any)?.strapi_blog?.data
    ?.attributes;

  const parsedKeywords = keywords.split(",").map((el: string) => el.trim());

  return {
    title: title,
    description: description,
    icon: ["./icon.ico"],
    keywords: parsedKeywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://sync.art/api/og/${params.slug}`,
      title: `${title} || ${site.name}`,
      description: description,
      siteName: site.name,
      images: [`https://sync.art/api/og/${params.slug}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} || ${site.name}`,
      description: description,
      images: [`https://sync.art/api/og/${params.slug}`],
      creator: "@syncArt",
    },
    icons: {
      icon: "https://sync.art/icon.ico",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
  };
}

export default function Page({ params: { slug } }: any) {
  return <BlogPostTemplate slug={slug} />;
}
