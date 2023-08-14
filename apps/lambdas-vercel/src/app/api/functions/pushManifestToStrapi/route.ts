import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoQuery } from "../queries/github/manifestoQuery";
import { updateManifestoIntl } from "../queries/cms/updateManifestoIntlQuery";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, response: NextResponse) {
  const githubManifesto = await graphqlFetch(manifestoQuery);

  const githubManifestoText = (
    githubManifesto as any
  )?.data?.github_repository?.object?.entries.find(
    (el) => el.name === "README.md"
  ).object?.text;

  const article = await graphqlFetch(
    updateManifestoIntl(JSON.stringify(githubManifestoText), "en")
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
