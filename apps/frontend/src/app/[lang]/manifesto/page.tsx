import { ManifestoTemplate } from "../../../components/templates/ManifestoTemplate";

export default async function Page({ params: { lang } }: any) {
  return <ManifestoTemplate lang={lang} />;
}
