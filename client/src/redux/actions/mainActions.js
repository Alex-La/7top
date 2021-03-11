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

export const getAllGames = () => async (dispatch) => {
  dispatch({ type: "ALL_GAMES_PANDING" });
  fetch("/api/tron/allgames")
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((res) => dispatch({ type: "ALLGAMES", payload: res }))
    .catch(() => dispatch({ type: "ALL_GAMES_PANDING" }));
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

const fetchUsers = async (after = -1) => {
  const response = await fetch(`/api/main/allusers/?after=${after}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getFriends = (wallet) => async (dispatch) => {
  try {
    dispatch({ type: "FRIENDS_SUCCESS" });
    const res = await fetchFriends(wallet);
    dispatch({ type: "FRIENDS", payload: res });
  } catch (e) {
    dispatch({ type: "FRIENDS_SUCCESS" });
  }
};

export const loadMoreFriends = (wallet, after) => async (dispatch) => {
  try {
    dispatch({ type: "FRIENDS_LOADING" });
    const res = await fetchFriends(wallet, after);
    dispatch({ type: "LOAD_MORE_FRIENDS", payload: res });
  } catch (e) {
    dispatch({ type: "FRIENDS_SUCCESS" });
  }
};

const fetchFriends = async (wallet, after = -1) => {
  const response = await fetch(`/api/tron/friends/${wallet}?after=${after}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getAllWinners = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_WINNERS_SUCCESS" });
    const res = await fetchAllWinners();
    dispatch({ type: "ALL_WINNERS", payload: res });
  } catch (e) {
    dispatch({ type: "ALL_WINNERS_SUCCESS" });
  }
};

export const loadMoreAllWinners = (after) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_WINNERS_LOADING" });
    const res = await fetchAllWinners(after);
    dispatch({ type: "LOAD_MORE_ALL_WINNERS", payload: res });
  } catch (e) {
    dispatch({ type: "ALL_WINNERS_SUCCESS" });
  }
};

const fetchAllWinners = async (after = -1) => {
  const response = await fetch(`/api/tron/winners?after=${after}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};
