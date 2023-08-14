export const manifestoQuery = `
    query GetManifestoQuery {
      github_repository(owner: "syncArt", name: "manifesto") {
        object(expression: "HEAD:") {
          ... on github_Tree {
            repository {
              releases(first: 1) {
                nodes {
                  tag {
                    name
                  }
                }
              }
            }
            entries {
              name
              type
              mode
              object {
                ... on github_Blob {
                  byteSize
                  text
                  isBinary
                }
              }
            }
          }
        }
      }
    }
`;
