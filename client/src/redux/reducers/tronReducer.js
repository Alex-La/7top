export const ownersReducer = (
  state = { total: 0, cursor: null, hasMore: false, owners: [] },
  action
) => {
  switch (action.type) {
    case "LOAD_MORE_OWNERS":
      return {
        ...action.payload,
        owners: [...state.owners, ...action.payload.owners],
      };
    case "OWNERS":
      return action.payload;
    default:
      return state;
  }
};

export const balanceReducer = (state = 0, action) => {
  switch (action.type) {
    case "BALANCE":
      return action.payload;
    default:
      return state;
  }
};
