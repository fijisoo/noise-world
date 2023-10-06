export const GET_BLOG = `
  query getBlog {
    strapi_blogs (sort: "id:DESC") {
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
          content
          featuredImage {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          publishedAt
        }
        id
      }
    }
  }
`;
