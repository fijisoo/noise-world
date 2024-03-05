import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoQuery } from "../queries/github/manifestoQuery";
import { updateManifestoIntl } from "../queries/cms/updateManifestoIntlQuery";
import { getManifestoVersionQuery } from "@/app/api/functions/queries/cms/getManifestoVersionQuery";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, response: NextResponse) {
  const githubManifesto = await graphqlFetch(manifestoQuery);

  const githubManifestoText = (
    githubManifesto as any
  )?.data?.github_repository?.object?.entries.find(
    (el) => el.name === "README.md"
  ).object?.text;

  const newVersion = (githubManifesto as any)?.data?.github_repository?.object
    ?.repository?.releases?.nodes?.[0]?.tag?.name;

  const oldManifestoVersionData = await graphqlFetch(
    getManifestoVersionQuery("en")
  );
  const oldManifestoVersion = (oldManifestoVersionData as any)?.data
    ?.strapi_manifestoIntls?.data?.[0]?.attributes?.version;
  const oldManifestoId = (oldManifestoVersionData as any)?.data
    ?.strapi_manifestoIntls?.data?.[0]?.id || 0;

  if (oldManifestoVersion != newVersion) {
    const article = await graphqlFetch(
      updateManifestoIntl(
        JSON.stringify(githubManifestoText),
        newVersion,
        "en",
        oldManifestoId
      )
    );
    return NextResponse.json({
      body: JSON.stringify({ message: article }),
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

  return NextResponse.json({
    body: JSON.stringify({ message: "NO CHANGES TO LAST VERSION" }),
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
