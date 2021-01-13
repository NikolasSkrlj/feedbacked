import React from "react";
import ReactDOM from "react-dom";
import "materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers"; // ok i ovo je moguce

// create store - prvi argumenti su svi reduceri koji se koriste, drugi je inicijalno stanje storea, treci su middlewarei
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//pomocu providera sve react komponente mogu pristupiti globalnom storeu
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
