"use server";

import { GET_LANGUAGES_QUERY } from "../queries/getLanguagesListQuery";

export async function getLanguages() {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_LANGUAGES_QUERY }),
  }).then((data) => data.json());
}
