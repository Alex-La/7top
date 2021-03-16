export const tronWeb = (state = null, action) => {
  switch (action.type) {
    case "TRON_WEB":
      return action.payload;
    default:
      return state;
  }
};
