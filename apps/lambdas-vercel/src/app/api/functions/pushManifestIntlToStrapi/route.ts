import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { compareManifestoVersionsQuery } from "@/app/api/functions/queries/cms/compareManifestoVersionsQuery";
import { translateTextQuery } from "@/app/api/functions/queries/chatGPT/translateTextQuery";
import { getManifestoTextQuery } from "@/app/api/functions/queries/cms/getManifestoTextQuery";
import { updateManifestoIntl } from "@/app/api/functions/queries/cms/updateManifestoIntlQuery";
import { createManifestoIntl } from "@/app/api/functions/queries/cms/createManifestoIntlQuery";

export const dynamic = "force-dynamic";
export const runtime = 'edge'

export async function GET(request: NextRequest, response: NextResponse) {
  const locale = new URLSearchParams(request.nextUrl.searchParams).get(
    "locale"
  );

  const manifestoVersionsData = await graphqlFetch(
    compareManifestoVersionsQuery(locale)
  );

  const { enManifesto: enManifestoData, xManifesto: xManifestoData } = (
    manifestoVersionsData as any
  )?.data || { enManifesto: null, xManifesto: null };

  const ejectFromData = (data) => {
    return {
      version: data?.data?.[0]?.attributes?.version,
      id: data?.data?.[0]?.id,
    };
  };

  const isXManifestoExists = xManifestoData?.data?.length > 0;

  const enManifesto = ejectFromData(enManifestoData);
  const xManifesto = ejectFromData(xManifestoData);

  if (enManifesto.version !== xManifesto.version) {
    const originalTextData = await graphqlFetch(getManifestoTextQuery("en"));
    const originalText = (originalTextData as any)?.data?.strapi_manifestoIntls
      ?.data?.[0]?.attributes?.manifesto_text;

    const translationData = await graphqlFetch(
      translateTextQuery(JSON.stringify(originalText), locale)
    );

    const translation = (translationData as any)?.data?.TRANSLATION_translation_TRANSLATION_translation?.text

    if (isXManifestoExists) {
      const article = await graphqlFetch(
        updateManifestoIntl(
          JSON.stringify(translation),
          enManifesto.version,
          locale,
          xManifesto.id
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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    } else {
      const article = await graphqlFetch(
        createManifestoIntl(
          JSON.stringify(translation),
          enManifesto.version,
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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
