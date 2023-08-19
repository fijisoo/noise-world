import { HomeTemplate } from "../../components/templates/HomeTemplate";

export default async function Page({ params: { lang } }: any) {
  return <HomeTemplate lang={lang} />;
}
