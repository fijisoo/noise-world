"use client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const Manifesto = ({ queryRef }: any) => {
  const { data } = useReadQuery(queryRef);
  const manifestoText = (data as any)?.strapi_manifestoIntls?.data?.[0]
    ?.attributes?.manifesto_text;

  return (
    <div className="markdown-body">
      <ReactMarkdown>{manifestoText}</ReactMarkdown>
    </div>
  );
};
