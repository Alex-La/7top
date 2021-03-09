export const getMe = () => async (dispatch) => {
  fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((res) => dispatch({ type: "ME", payload: res }))
    .catch(() => dispatch({ type: "ME_ERROR" }));
};

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
