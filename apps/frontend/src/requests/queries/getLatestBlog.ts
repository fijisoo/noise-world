export const GET_LATEST_BLOG = `
    query getLatestBlog {
        strapi_blogs(sort: "id:desc", pagination: { limit: 1 }) {
            data {
                id
                attributes {
                    slug
                    title
                }
            }
        }
    }
`;
