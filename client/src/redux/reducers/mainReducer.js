export const me = (state = null, action) => {
  switch (action.type) {
    case "ME":
      return action.payload;
    case "ME_ERROR":
      localStorage.removeItem("token");
      return null;
    default:
      return state;
  }
};

export const allgames = (state = null, action) => {
  switch (action.type) {
    case "ALLGAMES":
      return action.payload;
    case "ALL_GAMES_PANDING":
      return state;
    default:
      return state;
  }
};

const usersState = {
  allUsersLength: undefined,
  cursor: 0,
  hasMore: false,
  allUsers: [],
  loading: false,
  success: false,
};
export const users = (state = usersState, action) => {
  switch (action.type) {
    case "USERS_SUCCESS":
      return { ...state, success: false };
    case "USERS":
      return { ...action.payload, success: true, loading: false };
    case "USERS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_USERS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        allUsers: [...state.allUsers, ...action.payload.allUsers],
      };
    default:
      return state;
  }
};
