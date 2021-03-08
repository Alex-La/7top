import { combineReducers } from "redux";
import * as mainReducer from "./mainReducer";
import * as tronReducer from "./tronReducer";

export const rootReducer = combineReducers({ ...mainReducer, ...tronReducer });
