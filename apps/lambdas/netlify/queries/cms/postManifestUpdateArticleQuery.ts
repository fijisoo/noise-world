export const postManifestUpdateArticleQuery = (title, description, oid) => {
  return `
      mutation CreateManifestChangelogArticle {
        strapi_createGithubManifestoChangelog(
          data: {ManifestoArticle: {Title: "${title}", Description: "${description}", Version: "${oid}"}}
        ) {
          data {
            id
            attributes {
              ManifestoArticle {
                id
                Description
                UpdateDate
                Version
                Title
              }
            }
          }
        }
      }
    `;
};
