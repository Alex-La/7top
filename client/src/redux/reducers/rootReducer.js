import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { mainReducer, allgamesPandingReducer } from "./mainReducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
  main: mainReducer,
  mainPanding: allgamesPandingReducer,
});
