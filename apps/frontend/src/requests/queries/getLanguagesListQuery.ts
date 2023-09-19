export const GET_LANGUAGES_QUERY = `
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
