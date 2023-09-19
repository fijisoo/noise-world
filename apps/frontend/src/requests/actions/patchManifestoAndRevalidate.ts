"use server";

import { revalidateTag } from "next/cache";

export async function patchManifestoAndRevalidate({ lang }: any) {
  return await fetch(
    `${process.env
      .NEXT_PUBLIC_API_FUNCTIONS_URL!}/pushManifestIntlToStrapi?locale=${lang}`
  ).then(() => {
    revalidateTag("manifesto");
  });
}
