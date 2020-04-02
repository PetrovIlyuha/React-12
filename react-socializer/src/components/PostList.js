import React from "react";
import Post from "./Post";

const PostList = ({ posts }) => {
  return posts.map(post => <Post {...post} key={post.id} />);
};

export default PostList;
