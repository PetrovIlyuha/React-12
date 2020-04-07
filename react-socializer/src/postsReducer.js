function postsReducer(state, action) {
  switch (action.type) {
    case "ADD_POST": {
      const newPost = action.payload;
      return { posts: [newPost, ...state.posts] };
    }
    case "DELETE_POST": {
      const deletedPostID = action.payload.id;
      return { posts: state.posts.filter(post => post.id !== deletedPostID) };
    }
    default:
      return state;
  }
}

export default postsReducer;
