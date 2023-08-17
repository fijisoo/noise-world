import { HomeTemplate } from "../../components/templates/HomeTemplate";

export const dynamic = "force-dynamic";

export default function Home({ params: { lang } }: any) {
  return <HomeTemplate lang={lang} />;
}
