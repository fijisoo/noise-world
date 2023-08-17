export const updateManifestoIntl = (text, version, locale, id) => {
  return `
      mutation UpdateManifestoIntl {
        strapi_updateManifestoIntl(
        id: "${id}"
        locale: "${locale}"
        data: {manifesto_text: ${text}, version: "${version}"}
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
