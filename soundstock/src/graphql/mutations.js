import { gql } from "apollo-boost";

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`;

export const ADD_SONG = gql`
  mutation AddSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_Songs(
      objects: {
        artist: $artist
        duration: $duration
        thumbnail: $thumbnail
        title: $title
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;
