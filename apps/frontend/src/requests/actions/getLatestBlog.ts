"use server";

import { GET_LATEST_BLOG } from "../queries/getLatestBlog";

export async function getLatestBlog() {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_LATEST_BLOG }),
  }).then((data) => data.json());
}
