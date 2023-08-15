"use client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_MANIFEST_TEXT } from "../../requests/queries/getManifestTextQuery";
import { i18n } from "../../../i18n-config";
import { useParams } from "next/navigation";

export default function Manifesto() {
  const params = useParams();
  const lang = params.lang || i18n.defaultLocale;

  const data = useSuspenseQuery(GET_MANIFEST_TEXT, {
    variables: {
      locale: lang as any,
    },
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
