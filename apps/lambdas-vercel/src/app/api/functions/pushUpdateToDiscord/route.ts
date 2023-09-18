import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

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
    await fetch(webhookUri, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(body),
    });
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
      body: JSON.stringify({ message: "COULDNT SENT MSSG INTERNAL SERVER ERROR" }),
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
