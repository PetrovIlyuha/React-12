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

export const EDIT_USER = gql`
  mutation editUser(
    $id: uuid!
    $name: String!
    $username: String!
    $email: String!
    $bio: String!
    $phoneNumber: String!
    $website: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        bio: $bio
        email: $email
        name: $name
        phone_number: $phoneNumber
        username: $username
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_USER_AVATAR = gql`
  mutation editUserAvatar($id: uuid!, $profileImage: String!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { profile_image: $profileImage }
    ) {
      affected_rows
    }
  }
`;
