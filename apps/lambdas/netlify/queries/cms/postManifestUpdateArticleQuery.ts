export const postManifestUpdateArticleQuery = (title, description, oid) => {
  return `
    mutation CreateManifestChangelogArticle {
      strapi_createGithubManifestoChangelog(
        data: {ManifestoArticle: {Title: "${title.toString()}", Description: "${description.toString()}", Version: "${oid.toString()}"}}
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
