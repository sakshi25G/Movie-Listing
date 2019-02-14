import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import MovieList from "./components/MovieList";
import "./styles.css";
var store = configureStore();
function App() {   
  return (
    <Provider store={store}>
      <MovieList />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
