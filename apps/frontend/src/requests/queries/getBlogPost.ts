export const GET_BLOG_POST = `
  query getBlogPost($id: ID!) {
    strapi_blog(id: $id) {
      data {
        attributes {
          publishedAt
          slug
          title
          description
          content
          keywords
          ogImageExternalUrl
          ogImageInternalUrl {
              data {
                attributes{
                  alternativeText
                  url
                }
              }
          }
          featuredImage{
              data{
                attributes{
                  alternativeText
                  url
                }
              }
          }
        }
      }
    }
  }
`;
