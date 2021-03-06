import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { createPost, loadPosts } from "./redux/actions/actions";

function App() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(createPost("hello"))}>Add</button>
    </div>
  );
}

export default App;
