"use client";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query MyQuery {
    github_repository(owner: "syncArt", name: "manifesto") {
      object(expression: "HEAD:") {
        ... on github_Tree {
          entries {
            ...github_TreeEntryFragment
          }
        }
      }
    }
  }

  fragment github_TreeEntryFragment on github_TreeEntry {
    name
    type
    mode
    object {
      ... on github_Blob {
        byteSize
        text
        isBinary
      }
    }
  }
`;

export default function Manifesto() {
  const { data } = useSuspenseQuery(query);
  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {data.github_repository.object.entries[0].object.text}
      </ReactMarkdown>
    </div>
  );
}
