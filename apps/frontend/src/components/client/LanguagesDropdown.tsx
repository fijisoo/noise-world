"use client";
import { Dropdown } from "ui";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_LANGUAGES_QUERY } from "../../requests/queries/getLanguagesListQuery";
import { i18n } from "../../../i18n-config";

export const LanguagesDropdown = ({ lang }: any) => {
  const langVar = lang || i18n.defaultLocale;
  const { data } = useSuspenseQuery(GET_LANGUAGES_QUERY);

  const filteredDefault = (data as any)?.strapi_i18NLocales?.data?.filter(
    (el: any) => el.attributes.code === langVar
  );

  const parsedData = (data as any)?.strapi_i18NLocales?.data?.map((el: any) => {
    return { name: el.attributes.name, href: `/${el.attributes.code}` };
  });

  return (
    <Dropdown
      items={parsedData}
      selectedLanguage={filteredDefault?.[0]?.attributes?.name}
    />
  );
};
