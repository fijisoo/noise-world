import { gql } from "@apollo/client";

export const GET_LATEST_BLOG = gql`
    query getLatestBlog {
        strapi_blogs(sort: "createdAt:desc", pagination: { limit: 1 }) {
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
