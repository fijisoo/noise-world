export const manifestoQuery = `
    query GetManifestoQuery {
      github_repository(owner: "syncArt", name: "manifesto") {
        object(expression: "HEAD:") {
          ... on github_Tree {
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
