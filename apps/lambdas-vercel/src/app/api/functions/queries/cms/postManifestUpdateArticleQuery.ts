export const postManifestUpdateArticleQuery = (title, description, oid) => {
  return `
      mutation CreateManifestChangelogArticle {
        strapi_createGithubManifestoChangelog(
          data: {ManifestoArticle: {Title: ${JSON.stringify(
            title.trim()
          )}, Description: ${JSON.stringify(
    description.trim()
  )}, Version: "${oid}"}}
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
