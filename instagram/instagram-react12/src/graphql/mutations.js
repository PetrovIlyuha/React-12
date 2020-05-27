import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation createUser(
    $userId: String!
    $name: String!
    $username: String!
    $email: String!
    $bio: String!
    $website: String!
    $profileImage: String!
    $phoneNumber: String!
  ) {
    insert_users(
      objects: {
        user_id: $userId
        name: $name
        username: $username
        email: $email
        bio: $bio
        website: $website
        profile_image: $profileImage
        phone_number: $phoneNumber
      }
    ) {
      affected_rows
    }
  }
`;
