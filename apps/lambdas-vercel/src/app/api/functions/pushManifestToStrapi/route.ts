import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoQuery } from "../queries/github/manifestoQuery";
import { updateManifestoIntl } from "../queries/cms/updateManifestoIntlQuery";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  const githubManifestoChangesAndLastArticleOID = await graphqlFetch(
    manifestoQuery
  );

  const githubManifesto = (githubManifestoChangesAndLastArticleOID as any)?.data
    ?.github_repository?.object?.entries?.[0]?.object.text;

  const article = await graphqlFetch(
    updateManifestoIntl(githubManifesto, "en")
  );

  return NextResponse.json({
    body: JSON.stringify({ message: article }),
    headers: {
      "Cache-Control": "no-cache",
      "CDN-Cache-Control": "no-cache",
      "Vercel-CDN-Cache-Control": "no-cache",
    },
  });
}
