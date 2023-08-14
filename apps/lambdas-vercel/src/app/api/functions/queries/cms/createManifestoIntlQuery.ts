export const createManifestoIntl = (text, version, locale) => {
  return `
      mutation CreateManifestoIntl {
        strapi_createManifestoIntl(
        locale: "${locale}"
        data: {manifesto_text: ${text}, version: ${version}}
        ) {
          data {
              attributes {
                manifesto_text
              }
            }
          }
        }
    `;
};
