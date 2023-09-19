"use server";

import { GET_MANIFEST_VERSIONS_COMPARISON } from "../queries/getManifestVersionsComparisonQuery";
import { i18n } from "../../../i18n-config";

export async function getManifestoDiff({ lang }: any) {
  return await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL!, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_MANIFEST_VERSIONS_COMPARISON,
      variables: {
        locale: lang as any,
        defaultLocale: i18n.defaultLocale as any,
      },
    }),
  }).then((data) => data.json());
}
