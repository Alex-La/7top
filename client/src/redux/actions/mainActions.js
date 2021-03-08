export const getAllgames = () => async (dispatch) => {
  dispatch({ type: "ALLGAMES_SUCCESS" });
  fetch("/api/tron/allgames")
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((res) => dispatch({ type: "ALLGAMES", payload: res }))
    .catch(() => dispatch({ type: "ALLGAMES_SUCCESS" }));
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "USERS_SUCCESS" });
    const res = await fetchUsers();
    dispatch({ type: "USERS", payload: res });
  } catch (e) {
    dispatch({ type: "USERS_SUCCESS" });
  }
};

export const loadMoreUsers = (after) => async (dispatch) => {
  try {
    dispatch({ type: "USERS_LOADING" });
    const res = await fetchUsers(after);
    dispatch({ type: "LOAD_MORE_USERS", payload: res });
  } catch (e) {
    dispatch({ type: "USERS_SUCCESS" });
  }
};

const fetchUsers = async (after = 0) => {
  const response = await fetch(`/api/main/allusers/?after=${after}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};
