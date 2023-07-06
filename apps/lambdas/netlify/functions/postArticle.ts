import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { graphqlFetch } from "../utils/graphqlFetch";
import { manifestoDiffQuery } from "../queries/github/manifestoDiffQuery";
import { createManifestoDiffArticleQuery } from "../queries/chatGPT/createManifestoDiffArticleQuery";
import { postManifestUpdateArticleQuery } from "../queries/cms/postManifestUpdateArticleQuery";

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

  console.log(
    "createManifestoDiffArticleQuery(text2, text1)",
    createManifestoDiffArticleQuery(text2, text1)
  );
  if (latestIOD !== text1_oid) {
    // const article = await graphqlFetch(
    //   createManifestoDiffArticleQuery(text2, text1)
    // );
    //
    // console.log("article", article);
    //
    // const articleContentText =
    //   article?.data?.chat_GPT_post_chat_completions?.choices?.[0]?.message
    //     ?.content;
    //
    // console.log("articleContentText", articleContentText);
    //
    // const title = articleContentText.split("@@@@")?.[0]?.toString();
    // const description = articleContentText.split("@@@@")?.[1]?.toString() | "";
    //
    // const pushedData = await graphqlFetch(
    //   postManifestUpdateArticleQuery(title, description, text1_oid)
    // );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "pushedData" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Added last changelog" }),
  };
};

export { handler };
