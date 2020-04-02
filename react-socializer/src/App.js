import React, {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState
} from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

import postsReducer from "./postsReducer";

export const UserContext = createContext();
export const PostContext = createContext({
  posts: []
});

function App() {
  const initialPostState = useContext(PostContext);
  const [state, dispatch] = useReducer(postsReducer, initialPostState);

  const [user, setUser] = useState("Marcus");

  useEffect(() => {
    document.title = user ? `${user}'s feed` : "Please, log in.";
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreatePost user={user} />
        <PostList posts={state.posts} />
      </UserContext.Provider>
    </PostContext.Provider>
  );
}

export default App;
