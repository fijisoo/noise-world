import { Dropdown } from "./Dropdown";
import { i18n } from "../../../../i18n-config";
import Link from "next/link";

export const LanguagesDropdown = async ({ languages, lang }: any) => {

  const data = languages.data;

  const filteredDefault = (data as any)?.strapi_i18NLocales?.data?.filter(
    (el: any) => el.attributes.code === lang
  );

  const availableLocales = (data as any)?.strapi_i18NLocales?.data?.filter(
    (el: any) => i18n.locales?.includes(el.attributes.code)
  );

  const parsedData = availableLocales?.map((el: any) => {
    return {
      name: el.attributes.name,
      href: `/${el.attributes.code}/manifesto`,
    };
  });

  return (
    <Dropdown
      items={parsedData}
      selectedLanguage={filteredDefault?.[0]?.attributes?.name}
      linkComponent={Link}
    />
  );
};
