"use client";

import { Dropdown } from "ui";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";

const getLanguagesQuery = gql`
  query LanguagesList {
    strapi_i18NLocales {
      data {
        attributes {
          code
          name
        }
      }
    }
  }
`;

export const LanguagesDropdown = ({ lang }: any) => {
  const { data } = useSuspenseQuery(getLanguagesQuery);

  const filteredDefault = (data as any)?.strapi_i18NLocales?.data.filter(
    (el: any) => el.attributes.code === lang
  );

  const parsedData = (data as any)?.strapi_i18NLocales?.data.map((el: any) => {
    return { name: el.attributes.name, href: `/${el.attributes.code}` };
  });

  return (
    <Dropdown
      items={parsedData}
      selectedLanguage={filteredDefault?.[0]?.attributes?.name}
    />
  );
};
