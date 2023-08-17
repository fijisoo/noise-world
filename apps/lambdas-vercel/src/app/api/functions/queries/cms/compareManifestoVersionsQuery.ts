export const compareManifestoVersionsQuery = (locale) => {
  return `
        query ManifestoVersionComparasion {
          enManifesto: strapi_manifestoIntls(locale: "en") {
            data {
              attributes {
                version
              }
              id
            }
          }
          
          xManifesto: strapi_manifestoIntls(locale: "${locale}") {
            data {
              attributes {
                version
              }
              id
            }
          }
        }
    `;
};
