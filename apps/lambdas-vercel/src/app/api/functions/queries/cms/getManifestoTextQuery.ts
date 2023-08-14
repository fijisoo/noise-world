export const getManifestoTextQuery = (locale) => `
query MyQuery {
    strapi_manifestoIntls(locale: "${locale}") {
      data {
        attributes {
          manifesto_text
        }
      }
    }
}`;
