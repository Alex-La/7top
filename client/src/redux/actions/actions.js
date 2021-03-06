export const createPost = (post) => {
  return {
    type: "CREATE_POST",
    payload: post,
  };
};

export const loadPosts = () => async (dispatch) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const json = await response.json();
  json.map((data) => dispatch(createPost(data.title)));
};
