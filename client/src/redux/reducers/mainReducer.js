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

export const language = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return action.payload;
    case "CHANGE_LANGUAGE_PANDING":
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

const friendsState = {
  total: undefined,
  cursor: 0,
  hasMore: false,
  friends: [],
  loading: false,
  success: false,
};
export const friends = (state = friendsState, action) => {
  switch (action.type) {
    case "FRIENDS_SUCCESS":
      return { ...state, success: false };
    case "FRIENDS":
      return { ...action.payload, success: true, loading: false };
    case "FRIENDS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_FRIENDS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        friends: [...state.friends, ...action.payload.friends],
      };
    default:
      return state;
  }
};

const allWinnersState = {
  total: undefined,
  cursor: 0,
  hasMore: false,
  allWinners: [],
  loading: false,
  success: false,
};
export const allWinners = (state = allWinnersState, action) => {
  switch (action.type) {
    case "ALL_WINNERS_SUCCESS":
      return { ...state, success: false };
    case "ALL_WINNERS":
      return { ...action.payload, success: true, loading: false };
    case "ALL_WINNERS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_ALL_WINNERS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        allWinners: [...state.allWinners, ...action.payload.allWinners],
      };
    default:
      return state;
  }
};
