import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { graphqlFetch } from "../utils/graphqlFetch";
import { postManifestUpdateArticleQuery } from "../queries/cms/postManifestUpdateArticleQuery";
import { lambdaFetch } from "../utils/lambdaFetch";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { query } = JSON.parse(event.body);

  console.log(event.body, "---------", query);

  if (query.latestIOD !== query.newVersion) {
    const article = await graphqlFetch(decodeURIComponent(query.data));

    const articleContentText =
      article?.data?.chat_GPT_post_chat_completions?.choices?.[0]?.message
        ?.content;

    const title = articleContentText.split("@@@@")?.[0]?.toString();
    const description = articleContentText.split("@@@@")?.[1]?.toString() | "";

    await lambdaFetch("strapiPostManifestoArticle", {
      data: encodeURIComponent(
        postManifestUpdateArticleQuery(title, description, query.newVersion)
      ),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: {
          article,
          query: {
            postedData: encodeURIComponent(
              postManifestUpdateArticleQuery(
                title,
                description,
                query.newVersion
              )
            ),
          },
        },
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Added last changelog" }),
  };
};

export { handler };
