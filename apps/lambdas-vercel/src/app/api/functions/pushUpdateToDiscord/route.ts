import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const webhookUri = process.env.DISCORD_WEBHOOK_URI;

  const customHeaders = {
    "Content-Type": "application/json",
  };

  const body = {
    content: null,
    embeds: [
      {
        color: null,
        fields: [
          {
            name: `NEW POST: ${data?.entry?.title}`,
            value: `https://www.sync.art/blog/${data?.entry?.slug}`,
          },
        ],
      },
    ],
    attachments: [],
  };
  try {
    try {
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
    });

    try {
      await client.v2.tweet({
        text: `New blog post: https://www.sync.art/blog/${data?.entry?.slug}`,
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
