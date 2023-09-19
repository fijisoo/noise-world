import ReactMarkdown from "react-markdown";
import "./../../../../styles/github-markdown.css";

export const Manifesto = ({ manifesto }: any) => {
  const data = manifesto?.data;
  const manifestoText = (data as any)?.strapi_manifestoIntls?.data?.[0]
    ?.attributes?.manifesto_text;

  return (
    <div className="markdown-body">
      <ReactMarkdown>{manifestoText}</ReactMarkdown>
    </div>
  );
};
