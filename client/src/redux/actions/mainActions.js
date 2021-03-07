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
