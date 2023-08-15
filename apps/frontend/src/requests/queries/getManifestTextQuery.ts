import { gql } from "@apollo/client";

export const GET_MANIFEST_TEXT = gql`
  query getManifestText($locale: strapi_I18NLocaleCode!) {
    strapi_manifestoIntls(locale: $locale) {
      data {
        attributes {
          manifesto_text
        }
      }
    }
  }
`;
