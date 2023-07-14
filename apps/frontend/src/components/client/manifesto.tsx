"use client";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query MyQuery($locale: strapi_I18NLocaleCode!) {
    strapi_manifestoIntls(locale: $locale) {
      data {
        attributes {
          manifesto_text
        }
      }
    }
  }
`;

export default function Manifesto({ locale }: any) {
  const data = useSuspenseQuery(query, {
    variables: {
      locale: locale,
    },
    errorPolicy: "all",
  });
  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {
          (data as any)?.data?.strapi_manifestoIntls?.data?.[0]?.attributes
            ?.manifesto_text
        }
      </ReactMarkdown>
    </div>
  );
}
