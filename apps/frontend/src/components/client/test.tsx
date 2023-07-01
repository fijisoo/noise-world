"use client";
import { gql } from "@apollo/client";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query {
    test {
      data {
        attributes {
          Text_test
        }
        id
      }
    }
  }
`;

export default function PollPage() {
  const { data } = useSuspenseQuery(query);
  console.log(data);
  return <div>{data.test.data.attributes.Text_test}</div>;
}
