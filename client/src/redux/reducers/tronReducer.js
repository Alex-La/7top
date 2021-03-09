export const contract = (state = null, action) => {
  switch (action.type) {
    case "CONTRACT":
      return action.payload;
    default:
      return state;
  }
};

export const balance = (state = 0, action) => {
  switch (action.type) {
    case "BALANCE":
      return action.payload;
    case "BALANCE_PANDING":
      return 0;
    default:
      return state;
  }
};

export const owners = (
  state = { total: 0, cursor: null, hasMore: false, owners: [] },
  action
) => {
  switch (action.type) {
    case "OWNERS":
      return action.payload;
    case "LOAD_MORE_OWNERS":
      return {
        ...action.payload,
        owners: [...state.owners, ...action.payload.owners],
      };
    default:
      return state;
  }
};
