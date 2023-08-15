import { gql } from "@apollo/client";

export const GET_LANGUAGES_QUERY = gql`
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
