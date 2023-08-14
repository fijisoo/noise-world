export const updateManifestoIntl = (text, version, locale) => {
  return `
      mutation UpdateManifestoIntl {
        strapi_updateManifestoIntl(
        id: 1
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
