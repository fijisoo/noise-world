import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { graphqlFetch } from "../utils/graphqlFetch";
import fetch from "node-fetch";
import { postManifestUpdateArticleQuery } from "../queries/cms/postManifestUpdateArticleQuery";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { query, latestIOD, newVersion } = event.queryStringParameters;

  if (latestIOD !== newVersion) {
    const article = await graphqlFetch(decodeURIComponent(query));

    const articleContentText =
      article?.data?.chat_GPT_post_chat_completions?.choices?.[0]?.message
        ?.content;

    const title = articleContentText.split("@@@@")?.[0]?.toString();
    const description = articleContentText.split("@@@@")?.[1]?.toString() | "";

    await fetch(
      process.env.STRAPI_POST_MANIFESTO_URI +
        "?query=" +
        encodeURIComponent(
          postManifestUpdateArticleQuery(title, description, newVersion)
        )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: {
          article,
          chainURI:
            process.env.STRAPI_POST_MANIFESTO_URI +
            "?query=" +
            encodeURIComponent(
              postManifestUpdateArticleQuery(title, description, newVersion)
            ),
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
