import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoDiffQuery } from "../queries/github/manifestoDiffQuery";
import { createManifestoDiffArticleQuery } from "../queries/chatGPT/createManifestoDiffArticleQuery";
import { postManifestUpdateArticleQuery } from "../queries/cms/postManifestUpdateArticleQuery";

export async function GET(request: NextRequest, response: NextResponse) {
  const githubManifestoChangesAndLastArticleOID = await graphqlFetch(
    manifestoDiffQuery
  );

  const textArr = (githubManifestoChangesAndLastArticleOID as any)?.data
    ?.github_repository?.defaultBranchRef?.target?.history?.edges;

  const latestIOD = (
    githubManifestoChangesAndLastArticleOID as any
  )?.data?.strapi_githubManifestoChangelogs?.data?.[0]?.attributes?.ManifestoArticle?.Version?.toString();

  const getTextByArrIndex = (arr, index) =>
    arr[index]?.node?.tree?.entries?.[0]?.object?.text;

  //sorted: newest first
  const text1 = getTextByArrIndex(textArr, 0).trim();
  const text1_oid = textArr?.[0]?.node?.oid?.toString();

  const text2 = getTextByArrIndex(textArr, 1);

  console.log(
    "createManifestoDiffArticleQuery(text2, text1)",
    createManifestoDiffArticleQuery(text2, text1)
  );

  if (latestIOD !== text1_oid) {
    const article = await graphqlFetch(
      createManifestoDiffArticleQuery(text2, text1)
    );

    const articleContentText = (article as any)?.data
      ?.chat_GPT_post_chat_completions?.choices?.[0]?.message?.content;

    const [title, description] = articleContentText?.split("@@@@");

    const pushedData = await graphqlFetch(
      postManifestUpdateArticleQuery(title, description, text1_oid)
    );

    return NextResponse.json({
      body: JSON.stringify({ message: pushedData }),
      headers: {
        "Cache-Control": "public, s-maxage=10",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  }

  return NextResponse.json({
    body: JSON.stringify({
      message: "Added last changelog",
      latestIOD,
      text1_oid,
    }),
    headers: {
      "Cache-Control": "public, s-maxage=10",
      "CDN-Cache-Control": "public, s-maxage=60",
      "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
    },
  });
}
