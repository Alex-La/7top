export const setCurrentContract = ({ contract }) => ({
  type: "CONTRACT",
  payload: contract,
});

export const getBalance = ({ contract }) => async (dispatch) => {
  fetch(`/api/tron/balance/${contract}`)
    .then((response) => {
      dispatch({ type: "BALANCE_PANDING" });
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((res) => dispatch({ type: "BALANCE", payload: res.balance }))
    .catch(() => dispatch({ type: "BALANCE_PANDING" }));
};

export const getOwners = (contract) => async (dispatch) => {
  const res = await fetchOwners(contract);
  dispatch({ type: "OWNERS", payload: res });
};

export const loadMoreOwners = (contract, after = 0) => async (dispatch) => {
  const res = await fetchOwners(contract, after);
  dispatch({ type: "LOAD_MORE_OWNERS", payload: res });
};

const fetchOwners = async (contract, after = 0) => {
  try {
    const response = await fetch(`/api/tron/owners/${contract}?after=${after}`);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
