import { gql } from "@apollo/client";

export const GET_BLOG_POST = gql`
  query getBlogPost($id: ID!) {
    strapi_blog(id: $id) {
      data {
        attributes {
          publishedAt
          slug
          title
          description
          featuredImage {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          content
        }
      }
    }
  }
`;
