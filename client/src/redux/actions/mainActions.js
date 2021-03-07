const panding = (bool) => ({ type: "GET_ALLGAMES_PANDING", payload: bool });

export const getAllgames = () => async (dispatch) => {
  dispatch(panding(true));
  fetch("/api/tron/allgames")
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      dispatch(panding(false));
      return response.json();
    })
    .then((res) => dispatch({ type: "GET_ALLGAMES", payload: res }));
};

export const getUsers = (after = 0) => async (dispatch) => {
  dispatch({ type: "USERS_PANDING", payload: true });
  fetch(`/api/main/allusers/?after=${after}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      dispatch({ type: "USERS_PANDING", payload: false });
      return response.json();
    })
    .then((res) => dispatch({ type: "USERS", payload: res }));
};
