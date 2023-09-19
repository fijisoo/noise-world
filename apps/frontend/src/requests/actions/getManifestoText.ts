"use server";

import { GET_MANIFEST_TEXT } from "../queries/getManifestTextQuery";

export async function getManifestoText({ lang }: any) {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { tags: ["manifesto"] },
    body: JSON.stringify({
      query: GET_MANIFEST_TEXT,
      variables: {
        locale: lang as any,
      },
    }),
  } as any).then((data) => data.json());
}
