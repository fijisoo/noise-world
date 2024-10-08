export const GET_MANIFEST_VERSIONS_COMPARISON = `
  query getManifestVersionsComparison($locale: strapi_I18NLocaleCode!) {
    xManifesto: strapi_manifestoIntls(locale: $locale) {
      data {
        attributes {
          manifesto_text
          version
        }
      }
    }
    enManifesto: strapi_manifestoIntls(locale: "en") {
      data {
        attributes {
          manifesto_text
          version
        }
      }
    }
  }
`;
