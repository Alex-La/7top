import { combineReducers } from "redux";
import {
  mainReducer,
  allgamesPandingReducer,
  usersReducer,
  usersPandingReducer,
} from "./mainReducer";
import { ownersReducer, balanceReducer } from "./tronReducer";

export const rootReducer = combineReducers({
  main: mainReducer,
  mainPanding: allgamesPandingReducer,
  users: usersReducer,
  usersPanding: usersPandingReducer,
  owners: ownersReducer,
  balance: balanceReducer,
});
