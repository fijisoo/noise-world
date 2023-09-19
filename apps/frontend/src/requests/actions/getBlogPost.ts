"use server";

import { GET_BLOG_POST } from "../queries/getBlogPost";

export async function getBlogPost({ id }: any) {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_BLOG_POST, variables: { id } }),
  }).then((data) => data.json());
}
