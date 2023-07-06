import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { graphqlFetch } from "../utils/graphqlFetch";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { query } = event.queryStringParameters;

  const pushedData = await graphqlFetch(decodeURIComponent(query));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: pushedData }),
  };
};

export { handler };
