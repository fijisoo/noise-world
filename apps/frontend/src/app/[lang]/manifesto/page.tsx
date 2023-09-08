import { ManifestoTemplate } from "../../../components/templates/ManifestoTemplate";
import { GlobalLayout } from "../../../components/templates/GlobalLayout";

export default async function Page({ params: { lang } }: any) {
  return (
    <GlobalLayout>
      <ManifestoTemplate lang={lang} />
    </GlobalLayout>
  );
}
