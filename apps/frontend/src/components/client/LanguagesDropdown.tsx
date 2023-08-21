"use client";

import { Dropdown } from "./Dropdown";
import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { i18n } from "../../../i18n-config";
import Link from "next/link";

export const LanguagesDropdown = ({ lang, queryRef }: any) => {
  const { data } = useReadQuery(queryRef);

  const filteredDefault = (data as any)?.strapi_i18NLocales?.data?.filter(
    (el: any) => el.attributes.code === lang
  );

  const availableLocales = (data as any)?.strapi_i18NLocales?.data?.filter(
    (el: any) => i18n.locales?.includes(el.attributes.code)
  );

  const parsedData = availableLocales.map((el: any) => {
    return { name: el.attributes.name, href: `/${el.attributes.code}` };
  });

  return (
    <Dropdown
      items={parsedData}
      selectedLanguage={filteredDefault?.[0]?.attributes?.name}
      linkComponent={Link}
    />
  );
};
