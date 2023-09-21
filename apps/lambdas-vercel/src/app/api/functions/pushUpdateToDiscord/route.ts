import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const webhookUri = process.env.DISCORD_WEBHOOK_URI || "";

  const customHeaders = {
    "Content-Type": "application/json",
  };

  const body = {
    content: null,
    embeds: [
      {
        title: data?.entry?.title,
        description: data?.entry?.description,
        url: `https://www.sync.art/blog/${data?.entry?.id}-s:${data?.entry?.slug}`,
        color: 16774400,
        image: {
          url: `https://www.sync.art/api/og/${data?.entry?.id}-s:${data?.entry?.slug}.png`,
        },
      },
    ],
    attachments: [],
  };
  try {
    try {
      if (webhookUri)
        await fetch(webhookUri, {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(body),
        });
    } catch (e) {
      console.error("COULD NO POST TO DISCORD!", e);
    }

    const client = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY,
      appSecret: process.env.TWITTER_APP_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    } as any);

    try {
      const newKeywords = data?.entry?.keywords
        .split(",")
        .map((el: string) => el.trim());

      const hashTags =
        "#" +
        newKeywords
          .map((el) =>
            el
              .split(/[-\s]+/)
              .map((el2, index) =>
                index > 0 ? el2.charAt(0).toUpperCase() + el2.slice(1) : el2
              )
              .join("")
          )
          .join(" #");

      await client.v2.tweet({
        text: `
         ${data?.entry?.description}\n\nRead more!\n${hashTags}\n
         https://www.sync.art/blog/${data?.entry?.id}-s:${data?.entry?.slug}`,
      });
    } catch (e) {
      console.error("COULD NOT POST TO TWITTER!", e);
    }

    return NextResponse.json({
      body: JSON.stringify({ message: "MSSG SENT" }),
      headers: {
        "Cache-Control": "no-cache",
        "CDN-Cache-Control": "no-cache",
        "Vercel-CDN-Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (e) {
    return NextResponse.json({
      body: JSON.stringify({
        message: "COULDNT SENT MSSG INTERNAL SERVER ERROR",
      }),
      headers: {
        "Cache-Control": "no-cache",
        "CDN-Cache-Control": "no-cache",
        "Vercel-CDN-Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
