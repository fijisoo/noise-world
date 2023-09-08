import { gql } from "@apollo/client";

export const GET_BLOG = gql`
  query getBlog {
    strapi_blogs {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        attributes {
          slug
          title
          description
          featuredImage {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          content
          publishedAt
        }
        id
      }
    }
  }
`;
