import { combineReducers } from "redux";
import { mainReducer, allgamesPandingReducer } from "./mainReducer";

export const rootReducer = combineReducers({
  main: mainReducer,
  mainPanding: allgamesPandingReducer,
});
