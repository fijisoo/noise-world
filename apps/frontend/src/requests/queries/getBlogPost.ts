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
