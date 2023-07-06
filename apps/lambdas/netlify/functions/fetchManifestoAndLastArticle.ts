import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoDiffQuery } from "../queries/github/manifestoDiffQuery";
import { createManifestoDiffArticleQuery } from "../queries/chatGPT/createManifestoDiffArticleQuery";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const githubManifestoChangesAndLastArticleOID = await graphqlFetch(
    manifestoDiffQuery
  );

  const textArr =
    githubManifestoChangesAndLastArticleOID?.data?.github_repository
      ?.defaultBranchRef?.target?.history?.edges;

  const latestIOD =
    githubManifestoChangesAndLastArticleOID?.data?.strapi_githubManifestoChangelogs?.data?.[0]?.attributes?.ManifestoArticle?.Version?.toString();

  const getTextByArrIndex = (arr, index) =>
    arr[index]?.node?.tree?.entries?.[0]?.object?.text;

  //sorted: newest first
  const text1 = getTextByArrIndex(textArr, 0).trim();
  const text1_oid = textArr?.[0]?.node?.oid?.toString();

  const text2 = getTextByArrIndex(textArr, 1);

  await fetch(
    process.env.GPT_GENERATE_MANIFESTO_ARTICLE_URI +
      "?query=" +
      encodeURIComponent(createManifestoDiffArticleQuery(text2, text1)) +
      "&latestIDO=" +
      latestIOD +
      "&newVersion=" +
      text1_oid
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        githubManifestoChangesAndLastArticleOID,
        chainURI:
          process.env.GPT_GENERATE_MANIFESTO_ARTICLE_URI +
          "?query=" +
          encodeURIComponent(createManifestoDiffArticleQuery(text2, text1)) +
          "&latestIDO=" +
          latestIOD +
          "&newVersion=" +
          text1_oid,
      },
    }),
  };
};

export { handler };
