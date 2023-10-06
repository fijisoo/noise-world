"use server";

import { GET_BLOG } from "../queries/getBlogQuery";

export async function getBlogListing() {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_BLOG }),
    next: { revalidate: 86400 },
  } as any).then((data) => data.json());
}
