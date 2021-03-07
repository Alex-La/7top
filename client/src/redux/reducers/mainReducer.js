export const mainReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALLGAMES":
      return action.payload;
    default:
      return state;
  }
};

export const allgamesPandingReducer = (state = true, action) => {
  switch (action.type) {
    case "GET_ALLGAMES_PANDING":
      return action.payload;
    default:
      return state;
  }
};
