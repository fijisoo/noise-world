import fetch from "node-fetch";

export const lambdaFetch = (lambdaName, query) =>
  fetch(
    `${process.env.LAMBDA_HOST_URI}${process.env.LAMBDA_DIR}/${lambdaName}`,
    {
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
    }
  ).then((res) => res.json());
