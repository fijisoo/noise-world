import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { compareManifestoVersionsQuery } from "@/app/api/functions/queries/cms/compareManifestoVersionsQuery";
import { translateTextQuery } from "@/app/api/functions/queries/chatGPT/translateTextQuery";
import { getManifestoTextQuery } from "@/app/api/functions/queries/cms/getManifestoTextQuery";
import { updateManifestoIntl } from "@/app/api/functions/queries/cms/updateManifestoIntlQuery";
import { createManifestoIntl } from "@/app/api/functions/queries/cms/createManifestoIntlQuery";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  const locale = new URLSearchParams(request.nextUrl.searchParams).get(
    "locale"
  );

  const manifestoVersionsData = await graphqlFetch(
    compareManifestoVersionsQuery(locale)
  );

  console.log('manifestoVersionsData?.data', manifestoVersionsData?.data)
  const { enManifesto: enManifestoData, xManifesto: xManifestoData } =
    manifestoVersionsData?.data || { enManifesto: null, xManifesto: null };


  const ejectFromData = (data) => {
    return data?.data?.[0]?.attributes?.version;
  };

  const isXManifestoExists = xManifestoData?.data?.length > 0;

  const enManifestoVersion = ejectFromData(enManifestoData);
  const xManifestoVersion = ejectFromData(xManifestoData);

  if (enManifestoVersion !== xManifestoVersion) {
    const originalTextData = await graphqlFetch(getManifestoTextQuery("en"));
    const originalText =
      originalTextData?.data?.strapi_manifestoIntls?.data?.[0]?.attributes
        ?.manifesto_text;

    const translationData = await graphqlFetch(
      translateTextQuery(originalText, locale)
    );

    const translation = (translationData as any)?.data
      ?.chat_GPT_post_chat_completions?.choices?.[0]?.message?.content;

    if (isXManifestoExists) {
      const article = await graphqlFetch(
        updateManifestoIntl(
          JSON.stringify(translation),
          enManifestoVersion,
          locale
        )
      );
      return NextResponse.json({
        body: JSON.stringify({
          message: article,
        }),
        headers: {
          "Cache-Control": "no-cache",
          "CDN-Cache-Control": "no-cache",
          "Vercel-CDN-Cache-Control": "no-cache",
        },
      });
    } else {
      const article = await graphqlFetch(
        createManifestoIntl(
          JSON.stringify(translation),
          enManifestoVersion,
          locale
        )
      );

      return NextResponse.json({
        body: JSON.stringify({
          message: article,
        }),
        headers: {
          "Cache-Control": "no-cache",
          "CDN-Cache-Control": "no-cache",
          "Vercel-CDN-Cache-Control": "no-cache",
        },
      });
    }
  }

  return NextResponse.json({
    body: JSON.stringify({
      message: "you`ve already pushed fresh version",
    }),
    headers: {
      "Cache-Control": "no-cache",
      "CDN-Cache-Control": "no-cache",
      "Vercel-CDN-Cache-Control": "no-cache",
    },
  });
}
