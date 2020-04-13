import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  subscription getSongs {
    Songs(order_by: { created_at: desc }) {
      artist
      duration
      id
      thumbnail
      url
      title
    }
  }
`;
