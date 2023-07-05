export const manifestoDiffQuery = `
        query MyQuery {
          github_repository(owner: "syncArt", name: "manifesto") {
            defaultBranchRef {
              target {
                ... on github_Commit {
                  history(first: 10) {
                    edges {
                      node {
                        oid
                        commitUrl
                        tree {
                          entries {
                            name
                            object {
                              ... on github_Blob {
                                text
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
            strapi_githubManifestoChangelogs(sort: "createdAt:DESC") {
                data {
                  attributes{
                    ManifestoArticle{
                      Version
                    }
                  }
                }
            }
        }
      `;
