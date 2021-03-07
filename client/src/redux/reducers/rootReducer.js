import { combineReducers } from "redux";
import {
  mainReducer,
  allgamesPandingReducer,
  usersReducer,
  usersPandingReducer,
} from "./mainReducer";

export const rootReducer = combineReducers({
  main: mainReducer,
  mainPanding: allgamesPandingReducer,
  users: usersReducer,
  usersPanding: usersPandingReducer,
});
