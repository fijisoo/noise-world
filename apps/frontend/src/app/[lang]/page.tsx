import { HomeTemplate } from "../../components/templates/HomeTemplate";
import { getDictionary } from './dictionaries'

export const dynamic = "force-dynamic";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return <HomeTemplate lang={lang} dict={dict} />;
}
