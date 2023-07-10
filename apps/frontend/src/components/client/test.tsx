"use client";
import { gql } from "@apollo/client";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query Manifesto {
    github_repository(owner: "syncArt", name: "manifesto") {
      defaultBranchRef {
        target {
          ... on github_Commit {
            history(first: 1) {
              edges {
                node {
                  oid
                  commitUrl
                  tree {
                    entries {
                      name
                      object {
                        ... on github_Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function PollPage() {
  const { data } = useSuspenseQuery(query);
  const textArr =
    data?.github_repository?.defaultBranchRef?.target?.history?.edges[0]?.node
      ?.tree?.entries?.[0]?.object?.text;
  console.log(textArr);
  return <div>{textArr}</div>;
}
