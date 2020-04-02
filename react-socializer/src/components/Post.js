import React, { useContext } from "react";
import { UserContext, PostContext } from "../App";

const Post = ({ image, content, user, id }) => {
  const currentUser = useContext(UserContext);
  const { dispatch } = useContext(PostContext);
  const isCurrentUser = currentUser === user;

  const handleDeletePost = () =>
    dispatch({ type: "DELETE_POST", payload: { id } });
  return (
    <>
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Post cover"
          style={{ width: 240, height: 100, objectFit: "cover" }}
        />
      )}
      <p>{content}</p>
      <div style={{ color: isCurrentUser && "green" }}>{user}</div>
      <button onClick={handleDeletePost}>
        Delete{" "}
        <span role="img" aria-label="delete">
          🧹
        </span>
      </button>
    </>
  );
};

export default Post;
