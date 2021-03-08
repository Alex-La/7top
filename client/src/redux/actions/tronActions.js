export const getOwners = ({ contract, after = 0 }) => async (dispatch) => {
  const res = await fetchOwners(contract, after);
  dispatch({ type: "OWNERS", payload: res });
};

export const loadMoreOwners = ({ contract, after = 0 }) => async (dispatch) => {
  const res = await fetchOwners(contract, after);
  dispatch({ type: "LOAD_MORE_OWNERS", payload: res });
};

const fetchOwners = async (contract, after) => {
  try {
    const response = await fetch(`/api/tron/owners/${contract}?after=${after}`);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
