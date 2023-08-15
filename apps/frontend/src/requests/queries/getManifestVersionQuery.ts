import { gql } from "@apollo/client";

export const GET_MANIFEST_VERSION = gql`
  query getManifestVersion($locale: strapi_I18NLocaleCode!) {
    strapi_manifestoIntls(locale: $locale) {
      data {
        attributes {
          version
        }
      }
    }
  }
`;
