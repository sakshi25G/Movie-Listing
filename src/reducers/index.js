import { combineReducers } from "redux";
import getMovieData from "./movieList";

const rootReducer = combineReducers({
  getMovieData
});

export default rootReducer;
