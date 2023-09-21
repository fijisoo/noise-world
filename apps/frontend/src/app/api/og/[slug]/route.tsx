import { NextRequest, ImageResponse } from "next/server";
import { getBlogPost } from "../../../../requests/actions/getBlogPost";
import QRCode from "qrcode";
import { html } from "satori-html";
import { defaultOfImageGenerator } from "./defaultOgImageGenerator";
import { featuredOgImage } from "./featuredOgImage";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { pathname } = url;
  const slug = pathname.split("/")[3];
  const id = slug.slice("-s:" as any)[0];
  const { data } = await getBlogPost({ id: id });

  const qrCodeDataURL = await QRCode.toString(`https://sync.art/blog/${slug}`, {
    errorCorrectionLevel: "H",
    type: "svg",
    width: 255,
  });

  const markup = html(qrCodeDataURL);

  const {
    title,
    featuredImage,
    ogImageExternalUrl,
    ogImageInternalUrl: ogImageInternal,
  } = (data as any)?.strapi_blog?.data?.attributes;

  const featuredImageUrl = featuredImage?.data?.attributes?.url;
  const ogImageInternalUrl = ogImageInternal?.data?.attributes?.url;

  if (!slug) {
    return new ImageResponse(<>{"THIS PAGE DOES NOT EXIST"}</>, {
      width: 1200,
      height: 630,
    });
  }

  if (!ogImageExternalUrl && !ogImageInternalUrl) {
    return defaultOfImageGenerator(
      featuredImageUrl || "http://sync.art/og-blog-post.png",
      markup,
      title
    );
  }

  return featuredOgImage(
    ogImageExternalUrl || ogImageInternalUrl,
    markup,
    title
  );
}
