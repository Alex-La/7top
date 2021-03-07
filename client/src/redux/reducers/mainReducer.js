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

export const usersReducer = (
  state = { allUsersLength: 0, cursor: 0, hasMore: false, allUsers: [] },
  action
) => {
  switch (action.type) {
    case "USERS":
      return action.payload;
    default:
      return state;
  }
};

export const usersPandingReducer = (state = true, action) => {
  switch (action.type) {
    case "USERS_PANDING":
      return action.payload;
    default:
      return state;
  }
};
