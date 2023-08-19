"use client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export default function Manifesto({ queryRef }: any) {
  const { data } = useReadQuery(queryRef);

  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {
          (data as any)?.strapi_manifestoIntls?.data?.[0]?.attributes
            ?.manifesto_text
        }
      </ReactMarkdown>
    </div>
  );
}
