export const updateManifestoIntl = (text, locale) => {
  return `
      mutation UpdateManifestoIntl {
        strapi_updateManifestoIntl(
        id: 1
        locale: "${locale}"
        data: {manifesto_text: ${text}}
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
