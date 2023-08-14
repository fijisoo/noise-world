export const getManifestoVersionQuery = (locale) => {
  return `query ManifestoVersion {
  strapi_manifestoIntls(locale: "${locale}") {
    data {
      attributes {
        version
      }
    }
  }
}`;
};
