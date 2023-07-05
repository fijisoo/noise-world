import fetch from "node-fetch";

export const graphqlFetch = (query) =>
  fetch(process.env.API_GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        now: new Date().toISOString(),
      },
    }),
  }).then((res) => res.json());
